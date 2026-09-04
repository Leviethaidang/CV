const empireOverviewParams = new URLSearchParams(window.CVRoute.params);
const empireOverviewPage = document.querySelector('[data-project-page="empire-run"]');
const isEmpireOverview = empireOverviewParams.get('project') === 'empire-run'
  && !empireOverviewParams.get('subproject');

if (empireOverviewPage) {
  empireOverviewPage.hidden = !isEmpireOverview;
}

function updateEmpireOverviewMetadata() {
  if (!isEmpireOverview) return;
  document.title = 'Empire Run | Highlighted Projects';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = 'Empire Run — a 2D city-building and resource-management simulation built with Unity and C#.';
  }
}

updateEmpireOverviewMetadata();
