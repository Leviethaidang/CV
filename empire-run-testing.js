const empireTestingParams = new URLSearchParams(window.CVRoute.params);
const empireTestingPage = document.querySelector('[data-project-page="empire-run-testing"]');
const isEmpireTesting = empireTestingParams.get('project') === 'empire-run'
  && empireTestingParams.get('subproject') === '1-2';

if (empireTestingPage) {
  empireTestingPage.hidden = !isEmpireTesting;
}

function updateEmpireTestingMetadata() {
  if (!isEmpireTesting) return;
  document.title = 'Empire Run Testing | QA Retrospective';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = 'An Empire Run QA retrospective covering manual testing, reconstructed coverage, defect analysis and remaining evidence.';
  }
}

updateEmpireTestingMetadata();
