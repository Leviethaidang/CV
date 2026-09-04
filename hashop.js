

const hashopPage = document.querySelector('[data-project-page="hashop"]');
const hashopProjectSlug = new URLSearchParams(window.CVRoute.params).get("project");
const hashopSubprojectSlug = new URLSearchParams(window.CVRoute.params).get("subproject");
const isHashopOverview = hashopProjectSlug === "hashop" && !hashopSubprojectSlug;

if (hashopPage) {
  hashopPage.hidden = !isHashopOverview;
}

function updateHashopMetadata() {
  if (!isHashopOverview) return;
  document.title = "HaShop | Highlighted Projects";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = "HaShop — an e-commerce microservices platform deployed on AWS ECS Fargate with CloudFormation.";
  }
}

updateHashopMetadata();
