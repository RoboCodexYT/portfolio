
document.addEventListener('DOMContentLoaded', () => {
    const courseTitle = document.getElementById('course-title');
    const courseContent = document.getElementById('course-content');

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (slug) {
        fetch(`content/courses/${slug}/index.md`)
            .then(response => response.text())
            .then(text => {
                const { attributes, body } = frontMatter(text);
                courseTitle.innerText = attributes.title;
                let fullContent = body;

                if (attributes.lessons) {
                    Promise.all(attributes.lessons.map(lesson =>
                        fetch(`content/courses/${slug}/${lesson}.md`)
                            .then(response => response.text())
                            .then(text => frontMatter(text).body)
                    )).then(lessonBodies => {
                        fullContent += '\n\n' + lessonBodies.join('\n\n');
                        const html = marked.parse(fullContent.replace(/{{youtube:(.*?)}}/g, '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                        courseContent.innerHTML = html;
                    });
                } else {
                    const html = marked.parse(fullContent.replace(/{{youtube:(.*?)}}/g, '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                    courseContent.innerHTML = html;
                }
            });
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
