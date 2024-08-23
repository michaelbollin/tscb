document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: fetchInstagramPostDetails
            },
            (results) => {
                if (results && results[0]?.result) {
                    const { image, text, author } = results[0].result;
                    const postInfo = document.getElementById('post-info');
                    postInfo.innerHTML = `
                        <p><strong>Image:</strong> ${image}</p>
                        <p><strong>Text:</strong> ${text}</p>
                        <p><strong>Author:</strong> ${author}</p>
                    `;

                    // Fetch culinary tags from OpenAI
                    fetchCulinaryTags(image, text, author);
                } else {
                    document.getElementById('post-info').innerText = 'No post details found.';
                }
            }
        );
    });
});

function fetchInstagramPostDetails() {
    const postDetails = {
        image: document.querySelector('div[tabindex="0"] img')?.src,
        text: document.querySelector('hr + div div div')?.innerText,
        author: document.querySelector('a[tabindex="0"] div div span')?.innerText,
    };
    return postDetails;
}

function fetchCulinaryTags(imageUrl, text, author) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = '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';

    const prompt = `Return as PURE JSON object without any headers, without markdown, just plain response: {title:'', tags:[]}. Generate culinary title and tags based on the following image URL and text. Create title based on text and image. Use simple tags for ALL ingredients from recipe (simple, use "beans", not "miami local beans"), also for country / region origin (like Cajun, polish, greek, can be multiple, like Italy, tuscany), also for sort of dish (general: pasta, tagine, soup), and for technique of cooking (baked, cooked, stir fry, raw, etc). All tags lowercase and in english, translate to english if needed. There can be many tags. \nImage URL: ${imageUrl}\nText: ${text}`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 200
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async data => {
            const responseData = data;
            console.log("GPT response", responseData);
            console.log("GPT response sppecific", data.choices[0].message.content);
            const { title, tags, body } = JSON.parse(data.choices[0].message.content.replace('```json', '').replace('```', ''));
            console.log('Culinary Tags:', tags);
            document.getElementById('post-info').innerHTML += `<p><strong>Culinary Tags:</strong> ${tags}</p>`;

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                const currentUrl = tabs[0].url;
                createWordPressPost(title, tags, imageUrl, body, author, currentUrl);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function createWordPressPost(title, tags, imageUrl, body, author, currentUrl) {
    const apiUrl = 'http://bollin.vxm.pl/wp-json/wp/v2/posts';
    const tagApiUrl = 'http://bollin.vxm.pl/wp-json/wp/v2/tags';

    console.log("Tags", tags);

    const tagPromises = tags.map(tagName => {
        return fetch(`${tagApiUrl}?search=${encodeURIComponent(tagName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(tagData => {
                if (tagData.length > 0) {
                    return tagData[0].id; 
                } else {
                   
                    return createTag(tagName);
                }
            });
    });

    Promise.all(tagPromises)
        .then(tagIds => {
            const postData = {
                title: title,
                content: body,
                status: 'publish',
                tags: tagIds.filter(id => id !== null),
                excerpt: currentUrl,
                meta: {
                    image: imageUrl,
                    username: author
                }
            };

            return fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('knives:qdxS iysB yebG WdxH SOmJ jvqM')
                },
                body: JSON.stringify(postData)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post created:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    function createTag(tagName) {
        const newTag = {
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, '-')
        };

        return fetch(tagApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('knives:qdxS iysB yebG WdxH SOmJ jvqM')
            },
            body: JSON.stringify(newTag)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tagData => {
            return tagData.id; // Return the new tag ID
        });
    }
}