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
    key: "practice",
    label: "Practice Book QI",
    title: "Sample Title",
    author: "Sample Poet",
    book: "Sample Book",
    text: "A sample line finds its place.\nAnother line leaves room to breathe.",
  },
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
  loadPractice: document.getElementById("studioLoadPractice"),
  template: document.getElementById("studioTemplate"),
  fixture: document.getElementById("studioFixture"),
  size: document.getElementById("studioSize"),
  sizeGuidance: document.getElementById("studioSizeGuidance"),
  baseGraphicBlock: document.getElementById("studioBaseGraphicBlock"),
  baseGraphic: document.getElementById("studioBaseGraphic"),
  clearBaseGraphic: document.getElementById("clearStudioBaseGraphic"),
  baseGraphicStatus: document.getElementById("studioBaseGraphicStatus"),
  cropBlock: document.getElementById("studioCropBlock"),
  zoom: document.getElementById("studioZoom"),
  cropX: document.getElementById("studioCropX"),
  cropY: document.getElementById("studioCropY"),
  resolutionStatus: document.getElementById("studioResolutionStatus"),
  designBlock: document.getElementById("studioDesignBlock"),
  bodyFont: document.getElementById("studioBodyFont"),
  bodyFontSize: document.getElementById("studioBodyFontSize"),
  textX: document.getElementById("studioTextX"),
  textY: document.getElementById("studioTextY"),
  textWidth: document.getElementById("studioTextWidth"),
  textHeight: document.getElementById("studioTextHeight"),
  textAlign: document.getElementById("studioTextAlign"),
  titleVisibility: document.getElementById("studioTitleVisibility"),
  titleSize: document.getElementById("studioTitleSize"),
  titleX: document.getElementById("studioTitleX"),
  titleY: document.getElementById("studioTitleY"),
  authorVisibility: document.getElementById("studioAuthorVisibility"),
  authorSize: document.getElementById("studioAuthorSize"),
  authorX: document.getElementById("studioAuthorX"),
  authorY: document.getElementById("studioAuthorY"),
  bookVisibility: document.getElementById("studioBookVisibility"),
  bookSize: document.getElementById("studioBookSize"),
  bookX: document.getElementById("studioBookX"),
  bookY: document.getElementById("studioBookY"),
  publishBlock: document.getElementById("studioPublishBlock"),
  usePracticeBook: document.getElementById("studioUsePracticeBook"),
  templateName: document.getElementById("studioTemplateName"),
  bookTitle: document.getElementById("studioBookTitle"),
  bookShortener: document.getElementById("studioBookShortener"),
  releaseYear: document.getElementById("studioReleaseYear"),
  releaseCatalog: document.getElementById("studioReleaseCatalog"),
  bookKey: document.getElementById("studioBookKey"),
  existingTemplate: document.getElementById("studioExistingTemplate"),
  saveShared: document.getElementById("studioSaveShared"),
  updateShared: document.getElementById("studioUpdateShared"),
  saveStatus: document.getElementById("studioSaveStatus"),
  refresh: document.getElementById("refreshStudioPreview"),
  preview: document.getElementById("studioPreview"),
};

const editableStarters = new Set(["editorial", "simple", ...templates.map(([key]) => key).filter((key) => key.startsWith("short-form-"))]);
let sourceImage = null;
let croppedDataUrl = null;
let cropHasEnoughPixels = false;
let savedControlValues = null;
let sharedBookTemplates = [];
let practiceGraphicActive = false;
const PRACTICE_BOOK_KEY = "STUDIO-2027";
const isEditableStarter = () => editableStarters.has(controls.template.value);
const numericDraftFields = [
  ["bodyFontSize", "fontSize"], ["textX", "textBoxX"], ["textY", "textBoxY"],
  ["textWidth", "textBoxWidth"], ["textHeight", "textBoxHeight"],
  ["titleSize", "titleFontSize"], ["titleX", "titleX"], ["titleY", "titleY"],
  ["authorSize", "attributionFontSize"], ["authorX", "attributionX"], ["authorY", "attributionY"],
  ["bookSize", "secondaryAttributionFontSize"], ["bookX", "secondaryAttributionX"], ["bookY", "secondaryAttributionY"],
];
const extraNumericDraftFields = numericDraftFields.slice(3);

