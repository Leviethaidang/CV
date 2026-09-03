const empireTechnicalParams = new URLSearchParams(location.search);
const empireTechnicalPage = document.querySelector('[data-project-page="empire-run-technical"]');
const isEmpireTechnical = empireTechnicalParams.get('project') === 'empire-run'
  && empireTechnicalParams.get('subproject') === '1-1';

if (empireTechnicalPage) {
  empireTechnicalPage.hidden = !isEmpireTechnical;
}

function updateEmpireTechnicalMetadata() {
  if (!isEmpireTechnical) return;
  document.title = 'Empire Run Technical Deep Dive';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = 'An engineering deep dive into Empire Run architecture, simulation, logistics, persistence and online systems.';
  }
}

updateEmpireTechnicalMetadata();
