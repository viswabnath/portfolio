
# 🌌 Viswanath Bodasakurthi — Digital Workspace & Portfolio

<div align="center">
  
  [![Live Demo](https://img.shields.io/badge/View_Live-Site-000000?style=for-the-badge&logo=github&logoColor=white)](https://viswabnath.github.io/portfolio/)
  [![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
  [![Zero Build](https://img.shields.io/badge/Zero_Build_Step-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#license)

  <p align="center">
    <strong>Senior Frontend Engineer & Co-Founder</strong> | 8+ years of experience engineering clinical tech, banking infrastructure, and blockchain systems.
  </p>
  

</div>

---

## ✨ Standout Features

This portfolio isn't just a static site; it's a showcase of high-performance web rendering and fluid interaction design.

* **🌌 Real-Time GLSL Aurora Shader:** A custom fragment shader rendered via Three.js. It dynamically reacts to scroll position and mouse movement for an immersive, fluid background.
* **💻 Animated macOS Terminal:** A sleek, typewriter-style boot sequence that runs on page load to establish a strong technical aesthetic.
* **🎬 GSAP Scroll Mastery:** Seamless `ScrollTrigger` animations applied to section headings, timeline entries, skill bars, and project cards for a premium feel.
* **⚡ Zero-Build Architecture:** No `npm`, no bundlers, no build step. A masterclass in optimized, vanilla web development—just open `index.html`.
* **⏳ Dynamic Career Counter:** Automatically calculates and updates years of experience live from September 2017.
* **🖱️ Custom Interactive Cursor:** A gold dot with a trailing ring that scales and morphs on hover events.

---

## 🛠️ Tech Stack

Engineered for maximum performance and visual impact without the bloat of heavy frameworks.

| Layer | Technology |
| :--- | :--- |
| **3D / Shader** | [Three.js r128](https://threejs.org/) (CDN) |
| **Animations** | [GSAP 3.12](https://greensock.com/gsap/) + ScrollTrigger (CDN) |
| **Typography** | Cormorant Garamond · Outfit · JetBrains Mono |
| **Assets** | Font Awesome 6 (CDN) |
| **Deployment** | GitHub Pages (Live from `master` branch) |

---

## 🚀 Getting Started

Because this project utilizes a zero-build architecture, getting it running locally takes seconds.

```bash
# 1. Clone the repository
git clone [https://github.com/viswabnath/portfolio.git](https://github.com/viswabnath/portfolio.git)
cd portfolio

# 2. Run it (No installation required)
open index.html

# OR serve it locally to test network behaviors:
npx serve .                  # → http://localhost:3000
python3 -m http.server 5500  # → http://localhost:5500

```

---

## 📂 Architecture & Structure

The entire application is self-contained within a single entry point for ultimate simplicity and speed.

```text
portfolio/
├── index.html              # Single entry point — CSS & JS fully inlined for speed
├── assets/
│   ├── css/
│   │   └── style.css       # Standalone stylesheet (reference only)
│   ├── images/
│   │   └── favicon.svg     # Branding
│   └── js/
│       └── main.js         # Legacy JS file (reference only)
└── README.md

```

> **Note:** `index.html` is fully self-contained. `style.css` and `main.js` are kept as standalone reference files and are **not linked** to the production site. All edits should go directly into `index.html`.

---

## 🎨 Customization Guide

Want to fork this or update the content? Everything is easily locatable within `index.html`:

| Component | How to Modify |
| --- | --- |
| **Bio & Role** | Search for `Viswanath` in the Hero & About sections. |
| **Experience Years** | Auto-calculated via `new Date(2017, 8, 1)` — no manual edits needed! |
| **Terminal Sequence** | Edit the `const lines = [...]` array within the `TERMINAL TYPING` script block. |
| **Career Timeline** | Modify the `.tl-item` blocks in the Experience section. |
| **Project Showcase** | Update the `.proj-card` blocks in the Projects section. |
| **Skill Bars** | Change the `data-w` attributes on `.skill-fill` elements (e.g., `data-w="95%"`). |
| **Aurora Colors** | Tweak the `p0`–`p5` `vec3` values directly in the GLSL fragment shader. |

---

## ⚙️ Performance Notes

* **GPU Optimization:** The Aurora canvas is capped at a `1.5x` pixel ratio to maintain smooth 60FPS on high-density retina displays without thermal throttling.
* **Animation Efficiency:** GSAP scroll animations utilize `toggleActions: 'play none none none'` to ensure they only fire once, saving CPU cycles.
* **Native Scrolling:** Relies on native browser scroll rather than hijacking it (no Lenis/Locomotive), avoiding cross-browser compatibility and accessibility issues.
* **Font Loading:** Google Fonts are loaded with `display=swap` to eliminate invisible text flashing during initial load.

---

## 📄 License & Credits

Released under the **MIT License**. You are free to fork and use this for your own portfolio. A ⭐ on the repository is highly appreciated!

<p align="center">
Built with precision by <strong>Viswanath Bodasakurthi</strong> | CTO & Co Founder  <a href="https://onemark.co.in">Onemark Digital Agency</a>
</p>

```
