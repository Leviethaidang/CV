

const shorturlTestingParams = new URLSearchParams(location.search);
const shorturlTestingPage = document.querySelector('[data-project-page="shorturl-testing"]');
const isShorturlTestingPage = shorturlTestingParams.get("project") === "shorturl"
  && shorturlTestingParams.get("subproject") === "2-2";

if (shorturlTestingPage) {
  shorturlTestingPage.hidden = !isShorturlTestingPage;
}

function updateShorturlTestingMetadata() {
  if (!isShorturlTestingPage) return;
  document.title = "ShortURL Manual API Testing";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = "ShortURL API testing case study with 10 Postman test cases, cache/database branch evidence and negative validation coverage on AWS.";
  }
}

updateShorturlTestingMetadata();