function updateSizeGuidance() {
  const [width, height] = controls.size.value.split("x").map(Number);
  controls.sizeGuidance.textContent = `Output ${width} × ${height} px. The cropped source must contain at least that many pixels. Keep important text about 5% in from each edge (${Math.round(width * 0.05)} px horizontally, ${Math.round(height * 0.05)} px vertically) as a P.I.G. working margin; destination platforms may need more.`;
}

async function loadPracticeTemplate() {
  const canvas = document.createElement("canvas");
  canvas.width = 2160;
  canvas.height = 2700;
  const context = canvas.getContext("2d");
  const wash = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  wash.addColorStop(0, "#f8f1e5");
  wash.addColorStop(0.65, "#e8d9c7");
  wash.addColorStop(1, "#cfbdbe");
  context.fillStyle = wash;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(126, 75, 92, 0.14)";
  context.beginPath();
  context.ellipse(1870, 2230, 900, 760, -0.3, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(126, 75, 92, 0.24)";
  context.lineWidth = 12;
  context.beginPath();
  context.arc(1850, 2210, 640, 2.7, 5.9);
  context.stroke();

  const image = new Image();
  image.src = canvas.toDataURL("image/png");
  await image.decode();
  sourceImage = image;
  practiceGraphicActive = true;
  savedControlValues = null;
  controls.template.value = "editorial";
  controls.fixture.value = "practice";
  controls.size.value = "2160x2700";
  updateSizeGuidance();
  controls.bodyFont.value = "Georgia";
  controls.bodyFontSize.value = "64";
  controls.textX.value = "12";
  controls.textY.value = "29";
  extraNumericDraftFields.forEach(([name]) => { controls[name].value = ""; });
  controls.textAlign.value = "";
  controls.titleVisibility.value = "on";
  controls.authorVisibility.value = "on";
  controls.bookVisibility.value = "on";
  controls.zoom.value = "100";
  controls.cropX.value = "50";
  controls.cropY.value = "50";
  controls.templateName.value = "";
  controls.bookTitle.value = "";
  controls.bookShortener.value = "";
  controls.releaseYear.value = "";
  controls.releaseCatalog.value = "";
  controls.existingTemplate.value = "";
  controls.saveStatus.textContent = "";
  controls.baseGraphicStatus.textContent = "Practice background loaded (2160 × 2700). Save it for the practice book, or replace it for a real book.";
  syncBookAssignment();
  updateCropPreview();
  syncBaseGraphicControls();
  sendPreview();
}

function syncBaseGraphicControls() {
  controls.baseGraphicBlock.hidden = !isEditableStarter();
  controls.cropBlock.hidden = !isEditableStarter() || !sourceImage;
  controls.designBlock.hidden = !isEditableStarter();
  controls.publishBlock.hidden = !isEditableStarter();
  controls.clearBaseGraphic.hidden = !sourceImage;
}

function draftSettings() {
  if (!isEditableStarter()) return {};
  const settings = {};
  if (controls.bodyFont.value) settings.fontFamily = controls.bodyFont.value;
  if (controls.textAlign.value) settings.textAlign = controls.textAlign.value;
  for (const [name, key] of numericDraftFields) {
    const control = controls[name];
    if (control.value !== "" && control.validity.valid) settings[key] = control.value;
  }
  for (const [control, key] of [[controls.titleVisibility, "titleEnabled"], [controls.authorVisibility, "authorEnabled"], [controls.bookVisibility, "secondaryAttributionEnabled"]]) {
    if (control.value) settings[key] = control.value;
  }
  return settings;
}

function updateCropPreview() {
  croppedDataUrl = null;
  cropHasEnoughPixels = false;
  controls.resolutionStatus.textContent = "";
  if (!sourceImage) return;
  const [targetWidth, targetHeight] = controls.size.value.split("x").map(Number);
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = sourceImage.width / sourceImage.height;
  const zoom = Number(controls.zoom.value) / 100;
  const cropWidth = (sourceRatio > targetRatio ? sourceImage.height * targetRatio : sourceImage.width) / zoom;
  const cropHeight = cropWidth / targetRatio;
  const cropX = (sourceImage.width - cropWidth) * Number(controls.cropX.value) / 100;
  const cropY = (sourceImage.height - cropHeight) * Number(controls.cropY.value) / 100;
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  canvas.getContext("2d").drawImage(sourceImage, cropX, cropY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);
  croppedDataUrl = canvas.toDataURL("image/png");
  const enough = cropWidth >= targetWidth && cropHeight >= targetHeight;
  cropHasEnoughPixels = enough;
  controls.resolutionStatus.textContent = `${enough ? "Resolution OK" : "Low-resolution crop"}: ${Math.round(cropWidth)} × ${Math.round(cropHeight)} source pixels for ${targetWidth} × ${targetHeight} output.`;
}

function fillSelect(select, items) {
  select.innerHTML = items.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function previewPayload() {
  const fixture = fixtures.find((item) => item.key === controls.fixture.value) || fixtures[0];
  return {
    type: "pig-template-studio-preview",
    templateKey: controls.template.value,
    canvasPreset: controls.size.value,
    fixture,
    baseGraphicDataUrl: isEditableStarter() ? croppedDataUrl : null,
    savedControlValues: isEditableStarter() ? savedControlValues : null,
    draftSettings: draftSettings(),
  };
}

function sendPreview() {
  controls.preview.contentWindow?.postMessage(previewPayload(), window.location.origin);
}

function canonicalBookKey() {
  const shortener = controls.bookShortener.value.trim().toUpperCase();
  const year = controls.releaseYear.value.trim();
  return shortener && /^\d{4}$/.test(year) ? `${shortener}-${year}` : "";
}

function syncBookAssignment() {
  const bookKey = canonicalBookKey();
  controls.bookKey.textContent = `Canonical book key: ${bookKey || "enter a shortener and four-digit year"}`;
  const previous = controls.existingTemplate.value;
  controls.existingTemplate.replaceChildren(new Option("Use selected starter", ""));
  sharedBookTemplates.filter((template) => template.bookKey === bookKey).forEach((template) => {
    controls.existingTemplate.add(new Option(template.name, template.id));
  });
  if ([...controls.existingTemplate.options].some((option) => option.value === previous)) {
    controls.existingTemplate.value = previous;
  }
  controls.updateShared.disabled = !controls.existingTemplate.value;
}

async function refreshSharedBookTemplates() {
  const response = await fetch("/api/book-specific-templates", { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Could not load shared book templates.");
  sharedBookTemplates = Array.isArray(payload.templates) ? payload.templates : [];
  syncBookAssignment();
}

async function loadSavedBookTemplate() {
  controls.updateShared.disabled = true;
  const template = sharedBookTemplates.find((item) => item.id === controls.existingTemplate.value);
  if (!template) {
    savedControlValues = null;
    controls.updateShared.disabled = true;
    sendPreview();
    return;
  }
  const response = await fetch(`/api/book-specific-templates/${encodeURIComponent(template.id)}/background`, { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.imageDataUrl) throw new Error(payload.error || "Could not load that template's background.");
  const image = new Image();
  image.src = payload.imageDataUrl;
  await image.decode();
  sourceImage = image;
  practiceGraphicActive = template.bookKey === PRACTICE_BOOK_KEY;
  savedControlValues = template.templateState?.controlValues || null;
  if ([...controls.size.options].some((option) => option.value === savedControlValues?.canvasPreset)) {
    controls.size.value = savedControlValues.canvasPreset;
  }
  updateSizeGuidance();
  const starter = template.templateState?.studioStarterTemplate;
  if (editableStarters.has(starter)) controls.template.value = starter;
  controls.templateName.value = template.name;
  controls.bookTitle.value = template.bookTitle || "";
  controls.bookShortener.value = template.bookShortener || "";
  controls.releaseYear.value = template.releaseYear || "";
  controls.releaseCatalog.value = template.releaseCatalog || "";
  controls.updateShared.disabled = false;
  controls.bodyFont.value = savedControlValues?.fontFamily || "";
  controls.bodyFontSize.value = savedControlValues?.fontSize || "";
  controls.textX.value = savedControlValues?.textBoxX || "";
  controls.textY.value = savedControlValues?.textBoxY || "";
  extraNumericDraftFields.forEach(([name, key]) => { controls[name].value = savedControlValues?.[key] || ""; });
  controls.textAlign.value = savedControlValues?.textAlign || "";
  controls.titleVisibility.value = savedControlValues?.titleEnabled || "";
  controls.authorVisibility.value = savedControlValues?.authorEnabled || "";
  controls.bookVisibility.value = savedControlValues?.secondaryAttributionEnabled || "";
  controls.zoom.value = "100";
  controls.cropX.value = "50";
  controls.cropY.value = "50";
  updateCropPreview();
  syncBaseGraphicControls();
  controls.baseGraphicStatus.textContent = `Loaded “${template.name}”. Edit and update it, or rename it and save a new variant.`;
  sendPreview();
}

async function saveSharedBookVariant({ update = false } = {}) {
  const name = controls.templateName.value.trim();
  const bookTitle = controls.bookTitle.value.trim();
  const bookShortener = controls.bookShortener.value.trim().toUpperCase();
  const releaseYear = controls.releaseYear.value.trim();
  const bookKey = canonicalBookKey();
  const selected = sharedBookTemplates.find((item) => item.id === controls.existingTemplate.value);
  if (!isEditableStarter() || !name || !bookTitle || !bookKey) {
    throw new Error("Choose an approved starter, name the variant, and enter a book title, shortener, and four-digit release year.");
  }
  if (!sourceImage || !croppedDataUrl) throw new Error("Upload or load a base graphic before saving.");
  if (practiceGraphicActive && bookKey !== PRACTICE_BOOK_KEY) {
    throw new Error("The sample background can only be saved for the practice book. Replace it before assigning a real book.");
  }
  if (update && (!selected || selected.bookKey !== bookKey)) {
    throw new Error("Select a saved variant for this book before updating it.");
  }
  if (!update && selected && selected.name === name) {
    throw new Error("Choose Update selected variant, or give the new variant a different name.");
  }
  if (!cropHasEnoughPixels) throw new Error("Choose a higher-resolution image or reduce the crop zoom before saving.");
  if (Math.ceil((croppedDataUrl.split(",")[1]?.length || 0) * 0.75) > 12 * 1024 * 1024) {
    throw new Error("The cropped PNG exceeds 12 MB. Use a smaller source image or output size.");
  }
  const renderer = controls.preview.contentWindow;
  if (typeof renderer?.pigTemplateStudioSaveBook !== "function") throw new Error("P.I.G. preview is still loading. Try again shortly.");
  controls.saveShared.disabled = true;
  controls.updateShared.disabled = true;
  controls.saveStatus.textContent = update ? "Updating shared variant…" : "Saving shared variant…";
  try {
    const template = await renderer.pigTemplateStudioSaveBook({
      templateId: update ? selected.id : null,
      name, bookTitle, bookShortener, releaseYear, bookKey,
      releaseCatalog: controls.releaseCatalog.value.trim(),
      preview: previewPayload(),
    });
    await refreshSharedBookTemplates();
    controls.existingTemplate.value = template.id;
    controls.saveStatus.textContent = `${update ? "Updated" : "Saved"} “${name}” for ${bookKey}. It is available in P.I.G.'s Book Specific QI variants.`;
  } finally {
    controls.saveShared.disabled = false;
    controls.updateShared.disabled = !controls.existingTemplate.value;
  }
}

fillSelect(controls.template, templates);
fillSelect(
  controls.fixture,
  fixtures.map((fixture) => [fixture.key, fixture.label]),
);

controls.template.value = "editorial";
controls.fixture.value = "practice";
updateSizeGuidance();
syncBaseGraphicControls();
syncBookAssignment();
refreshSharedBookTemplates().catch((error) => { controls.saveStatus.textContent = error.message; });
loadPracticeTemplate().catch((error) => { controls.baseGraphicStatus.textContent = error.message || "Could not load the practice template."; });
controls.loadPractice.addEventListener("click", () => {
  loadPracticeTemplate().catch((error) => { controls.baseGraphicStatus.textContent = error.message || "Could not load the practice template."; });
});
controls.usePracticeBook.addEventListener("click", () => {
  controls.templateName.value = "Staff Practice — Editorial 4:5";
  controls.bookTitle.value = "P.I.G. Studio Practice Book";
  controls.bookShortener.value = "STUDIO";
  controls.releaseYear.value = "2027";
  controls.releaseCatalog.value = "Staff practice";
  syncBookAssignment();
  controls.saveStatus.textContent = "Practice book assigned. Preview your design, then save a shared variant.";
});

controls.template.addEventListener("change", () => {
  if (controls.existingTemplate.value) {
    controls.existingTemplate.value = "";
    savedControlValues = null;
    controls.updateShared.disabled = true;
  }
  syncBaseGraphicControls();
  sendPreview();
});
controls.fixture.addEventListener("change", sendPreview);
controls.size.addEventListener("change", () => {
  updateSizeGuidance();
  updateCropPreview();
  sendPreview();
});
controls.refresh.addEventListener("click", sendPreview);
controls.preview.addEventListener("load", sendPreview);
for (const control of [controls.zoom, controls.cropX, controls.cropY]) {
  control.addEventListener("change", () => {
    updateCropPreview();
    sendPreview();
  });
}
for (const control of [controls.bodyFont, controls.textAlign, controls.titleVisibility, controls.authorVisibility, controls.bookVisibility]) {
  control.addEventListener("change", sendPreview);
}
for (const [name] of numericDraftFields) {
  controls[name].addEventListener("input", sendPreview);
}
controls.baseGraphic.addEventListener("change", async () => {
  const file = controls.baseGraphic.files?.[0];
  if (!file) return;
  try {
    if (!["image/png", "image/jpeg"].includes(file.type) || file.size > 12 * 1024 * 1024) {
      throw new Error("Choose a PNG or JPEG no larger than 12 MB.");
    }
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read the graphic."));
      reader.readAsDataURL(file);
    });
    const image = new Image();
    image.src = dataUrl;
    await image.decode();
    if (image.width > 6000 || image.height > 6000) {
      throw new Error("The graphic must be no larger than 6000 × 6000 pixels.");
    }
    sourceImage = image;
    practiceGraphicActive = false;
    controls.zoom.value = "100";
    controls.cropX.value = "50";
    controls.cropY.value = "50";
    updateCropPreview();
    controls.baseGraphicStatus.textContent = `Loaded ${file.name} (${image.width} × ${image.height}).`;
    syncBaseGraphicControls();
    sendPreview();
  } catch (error) {
    controls.baseGraphicStatus.textContent = error.message || "Could not preview the graphic.";
  } finally {
    controls.baseGraphic.value = "";
  }
});
controls.clearBaseGraphic.addEventListener("click", () => {
  sourceImage = null;
  practiceGraphicActive = false;
  croppedDataUrl = null;
  controls.baseGraphicStatus.textContent = "Preview graphic removed.";
  controls.resolutionStatus.textContent = "";
  syncBaseGraphicControls();
  sendPreview();
});
[controls.bookShortener, controls.releaseYear].forEach((control) => control.addEventListener("input", syncBookAssignment));
controls.existingTemplate.addEventListener("change", () => {
  loadSavedBookTemplate().catch((error) => { controls.saveStatus.textContent = error.message; });
});
controls.saveShared.addEventListener("click", () => {
  saveSharedBookVariant().catch((error) => { controls.saveStatus.textContent = error.message; });
});
controls.updateShared.addEventListener("click", () => {
  saveSharedBookVariant({ update: true }).catch((error) => { controls.saveStatus.textContent = error.message; });
});
