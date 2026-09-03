

const shorturlTechnicalParams = new URLSearchParams(location.search);
const shorturlTechnicalPage = document.querySelector('[data-project-page="shorturl-technical"]');
const isShorturlTechnicalPage = shorturlTechnicalParams.get("project") === "shorturl"
  && shorturlTechnicalParams.get("subproject") === "2-1";

if (shorturlTechnicalPage) {
  shorturlTechnicalPage.hidden = !isShorturlTechnicalPage;
}

function updateShorturlTechnicalMetadata() {
  if (!isShorturlTechnicalPage) return;
  document.title = "ShortURL Technical Deep Dive";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = "ShortURL technical deep dive covering Base62 generation, cache-aside resolution, ECS Fargate, RDS MySQL, ElastiCache Valkey and CloudFormation.";
  }
}

updateShorturlTechnicalMetadata();
