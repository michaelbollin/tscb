import PostPreview from "./post-preview";

export default function MoreStories({ posts, onTagClick, onUserClick, closePopup }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-4 lg:gap-x-8 gap-y-20 md:gap-y-12 mb-32">
        {posts.map(({ node }) => (
          <div key={node.slug} className="flex flex-col h-full">
            <PostPreview
              title={node.title}
              coverImage={node.featuredImage?.node.sourceUrl || ''}
              date={node.date}
              slug={node.slug}
              tags={node.tags.edges.map(tag => tag.node.name)}
              author={node.author}
              excerpt={node.excerpt.replace(/<.*?>/g, '')}
              onTagClick={onTagClick}
              onUserClick={onUserClick}
              closePopup={closePopup}
            />
          </div>
        ))}
      </div>
    </section>
  );
}