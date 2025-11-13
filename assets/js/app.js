/* Interactive functionality for PeaceFront site */
(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  // Active nav link highlight (multi-page)
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((current === '' && href === 'index.html') || current === href) {
      a.classList.add('active');
    }
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open.toString());
    });
  }

  // Theme persistence
  const THEME_KEY = 'peace_theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle?.setAttribute('aria-pressed', 'true');
  }
  themeToggle?.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-theme');
    themeToggle.setAttribute('aria-pressed', dark.toString());
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  });

  /* Quiz Logic */
  const quizForm = document.getElementById('peaceQuiz');
  const quizResult = document.getElementById('quizResult');
  if (quizForm && quizResult) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(quizForm);
      const answers = ['q1','q2','q3','q4','q5'].map(q => data.get(q));
      if (answers.some(a => !a)) {
        quizResult.textContent = 'Please answer all questions.';
        return;
      }
      const tally = { A:0, B:0, C:0, D:0 };
      answers.forEach(a => { tally[a]++; });
      // Determine highest
      const entries = Object.entries(tally).sort((a,b) => b[1]-a[1]);
      const topScore = entries[0][1];
      const topLetters = entries.filter(e => e[1] === topScore).map(e => e[0]);

      const profiles = {
        A: { title:'🌸 The Empathic Healer', desc:'You build peace through compassion and understanding. You heal wounds of hate with kindness.', traits:'Empathy · Forgiveness · Patience' },
        B: { title:'🦁 The Courageous Activist', desc:'You lead with conviction and speak truth to power. You believe peace needs brave voices.', traits:'Justice · Leadership · Bravery' },
        C: { title:'🎨 The Creative Unifier', desc:'You use art, education, or expression to unite others and spread hope.', traits:'Creativity · Joy · Collaboration' },
        D: { title:'🕯️ The Mindful Mediator', desc:'You bring calm and wisdom into conflict. You help others find balance and perspective.', traits:'Reflection · Self-Control · Peace' }
      };

      let outputHtml = '';
      if (topLetters.length === 1) {
        const p = profiles[topLetters[0]];
        outputHtml = `<h3>${p.title}</h3><p>${p.desc}</p><p class="traits"><strong>Traits:</strong> ${p.traits}</p>`;
      } else {
        // Hybrid result
        const mergedTitles = topLetters.map(l => profiles[l].title.split(' ').slice(1).join(' ')).join(' + ');
        outputHtml = `<h3>Hybrid Peacebuilder (${topLetters.join(' / ')})</h3><p>You show a blended style: ${topLetters.map(l => profiles[l].title).join(', ')}.</p>`;
        outputHtml += '<ul class="hybrid-list">' + topLetters.map(l => `<li><strong>${profiles[l].title}:</strong> ${profiles[l].desc}</li>`).join('') + '</ul>';
      }
      outputHtml += '<p class="reminder">Every act of kindness is a step toward a more ethical world.</p>';
      quizResult.innerHTML = outputHtml;
      quizResult.focus();
    });
  }

  /* Peace Pledge */
  const pledgeForm = document.getElementById('pledgeForm');
  const pledgeInput = document.getElementById('pledgeName');
  const pledgeList = document.getElementById('pledgeList');
  const PLEDGE_KEY = 'peace_pledges';

  function renderPledges() {
    if (!pledgeList) return;
    const pledges = JSON.parse(localStorage.getItem(PLEDGE_KEY) || '[]');
    pledgeList.innerHTML = pledges.map(name => `<li>${escapeHtml(name)}</li>`).join('');
  }
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  }
  renderPledges();

  pledgeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = pledgeInput.value.trim();
    if (name.length < 2) {
      pledgeInput.focus();
      return;
    }
    const pledges = JSON.parse(localStorage.getItem(PLEDGE_KEY) || '[]');
    if (!pledges.includes(name)) {
      pledges.push(name);
      localStorage.setItem(PLEDGE_KEY, JSON.stringify(pledges));
      renderPledges();
    }
    pledgeInput.value = '';
  });

  /* Student Contributions */
  const contribForm = document.getElementById('contributionForm');
  const contribGallery = document.getElementById('contribGallery');
  const CONTRIB_KEY = 'peace_contributions';

  function renderContributions() {
    if (!contribGallery) return;
    const items = JSON.parse(localStorage.getItem(CONTRIB_KEY) || '[]');
    contribGallery.innerHTML = items.map(item => {
      const imgPart = item.image ? `<img src="${item.image}" alt="Student submitted ${escapeHtml(item.type)} image" loading="lazy" />` : '';
      return `<div class="gallery-item"><span class="type-tag">${escapeHtml(item.type)}</span>${imgPart}<p>${escapeHtml(item.text)}</p></div>`;
    }).join('');
  }
  renderContributions();

  contribForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const typeEl = document.getElementById('contribType');
    const textEl = document.getElementById('contribText');
    const imgEl = document.getElementById('contribImage');
    const type = typeEl.value.trim();
    const text = textEl.value.trim();
    if (!type || !text) return;
    const reader = new FileReader();
    const addItem = (dataUrl) => {
      const items = JSON.parse(localStorage.getItem(CONTRIB_KEY) || '[]');
      items.push({ type, text, image: dataUrl });
      localStorage.setItem(CONTRIB_KEY, JSON.stringify(items));
      renderContributions();
      typeEl.value=''; textEl.value=''; imgEl.value='';
    };
    if (imgEl.files && imgEl.files[0]) {
      reader.onload = () => addItem(reader.result);
      reader.readAsDataURL(imgEl.files[0]);
    } else { addItem(null); }
  });

  // Keyboard accessibility for back-to-top link focusing sections
  const focusHash = () => {
    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) target.setAttribute('tabindex','-1'), target.focus();
    }
  };
  window.addEventListener('hashchange', focusHash);

})();
