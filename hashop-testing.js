const hashopTestingPage = document.querySelector('[data-project-page="hashop-testing"]');

if (hashopTestingPage) {
  hashopTestingPage.innerHTML = `
    <header class="technical-hero testing-hero">
      <div class="technical-eyebrow"><span>3.3</span><span>Quality engineering case study</span></div>
      <h1>Testing HaShop as a distributed system</h1>
      <p>A standalone Playwright suite validates the public API, Cognito authentication, role boundaries and the order–inventory lifecycle against a temporary AWS environment.</p>
      <div class="testing-result-strip" aria-label="AWS test results">
        <div><strong>12/12</strong><span>API smoke checks passed</span></div>
        <div><strong>21/21</strong><span>smoke + authenticated checks passed</span></div>
        <div><strong>1/1</strong><span>critical workflow passed</span></div>
        <div><strong>1</strong><span>routing defect found and fixed</span></div>
      </div>
      <aside class="testing-context">
        <span aria-hidden="true">AWS</span>
        <div><h2>Real environment, controlled cost</h2><p>The harness was prepared and checked locally first. HaShop was then rebuilt once in ap-southeast-1, tested through its public CloudFront endpoint, evidence was copied out, and every billable test resource was torn down immediately.</p></div>
      </aside>
    </header>

    <nav class="technical-toc testing-toc" aria-label="On this page">
      <a href="#hashop-test-strategy"><span>01</span><span>Strategy</span></a>
      <a href="#hashop-test-api"><span>02</span><span>API coverage</span></a>
      <a href="#hashop-test-workflow"><span>03</span><span>Critical workflow</span></a>
      <a href="#hashop-test-defect"><span>04</span><span>Defect investigation</span></a>
      <a href="#hashop-test-evidence"><span>05</span><span>Evidence & scope</span></a>
    </nav>

    <section class="technical-section" id="hashop-test-strategy">
      <div class="technical-heading">
        <p class="section-label">01 — <span>Test strategy</span></p>
        <h2>Gate deeper testing behind fast, deterministic checks</h2>
        <p>The QA project is isolated from all seven service repositories and treats HaShop as a black box. Each stage has explicit entry and exit criteria, and a failure blocks the more expensive suites that follow.</p>
      </div>
      <div class="testing-pipeline" aria-label="HaShop test execution pipeline">
        <article><span>01</span><h3>Local harness</h3><p>Validate fixtures, contracts and reports against a deterministic mock before AWS exists.</p></article><i aria-hidden="true">→</i>
        <article><span>02</span><h3>Temporary AWS</h3><p>Rebuild the four-stack environment and create dedicated Customer/Admin accounts.</p></article><i aria-hidden="true">→</i>
        <article><span>03</span><h3>Stage gates</h3><p>Run smoke, authenticated API, then the stateful order/inventory workflow.</p></article><i aria-hidden="true">→</i>
        <article><span>04</span><h3>Evidence & teardown</h3><p>Retain reports and logs, then remove infrastructure from the outside in.</p></article>
      </div>
      <div class="testing-principles">
        <article><span>BLACK BOX</span><h3>Public entry point</h3><p>Every AWS request passes through the same CloudFront and ALB route used by the application.</p></article>
        <article><span>SAFE DATA</span><h3>Dedicated fixtures</h3><p>Temporary accounts and uniquely named disposable products keep the run isolated from real users.</p></article>
        <article><span>NO RETRY</span><h3>Honest stateful failure</h3><p>The critical workflow disables retries so a partial checkout cannot create misleading duplicate state.</p></article>
      </div>
    </section>

    <section class="technical-section" id="hashop-test-api">
      <div class="technical-heading">
        <p class="section-label">02 — <span>API smoke & authentication</span></p>
        <h2>Prove availability, contracts and authorization boundaries</h2>
        <p>The read-focused suites verify that the deployment is usable before any business state is mutated. Assertions cover HTTP status, JSON shape, Cognito token type, group membership and Customer/Admin access control.</p>
      </div>
      <div class="testing-suite-grid">
        <article>
          <div class="testing-suite-head"><span>SMOKE</span><strong>12/12</strong></div>
          <h3>Deployment confidence</h3>
          <ul><li><b>4</b><span>public catalog contracts</span></li><li><b>4</b><span>unauthenticated route rejections</span></li><li><b>2</b><span>login validation and rejection cases</span></li><li><b>2</b><span>Customer/Admin Cognito login cases</span></li></ul>
          <a href="assets/projects/hashop/qa-reports/smoke/index.html" target="_blank" rel="noopener noreferrer"><span>Open Playwright smoke report</span> ↗</a>
        </article>
        <article>
          <div class="testing-suite-head"><span>AUTH + SMOKE</span><strong>21/21</strong></div>
          <h3>Identity and role enforcement</h3>
          <ul><li><b>4</b><span>Customer profile, cart, orders and payment methods</span></li><li><b>3</b><span>Customer denial and Admin route access</span></li><li><b>2</b><span>malformed bearer and ID-token rejection</span></li><li><b>12</b><span>smoke cases rerun against the same deployment</span></li></ul>
          <a href="assets/projects/hashop/qa-reports/authenticated/index.html" target="_blank" rel="noopener noreferrer"><span>Open authenticated API report</span> ↗</a>
        </article>
      </div>
      <div class="testing-proof-grid">
        <figure class="testing-proof">
          <img src="assets/projects/hashop/qa-evidence/smoke-12-of-12.png" alt="Playwright smoke report showing 12 of 12 tests passed">
          <figcaption><strong>Smoke report — 12/12 passed</strong><span>The captured AWS run shows catalog contracts, authentication and security boundary checks.</span></figcaption>
        </figure>
        <figure class="testing-proof">
          <img src="assets/projects/hashop/qa-evidence/authenticated-21-of-21.png" alt="Playwright authenticated API report showing 21 of 21 tests passed">
          <figcaption><strong>Authenticated report — 21/21 passed</strong><span>Filtered AUT-API evidence shows Customer data, RBAC and access-token enforcement cases.</span></figcaption>
        </figure>
      </div>
    </section>

    <section class="technical-section" id="hashop-test-workflow">
      <div class="technical-heading">
        <p class="section-label">03 — <span>Critical order/inventory workflow</span></p>
        <h2>Follow stock through cancellation and fulfillment</h2>
        <p>One disposable product begins with ten units. The test validates both compensating release after cancellation and permanent stock commitment after shipping and receipt.</p>
      </div>
      <div class="testing-workflow">
        <div class="testing-workflow-step"><span>FIXTURE</span><strong>10 / 0 / 0 / 10</strong><p>Create product — on hand / reserved / sold / available</p></div>
        <div class="testing-workflow-step"><span>RESERVE 2</span><strong>10 / 2 / 0 / 8</strong><p>Customer checks out a COD order</p></div>
        <div class="testing-workflow-step"><span>RELEASE</span><strong>10 / 0 / 0 / 10</strong><p>Customer cancellation restores availability</p></div>
        <div class="testing-workflow-step"><span>RESERVE 3</span><strong>10 / 3 / 0 / 7</strong><p>Second COD order enters fulfillment</p></div>
        <div class="testing-workflow-step"><span>COMMIT</span><strong>7 / 0 / 0 / 7</strong><p>Admin changes status to SHIPPING</p></div>
        <div class="testing-workflow-step"><span>MARK SOLD</span><strong>7 / 0 / 3 / 7</strong><p>Customer confirms receipt</p></div>
      </div>
      <div class="testing-workflow-note">
        <div><span>WF-ORD-001</span><h3>Six state transitions and cleanup passed</h3><p>The suite created its own product, used BUY_NOW with COD, asserted inventory after every transition, deleted the fixture, and confirmed its inventory endpoint returned 404.</p></div>
        <a href="assets/projects/hashop/qa-reports/workflow/index.html" target="_blank" rel="noopener noreferrer"><span>Open workflow report</span> ↗</a>
      </div>
      <figure class="testing-proof testing-proof--wide">
        <img src="assets/projects/hashop/qa-evidence/critical-workflow-steps.png" alt="Playwright workflow report listing reserve, release, commit and mark sold steps">
        <figcaption><strong>Critical workflow — every state transition passed</strong><span>The report records fixture creation, both reservation paths, release, commit, mark sold and final cleanup.</span></figcaption>
      </figure>
    </section>

    <section class="technical-section" id="hashop-test-defect">
      <div class="technical-heading">
        <p class="section-label">04 — <span>Defect investigation</span></p>
        <h2>A passing frontend hid a broken API response</h2>
        <p>The first authenticated run returned 20/21. A Customer request to the Admin user list should have produced JSON 403, but CloudFront returned the SPA document with status 200.</p>
      </div>
      <div class="testing-defect-grid">
        <article><span>EXPECTED</span><strong>403 JSON</strong><p>User Service denies the Customer role at the authorization boundary.</p></article>
        <article class="testing-defect-actual"><span>ACTUAL</span><strong>200 HTML</strong><p>CloudFront replaced the upstream 403/404 with /index.html for SPA fallback.</p></article>
        <article><span>FIX</span><strong>Remove remap</strong><p>Deleted CustomErrorResponses so API status and content type pass through unchanged.</p></article>
        <article class="testing-defect-pass"><span>RETEST</span><strong>21/21 PASS</strong><p>The complete smoke and authenticated suite passed after the in-place stack update.</p></article>
      </div>
      <div class="testing-diff">
        <div><span class="code-file">01-cf-hashop-foundation.yaml</span><h3>Root cause isolated in the edge configuration</h3><p>The same fallback intended for client-side routes also intercepted API authorization errors. Removing it restored the service contract instead of weakening the test assertion.</p></div>
        <pre><code>- CustomErrorResponses:
-   - ErrorCode: 403
-     ResponseCode: 200
-     ResponsePagePath: /index.html
-   - ErrorCode: 404
-     ResponseCode: 200
-     ResponsePagePath: /index.html</code></pre>
      </div>
      <figure class="testing-proof testing-proof--wide testing-proof--defect">
        <img src="assets/projects/hashop/qa-evidence/routing-defect-20-of-21.png" alt="Playwright failure report showing 20 passed and one routing authorization test failed">
        <figcaption><strong>Failure evidence — 20/21 before the fix</strong><span>The assertion captured HTML from CloudFront where the protected API route should have returned JSON 403.</span></figcaption>
      </figure>
    </section>

    <section class="technical-section" id="hashop-test-evidence">
      <div class="technical-heading">
        <p class="section-label">05 — <span>Evidence & honest scope</span></p>
        <h2>Preserve enough evidence to reproduce the conclusion</h2>
        <p>Reports were copied out before teardown, together with the routing failure trace, the exact infrastructure diff, AWS metadata and selected CloudWatch logs from Product, Inventory and Order services.</p>
      </div>
      <div class="testing-evidence-grid">
        <article><span>01</span><h3>Playwright reports</h3><p>Separate HTML reports retain case names, duration, steps and final status for each gate.</p></article>
        <article><span>02</span><h3>Failure evidence</h3><p>The failed authenticated run was kept before the fix, along with error context and trace data.</p></article>
        <article><span>03</span><h3>Operational context</h3><p>CloudFormation, ECS, target health and CloudWatch snapshots connect test behavior to the deployed environment.</p></article>
        <article><span>04</span><h3>Verified teardown</h3><p>Post-run checks confirmed no active stacks, RDS instance, ECR repository or artifact bucket remained.</p></article>
      </div>
      <aside class="testing-limitations">
        <div><p class="section-label">Current boundary</p><h3>What this run does not claim</h3><p>SES delivery was not validated because the test account had no verified SES identity. Browser E2E, performance and resilience testing remain outside this completed milestone and are not presented as passed coverage.</p></div>
        <ul><li><span>NOT RUN</span><p>End-to-end email delivery</p></li><li><span>NEXT</span><p>Browser Customer/Admin journeys</p></li><li><span>OUT OF SCOPE</span><p>Load, stress and failure-injection tests</p></li></ul>
      </aside>
    </section>

    <footer class="technical-footer testing-footer">
      <div><p class="section-label">QA outcome</p><h2>The test suite found a real integration defect—not just green checks</h2><p>The result demonstrates staged test design, API contract validation, RBAC coverage, stateful cross-service verification, defect isolation, retesting and cost-aware environment cleanup.</p></div>
      <div class="technical-actions">
        <a class="technical-action technical-action--primary" href="https://github.com/Leviethaidang/HaShop-QA" target="_blank" rel="noopener noreferrer"><span>View test source</span><span aria-hidden="true">↗</span></a>
        <a class="technical-action" href="assets/projects/hashop/qa-reports/authenticated/index.html" target="_blank" rel="noopener noreferrer"><span>View passing report</span><span aria-hidden="true">↗</span></a>
        <a class="technical-action" href="HighlightedProjects/HaShop/ReproductionGuide/"><span>Back to reproduction guide</span><span aria-hidden="true">←</span></a>
      </div>
    </footer>`;
}

const hashopTestingParams = new URLSearchParams(window.CVRoute.params);
const isHashopTesting = hashopTestingParams.get("project") === "hashop"
  && hashopTestingParams.get("subproject") === "3-3";

if (hashopTestingPage) hashopTestingPage.hidden = !isHashopTesting;

function updateHashopTestingMetadata() {
  if (!isHashopTesting) return;
  document.title = "HaShop Quality Engineering";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "HaShop Playwright testing on AWS: API smoke, Cognito/RBAC, critical order-inventory workflow, defect investigation and evidence.";
}

updateHashopTestingMetadata();
