

const hashopTechnicalParams = new URLSearchParams(location.search);
const hashopTechnicalPage = document.querySelector('[data-project-page="hashop-technical"]');
const isHashopTechnical = hashopTechnicalParams.get("project") === "hashop"
  && hashopTechnicalParams.get("subproject") === "3-1";

if (hashopTechnicalPage) {
  hashopTechnicalPage.hidden = !isHashopTechnical;
}

function updateHashopTechnicalMetadata() {
  if (!isHashopTechnical) return;
  document.title = "HaShop Technical Deep Dive";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = "A technical deep dive into HaShop microservices, order processing, inventory consistency and CloudFormation infrastructure.";
  }
}

updateHashopTechnicalMetadata();
