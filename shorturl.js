

const shorturlParams = new URLSearchParams(window.CVRoute.params);
const shorturlPage = document.querySelector('[data-project-page="shorturl"]');
const isShorturlPage = shorturlParams.get("project") === "shorturl"
  && !shorturlParams.get("subproject");

if (shorturlPage) {
  shorturlPage.hidden = !isShorturlPage;
}

function updateShorturlMetadata() {
  if (!isShorturlPage) return;
  document.title = "ShortURL | Project Overview";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = "ShortURL — a cache-aside URL shortener deployed with ECS Fargate, RDS MySQL, ElastiCache Valkey and CloudFormation.";
  }
}

updateShorturlMetadata();
