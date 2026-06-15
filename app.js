// ===== 机器学习复习 App =====
(function() {
  'use strict';

  // ===== 全局状态 =====
  const PROGRESS_KEY = 'ml-review-progress';
  let activeChapter = null;
  let progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');

  // ===== 初始化 =====
  function init() {
    buildNav();
    buildContent();
    bindEvents();
    updateProgressBar();

    // Render math after DOM is ready
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });

    // Navigate to landing or from hash
    const hash = window.location.hash.slice(1);
    if (hash && chapters.find(c => c.id === hash)) {
      navigateTo(hash);
    }
  }

  // ===== 构建导航 =====
  function buildNav() {
    const navList = document.getElementById('navList');
    navList.innerHTML = '';

    chapters.forEach(ch => {
      const li = document.createElement('li');
      const isDone = progress[ch.id] && progress[ch.id].done;
      li.innerHTML = `
        <div class="nav-item" data-chapter="${ch.id}">
          <span class="nav-priority ${ch.priority}"></span>
          <span>第${ch.num}章 ${ch.title}</span>
          ${isDone ? '<span class="nav-done">✓</span>' : ''}
        </div>
      `;
      navList.appendChild(li);
    });
  }

  // ===== 构建内容 =====
  function buildContent() {
    const wrapper = document.getElementById('contentWrapper');
    // 只移除动态生成的章节，保留首页 landing
    wrapper.querySelectorAll('.chapter-section:not(#landing)').forEach(el => el.remove());

    chapters.forEach(ch => {
      const section = document.createElement('section');
      section.className = 'chapter-section';
      section.id = ch.id;
      section.dataset.chapter = ch.id;

      let priorityBadge = '';
      if (ch.priority === 'high') priorityBadge = '<span class="badge priority-high">高优先级</span>';
      else if (ch.priority === 'low') priorityBadge = '<span class="badge priority-low">低优先级</span>';

      let cardsHtml = ch.sections.map((sec, idx) => {
        const tagClass = `tag-${sec.tag}` || 'tag-concept';
        const tagLabel = sec.tag || '概念';
        const cardId = `card-${ch.id}-${idx}`;
        const isCardDone = progress[ch.id] && progress[ch.id].cards && progress[ch.id].cards[idx];

        return `
        <div class="knowledge-card" id="${cardId}">
          <div class="card-header" data-card="${cardId}">
            <h3>
              <span class="card-tag ${tagClass}">${tagLabel}</span>
              ${sec.title}
            </h3>
            <span class="expand-icon">▼</span>
          </div>
          <div class="card-body">
            ${sec.content}
            <button class="mark-done-btn ${isCardDone ? 'done' : ''}" data-card="${cardId}" data-chapter="${ch.id}" data-index="${idx}">
              ${isCardDone ? '✅ 已掌握' : '📌 标记为已掌握'}
            </button>
          </div>
        </div>`;
      }).join('');

      section.innerHTML = `
        <div class="chapter-header">
          <h1>第${ch.num}章 ${ch.title}</h1>
          <div class="chapter-meta">
            ${priorityBadge}
            <span class="badge">${ch.num <= 4 ? '选择/判断' : ch.num >= 9 ? '选择/判断+简答' : '计算+简答'}</span>
            <span>${ch.sections.length} 个知识点</span>
          </div>
          <p class="chapter-desc">${ch.desc}</p>
        </div>
        ${cardsHtml}
      `;

      wrapper.appendChild(section);
    });
  }

  // ===== 事件绑定 =====
  function bindEvents() {
    // Sidebar navigation
    document.getElementById('navList').addEventListener('click', e => {
      const item = e.target.closest('.nav-item');
      if (item) {
        navigateTo(item.dataset.chapter);
        // Close sidebar on mobile
        document.getElementById('sidebar').classList.remove('open');
      }
    });

    // Card expand/collapse
    document.getElementById('contentWrapper').addEventListener('click', e => {
      const header = e.target.closest('.card-header');
      if (header) {
        const cardId = header.dataset.card;
        const card = document.getElementById(cardId);
        const body = card.querySelector('.card-body');
        const icon = header.querySelector('.expand-icon');
        const isOpen = body.classList.contains('open');

        if (isOpen) {
          body.classList.remove('open');
          icon.classList.remove('open');
        } else {
          body.classList.add('open');
          icon.classList.add('open');
        }
      }
    });

    // Mark as done
    document.getElementById('contentWrapper').addEventListener('click', e => {
      const btn = e.target.closest('.mark-done-btn');
      if (!btn) return;

      const chId = btn.dataset.chapter;
      const idx = parseInt(btn.dataset.index);

      if (!progress[chId]) progress[chId] = { done: false, cards: {} };
      const wasDone = progress[chId].cards[idx];

      if (wasDone) {
        delete progress[chId].cards[idx];
        btn.classList.remove('done');
        btn.textContent = '📌 标记为已掌握';
      } else {
        progress[chId].cards[idx] = true;
        btn.classList.add('done');
        btn.textContent = '✅ 已掌握';
      }

      // Update chapter-level done
      const ch = chapters.find(c => c.id === chId);
      const totalCards = ch.sections.length;
      const doneCards = Object.keys(progress[chId].cards).length;
      progress[chId].done = doneCards === totalCards;

      saveProgress();
      updateProgressBar();
      buildNav();
    });

    // Main menu toggle (mobile)
    document.getElementById('menuToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });

    // Reset progress
    document.getElementById('resetProgress').addEventListener('click', () => {
      if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
        progress = {};
        saveProgress();
        updateProgressBar();
        buildNav();
        buildContent();
        // 回到首页
        activeChapter = null;
        history.pushState(null, null, '#');
        document.querySelectorAll('.chapter-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.getElementById('landing').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Back to top
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 500);
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Search
    const searchInput = document.getElementById('searchInput');
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => performSearch(searchInput.value.trim()), 300);
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
      }
      if (e.key === 'Escape') {
        document.getElementById('searchInput').value = '';
        clearHighlights();
      }
    });

    // Hash change
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash && chapters.find(c => c.id === hash)) {
        navigateTo(hash, false);
      }
    });
  }

  function bindDynamicEvents() {
    // Re-bind events after content rebuild (reset progress)
    // Most events are already delegated on #contentWrapper, so this is minimal
  }

  // ===== 导航 =====
  function navigateTo(chId, pushState = true) {
    // Hide all sections
    document.querySelectorAll('.chapter-section').forEach(s => s.classList.remove('active'));
    // Show target
    const target = document.getElementById(chId);
    if (target) {
      target.classList.add('active');
      activeChapter = chId;
      // Update nav active state
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.chapter === chId);
      });
      // Update URL
      if (pushState) {
        history.pushState(null, null, `#${chId}`);
      }
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ===== 进度 =====
  function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  function updateProgressBar() {
    const totalCards = chapters.reduce((sum, ch) => sum + ch.sections.length, 0);
    let doneCards = 0;
    for (const chId in progress) {
      doneCards += Object.keys(progress[chId].cards || {}).length;
    }
    const pct = totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressText').textContent = pct + '%';
  }

  // ===== 搜索 =====
  function performSearch(query) {
    clearHighlights();

    if (!query || query.length < 2) {
      // Show current chapter or landing
      if (activeChapter) {
        document.querySelectorAll('.chapter-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(activeChapter);
        if (target) target.classList.add('active');
      }
      return;
    }

    // Show all chapters for search
    document.querySelectorAll('.chapter-section').forEach(s => s.classList.add('active'));

    // Find and highlight matches
    const lowerQuery = query.toLowerCase();
    const allCards = document.querySelectorAll('.knowledge-card');
    let firstMatch = null;

    allCards.forEach(card => {
      const body = card.querySelector('.card-body');
      const text = body.textContent.toLowerCase();
      const match = text.includes(lowerQuery);

      if (match) {
        card.style.display = '';
        // Expand the card
        body.classList.add('open');
        card.querySelector('.expand-icon')?.classList.add('open');

        // Highlight matching text
        highlightText(body, query);

        if (!firstMatch) firstMatch = card;
      } else {
        // Check card title
        const header = card.querySelector('.card-header h3');
        const titleMatch = header && header.textContent.toLowerCase().includes(lowerQuery);
        if (titleMatch) {
          card.style.display = '';
          card.querySelector('.card-body').classList.add('open');
          card.querySelector('.expand-icon')?.classList.add('open');
          highlightText(header, query);
          if (!firstMatch) firstMatch = card;
        } else {
          card.style.display = 'none';
        }
      }
    });

    // Scroll to first match
    if (firstMatch) {
      setTimeout(() => firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }

  function highlightText(element, query) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
      const text = node.textContent;
      const lower = text.toLowerCase();
      const idx = lower.indexOf(query.toLowerCase());
      if (idx >= 0) {
        const span = document.createElement('span');
        span.innerHTML = text.substring(0, idx) +
          `<mark class="search-highlight">${text.substring(idx, idx + query.length)}</mark>` +
          text.substring(idx + query.length);
        node.parentNode.replaceChild(span, node);
      }
    });
  }

  function clearHighlights() {
    document.querySelectorAll('.search-highlight').forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
    document.querySelectorAll('.knowledge-card').forEach(c => c.style.display = '');

    // Reset to show only active chapter if there's one
    if (activeChapter && !document.getElementById('searchInput').value.trim()) {
      document.querySelectorAll('.chapter-section').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(activeChapter);
      if (target) target.classList.add('active');
    }
  }

  // ===== 全局函数 =====
  window.navigateTo = navigateTo;

  // ===== 启动（等待KaTeX加载完成） =====
  function waitForKatex(cb, maxWait) {
    maxWait = maxWait || 3000;
    var start = Date.now();
    function check() {
      if (typeof renderMathInElement !== 'undefined') { cb(); }
      else if (Date.now() - start < maxWait) { setTimeout(check, 50); }
      else { cb(); } // 超时也执行，只是数学公式可能不渲染
    }
    check();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForKatex(init);
    });
  } else {
    waitForKatex(init);
  }
})();
