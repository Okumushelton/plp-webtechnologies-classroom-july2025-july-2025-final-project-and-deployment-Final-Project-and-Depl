#Deployment Link

https://okumushelton.github.io/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/


# Modern Multipage Website – Glassmorphism & Gradient Theme

A fully responsive **multipage website** designed with **glassmorphism effects** and a **dark–white–purple gradient color system**.  
This project is built using **HTML5, CSS3, and vanilla JavaScript** to demonstrate modern frontend practices including responsiveness, interactivity, accessibility, and deployment readiness.

---

## Purpose

This website was built as a **final assignment project** to bring together planning, structure, design, and deployment skills into one polished application.  
It serves as a **real-world style website** that can function as:

- A **personal portfolio** (to showcase projects and skills)
- A **startup/agency landing page**
- A **product/service showcase site**
- A **template** for small businesses

---

## Project Structure
project/
│
├── index.html # Home page: hero, features, call to action
├── about.html # About page: timeline, skills progress, mission
├── services.html # Services page: flip cards, pricing tables
├── gallery.html # Gallery page: masonry grid + lightbox
├── contact.html # Contact page: form validation + localStorage
│
├── css/
│ └── style.css # Global styles, gradients, glassmorphism, responsiveness
│
├── js/
│ ├── main.js # Navbar, back-to-top, scroll effects
│ ├── gallery.js # Lightbox gallery functionality
│ └── form.js # Contact form validation + localStorage saving
│
├── images/ # Optimized background and gallery assets
│
└── README.md # Project documentation


---

## Features

### Design
- **Dark/White/Purple gradient theme** for a modern look
- **Glassmorphism UI** with blurred panels and frosted glass cards
- **Responsive navbar** with mobile hamburger menu
- Consistent layout across all pages with a global header/footer
- CSS variables for theme management and maintainability

### ⚡ Interactivity
- **Lightbox Gallery**
  - Click thumbnails to open fullscreen images
  - Navigate with next/prev buttons or ESC key
- **Contact Form**
  - Real-time field validation with error messages
  - Saves user input in LocalStorage (no data loss on refresh)
  - Animated success message on submission
- **Back-to-Top Button** for better navigation
- **Scroll Animations** using IntersectionObserver

### Responsiveness
- Mobile-first design using Flexbox and CSS Grid
- Scales gracefully from **small smartphones → desktops**
- Navigation adapts with a slide-in mobile menu

### Accessibility
- Semantic HTML5 markup
- Alt attributes for images
- Keyboard-accessible gallery (ESC closes modal, arrow navigation)

---

## Tech Stack

- **HTML5** – semantic structure and accessibility
- **CSS3** – glassmorphism, gradients, responsiveness, animations
- **Vanilla JavaScript (ES6)** – interactivity, DOM manipulation
- **Flexbox + Grid** – responsive layout system

---

## Deployment

This project is deployment-ready.  

### GitHub Pages
1. Push project to a GitHub repository
2. Go to **Settings → Pages**
3. Select branch (`main`) and root directory
4. Access live site at:  
   https://okumushelton.github.io/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/



---

## Usage

- Clone the repository:
  ```bash
  git clone https://github.com/<username>/<repo-name>.git
  cd <repo-name>
