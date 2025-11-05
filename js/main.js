(function(){
  const root = document.documentElement;
  const isFile = location.protocol === 'file:';
  const $ = (sel, p=document) => p.querySelector(sel);
  const $$ = (sel, p=document) => Array.from(p.querySelectorAll(sel));

  // i18n
  let currentLang = (function(){ try{return localStorage.getItem('lang')||'tr'}catch{return 'tr'}})();
  const i18n = {
    tr: {
      'brand.subtitle': 'Bilgisayar Mühendisi Adayı',
      'nav.about': 'Hakkımda',
      'nav.skills': 'Yetenekler',
      'nav.projects': 'Projeler',
      'nav.contact': 'İletişim',

      'hero.hi': 'Merhaba, ben',
      'hero.lead': 'Bilgisayar mühendisliği son sınıf öğrencisiyim. Modern web ve yapay zekâ odaklı projeler geliştiriyorum. Bu sitede hedeflerimi, yetkinliklerimi ve detaylı proje anlatımlarımı bulabilirsiniz.',
      'hero.cta.projects': 'Projelerimi Gör',
      'hero.cta.contact': 'İletişime Geç',
      'hero.fact.goal': '🚀 Hedef: Backend + AI ürün geliştirme',
      'hero.fact.interest': '🎯 İlgi: MLOps, Bulut, Dağıtık Sistemler',

      'about.h2': 'Hakkımda',
      'about.p': 'Yazılım geliştirmeyi, özellikle problem çözme ve yaratıcı düşünme yönleriyle tutkuyla seviyorum. Takım çalışmasına uyum sağlayan, kod kalitesine ve dokümantasyona önem veren bir geliştiriciyim. Bitirme projemde, yapay zekanın kendi kendine öğrendiği bir Flappy Bird oyunu geliştiriyorum; bu süreç bana hem algoritma tasarımını hem de derin öğrenmenin gerçek dünya uygulamalarını deneyimleme fırsatı sunuyor. Yeni teknolojileri keşfetmek ve öğrendiklerimi projelere dönüştürmek motivasyonumun en büyük kaynağı.',
      'about.stat.projects': 'Proje',
      'about.stat.published': 'Yayınlanan Repo',
      'about.stat.loc': 'Kod Satırı',
      'about.goals.h3': 'Kısa ve Uzun Vadeli Hedefler',
      'about.goals.s1': 'Kısa vadede üretimde çalışan bir servise katkı sağlamak',
      'about.goals.s2': 'Orta vadede ölçeklenebilir mimariler tasarlamak',
      'about.goals.s3': 'Uzun vadede ürün ve ekip liderliği',

      'skills.h2': 'Yetenekler',
      'level.advanced': 'İleri',
      'level.intermediatePlus': 'Orta‑İleri',
      'level.intermediate': 'Orta',

      'projects.h2': 'Projeler',
      'projects.sub': 'Her kart tıklanınca özet, görseller, teknoloji etiketleri ve küçük bir grafik ile detaylar açılır.',

      'contact.h2': 'İletişim',
      'contact.p': 'Proje veya iş birliği için benimle iletişime geçebilirsiniz.',
      'cv.download': "CV'yi İndir",
      'footer.rights': 'Tüm hakları saklıdır.',
      'footer.back': 'Yukarı çık ↑',

      'btn.details': 'Detayları Gör',
      'btn.source': 'Kaynak Kod',
      'btn.demo': 'Demo',
      'btn.liveDemo': 'Canlı Demo',

      'modal.close': 'Kapat',
      'modal.titlePlaceholder': 'Proje Başlığı',
      'modal.descPlaceholder': 'Proje açıklaması burada.',
      'chart.metrics': 'Metrikler',
    },
    en: {
      'brand.subtitle': 'Computer Engineering Student',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',

      'hero.hi': "Hi, I'm",
      'hero.lead': 'I am a senior computer engineering student. I build modern web and AI‑focused projects. Here you can find my goals, skills, and detailed project write‑ups.',
      'hero.cta.projects': 'View Projects',
      'hero.cta.contact': 'Contact Me',
      'hero.fact.goal': '🚀 Goal: Backend + AI product development',
      'hero.fact.interest': '🎯 Interest: MLOps, Cloud, Distributed Systems',

      'about.h2': 'About',
      'about.p': 'I’m passionate about software development—especially problem solving and creative thinking. I value code quality and documentation and work well in teams. In my capstone, I’m building a Flappy Bird agent that learns by itself; it’s a great way to practice algorithm design and real‑world deep learning. Exploring new tech and turning what I learn into projects is my biggest motivation.',
      'about.stat.projects': 'Projects',
      'about.stat.published': 'Published Repos',
      'about.stat.loc': 'Lines of Code',
      'about.goals.h3': 'Short and Long‑Term Goals',
      'about.goals.s1': 'Contribute to a production service (short term)',
      'about.goals.s2': 'Design scalable architectures (mid term)',
      'about.goals.s3': 'Product and team leadership (long term)',

      'skills.h2': 'Skills',
      'level.advanced': 'Advanced',
      'level.intermediatePlus': 'Intermediate+',
      'level.intermediate': 'Intermediate',

      'projects.h2': 'Projects',
      'projects.sub': 'Click any card to see details with summary, images, tech tags, and a small chart.',

      'contact.h2': 'Contact',
      'contact.p': 'Feel free to reach out for projects or collaboration.',
      'cv.download': 'Download CV',
      'footer.rights': 'All rights reserved.',
      'footer.back': 'Back to top ↑',

      'btn.details': 'View Details',
      'btn.source': 'Source Code',
      'btn.demo': 'Demo',
      'btn.liveDemo': 'Live Demo',

      'modal.close': 'Close',
      'modal.titlePlaceholder': 'Project Title',
      'modal.descPlaceholder': 'Project description goes here.',
      'chart.metrics': 'Metrics',
    }
  };
  function t(key){
    return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.tr && i18n.tr[key]) || key;
  }
  function setLanguage(lang){
    currentLang = lang === 'en' ? 'en' : 'tr';
    try{ localStorage.setItem('lang', currentLang); }catch{}
    try{ document.documentElement.setAttribute('lang', currentLang);}catch{}
    // Update static i18n nodes
    $$('[data-i18n]').forEach(node=>{
      const key = node.getAttribute('data-i18n');
      const attr = node.getAttribute('data-i18n-attr');
      const val = t(key);
      if(attr){ node.setAttribute(attr, val); }
      else { node.textContent = val; }
    });
    // Update language toggle text
    const lt = $('#langToggle');
    if(lt) lt.textContent = currentLang.toUpperCase();
    // Update dynamic content that depends on language
    initProjects();
  }
  function toggleLanguage(){ setLanguage(currentLang === 'tr' ? 'en' : 'tr'); }

  // Theme
  function setTheme(t){
    if(t === 'light') root.classList.add('light');
    else root.classList.remove('light');
    try{localStorage.setItem('theme', t);}catch{}
    $('#themeToggle').textContent = root.classList.contains('light') ? '🌙' : '☀️';
  }
  function toggleTheme(){ setTheme(root.classList.contains('light') ? 'dark' : 'light'); }

  // Nav
  function initNav(){
    const btn = $('.nav-toggle');
    const list = $('#nav-list');
    btn?.addEventListener('click', ()=>{
      const open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    // Active link on scroll
    const links = $$('#nav-list a');
    const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const id = '#' + e.target.id;
          links.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===id));
        }
      })
    }, {rootMargin:'-40% 0px -50% 0px', threshold:[0,1]});
    sections.forEach(s=>io.observe(s));
  }

  // Projects
  async function loadProjects(){
    // Prefer external when served via http, else fallback to inline JSON
    try{
      if(!isFile){
        const resp = await fetch('data/projects.json', {cache:'no-cache'});
        if(resp.ok){
          const d = await resp.json();
          return d.projects || [];
        }
      }
    }catch{}
    // Fallback inline
    try{
      const json = JSON.parse($('#project-data')?.textContent || '{}');
      return json.projects || [];
    }catch{ return []; }
  }

  function localizeField(val){
    if(val && typeof val === 'object' && (val.tr || val.en)){
      return val[currentLang] || val.tr || val.en || '';
    }
    return val;
  }

  function translateMetricLabel(label){
    if(currentLang === 'tr') return label;
    const map = {
      'Ortalama Ödül': 'Average Reward',
      'Medyan Ödül': 'Median Reward',
      'Std Sapma': 'Std Dev',
      'Minimum Ödül': 'Min Reward',
      'Maksimum Ödül': 'Max Reward',
      'En İyi Episode': 'Best Episode',
      'En Kötü Episode': 'Worst Episode',
      'Kategoriler': 'Categories',
      'Scraping Yöntemi': 'Scraping Method',
      'Frontend Fonksiyon': 'Frontend Functions',
      'CSS Animasyon': 'CSS Animation',
      'Başarı Oranı': 'Success Rate',
      'Çeşitlilik': 'Diversity',
      'Yanıt Hızı': 'Response Speed',
      'Benzerlik': 'Similarity'
    };
    return map[label] || label;
  }

  function projectCard(p){
    const el = document.createElement('article');
    el.className = 'project-card';
    const title = localizeField(p.title);
    const summary = localizeField(p.summary)||'';
    el.innerHTML = `
      <img class="project-thumb" src="${(p.images&&p.images[0])||'assets/placeholder.svg'}" alt="${title}"/>
      <div class="project-body">
        <h3 class="project-title">${title}</h3>
        <p class="project-summary">${summary}</p>
        <div class="chip-list">${(p.tags||[]).slice(0,4).map(t=>`<span class='chip'>${t}</span>`).join('')}</div>
        <div class="project-actions">
          <button class="btn outline" data-id="${p.id}">${t('btn.details')}</button>
          ${p.links?.repo ? `<a class="btn tiny outline" href="${p.links.repo}" target="_blank" rel="noopener">${t('btn.source')}</a>` : ''}
          ${p.links?.demo ? `<a class="btn tiny primary" href="${p.links.demo}" target="_blank" rel="noopener">${t('btn.demo')}</a>` : ''}
        </div>
      </div>`;
    el.querySelector('button').addEventListener('click', (e)=>{ e.stopPropagation(); openModal(p); });
    // Allow clicking anywhere except links/buttons to open modal
    el.addEventListener('click', (e)=>{ const t = e.target.tagName; if(t!=='BUTTON' && t!=='A') openModal(p); });
    // Ensure links don't trigger modal
    el.querySelectorAll('a').forEach(a=> a.addEventListener('click', (e)=> e.stopPropagation()));
    return el;
  }

  let chart;
  function openModal(p){
    const dlg = $('#projectModal');
    const img = $('#modalImage');
    const thumbs = $('#modalThumbs');
    const title = $('#modalTitle');
    const desc = $('#modalDesc');
    const tags = $('#modalTags');
    const links = $('#modalLinks');
    const chartBox = $('.chart-box');

  title.textContent = localizeField(p.title) || t('modal.titlePlaceholder');
  desc.textContent = localizeField(p.description) || localizeField(p.summary) || t('modal.descPlaceholder');
  img.src = (p.images && p.images[0]) || 'assets/placeholder.svg';

    // Thumbs
    thumbs.innerHTML = '';
    (p.images||['assets/placeholder.svg']).forEach((src, i)=>{
      const t = document.createElement('img');
      t.src = src; t.alt = p.title + ' görsel ' + (i+1);
      if(i===0) t.classList.add('active');
      t.addEventListener('click', ()=>{
        $$('.modal-thumbs img', thumbs).forEach(x=>x.classList.remove('active'));
        t.classList.add('active');
        img.src = src;
      })
      thumbs.appendChild(t);
    });

    // Tags
    tags.innerHTML = (p.tags||[]).map(t=>`<span class='chip'>${t}</span>`).join('');

    // Links
    const parts = [];
  if(p.links?.repo) parts.push(`<a class='btn outline' href='${p.links.repo}' target='_blank' rel='noopener'>${t('btn.source')}</a>`);
  if(p.links?.demo) parts.push(`<a class='btn primary' href='${p.links.demo}' target='_blank' rel='noopener'>${t('btn.liveDemo')}</a>`);
    links.innerHTML = parts.join(' ');

    // Chart
    if(chart){ chart.destroy(); chart = null; }
    if(p.metrics && Object.keys(p.metrics).length){
      chartBox.style.display = 'block';
      const ctx = $('#modalChart');
  const labels = Object.keys(p.metrics).map(translateMetricLabel);
      const data = Object.values(p.metrics);
      // Determine dynamic tick step for large ranges
      const maxVal = Math.max(...data.map(v=> typeof v === 'number' ? v : Number(v)));
      const ticks = { color: getComputedStyle(document.documentElement).getPropertyValue('--muted') };
      if(maxVal <= 200){ ticks.stepSize = 20; }

      chart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ label: t('chart.metrics'), data, backgroundColor: 'rgba(100, 149, 237, 0.6)'}] },
        options: { responsive: true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true, ticks}} }
      });
    } else {
      chartBox.style.display = 'none';
    }

    if(typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open','');
  }

  function closeModal(){
    const dlg = $('#projectModal');
    if(chart){ chart.destroy(); chart = null; }
    dlg?.close?.();
  }

  function initModal(){
    const closeBtn = $('#projectModal .modal-close');
    if(closeBtn){
      closeBtn.addEventListener('click', closeModal);
      closeBtn.setAttribute('aria-label', t('modal.close'));
    }
    $('#projectModal .modal-backdrop')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ closeModal(); }});
  }

  async function initProjects(){
    const grid = $('#projectGrid');
    grid.innerHTML = '';
    const projects = await loadProjects();
    if(!projects.length){
      grid.innerHTML = `<p class="muted">${currentLang==='tr'?'Henüz proje eklenmedi.':'No projects yet.'}</p>`;
      return;
    }
    projects.forEach(p=> grid.appendChild(projectCard(p)));
  }

  function initFooter(){ $('#year').textContent = new Date().getFullYear(); }

  // Boot
  document.addEventListener('DOMContentLoaded', ()=>{
    const saved = (function(){ try{return localStorage.getItem('theme')||'dark'}catch{return 'dark'}})();
    setTheme(saved);
    $('#themeToggle').addEventListener('click', toggleTheme);
    // language
    $('#langToggle')?.addEventListener('click', toggleLanguage);
    setLanguage(currentLang);
    initNav();
    initModal();
    initFooter();
  });
})();
