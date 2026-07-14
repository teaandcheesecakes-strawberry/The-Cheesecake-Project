/* ==========================================================================
   notebook.js — defines <notebook-page>, the shared page shell.

   HOW TO USE THIS ON A NEW PAGE
   ------------------------------------------------------------------------
   1. In <head>, link the stylesheet and this script:
        <link rel="stylesheet" href="home.css">
        <script src="notebook.js" defer></script>

   2. In <body>, write ONLY your content, wrapped in one tag:
        <notebook-page active="foundations">
          <h1>Page title</h1>
          <p class="dateline">July 2026</p>
          <p>Your actual writing goes here.</p>
          <h2>A section</h2>
          <p>More writing. Any <h2> here is auto-added to the
             "On this page" list in the left margin — no extra work.</p>
          <div class="sticky">A margin note.</div>
          <div class="sticky green">Another note, different colour.</div>
        </notebook-page>

   That's the whole page. No header, no nav, no margin markup — this
   file builds all of that around your content automatically.

   THINGS THAT LIVE ONLY HERE (edit once, changes everywhere)
   ------------------------------------------------------------------------
   - TABS            the six nav tabs and their labels/hrefs
   - STATUS_HTML      the "Status" block in the left margin
   - UPDATES_HTML     the "Recent updates" block in the left margin
   - BRAND_HTML       the masthead logo/title/tagline
   - FOOTER_TEXT      the footer line

   `active="..."` on <notebook-page> must match one of the TABS `slug`
   values below, so the right tab gets highlighted.
   ========================================================================== */

