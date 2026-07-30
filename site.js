const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
};

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!nav?.classList.contains('open')) return;
  if (!nav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: 0.1 })
  : null;

document.querySelectorAll('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('is-visible');
});

// Keep only one FAQ open at a time.
document.querySelectorAll('.faq-list details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('.faq-list details[open]').forEach(other => {
      if (other !== detail) other.open = false;
    });
  });
});

// Interactive app concept preview.
const previewCopy = {
  home: 'See what is happening today, continue your current Avi Trail, and find the next reason to show up locally.',
  explore: 'Browse verified partners, useful filters, Pride offers, accessibility details, and nearby welcoming places.',
  passport: 'Choose to scan at participating businesses, collect Avi stamps, and unlock limited local badges.',
  meetups: 'Discover all-ages and adult gatherings, RSVP, save dates, and receive timely reminders.'
};
const previewTabs = [...document.querySelectorAll('[data-preview-tab]')];
const previewPanels = [...document.querySelectorAll('[data-preview-panel]')];
const previewDescription = document.querySelector('[data-preview-description]');
const phoneNavItems = [...document.querySelectorAll('.phone-nav > span')];

const activatePreview = key => {
  previewTabs.forEach(tab => {
    const active = tab.dataset.previewTab === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  previewPanels.forEach(panel => {
    const active = panel.dataset.previewPanel === key;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
  if (previewDescription) previewDescription.textContent = previewCopy[key] || '';
  const navIndex = { home:0, explore:1, passport:2, meetups:3 }[key] ?? 0;
  phoneNavItems.forEach((item,index) => item.classList.toggle('active', index === navIndex));
};

previewTabs.forEach((tab,index) => {
  tab.addEventListener('click', () => activatePreview(tab.dataset.previewTab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let next=index;
    if (event.key==='ArrowRight') next=(index+1)%previewTabs.length;
    if (event.key==='ArrowLeft') next=(index-1+previewTabs.length)%previewTabs.length;
    if (event.key==='Home') next=0;
    if (event.key==='End') next=previewTabs.length-1;
    previewTabs[next].focus();
    activatePreview(previewTabs[next].dataset.previewTab);
  });
});

// Highlight current section in desktop navigation.
const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const observedSections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && observedSections.length) {
  const navObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach(link => link.setAttribute('aria-current', String(link.getAttribute('href') === `#${visible.target.id}`)));
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0,.15,.35] });
  observedSections.forEach(section => navObserver.observe(section));
}

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
