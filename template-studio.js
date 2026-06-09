const templates = [
  ["none", "No Template"],
  ["editorial", "Editorial Quote"],
  ["artsy", "Artsy"],
  ["badge", "Badge"],
  ["black-name-bar", "Black Name Bar"],
  ["circle-bar", "Circle Bar"],
  ["box", "Box"],
  ["typewriter-1", "Typewriter 1"],
  ["typewriter-2", "Typewriter 2"],
  ["text-emphasis", "Text Emphasis"],
  ["text-emphasis-logo", "4:5 Text Emphasis with Logo"],
  ["white-on-black", "White on Black 2"],
  ["white-on-black-45", "4:5 White on Black"],
  ["short-form-left", "Short Form Contest Left 4:5"],
  ["short-form-center", "Short Form Contest Center 4:5"],
  ["short-form-right", "Short Form Contest Right 4:5"],
  ["short-form-left-square", "Short Form Contest Left Square"],
  ["short-form-center-square", "Short Form Contest Center Square"],
  ["short-form-right-square", "Short Form Contest Right Square"],
  ["crested-underline", "Crested Underline"],
  ["simple", "Simple"],
];

const fixtures = [
  {
    key: "short",
    label: "Short Quote",
    title: "The Information Man",
    author: "Buddy Wakefield",
    book: "Stunt Water",
    text: "So please\nstop inviting all of us to every argument you still day to know\nwe can create our own wind.",
  },
  {
    key: "medium",
    label: "Medium Quote",
    title: "Cause of Death and Other Ordinary Things",
    author: "Hailey M. Tran",
    book: "an everyday occurrence",
    text: "A beating isn’t any easier when you can see it coming",
  },
  {
    key: "long",
    label: "Long Excerpt",
    title: "Cleave for the Slaughterhouse",
    author: "PAGES Matam",
    book: "Living at Baggage Claim",
    text:
      "My last love was blood on a\nchopping block\nI wanted softness, hoping you’d\nput down the blade\nYou wanted an unknowing lamb\nMy heart was a cutting board\ntaking all the damage\nSo you could make meals for\nsomeone else.",
  },
  {
    key: "short-form",
    label: "Short Form Contest",
    title: "Term Two, Year Two",
    author: "Devon Parish",
    book: "Short Form Contest May 2026",
    text:
      "Term Two, Year Two\n\nIt’s four degrees\nand democracy is a mother\nshot point-blank\nin her SUV moments\nafter school drop-off\nso I kiss her goodbye,\nuphold what self-evident truths\nare left:\nmeet a kindred spirit\nfor coffee; write a poem\nthat can’t die",
  },
  {
    key: "emphasis",
    label: "Emphasis Text",
    title: "A Little Weather",
    author: "Button Poet",
    book: "Template Studio",
    text: "Some lines need a second voice.",
    emphasisText: "second voice",
  },
  {
    key: "social",
    label: "Social Handle",
    title: "Python",
    author: "Airea Johnson",
    book: "Short Form Contest May 2026",
    text: "I shed another name and still keep moving.",
    social: "on",
    handle: "@aireawrites",
  },
];

const controls = {
  template: document.getElementById("studioTemplate"),
  fixture: document.getElementById("studioFixture"),
  size: document.getElementById("studioSize"),
  refresh: document.getElementById("refreshStudioPreview"),
  preview: document.getElementById("studioPreview"),
};

function fillSelect(select, items) {
  select.innerHTML = items.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function sendPreview() {
  const fixture = fixtures.find((item) => item.key === controls.fixture.value) || fixtures[0];
  controls.preview.contentWindow?.postMessage(
    {
      type: "pig-template-studio-preview",
      templateKey: controls.template.value,
      canvasPreset: controls.size.value,
      fixture,
    },
    window.location.origin,
  );
}

fillSelect(controls.template, templates);
fillSelect(
  controls.fixture,
  fixtures.map((fixture) => [fixture.key, fixture.label]),
);

controls.template.value = "short-form-left";
controls.fixture.value = "short-form";

controls.template.addEventListener("change", sendPreview);
controls.fixture.addEventListener("change", sendPreview);
controls.size.addEventListener("change", sendPreview);
controls.refresh.addEventListener("click", sendPreview);
controls.preview.addEventListener("load", sendPreview);
