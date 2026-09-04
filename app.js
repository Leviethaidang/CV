const search=document.getElementById('search'),links=[...document.querySelectorAll('.topics li')];function filter(){const q=search.value.toLowerCase().trim();links.forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(q))}search.addEventListener('input',filter);document.getElementById('clear-search').addEventListener('click',()=>{search.value='';filter();search.focus()});const selected=new URLSearchParams(window.CVRoute.params).get('section');if(selected)links[Number(selected)-1]?.querySelector('a')?.classList.add('active');const toggle=document.getElementById('menu-toggle'),sidebar=document.getElementById('sidebar'),overlay=document.getElementById('overlay');function menu(){sidebar.classList.toggle('open');overlay.classList.toggle('open')}toggle.addEventListener('click',menu);overlay.addEventListener('click',menu);
const currentProject=new URLSearchParams(window.CVRoute.params).get('project');
const projectNodes=[...document.querySelectorAll('.project-node')];
function setProjectNodeOpen(node,open){const button=node.querySelector(':scope > .project-entry .project-toggle');node.classList.toggle('expanded',open);button?.setAttribute('aria-expanded',String(open))}
document.querySelectorAll('.project-toggle').forEach(button=>button.addEventListener('click',()=>{const node=button.closest('.project-node');if(node)setProjectNodeOpen(node,!node.classList.contains('expanded'))}));
const activeProjectNode=projectNodes.find(node=>node.dataset.project===currentProject);
if(activeProjectNode){activeProjectNode.classList.add('current');setProjectNodeOpen(activeProjectNode,true);activeProjectNode.querySelector(':scope > .project-entry a')?.classList.add('active')}
const currentSubproject=new URLSearchParams(window.CVRoute.params).get('subproject');
if(currentSubproject){document.querySelector(`.project-child-menu a[href="${window.CVRoute.current.path}"]`)?.classList.add('active')}

const projectEdgeNav = document.querySelector('.project-edge-nav');
const projectPrev = document.getElementById('project-prev');
const projectNext = document.getElementById('project-next');
const projectPages = window.CVRoute.pages.filter(page => page.project).map(page => ({ ...page, subproject: page.subproject || null, url: page.path }));
const currentProjectPageIndex = projectPages.findIndex(page => (
  page.project === currentProject && page.subproject === currentSubproject
));

if (projectEdgeNav && projectPrev && projectNext) {
  const hasProjectPage = currentProjectPageIndex >= 0;
  projectEdgeNav.hidden = !hasProjectPage;
  if (hasProjectPage) {
    projectPrev.href = currentProjectPageIndex === 0
      ? 'personalinformation/'
      : projectPages[currentProjectPageIndex - 1].url;
    projectNext.href = currentProjectPageIndex === projectPages.length - 1
      ? 'personalinformation/'
      : projectPages[currentProjectPageIndex + 1].url;
  }
}
