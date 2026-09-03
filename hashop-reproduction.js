

const hashopReproductionParams = new URLSearchParams(location.search);
const hashopReproductionPage = document.querySelector('[data-project-page="hashop-reproduction"]');
const isHashopReproduction = hashopReproductionParams.get("project") === "hashop"
  && hashopReproductionParams.get("subproject") === "3-2";

if (hashopReproductionPage) {
  hashopReproductionPage.hidden = !isHashopReproduction;
}

function updateHashopReproductionMetadata() {
  if (!isHashopReproduction) return;
  document.title = "HaShop Deployment Guide";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = "Choose between a concise CLI runbook and the full AWS Console workshop for deploying, validating and cleaning up HaShop.";
  }
}

function initializeHashopReproductionMode() {
  if (!isHashopReproduction || !hashopReproductionPage) return;

  const consolePanel = hashopReproductionPage.querySelector('[data-reproduction-mode-panel="console"]');
  const guide = window.HASHOP_CONSOLE_GUIDE;
  if (consolePanel && guide?.html) {
    consolePanel.innerHTML = guide.html;
  }

  const buttons = [...hashopReproductionPage.querySelectorAll("[data-reproduction-mode]")];
  const panels = [...hashopReproductionPage.querySelectorAll("[data-reproduction-mode-panel]")];
  const requestedMode = hashopReproductionParams.get("guide");
  const initialMode = requestedMode === "console" ? "console" : "cli";

  function selectMode(mode, { focus = false, updateUrl = false } = {}) {
    const activeButton = buttons.find((button) => button.dataset.reproductionMode === mode);
    const activePanel = panels.find((panel) => panel.dataset.reproductionModePanel === mode);
    if (!activeButton || !activePanel) return;

    buttons.forEach((button) => {
      const selected = button === activeButton;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel !== activePanel;
    });

    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("guide", mode);
      history.replaceState(null, "", url);
    }

    if (focus) activeButton.focus();
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectMode(button.dataset.reproductionMode, { updateUrl: true });
    });

    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;

      selectMode(buttons[nextIndex].dataset.reproductionMode, { focus: true, updateUrl: true });
    });
  });

  selectMode(initialMode);
}

updateHashopReproductionMetadata();
initializeHashopReproductionMode();