(function () {

  const TABS = [
    { slug: 'home',            label: 'Home',            href: 'home.html' },
    { slug: 'foundations',     label: 'Foundations',     href: 'foundations.html' },
    { slug: 'ai-safety',       label: 'AI Safety',       href: 'ai-safety.html' },
    { slug: 'ai-family-tree',  label: 'AI Family Tree',  href: 'ai-family-tree.html' },
    { slug: 'faq',             label: 'FAQ',              href: 'faq.html' },
    { slug: 'about',           label: 'About',            href: 'about.html' },
  ];

  const BRAND_HTML = `
    <a class="brand" href="home.html" style="text-decoration:none;">
      <svg class="brand-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(0.078125) translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#1a1a1a">
          <path d="M3430 4653 c-28 -10 -59 -46 -71 -80 -9 -30 -4 -52 51 -219 34 -102
60 -188 57 -190 -3 -3 -14 -1 -25 5 -45 24 -149 32 -222 17 -96 -20 -162 -58
-246 -141 -141 -140 -201 -345 -211 -730 -5 -186 -4 -202 13 -219 17 -17 33
-18 219 -13 385 10 589 69 731 211 154 154 190 333 104 515 l-29 61 92 1 c51
0 143 4 205 8 109 7 114 8 145 39 27 28 32 39 32 82 0 43 -5 54 -33 82 l-33
33 -155 -2 -154 -2 19 27 c204 290 201 284 201 327 0 96 -104 151 -185 99 -11
-7 -67 -81 -125 -163 -58 -83 -108 -147 -111 -143 -4 4 -21 52 -39 107 -66
202 -90 255 -124 276 -30 18 -75 23 -106 12z m-130 -742 c40 -40 48 -76 24
-120 -38 -70 -175 -114 -210 -67 -32 44 -3 151 51 194 41 33 99 30 135 -7z
m260 -266 c62 -32 80 -107 38 -160 -43 -54 -150 -83 -194 -51 -44 33 -6 167
59 206 38 24 59 25 97 5z m-394 -156 c59 -56 38 -140 -47 -183 -92 -46 -159
-26 -159 47 0 45 46 134 78 152 36 20 98 12 128 -16z"/>
          <path d="M2445 4452 c-28 -10 -96 -43 -151 -75 -111 -63 -123 -65 -240 -41
-185 38 -291 -10 -389 -179 -64 -111 -136 -156 -252 -157 -95 0 -166 -31 -239
-104 -49 -50 -63 -72 -78 -121 -38 -132 -77 -172 -205 -211 -76 -23 -91 -32
-146 -87 -77 -78 -105 -144 -105 -252 0 -120 -21 -153 -133 -212 -117 -62
-179 -162 -180 -293 -1 -88 24 -158 79 -219 l44 -49 190 -803 c138 -581 197
-814 214 -843 34 -58 93 -111 151 -138 l50 -23 1793 -3 1792 -2 0 240 0 240
-1659 0 c-1572 0 -1660 1 -1665 18 -3 9 -77 327 -166 705 l-161 689 37 68 c82
151 256 370 464 584 359 369 755 674 1107 850 61 31 100 57 115 79 12 17 50
61 85 97 l62 66 -29 51 c-35 60 -79 97 -150 124 -63 24 -167 25 -235 1z"/>
          <path d="M2465 3684 c-249 -156 -478 -344 -750 -618 -204 -205 -327 -348 -425
-495 l-48 -72 12 -47 12 -47 275 -5 c267 -5 275 -6 307 -28 44 -32 63 -72 74
-159 17 -144 81 -252 173 -294 86 -39 196 -16 249 53 38 51 47 84 56 201 10
126 34 181 90 210 31 15 60 17 242 15 227 -3 232 -5 282 -72 20 -26 21 -45 26
-289 6 -297 8 -307 86 -376 98 -86 236 -80 324 15 22 24 46 56 53 72 7 17 13
118 17 289 6 288 5 286 74 337 27 20 40 21 522 24 l494 3 17 25 c12 19 14 32
7 49 -5 13 -173 163 -373 334 l-364 311 -46 -43 c-109 -102 -285 -167 -576
-214 -86 -14 -171 -18 -392 -18 -269 0 -283 1 -309 21 -15 11 -32 34 -37 50
-4 16 -11 137 -14 269 -5 214 -3 256 17 393 12 85 20 155 18 158 -3 2 -45 -21
-93 -52z"/>
          <path d="M4095 1906 c-94 -41 -124 -168 -58 -247 47 -56 67 -59 348 -59 l255
0 0 160 0 160 -257 0 c-192 -1 -266 -4 -288 -14z"/>
          <path d="M1420 1753 c0 -4 16 -77 36 -161 l36 -153 163 3 c147 3 166 5 191 24
53 39 69 71 69 134 0 63 -16 95 -69 134 -25 19 -44 21 -227 24 -109 2 -199 0
-199 -5z"/>
        </g>
      </svg>
      <span class="brand-title">THE CHEESECAKE PROJECT</span>
    </a>
    <span class="brand-tagline">— notes on ML, DL &amp; AI safety, as I learn them —</span>
  `;

  const STATUS_HTML = `
    <h3>Status</h3>
    <p><span class="status-dot"></span>Currently learning: Scikit-learn</p>
    <p>Applying to AI Safety Master's programs.</p>
  `;

  const UPDATES_HTML = `
    <h3>Recent updates</h3>
    <ul>
      <li><a href="faq.html">FAQ page added</a></li>
      <li><a href="home.html">Foundations page added</a></li>
    </ul>
  `;

  const FOOTER_TEXT = 'built page by page, in public';

  function slugifyId(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  class NotebookPage extends HTMLElement {
    connectedCallback() {
      const active = this.getAttribute('active') || 'home';

      // Split this element's original children into: sticky notes
      // (go to the right margin) and everything else (stays as the
      // main page content), in the order they were written.
      const children = Array.from(this.children);
      const stickies = children.filter(el =>
        el.classList.contains('sticky') && !el.classList.contains('inline')
      );
      const mainContent = children.filter(el =>
        !el.classList.contains('sticky') || el.classList.contains('inline')
      );

      // Auto-build the "On this page" list from any <h2> in the content.
      const toc = mainContent
        .filter(el => el.tagName === 'H2')
        .map(h2 => {
          if (!h2.id) h2.id = slugifyId(h2.textContent);
          return { id: h2.id, text: h2.textContent };
        });

      // --- masthead --------------------------------------------------
      const masthead = document.createElement('header');
      masthead.className = 'masthead';
      masthead.innerHTML = BRAND_HTML;

      // --- tabs --------------------------------------------------------
      const nav = document.createElement('nav');
      nav.className = 'tabs';
      nav.innerHTML = TABS.map(t =>
        `<a class="tab${t.slug === active ? ' active' : ''}" href="${t.href}">${t.label}</a>`
      ).join('');

      // --- left margin ---------------------------------------------
      const marginLeft = document.createElement('aside');
      marginLeft.className = 'margin-left';
      marginLeft.innerHTML =
        `<div class="margin-block">${STATUS_HTML}</div>` +
        `<div class="margin-block">${UPDATES_HTML}</div>` +
        (toc.length
          ? `<div class="margin-block"><h3>On this page</h3><ul>${
              toc.map(t => `<li><a href="#${t.id}">${t.text}</a></li>`).join('')
            }</ul></div>`
          : '');

      // --- main content ----------------------------------------------
      const main = document.createElement('main');
      main.className = 'page-content';
      mainContent.forEach(el => main.appendChild(el));

      // --- right margin (sticky notes) --------------------------------
      const marginRight = document.createElement('aside');
      marginRight.className = 'margin-right';
      stickies.forEach(el => marginRight.appendChild(el));

      // --- assemble ----------------------------------------------------
      const notebook = document.createElement('div');
      notebook.className = 'notebook';
      notebook.append(marginLeft, main, marginRight);

      const wrap = document.createElement('div');
      wrap.className = 'notebook-wrap';
      wrap.append(nav, notebook);

      const footer = document.createElement('footer');
      footer.textContent = FOOTER_TEXT;

      // Replace this custom element in place with the full shell.
      document.body.insertBefore(masthead, this);
      document.body.insertBefore(wrap, this);
      document.body.insertBefore(footer, this);
      this.remove();

      // Align any anchored sticky notes to the paragraph they reference.
      requestAnimationFrame(() => positionAnchoredNotes(marginRight, main));
      window.addEventListener('resize', () => positionAnchoredNotes(marginRight, main));
    }
  }

  // Sticky notes with data-anchor="some-id" get pinned to the vertical
  // position of the element with that id, instead of just stacking in
  // source order. Only applies when the notebook is actually laid out
  // as columns (checked by comparing real positions, not a guessed
  // width number, so it can't drift out of sync with the CSS breakpoint).
  function positionAnchoredNotes(marginRight, main) {
    const isMultiColumn =
      marginRight.getBoundingClientRect().left > main.getBoundingClientRect().left;

    if (!isMultiColumn) {
      Array.from(marginRight.querySelectorAll('.sticky')).forEach(n => {
        n.style.position = '';
        n.style.top = '';
        n.style.left = '';
        n.style.right = '';
      });
      marginRight.style.position = '';
      return;
    }

    const anchored = Array.from(marginRight.querySelectorAll('.sticky[data-anchor]'));
    if (!anchored.length) return;

    marginRight.style.position = 'relative';
    const containerTop = marginRight.getBoundingClientRect().top;

    const placements = anchored
      .map(note => {
        const anchor = document.getElementById(note.getAttribute('data-anchor'));
        if (!anchor) return null; // bad/typo'd data-anchor — leave this note in normal flow
        return { note, desiredTop: anchor.getBoundingClientRect().top - containerTop };
      })
      .filter(Boolean)
      .sort((a, b) => a.desiredTop - b.desiredTop);

    let lastBottom = 0;
    placements.forEach(({ note, desiredTop }) => {
      const top = Math.max(desiredTop, lastBottom + 8);
      note.style.position = 'absolute';
      note.style.top = top + 'px';
      note.style.left = '0';
      note.style.right = '0';
      lastBottom = top + note.offsetHeight + 8;
    });
  }

  customElements.define('notebook-page', NotebookPage);

})();