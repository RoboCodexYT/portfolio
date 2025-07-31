
document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    console.log('coursesContainer:', coursesContainer);

    if (coursesContainer) {
        fetch('data/courses.json')
            .then(response => {
                console.log('fetch response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(courses => {
                console.log('courses.json:', courses);
                courses.forEach(course => {
                    const courseURL = `content/courses/${course.slug}/index.md`;
                    console.log('Fetching course from:', courseURL);
                    fetch(courseURL)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(text => {
                            console.log('Course markdown:', text);
                            const { attributes } = frontMatter(text);
                            console.log('Course attributes:', attributes);
                            const courseElement = document.createElement('div');
                            courseElement.classList.add('course-card');
                            courseElement.innerHTML = `
                                <a href="course.html?slug=${course.slug}">
                                    <h3>${attributes.title}</h3>
                                    <p>${attributes.description}</p>
                                </a>
                            `;
                            coursesContainer.appendChild(courseElement);
                        })
                        .catch(error => console.error('Error fetching or parsing course markdown:', error));
                });
            })
            .catch(error => console.error('Error fetching or parsing courses.json:', error));
    }
});

// Simple front-matter parser
function frontMatter(text) {
    const match = /^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/.exec(text);
    if (match) {
        const frontmatter = match[1];
        const content = match[2];
        const attributes = {};
        frontmatter.split('\n').forEach(line => {
            const [key, ...value] = line.split(':');
            attributes[key.trim()] = value.join(':').trim();
        });
        return { attributes, body: content };
    }
    return { attributes: {}, body: text };
}
