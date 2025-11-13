# PeaceFront Front-End

A multi-page educational website exploring the ethics of non-violence, global peace leaders, and practical steps for building peace.

## Pages
- **Home (`index.html`)** – Overview & quick navigation panels.
- **Understanding (`understanding.html`)** – Definitions of violence and terrorism.
- **Non-Violence (`nonviolence.html`)** – Ethical foundations (Virtue, Deontology, Utilitarianism).
- **Gandhi (`gandhi.html`)** – Salt March case study & lesson of Ahimsa.
- **Global Leaders (`global.html`)** – MLK Jr., Nelson Mandela, Malala Yousafzai, Dalai Lama.
- **Why Choose Peace (`why.html`)** – Human & ethical reasons for rejecting violence.
- **Quiz (`quiz.html`)** – Interactive peacebuilder style quiz (localStorage only).
- **Take Action (`action.html`)** – Peace pledge + reflection prompts.
- **Conclusion (`conclusion.html`)** – Ongoing moral legacy & follow‑up actions.

## Features
- Responsive layout, dark mode toggle (stored in `localStorage`).
- Image assets (SVG) with accessible alt text.
- Peacebuilder quiz with hybrid result logic.
- Pledge signatures stored in browser `localStorage` (no backend).
- Accessible semantics: headings, landmarks, focus states, alt text, reduced‑motion support.

## Tech Stack
Pure front-end: HTML5, CSS3, vanilla JavaScript. No build step required.

## Running Locally
Open `index.html` directly in a browser or start a simple server:

```bash
python3 -m http.server 8000
```
Visit http://localhost:8000/

## Customization
- Replace SVGs in `assets/images/` with real photos (see `assets/images/README.txt`).
- Adjust theme colors in `assets/css/style.css` (see `:root` + `.dark-theme`).
- Extend quiz: add questions and update tally logic in `assets/js/app.js`.

## Accessibility Notes
- Dark mode preserves contrast; images auto invert via `.invert-on-dark` filter.
- All interactive elements have focus styles.
- Decorative large quote marks are pseudo-elements and do not affect screen readers.

## License & Attribution
Provide license info for any real images you add. Current SVGs are original and may be used/adapted.

## Deployment
Can be served via any static hosting: GitHub Pages, Netlify, Vercel, etc.

## Future Enhancements
- Downloadable pledge signatures JSON.
- Add i18n for multilingual versions.
- Integrate backend for persistent submissions if needed.

---
Built November 2025 for educational use.
