const search=document.getElementById('search'),links=[...document.querySelectorAll('.topics li')];function filter(){const q=search.value.toLowerCase().trim();links.forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(q))}search.addEventListener('input',filter);document.getElementById('clear-search').addEventListener('click',()=>{search.value='';filter();search.focus()});const selected=new URLSearchParams(location.search).get('section');if(selected)links[Number(selected)-1]?.querySelector('a')?.classList.add('active');const toggle=document.getElementById('menu-toggle'),sidebar=document.getElementById('sidebar'),overlay=document.getElementById('overlay');function menu(){sidebar.classList.toggle('open');overlay.classList.toggle('open')}toggle.addEventListener('click',menu);overlay.addEventListener('click',menu);
const currentProject=new URLSearchParams(location.search).get('project');if(currentProject){document.querySelector(`.project-submenu a[href*="project=${currentProject}"]`)?.classList.add('active')}
const projectNodes=[...document.querySelectorAll('.project-node')];
function setProjectNodeOpen(node,open){const button=node.querySelector(':scope > .project-entry .project-toggle');node.classList.toggle('expanded',open);button?.setAttribute('aria-expanded',String(open))}
document.querySelectorAll('.project-toggle').forEach(button=>button.addEventListener('click',()=>{const node=button.closest('.project-node');if(node)setProjectNodeOpen(node,!node.classList.contains('expanded'))}));
const activeProjectNode=projectNodes.find(node=>node.dataset.project===currentProject);
if(activeProjectNode){activeProjectNode.classList.add('current');setProjectNodeOpen(activeProjectNode,true)}
const currentSubproject=new URLSearchParams(location.search).get('subproject');
if(currentSubproject){document.querySelector(`.project-child-menu a[href*="subproject=${currentSubproject}"]`)?.classList.add('active')}

const projectEdgeNav = document.querySelector('.project-edge-nav');
const projectPrev = document.getElementById('project-prev');
const projectNext = document.getElementById('project-next');
const projectPages = [
  { project: 'empire-run', subproject: null, url: 'placeholder.html?section=2&project=empire-run' },
  { project: 'empire-run', subproject: '1-1', url: 'placeholder.html?section=2&project=empire-run&subproject=1-1' },
  { project: 'empire-run', subproject: '1-2', url: 'placeholder.html?section=2&project=empire-run&subproject=1-2' },
  { project: 'shorturl', subproject: null, url: 'placeholder.html?section=2&project=shorturl' },
  { project: 'shorturl', subproject: '2-1', url: 'placeholder.html?section=2&project=shorturl&subproject=2-1' },
  { project: 'shorturl', subproject: '2-2', url: 'placeholder.html?section=2&project=shorturl&subproject=2-2' },
  { project: 'hashop', subproject: null, url: 'placeholder.html?section=2&project=hashop' },
  { project: 'hashop', subproject: '3-1', url: 'placeholder.html?section=2&project=hashop&subproject=3-1' },
  { project: 'hashop', subproject: '3-2', url: 'placeholder.html?section=2&project=hashop&subproject=3-2' },
  { project: 'hashop', subproject: '3-3', url: 'placeholder.html?section=2&project=hashop&subproject=3-3' },
];
const currentProjectPageIndex = projectPages.findIndex(page => (
  page.project === currentProject && page.subproject === currentSubproject
));

if (projectEdgeNav && projectPrev && projectNext) {
  const hasProjectPage = currentProjectPageIndex >= 0;
  projectEdgeNav.hidden = !hasProjectPage;
  if (hasProjectPage) {
    projectPrev.href = currentProjectPageIndex === 0
      ? 'index.html'
      : projectPages[currentProjectPageIndex - 1].url;
    projectNext.href = currentProjectPageIndex === projectPages.length - 1
      ? 'index.html'
      : projectPages[currentProjectPageIndex + 1].url;
  }
}
