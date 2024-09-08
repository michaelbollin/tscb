const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  if (!API_URL) {
    console.error('WORDPRESS_API_URL is not defined');
    throw new Error('WORDPRESS_API_URL is not defined');
  }

  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] =
      `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
      console.error('Failed Query:', query);
      throw new Error(`Failed to fetch API for query: ${query.slice(0, 100)}... | Errors: ${JSON.stringify(json.errors)}`);
    }
    return json.data;
  } catch (error) {
    console.error('Error fetching data from WordPress:', error);
    console.error('Failed Query:', query);
    throw error;
  }
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        
        status
      }
    }`,
    {
      variables: { id, idType },
    },
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      tags(first: 100) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );
  return data;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    },
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

export async function getPostsByTag(tag: string) {
  const data = await fetchAPI(
    `
    query PostsByTag($tag: String!) {
      posts(first: 20, where: { tag: $tag }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: { tag },
    }
  );
  return data.posts;
}

export async function getPostsByUsername(username: string) {
  const data = await fetchAPI(
    `
    query PostsByAuthor($username: String!) {
      posts(first: 20, where: { authorName: $username }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            author {
              node {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: { username },
    }
  );
  return data.posts;
}

export async function getPostsByTitle(title: string) {
  const data = await fetchAPI(`
    query PostsByTitle($title: String!) {
      posts(where: { title_contains: $title }, first: 20) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
               
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: { title },
    }
  );

  return data?.posts;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        excerpt
        slug
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
        content
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: "SLUG"
      }
    }
  );
  return data?.post;
}

export async function searchPosts(searchTerm: string) {
  try {
    const data = await fetchAPI(`
      query SearchPosts($searchTerm: String!) {
        posts(
          first: 20,
          where: {
            search: $searchTerm
            tag: $searchTerm
          }
        ) {
          edges {
            node {
              title
              slug
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
              tags {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
    `,
      {
        variables: { searchTerm },
      }
    );

    return data?.posts || { edges: [] };
  } catch (error) {
    console.error('Error searching posts:', error);
    return { edges: [] };
  }
}

export async function getAllUsers() {
  const data = await fetchAPI(`
    query AllUsers {
      users(first: 100) {
        edges {
          node {
            id
            name
            firstName
            lastName
            slug
            avatar {
              url
            }
            description
            userData {
          	  favouriteDish
              avatarPicture {
                node {
                  id
                  sourceUrl
                }
              }
          	}
          }
        }
      }
    }
  `);

  console.log(data.users.edges);

  // Filter out users without a description and without published posts
  const usersWithBioAndPosts = data?.users?.edges.filter(
    (edge) => 
      edge.node.description && 
      edge.node.description.trim() !== ''
  ) || [];

  return { edges: usersWithBioAndPosts };
}

export async function getUserBySlug(slug: string) {
  const data = await fetchAPI(`
    query UserBySlug($slug: String!) {
      user(id: $slug, idType: USERNAME) {
        id
        username
        name
        email
        description
        avatar {
          url
        }
      }
    }
  `, {
    variables: {
      slug: slug
    }
  });

  return data?.user;
}

export async function getUserById(id: string) {
  const data = await fetchAPI(`
    query UserById($id: ID!) {
      user(id: $id, idType: DATABASE_ID) {
        id
        username
        name
        email
        description
        avatar {
          url
        }
        slug
      }
    }
  `, {
    variables: {
      id: id
    }
  });

  return data?.user;
}