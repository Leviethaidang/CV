(function (root) {
  const pages = [
    { path: 'personalinformation/', title: 'Personal Information' },
    { path: 'HighlightedProjects/EmpireRun/', project: 'empire-run', page: 'empire-run', title: 'Empire Run | Highlighted Projects' },
    { path: 'HighlightedProjects/EmpireRun/TechnicalDeepDive/', project: 'empire-run', subproject: '1-1', page: 'empire-run-technical', title: 'Empire Run Technical Deep Dive' },
    { path: 'HighlightedProjects/EmpireRun/QARetrospective/', project: 'empire-run', subproject: '1-2', page: 'empire-run-testing', title: 'Empire Run QA Retrospective' },
    { path: 'HighlightedProjects/ShortURL/', project: 'shorturl', page: 'shorturl', title: 'ShortURL | Highlighted Projects' },
    { path: 'HighlightedProjects/ShortURL/TechnicalDeepDive/', project: 'shorturl', subproject: '2-1', page: 'shorturl-technical', title: 'ShortURL Technical Deep Dive' },
    { path: 'HighlightedProjects/ShortURL/ManualAPITesting/', project: 'shorturl', subproject: '2-2', page: 'shorturl-testing', title: 'ShortURL Manual API Testing' },
    { path: 'HighlightedProjects/HaShop/', project: 'hashop', page: 'hashop', title: 'HaShop | Highlighted Projects' },
    { path: 'HighlightedProjects/HaShop/TechnicalDeepDive/', project: 'hashop', subproject: '3-1', page: 'hashop-technical', title: 'HaShop Technical Deep Dive' },
    { path: 'HighlightedProjects/HaShop/ReproductionGuide/', project: 'hashop', subproject: '3-2', page: 'hashop-reproduction', title: 'HaShop Deployment Guide' },
    { path: 'HighlightedProjects/HaShop/QualityEngineering/', project: 'hashop', subproject: '3-3', page: 'hashop-testing', title: 'HaShop Quality Engineering' },
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = pages;
    return;
  }

  const base = new URL('.', document.currentScript.src);
  const relativePath = location.pathname.slice(base.pathname.length).replace(/index\.html$/, '');
  const current = pages.find(page => page.path === relativePath);
  const params = new URLSearchParams();
  if (current?.project) {
    params.set('section', '2');
    params.set('project', current.project);
    if (current.subproject) params.set('subproject', current.subproject);
  }
  const guide = new URLSearchParams(location.search).get('guide');
  if (guide) params.set('guide', guide);
  root.CVRoute = { pages, current, params, base };

  // A base element keeps shared assets independent of page depth. Fragment
  // links created by the case-study scripts must still target the current page.
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.href = location.pathname + location.search + link.getAttribute('href');
    });
  });
})(typeof window === 'undefined' ? globalThis : window);
