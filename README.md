
# RoboCodex Portfolio Website

Welcome to your RoboCodex portfolio website! This project is a lightweight, fast, and easy-to-maintain static site built with plain HTML, CSS, and JavaScript. It's designed to be hosted for free on GitHub Pages.

## Tech Stack

*   **HTML:** For the core structure of the website.
*   **CSS:** For styling and layout.
*   **JavaScript:** For dynamic content loading and interactivity.
*   **marked.js:** A JavaScript library used to parse Markdown files into HTML.

---

## How to View Your Website

To see your website, simply open the `index.html` file in your web browser. You can do this by double-clicking the file or by right-clicking and selecting "Open with" your preferred browser.

---

## Folder Structure

Here is a breakdown of the project's folder structure:

```
/
├── index.html            # Home page
├── about.html            # About page
├── courses.html          # Lists all courses
├── course.html           # Template for a single course page
├── projects.html         # Lists all projects
├── contact.html          # Contact page
|
├── assets/
│   ├── css/style.css     # Main stylesheet
│   └── js/
│       ├── main.js             # Loads course/project lists
│       └── course-renderer.js  # Renders course content
|
├── content/
│   ├── courses/          # Holds all course content
│   └── projects/         # Holds all project content
|
└── data/
    ├── courses.json      # Database of all courses
    └── projects.json     # Database of all projects
```

---

## How to Customize Your Website

This website is designed to be easily updated without needing to write much code. Here’s how to change each part of the site:

### 1. Adding or Editing a Course

Adding a new course is a two-step process:

**Step 1: Create the Course Content**

1.  Go to the `content/courses/` directory.
2.  Create a new folder for your course. The folder name will be used in the URL (e.g., `content/courses/new-course`).
3.  Inside the new folder, create an `index.md` file. This file contains the course title and description.

    ```markdown
    ---
    title: My New Course
    description: A brief description of the new course.
    ---

    This is the main content of the course page.
    ```

4.  Create additional markdown files for each lesson (e.g., `lesson-1.md`, `lesson-2.md`).

**Step 2: Add the Course to the List**

1.  Open the `data/courses.json` file.
2.  Add a new entry for your course. The `slug` must match the folder name you created in Step 1.

    ```json
    [
        {
            "slug": "python-for-spike",
            "title": "Python for SPIKE Prime",
            "description": "Learn the fundamentals of Python programming with the LEGO SPIKE Prime robotics platform."
        },
        {
            "slug": "new-course",
            "title": "My New Course",
            "description": "A brief description of the new course."
        }
    ]
    ```

### 2. Adding or Editing a Project

1.  Open the `data/projects.json` file.
2.  Add a new entry for your project.

    ```json
    [
        {
            "title": "RoboCodex Camp",
            "description": "A summer camp for learning robotics and programming."
        },
        {
            "title": "My New Project",
            "description": "A description of my awesome new project."
        }
    ]
    ```

### 3. Embedding YouTube Videos

To embed a YouTube video in a course lesson, use the following custom tag in your markdown file:

```
{{youtube:VIDEO_ID}}
```

Replace `VIDEO_ID` with the ID of the YouTube video (e.g., `dQw4w9WgXcQ`). The `course-renderer.js` script will automatically convert this tag into an embedded video player.

### 4. Customizing the Styling

All the styles for the website are in the `assets/css/style.css` file. You can change the colors, fonts, and layout by editing this file.

### 5. Editing Page Content

*   **Home Page:** Edit `index.html`
*   **About Page:** Edit `about.html`
*   **Contact Page:** Edit `contact.html`

---

## How to Deploy to GitHub Pages

1.  **Create a GitHub Repository:** Create a new repository on GitHub. The repository name should be `your-username.github.io`.
2.  **Push Your Code:** Upload the files in this project to your new repository.
3.  **Enable GitHub Pages:**
    *   Go to your repository's **Settings** tab.
    *   In the **Pages** section, select the `main` branch as the source.
    *   Click **Save**.

Your website will be live at `https://your-username.github.io` in a few minutes.
