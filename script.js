const canvas = document.getElementById("previewCanvas");
const context = canvas.getContext("2d");

const controls = {
  familyPreset: document.getElementById("familyPreset"),
  variantPreset: document.getElementById("variantPreset"),
  templatePreset: document.getElementById("templatePreset"),
  applyTemplateButton: document.getElementById("applyTemplateButton"),
  sourceType: document.getElementById("sourceType"),
  searchQuery: document.getElementById("searchQuery"),
  sourceFiltersRow: document.getElementById("sourceFiltersRow"),
  sourcePrimaryFilterBlock: document.getElementById("sourcePrimaryFilterBlock"),
  sourcePrimaryFilterLabel: document.getElementById("sourcePrimaryFilterLabel"),
  weaverRequestFilter: document.getElementById("weaverRequestFilter"),
  sourceBookFilterBlock: document.getElementById("sourceBookFilterBlock"),
  sourceBookFilterLabel: document.getElementById("sourceBookFilterLabel"),
  weaverBookFilter: document.getElementById("weaverBookFilter"),
  searchButton: document.getElementById("searchButton"),
  randomTextButton: document.getElementById("randomTextButton"),
  randomizeAllButton: document.getElementById("randomizeAllButton"),
  saveProjectButtonTop: document.getElementById("saveProjectButtonTop"),
  saveProjectButton: document.getElementById("saveProjectButton"),
  statusMessage: document.getElementById("statusMessage"),
  searchResults: document.getElementById("searchResults"),
  sourceAvailabilityNote: document.getElementById("sourceAvailabilityNote"),
  recentProjects: document.getElementById("recentProjects"),
  applyEditorialPresetButton: document.getElementById("applyEditorialPresetButton"),
  backgroundPrompt: document.getElementById("backgroundPrompt"),
  backgroundModel: document.getElementById("backgroundModel"),
  generateBackgroundButton: document.getElementById("generateBackgroundButton"),
  importBackgroundButton: document.getElementById("importBackgroundButton"),
  saveBackgroundAssetButton: document.getElementById("saveBackgroundAssetButton"),
  backgroundImageUpload: document.getElementById("backgroundImageUpload"),
  backgroundAssets: document.getElementById("backgroundAssets"),
  clearBackgroundButton: document.getElementById("clearBackgroundButton"),
  poemText: document.getElementById("poemText"),
  toggleLineBreakGuideButton: document.getElementById("toggleLineBreakGuideButton"),
  lineBreakGuide: document.getElementById("lineBreakGuide"),
  emphasisTextEnabled: document.getElementById("emphasisTextEnabled"),
  emphasisTextAlign: document.getElementById("emphasisTextAlign"),
  emphasisText: document.getElementById("emphasisText"),
  titleEnabled: document.getElementById("titleEnabled"),
  titleFontStyle: document.getElementById("titleFontStyle"),
  titleText: document.getElementById("titleText"),
  titleFontSize: document.getElementById("titleFontSize"),
  titleLetterSpacing: document.getElementById("titleLetterSpacing"),
  titleX: document.getElementById("titleX"),
  titleY: document.getElementById("titleY"),
  titleColor: document.getElementById("titleColor"),
  attributionText: document.getElementById("attributionText"),
  secondaryAttributionText: document.getElementById("secondaryAttributionText"),
  selectedRecordMeta: document.getElementById("selectedRecordMeta"),
  canvasPreset: document.getElementById("canvasPreset"),
  customWidth: document.getElementById("customWidth"),
  customHeight: document.getElementById("customHeight"),
  fontFamily: document.getElementById("fontFamily"),
  fontWeight: document.getElementById("fontWeight"),
  layoutMode: document.getElementById("layoutMode"),
  textAlign: document.getElementById("textAlign"),
  fontSize: document.getElementById("fontSize"),
  lineHeight: document.getElementById("lineHeight"),
  emphasisFontSize: document.getElementById("emphasisFontSize"),
  emphasisLineHeight: document.getElementById("emphasisLineHeight"),
  autoFitText: document.getElementById("autoFitText"),
  textBoxWidth: document.getElementById("textBoxWidth"),
  textBoxX: document.getElementById("textBoxX"),
  textBoxY: document.getElementById("textBoxY"),
  textBoxHeight: document.getElementById("textBoxHeight"),
  letterSpacing: document.getElementById("letterSpacing"),
  textBoxBlurEnabled: document.getElementById("textBoxBlurEnabled"),
  textBoxBlurAmount: document.getElementById("textBoxBlurAmount"),
  textBoxBlurFeather: document.getElementById("textBoxBlurFeather"),
  textColor: document.getElementById("textColor"),
  autoContrast: document.getElementById("autoContrast"),
  chunkContrastEnabled: document.getElementById("chunkContrastEnabled"),
  chunkContrastColor: document.getElementById("chunkContrastColor"),
  chunkContrastThreshold: document.getElementById("chunkContrastThreshold"),
  chunkContrastPadding: document.getElementById("chunkContrastPadding"),
  backgroundMode: document.getElementById("backgroundMode"),
  backgroundColorA: document.getElementById("backgroundColorA"),
  backgroundColorB: document.getElementById("backgroundColorB"),
  quoteMarkEnabled: document.getElementById("quoteMarkEnabled"),
  quoteHandling: document.getElementById("quoteHandling"),
  quoteMarkSize: document.getElementById("quoteMarkSize"),
  quoteMarkStyle: document.getElementById("quoteMarkStyle"),
  quoteMarkX: document.getElementById("quoteMarkX"),
  quoteMarkWeight: document.getElementById("quoteMarkWeight"),
  quoteMarkY: document.getElementById("quoteMarkY"),
  quoteMarkColor: document.getElementById("quoteMarkColor"),
  randomizePaletteButton: document.getElementById("randomizePaletteButton"),
  attributionFontSize: document.getElementById("attributionFontSize"),
  authorEnabled: document.getElementById("authorEnabled"),
  attributionLetterSpacing: document.getElementById("attributionLetterSpacing"),
  attributionX: document.getElementById("attributionX"),
  attributionY: document.getElementById("attributionY"),
  attributionColor: document.getElementById("attributionColor"),
  attributionFontStyle: document.getElementById("attributionFontStyle"),
  secondaryAttributionEnabled: document.getElementById("secondaryAttributionEnabled"),
  secondaryAttributionFontStyle: document.getElementById("secondaryAttributionFontStyle"),
  secondaryAttributionFontSize: document.getElementById("secondaryAttributionFontSize"),
  secondaryAttributionLetterSpacing: document.getElementById("secondaryAttributionLetterSpacing"),
  secondaryAttributionX: document.getElementById("secondaryAttributionX"),
  secondaryAttributionY: document.getElementById("secondaryAttributionY"),
  secondaryAttributionColor: document.getElementById("secondaryAttributionColor"),
  saveToDriveAndSendButton: document.getElementById("saveToDriveAndSendButton"),
  weaverAssetUrl: document.getElementById("weaverAssetUrl"),
  weaverAssetPreviewUrl: document.getElementById("weaverAssetPreviewUrl"),
  weaverProductionNotes: document.getElementById("weaverProductionNotes"),
  sendToWeaverButton: document.getElementById("sendToWeaverButton"),
  driveUploadDialog: document.getElementById("driveUploadDialog"),
  closeDriveDialogButton: document.getElementById("closeDriveDialogButton"),
  driveFileName: document.getElementById("driveFileName"),
  driveFolderSummary: document.getElementById("driveFolderSummary"),
  pickDriveFolderButton: document.getElementById("pickDriveFolderButton"),
  weaverProductionNotesDialog: document.getElementById("weaverProductionNotesDialog"),
  driveUploadStatus: document.getElementById("driveUploadStatus"),
  uploadDriveAndSendConfirmButton: document.getElementById("uploadDriveAndSendConfirmButton"),
  downloadButton: document.getElementById("downloadButton"),
};

const readouts = {
  fontSize: document.getElementById("fontSizeValue"),
  actualFontSize: document.getElementById("actualFontSizeValue"),
  fontFitHint: document.getElementById("fontFitHint"),
  lineHeight: document.getElementById("lineHeightValue"),
  emphasisFontSize: document.getElementById("emphasisFontSizeValue"),
  emphasisLineHeight: document.getElementById("emphasisLineHeightValue"),
  textBoxWidth: document.getElementById("textBoxWidthValue"),
  textBoxX: document.getElementById("textBoxXValue"),
  textBoxY: document.getElementById("textBoxYValue"),
  textBoxHeight: document.getElementById("textBoxHeightValue"),
  letterSpacing: document.getElementById("letterSpacingValue"),
  textBoxBlurAmount: document.getElementById("textBoxBlurAmountValue"),
  textBoxBlurFeather: document.getElementById("textBoxBlurFeatherValue"),
  chunkContrastThreshold: document.getElementById("chunkContrastThresholdValue"),
  chunkContrastPadding: document.getElementById("chunkContrastPaddingValue"),
  quoteMarkSize: document.getElementById("quoteMarkSizeValue"),
  quoteMarkX: document.getElementById("quoteMarkXValue"),
  quoteMarkWeight: document.getElementById("quoteMarkWeightValue"),
  quoteMarkY: document.getElementById("quoteMarkYValue"),
  titleFontSize: document.getElementById("titleFontSizeValue"),
  titleLetterSpacing: document.getElementById("titleLetterSpacingValue"),
  titleX: document.getElementById("titleXValue"),
  titleY: document.getElementById("titleYValue"),
  attributionFontSize: document.getElementById("attributionFontSizeValue"),
  attributionLetterSpacing: document.getElementById("attributionLetterSpacingValue"),
  attributionX: document.getElementById("attributionXValue"),
  attributionY: document.getElementById("attributionYValue"),
  secondaryAttributionFontSize: document.getElementById("secondaryAttributionFontSizeValue"),
  secondaryAttributionLetterSpacing: document.getElementById("secondaryAttributionLetterSpacingValue"),
  secondaryAttributionX: document.getElementById("secondaryAttributionXValue"),
  secondaryAttributionY: document.getElementById("secondaryAttributionYValue"),
};

const presetSizes = {
  "1080x1350": { width: 1080, height: 1350 },
  "1080x1080": { width: 1080, height: 1080 },
  "1080x1920": { width: 1080, height: 1920 },
  "1200x628": { width: 1200, height: 628 },
};

const editorialPalettes = [
  { text: "#b3392f", paperA: "#f8f3eb", paperB: "#efe7dc" },
  { text: "#7f1d1d", paperA: "#f7f1e8", paperB: "#ede3d5" },
  { text: "#1f3a5f", paperA: "#f6f1e8", paperB: "#e8dfd2" },
  { text: "#1b4332", paperA: "#f4efe6", paperB: "#e7decf" },
  { text: "#5b2a86", paperA: "#f8f3ec", paperB: "#eee4d8" },
  { text: "#8a5a00", paperA: "#fbf5ea", paperB: "#efe4cf" },
];

const templateFamilies = {
  none: {
    label: "No Template",
    variants: {
      clean: { label: "Clean", template: "none" },
    },
  },
  editorial: {
    label: "Editorial",
    variants: {
      quote: { label: "Quote", template: "editorial" },
      artsy: { label: "Artsy", template: "artsy" },
      minimal: { label: "Minimal", template: "simple" },
      crested: { label: "Crested", template: "crested-underline" },
    },
  },
  emphasis: {
    label: "Text Emphasis",
    variants: {
      plain: { label: "Plain", template: "text-emphasis" },
      logo: { label: "With Logo", template: "text-emphasis-logo" },
    },
  },
  dark: {
    label: "White On Black",
    variants: {
      framed: { label: "Framed", template: "white-on-black" },
      portrait: { label: "4:5", template: "white-on-black-45" },
    },
  },
  typewriter: {
    label: "Typewriter",
    variants: {
      centered: { label: "Centered", template: "typewriter-1" },
      left: { label: "Left Block", template: "typewriter-2" },
    },
  },
  badge: {
    label: "Badge",
    variants: {
      circle: { label: "Circle", template: "badge" },
      bar: { label: "Bar", template: "circle-bar" },
    },
  },
  metadata: {
    label: "Metadata",
    variants: {
      namebar: { label: "Black Name Bar", template: "black-name-bar" },
      box: { label: "Box", template: "box" },
    },
  },
};

const templateDefinitions = {
  none: {
    mode: "none",
    values: {
      canvasPreset: "1080x1350",
      customWidth: "1080",
      customHeight: "1350",
      fontFamily: "Palatino",
      fontWeight: "600",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "92",
      lineHeight: "1.22",
      emphasisTextEnabled: "off",
      emphasisTextAlign: "left",
      emphasisFontSize: "120",
      emphasisLineHeight: "1",
      autoFitText: "on",
      textBoxWidth: "64",
      textBoxX: "8",
      textBoxY: "18",
      textBoxHeight: "56",
      letterSpacing: "0",
      textBoxBlurEnabled: "off",
      textBoxBlurAmount: "18",
      textBoxBlurFeather: "48",
      backgroundMode: "solid",
      backgroundColorA: "#f7f3ea",
      backgroundColorB: "#ece4d7",
      textColor: "#1f1f1f",
      quoteMarkEnabled: "off",
      quoteMarkSize: "72",
      quoteMarkStyle: "double-classic",
      quoteMarkX: "7",
      quoteMarkWeight: "1",
      quoteMarkY: "6",
      titleEnabled: "on",
      titleFontStyle: "italic",
      titleFontSize: "20",
      titleLetterSpacing: "2",
      titleX: "8",
      titleY: "11",
      authorEnabled: "on",
      attributionFontSize: "18",
      attributionLetterSpacing: "1.4",
      attributionX: "8",
      attributionY: "90",
      attributionColor: "#1f1f1f",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "16",
      secondaryAttributionLetterSpacing: "1.4",
      secondaryAttributionX: "8",
      secondaryAttributionY: "93",
      secondaryAttributionColor: "#4f4f4f",
    },
  },
  editorial: {
    mode: "editorial",
    values: {
      canvasPreset: "1080x1350",
      customWidth: "1080",
      customHeight: "1350",
      fontFamily: "Palatino",
      fontWeight: "600",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "132",
      lineHeight: "1.18",
      autoFitText: "on",
      textBoxWidth: "52",
      textBoxX: "8",
      textBoxY: "18",
      textBoxHeight: "54",
      letterSpacing: "-0.2",
      backgroundMode: "solid",
      quoteMarkEnabled: "on",
      quoteMarkSize: "76",
      quoteMarkStyle: "asset-classic-twin",
      quoteMarkX: "6",
      quoteMarkWeight: "1",
      quoteMarkY: "6",
      titleEnabled: "off",
      titleFontStyle: "italic",
      titleFontSize: "20",
      titleLetterSpacing: "2",
      titleX: "8",
      titleY: "11",
      authorEnabled: "on",
      attributionFontSize: "18",
      attributionLetterSpacing: "3.2",
      attributionX: "7",
      attributionY: "89.5",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "off",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "16",
      secondaryAttributionLetterSpacing: "1.4",
      secondaryAttributionX: "50",
      secondaryAttributionY: "82",
    },
    randomPalette: true,
  },
  artsy: {
    mode: "artsy",
    values: {
      fontFamily: "Georgia",
      fontWeight: "700",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "78",
      lineHeight: "1.08",
      autoFitText: "on",
      textBoxWidth: "34",
      textBoxX: "9",
      textBoxY: "24",
      textBoxHeight: "22",
      letterSpacing: "0.4",
      backgroundMode: "solid",
      backgroundColorA: "#fbfaf4",
      backgroundColorB: "#f2f0e8",
      textColor: "#c4cbc6",
      quoteMarkEnabled: "on",
      quoteMarkStyle: "asset-classic-twin",
      quoteMarkSize: "86",
      quoteMarkX: "7",
      quoteMarkY: "18",
      quoteMarkWeight: "1",
      quoteMarkColor: "#c4cbc6",
      titleEnabled: "on",
      titleFontStyle: "normal",
      titleFontSize: "18",
      titleLetterSpacing: "3",
      titleX: "9",
      titleY: "39",
      titleColor: "#8d8378",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.2",
      attributionX: "9",
      attributionY: "82.5",
      attributionColor: "#7a7a74",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "off",
    },
  },
  badge: {
    mode: "badge",
    values: {
      fontFamily: "Playfair Display",
      fontWeight: "700",
      textAlign: "center",
      layoutMode: "paragraph",
      fontSize: "72",
      lineHeight: "1.04",
      autoFitText: "on",
      textBoxWidth: "54",
      textBoxX: "23",
      textBoxY: "34",
      textBoxHeight: "20",
      letterSpacing: "-0.2",
      backgroundMode: "solid",
      backgroundColorA: "#faf9f6",
      backgroundColorB: "#f2f2ef",
      textColor: "#ffffff",
      quoteMarkEnabled: "off",
      attributionFontSize: "14",
      attributionLetterSpacing: "1.2",
      attributionX: "50",
      attributionY: "76.2",
      attributionColor: "#8b8b8b",
      attributionFontStyle: "normal",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "13",
      secondaryAttributionLetterSpacing: "0.1",
      secondaryAttributionX: "58.5",
      secondaryAttributionY: "76.2",
      secondaryAttributionColor: "#8b8b8b",
    },
  },
  "black-name-bar": {
    mode: "black-name-bar",
    values: {
      fontFamily: "Georgia",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "82",
      lineHeight: "1.42",
      autoFitText: "on",
      textBoxWidth: "62",
      textBoxX: "19",
      textBoxY: "17",
      textBoxHeight: "50",
      letterSpacing: "3.2",
      backgroundMode: "solid",
      backgroundColorA: "#f3f2ef",
      backgroundColorB: "#e8e6df",
      textColor: "#292929",
      quoteMarkEnabled: "off",
      authorEnabled: "on",
      attributionFontSize: "19",
      attributionLetterSpacing: "0.8",
      attributionX: "50",
      attributionY: "76.5",
      attributionColor: "#ffffff",
      attributionFontStyle: "normal",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "14",
      secondaryAttributionLetterSpacing: "0.6",
      secondaryAttributionX: "50",
      secondaryAttributionY: "84",
      secondaryAttributionColor: "#555555",
    },
  },
  "circle-bar": {
    mode: "circle-bar",
    values: {
      fontFamily: "Helvetica",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "paragraph",
      fontSize: "82",
      lineHeight: "1.18",
      autoFitText: "on",
      textBoxWidth: "62",
      textBoxX: "19",
      textBoxY: "34",
      textBoxHeight: "22",
      letterSpacing: "-0.8",
      backgroundMode: "solid",
      backgroundColorA: "#f9f9f8",
      backgroundColorB: "#f0efed",
      textColor: "#242424",
      quoteMarkEnabled: "off",
      attributionFontSize: "20",
      attributionLetterSpacing: "-0.3",
      attributionX: "30",
      attributionY: "77",
      attributionColor: "#242424",
      attributionFontStyle: "normal",
    },
  },
  box: {
    mode: "box",
    values: {
      fontFamily: "Georgia",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "88",
      lineHeight: "1.42",
      autoFitText: "on",
      textBoxWidth: "50",
      textBoxX: "25",
      textBoxY: "32",
      textBoxHeight: "25",
      letterSpacing: "1.1",
      backgroundMode: "solid",
      backgroundColorA: "#f4f3f0",
      backgroundColorB: "#eae8e1",
      textColor: "#2c2c2c",
      quoteMarkEnabled: "off",
      authorEnabled: "on",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.2",
      attributionX: "50",
      attributionY: "72",
      attributionColor: "#2f2f2f",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "14",
      secondaryAttributionLetterSpacing: "0.1",
      secondaryAttributionX: "50",
      secondaryAttributionY: "76",
      secondaryAttributionColor: "#2f2f2f",
    },
  },
  "typewriter-1": {
    mode: "typewriter-1",
    values: {
      fontFamily: "Courier New",
      fontWeight: "700",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "70",
      lineHeight: "1.35",
      autoFitText: "on",
      textBoxWidth: "56",
      textBoxX: "22",
      textBoxY: "18",
      textBoxHeight: "40",
      letterSpacing: "0.2",
      backgroundMode: "solid",
      backgroundColorA: "#f3f2ee",
      backgroundColorB: "#e6e3db",
      textColor: "#232323",
      quoteMarkEnabled: "off",
      attributionFontSize: "18",
      attributionLetterSpacing: "-0.4",
      attributionX: "50",
      attributionY: "71",
      attributionColor: "#232323",
      attributionFontStyle: "normal",
      secondaryAttributionEnabled: "off",
    },
  },
  "typewriter-2": {
    mode: "typewriter-2",
    values: {
      fontFamily: "Courier New",
      fontWeight: "700",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "68",
      lineHeight: "1.34",
      autoFitText: "on",
      textBoxWidth: "60",
      textBoxX: "18",
      textBoxY: "18",
      textBoxHeight: "34",
      letterSpacing: "0.1",
      backgroundMode: "solid",
      backgroundColorA: "#f7f6f2",
      backgroundColorB: "#ece9e0",
      textColor: "#232323",
      quoteMarkEnabled: "off",
      attributionFontSize: "17",
      attributionLetterSpacing: "-0.2",
      attributionX: "50",
      attributionY: "67",
      attributionColor: "#232323",
      attributionFontStyle: "normal",
      secondaryAttributionEnabled: "off",
    },
  },
  "text-emphasis": {
    mode: "text-emphasis",
    values: {
      fontFamily: "Helvetica",
      fontWeight: "700",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "96",
      lineHeight: "1.06",
      emphasisTextEnabled: "on",
      emphasisTextAlign: "left",
      emphasisFontSize: "126",
      emphasisLineHeight: "0.95",
      autoFitText: "on",
      textBoxWidth: "52",
      textBoxX: "16",
      textBoxY: "15",
      textBoxHeight: "18",
      letterSpacing: "0",
      backgroundMode: "solid",
      backgroundColorA: "#0a0a0a",
      backgroundColorB: "#111111",
      textColor: "#ffffff",
      quoteMarkEnabled: "off",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.8",
      attributionX: "73",
      attributionY: "84.5",
      attributionColor: "#d6d6d6",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "off",
    },
  },
  "text-emphasis-logo": {
    mode: "text-emphasis-logo",
    values: {
      fontFamily: "Helvetica",
      fontWeight: "700",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "92",
      lineHeight: "1.06",
      emphasisTextEnabled: "on",
      emphasisTextAlign: "left",
      emphasisFontSize: "120",
      emphasisLineHeight: "0.95",
      autoFitText: "on",
      textBoxWidth: "52",
      textBoxX: "16",
      textBoxY: "15",
      textBoxHeight: "18",
      letterSpacing: "0",
      backgroundMode: "solid",
      backgroundColorA: "#000000",
      backgroundColorB: "#101010",
      textColor: "#ffffff",
      quoteMarkEnabled: "off",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.7",
      attributionX: "73",
      attributionY: "84.5",
      attributionColor: "#d8d8d8",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "off",
    },
  },
  "white-on-black": {
    mode: "white-on-black",
    values: {
      fontFamily: "Palatino",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "84",
      lineHeight: "1.4",
      autoFitText: "on",
      textBoxWidth: "58",
      textBoxX: "21",
      textBoxY: "24",
      textBoxHeight: "32",
      letterSpacing: "2.6",
      backgroundMode: "solid",
      backgroundColorA: "#000000",
      backgroundColorB: "#000000",
      textColor: "#f2f2f2",
      quoteMarkEnabled: "on",
      quoteMarkStyle: "circle-stamp",
      quoteMarkSize: "48",
      quoteMarkX: "47.2",
      quoteMarkY: "15",
      quoteMarkColor: "#f0f0f0",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.4",
      attributionX: "50",
      attributionY: "73",
      attributionColor: "#ededed",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "14",
      secondaryAttributionLetterSpacing: "0.2",
      secondaryAttributionX: "50",
      secondaryAttributionY: "78",
      secondaryAttributionColor: "#d7d7d7",
    },
  },
  "white-on-black-45": {
    mode: "white-on-black-45",
    values: {
      fontFamily: "Palatino",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "paragraph",
      fontSize: "78",
      lineHeight: "1.28",
      autoFitText: "on",
      textBoxWidth: "48",
      textBoxX: "26",
      textBoxY: "24",
      textBoxHeight: "20",
      letterSpacing: "-0.3",
      backgroundMode: "solid",
      backgroundColorA: "#2a2827",
      backgroundColorB: "#2a2827",
      textColor: "#f5f3ee",
      quoteMarkEnabled: "off",
      attributionFontSize: "16",
      attributionLetterSpacing: "3.6",
      attributionX: "50",
      attributionY: "69.5",
      attributionColor: "#f5f3ee",
      attributionFontStyle: "normal",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "normal",
      secondaryAttributionFontSize: "13",
      secondaryAttributionLetterSpacing: "2.2",
      secondaryAttributionX: "50",
      secondaryAttributionY: "76.5",
      secondaryAttributionColor: "#cfcfcf",
      emphasisTextEnabled: "off",
    },
  },
  "crested-underline": {
    mode: "crested-underline",
    values: {
      fontFamily: "Palatino",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "72",
      lineHeight: "1.38",
      autoFitText: "on",
      textBoxWidth: "58",
      textBoxX: "21",
      textBoxY: "20",
      textBoxHeight: "34",
      letterSpacing: "1.1",
      backgroundMode: "solid",
      backgroundColorA: "#f8f7f4",
      backgroundColorB: "#efede7",
      textColor: "#2c2c2c",
      quoteMarkEnabled: "off",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.1",
      attributionX: "32",
      attributionY: "71",
      attributionColor: "#2e2e2e",
      attributionFontStyle: "italic",
    },
  },
  simple: {
    mode: "simple",
    values: {
      fontFamily: "Georgia",
      fontWeight: "500",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "80",
      lineHeight: "1.34",
      autoFitText: "on",
      textBoxWidth: "62",
      textBoxX: "19",
      textBoxY: "26",
      textBoxHeight: "28",
      letterSpacing: "0",
      backgroundMode: "solid",
      backgroundColorA: "#faf9f6",
      backgroundColorB: "#f0efeb",
      textColor: "#2f2f2f",
      quoteMarkEnabled: "off",
      attributionFontSize: "16",
      attributionLetterSpacing: "0.1",
      attributionX: "45.5",
      attributionY: "80.5",
      attributionColor: "#2f2f2f",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "15",
      secondaryAttributionLetterSpacing: "0.1",
      secondaryAttributionX: "56",
      secondaryAttributionY: "84",
      secondaryAttributionColor: "#2f2f2f",
    },
  },
};

const templateLayerRules = {
  none: { logo: "none" },
  editorial: { logo: "semicolon-black" },
  artsy: { logo: "none" },
  badge: { logo: "none" },
  "black-name-bar": { logo: "semicolon-black" },
  "circle-bar": { logo: "text-black" },
  box: { logo: "semicolon-black" },
  "typewriter-1": { logo: "text-black" },
  "typewriter-2": { logo: "text-black" },
  "text-emphasis": { logo: "semicolon-white" },
  "text-emphasis-logo": { logo: "text-white" },
  "white-on-black": { logo: "semicolon-white" },
  "white-on-black-45": { logo: "text-white" },
  "crested-underline": { logo: "semicolon-black" },
  simple: { logo: "text-black" },
};

const state = {
  aiBackgroundImage: null,
  aiBackgroundDataUrl: null,
  selectedRecord: null,
  logoImages: {},
  appConfig: null,
  historySaveTimer: null,
  currentProjectId: null,
  snapshotDbPromise: null,
  backgroundPromptTouched: false,
  lastBackgroundPromptSeed: "",
  backgroundAssetSaveTimer: null,
  showLineBreakGuide: false,
  drive: {
    config: null,
    accessToken: "",
    tokenClient: null,
    pickerReady: false,
    selectedFolder: null,
  },
};

const PROJECT_HISTORY_KEY = "pig-project-history-v1";
const BACKGROUND_LIBRARY_KEY = "pig-background-library-v1";
const WEAVER_SUPPRESSED_REQUESTS_KEY = "pig-weaver-suppressed-requests-v1";
const BACKGROUND_MODEL_PREFERENCE_KEY = "pig-background-model-preference-v1";
const MAX_PROJECT_HISTORY = 20;
const MAX_BACKGROUND_LIBRARY = 36;
const MAX_WEAVER_SUPPRESSED_REQUESTS = 400;
const PROJECT_SNAPSHOT_DB = "pig-project-snapshots";
const PROJECT_SNAPSHOT_DB_VERSION = 2;
const PROJECT_BACKGROUND_STORE = "backgrounds";
const BACKGROUND_ASSET_STORE = "background-assets";
const RECORD_LOAD_TIMEOUT_MS = 20000;
const GOOGLE_FONT_FAMILIES = new Set([
  "Playfair Display",
  "Bodoni Moda",
  "DM Serif Display",
  "Cormorant Garamond",
  "Crimson Text",
  "EB Garamond",
  "Libre Baskerville",
  "Lora",
  "Merriweather",
  "Alegreya",
  "Literata",
  "Newsreader",
  "Spectral",
  "Fraunces",
  "Roboto Slab",
  "Abril Fatface",
  "Archivo Black",
  "Anton",
  "Source Sans 3",
  "League Spartan",
  "IBM Plex Sans Condensed",
  "Archivo Narrow",
  "Barlow Condensed",
  "Oswald",
  "Bebas Neue",
  "Staatliches",
  "Unica One",
  "Young Serif",
  "Space Grotesk",
  "Special Elite",
  "Courier Prime",
  "IBM Plex Mono",
  "Roboto Mono",
  "Caveat",
  "Kalam",
  "Patrick Hand",
]);
const SYSTEM_FONT_FAMILIES = new Set([
  "Georgia",
  "Times New Roman",
  "Palatino",
  "Helvetica",
  "Arial",
  "Trebuchet MS",
  "Courier New",
]);
const RANDOM_FONT_FAMILIES = [
  "Playfair Display",
  "Bodoni Moda",
  "DM Serif Display",
  "Cormorant Garamond",
  "Crimson Text",
  "EB Garamond",
  "Libre Baskerville",
  "Lora",
  "Merriweather",
  "Alegreya",
  "Literata",
  "Newsreader",
  "Spectral",
  "Fraunces",
  "Palatino",
  "Georgia",
  "Times New Roman",
  "Roboto Slab",
  "Source Sans 3",
  "Helvetica",
  "Arial",
  "League Spartan",
  "IBM Plex Sans Condensed",
  "Archivo Narrow",
  "Barlow Condensed",
  "Archivo Black",
  "Anton",
  "Oswald",
  "Bebas Neue",
  "Staatliches",
  "Unica One",
  "Young Serif",
  "Space Grotesk",
  "Special Elite",
  "Courier Prime",
  "IBM Plex Mono",
  "Roboto Mono",
  "Caveat",
  "Kalam",
  "Patrick Hand",
];
const RANDOM_QUOTE_MARK_STYLES = [
  "asset-classic-twin",
  "asset-editorial-dots",
  "asset-soft-ribbon",
  "asset-deco-block",
  "asset-button-orbit",
  "double-classic",
  "double-curly",
];
const RANDOM_TEXT_COLORS = ["#111111", "#f7f3ea", "#1b4332", "#5b2a86", "#7f1d1d", "#1f3a5f", "#8a5a00"];
const NON_SERIALIZED_CONTROL_IDS = new Set([
  "searchResults",
  "statusMessage",
  "backgroundImageUpload",
  "backgroundAssets",
  "driveUploadDialog",
  "driveFileName",
  "driveFolderSummary",
  "weaverProductionNotesDialog",
  "driveUploadStatus",
  "selectedRecordMeta",
  "recentProjects",
]);

function getSourceOptionLabel(sourceKey, sourceInfo = {}) {
  if (sourceInfo.available === false) {
    return `${sourceInfo.label || sourceKey} (Unavailable here)`;
  }
  return sourceInfo.label || sourceKey;
}

function applyAppConfig(config) {
  state.appConfig = config;
  const availability = config?.sourceAvailability || {};
  [...controls.sourceType.options].forEach((option) => {
    const sourceInfo = availability[option.value];
    if (!sourceInfo) {
      return;
    }
    option.disabled = sourceInfo.available === false;
    option.textContent = getSourceOptionLabel(option.value, sourceInfo);
  });

  const availableSources = Object.entries(availability)
    .filter(([, info]) => info.available)
    .map(([key]) => key);
  const desiredDefault = config?.defaultSource || "weaver_graphics_requests";
  if (!availableSources.includes(controls.sourceType.value)) {
    controls.sourceType.value = availableSources.includes(desiredDefault)
      ? desiredDefault
      : availableSources[0] || controls.sourceType.value;
  }

  const unavailableCount = Object.values(availability).filter((info) => info.available === false).length;
  controls.sourceAvailabilityNote.textContent = unavailableCount
    ? `${unavailableCount} source${unavailableCount === 1 ? "" : "s"} unavailable in this environment.`
    : "";
}

async function loadAppConfig() {
  const response = await fetch("/api/app-config");
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Could not load app configuration.");
  }
  applyAppConfig(payload);
  return payload;
}

const logoAssetUrls = {
  "text-black": "./assets/logos/button-text-black.png",
  "text-white": "./assets/logos/button-text-white.png",
  "semicolon-black": "./assets/logos/button-semicolon-black.png",
  "semicolon-white": "./assets/logos/button-semicolon-white.png",
};

const quoteMarkAssetUrls = {
  "asset-classic-twin": "./assets/quote-marks/classic-twin.svg",
  "asset-editorial-swan": "./assets/quote-marks/editorial-swan.svg",
  "asset-editorial-dots": "./assets/quote-marks/editorial-dots.svg",
  "asset-deco-block": "./assets/quote-marks/deco-block.svg",
  "asset-frame-notched": "./assets/quote-marks/frame-notched.svg",
  "asset-typewriter-worn": "./assets/quote-marks/typewriter-worn.svg",
  "asset-bold-poster": "./assets/quote-marks/bold-poster.svg",
  "asset-soft-ribbon": "./assets/quote-marks/soft-ribbon.svg",
  "asset-button-orbit": "./assets/quote-marks/button-orbit.svg",
  "asset-button-semicolon-twin": "./assets/quote-marks/button-semicolon-twin.svg",
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length !== 6) {
    return null;
  }
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function relativeLuminance({ r, g, b }) {
  const transform = (channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function contrastRatio(colorA, colorB) {
  const luminanceA = relativeLuminance(colorA);
  const luminanceB = relativeLuminance(colorB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

function sampleRegionAverageColor(x, y, width, height) {
  const clampedX = clamp(Math.round(x), 0, canvas.width - 1);
  const clampedY = clamp(Math.round(y), 0, canvas.height - 1);
  const clampedWidth = clamp(Math.round(width), 1, canvas.width - clampedX);
  const clampedHeight = clamp(Math.round(height), 1, canvas.height - clampedY);
  const imageData = context.getImageData(clampedX, clampedY, clampedWidth, clampedHeight).data;
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;

  for (let index = 0; index < imageData.length; index += 4) {
    const alpha = imageData[index + 3];
    if (alpha === 0) {
      continue;
    }
    red += imageData[index];
    green += imageData[index + 1];
    blue += imageData[index + 2];
    count += 1;
  }

  if (!count) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: red / count,
    g: green / count,
    b: blue / count,
  };
}

function sampleRegionContrastPalette(x, y, width, height) {
  const palette = [sampleRegionAverageColor(x, y, width, height)];
  const columns = 3;
  const rows = 3;
  const cellWidth = Math.max(12, width / columns);
  const cellHeight = Math.max(12, height / rows);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const cellX = x + (width / columns) * column;
      const cellY = y + (height / rows) * row;
      palette.push(sampleRegionAverageColor(cellX, cellY, cellWidth, cellHeight));
    }
  }

  return palette;
}

function minContrastAgainstPalette(colorValue, palette) {
  const colorRgb = toRgb(colorValue);
  return palette.reduce((minimum, backgroundColor) => {
    const ratio = contrastRatio(colorRgb, backgroundColor);
    return Math.min(minimum, ratio);
  }, Infinity);
}

function minimumContrastAcrossPalette(colorRgb, palette) {
  return palette.reduce((lowestContrast, backgroundColor) => {
    const ratio = contrastRatio(colorRgb, backgroundColor);
    return Math.min(lowestContrast, ratio);
  }, Number.POSITIVE_INFINITY);
}

function isNearNeutralColor({ r, g, b }) {
  return Math.max(r, g, b) - Math.min(r, g, b) < 24;
}

function mixColors(colorA, colorB, ratio) {
  return {
    r: colorA.r + (colorB.r - colorA.r) * ratio,
    g: colorA.g + (colorB.g - colorA.g) * ratio,
    b: colorA.b + (colorB.b - colorA.b) * ratio,
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function resolveAccessibleColorValue(colorValue, box, minimumContrast = 3.2, options = {}) {
  const { preserveAccent = false } = options;
  if (controls.autoContrast.value !== "on") {
    return { color: colorValue, shifted: false };
  }
  const desiredColor = hexToRgb(colorValue);
  if (!desiredColor) {
    return { color: colorValue, shifted: false };
  }

  const backgroundPalette = sampleRegionContrastPalette(box.x, box.y, box.width, box.height);
  const currentContrast = minimumContrastAcrossPalette(desiredColor, backgroundPalette);
  const effectiveMinimumContrast = isNearNeutralColor(desiredColor)
    ? minimumContrast
    : Math.min(minimumContrast, preserveAccent ? 2.15 : 2.8);
  if (currentContrast >= effectiveMinimumContrast) {
    return { color: colorValue, shifted: false };
  }

  const huePreservingAlternatives = isNearNeutralColor(desiredColor)
    ? []
    : [
        rgbToHex(mixColors(desiredColor, { r: 255, g: 255, b: 255 }, 0.2)),
        rgbToHex(mixColors(desiredColor, { r: 255, g: 255, b: 255 }, 0.4)),
        rgbToHex(mixColors(desiredColor, { r: 0, g: 0, b: 0 }, 0.2)),
        rgbToHex(mixColors(desiredColor, { r: 0, g: 0, b: 0 }, 0.4)),
      ];
  const neutralAlternatives = ["#ffffff", "#111111", "#f7f3ea", "#e8e1d4", "#d9d9d9", "#1f1f1f"];
  const alternatives = [...huePreservingAlternatives, ...neutralAlternatives];
  let bestColor = colorValue;
  let bestContrast = currentContrast;
  let bestHueColor = colorValue;
  let bestHueContrast = currentContrast;

  alternatives.forEach((candidate) => {
    const rgb = hexToRgb(candidate);
    if (!rgb) {
      return;
    }
    const ratio = minimumContrastAcrossPalette(rgb, backgroundPalette);
    if (ratio > bestContrast) {
      bestContrast = ratio;
      bestColor = candidate;
    }
    if (huePreservingAlternatives.includes(candidate) && ratio > bestHueContrast) {
      bestHueContrast = ratio;
      bestHueColor = candidate;
    }
  });

  if (preserveAccent && !isNearNeutralColor(desiredColor)) {
    if (bestHueColor !== colorValue && bestHueContrast >= Math.max(currentContrast + 0.2, 1.8)) {
      return { color: bestHueColor, shifted: true };
    }
    if (currentContrast >= 1.8) {
      return { color: colorValue, shifted: false };
    }
  }

  return { color: bestColor, shifted: bestColor !== colorValue };
}

function resolveAccessibleTextColor(box) {
  if (controls.chunkContrastEnabled.value === "on") {
    return controls.textColor.value;
  }
  return resolveAccessibleColorValue(controls.textColor.value, box, 3.2).color;
}

function resolveAccessibleLayerColor(colorValue, box, minimumContrast = 3.2) {
  return resolveAccessibleColorValue(colorValue, box, minimumContrast);
}

function estimateTextRegionBox(x, y, lines, fontSize, lineHeight, letterSpacing, align = "left", padding = 16) {
  const widths = lines.map((line) => measureSpacedText(line, letterSpacing));
  const widest = widths.length ? Math.max(...widths) : fontSize;
  const height = Math.max(fontSize, lines.length * fontSize * lineHeight);
  let left = x;

  if (align === "center") {
    left = x - widest / 2;
  } else if (align === "right") {
    left = x - widest;
  }

  return {
    x: Math.max(0, left - padding),
    y: Math.max(0, y - padding),
    width: Math.min(canvas.width, widest + padding * 2),
    height: Math.min(canvas.height, height + padding * 2),
  };
}

function syncCanvasSize() {
  if (controls.canvasPreset.value !== "custom") {
    const preset = presetSizes[controls.canvasPreset.value];
    controls.customWidth.value = preset.width;
    controls.customHeight.value = preset.height;
  }

  const width = clamp(Number(controls.customWidth.value) || 1080, 320, 4000);
  const height = clamp(Number(controls.customHeight.value) || 1350, 320, 4000);

  canvas.width = width;
  canvas.height = height;
}

function setStatus(message) {
  controls.statusMessage.textContent = message;
}

function computePoemPromptSeed() {
  return controls.poemText.value.replace(/\r\n/g, "\n").trim();
}

function syncBackgroundPromptTouchState() {
  const prompt = controls.backgroundPrompt.value.replace(/\r\n/g, "\n").trim();
  state.backgroundPromptTouched = Boolean(prompt && prompt !== state.lastBackgroundPromptSeed);
}

function seedBackgroundPromptFromPoem(options = {}) {
  const { force = false } = options;
  const poemSeed = computePoemPromptSeed();
  if (!poemSeed) {
    return;
  }

  const currentPrompt = controls.backgroundPrompt.value.replace(/\r\n/g, "\n").trim();
  const shouldReplace =
    force ||
    !currentPrompt ||
    !state.backgroundPromptTouched ||
    currentPrompt === state.lastBackgroundPromptSeed;

  if (!shouldReplace) {
    return;
  }

  controls.backgroundPrompt.value = poemSeed;
  state.lastBackgroundPromptSeed = poemSeed;
  state.backgroundPromptTouched = false;
}

function drawGeneratedBackground(width, height) {
  if (!state.aiBackgroundImage || controls.backgroundMode.value !== "ai-image") {
    return false;
  }

  const image = state.aiBackgroundImage;
  const imageRatio = image.width / image.height;
  const canvasRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  return true;
}

function drawFallbackBackground(width, height) {
  const colorA = controls.backgroundColorA.value;
  const colorB = controls.backgroundColorB.value;
  const mode = controls.backgroundMode.value;

  if (mode === "solid") {
    context.fillStyle = colorA;
    context.fillRect(0, 0, width, height);
    return;
  }

  if (mode === "gradient" || mode === "ai-image") {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return;
  }

  context.fillStyle = colorA;
  context.fillRect(0, 0, width, height);

  if (mode === "stripes") {
    context.strokeStyle = colorB;
    context.lineWidth = Math.max(12, width * 0.02);
    const gap = Math.max(48, width * 0.08);

    for (let offset = -height; offset < width + height; offset += gap) {
      context.beginPath();
      context.moveTo(offset, 0);
      context.lineTo(offset - height, height);
      context.stroke();
    }
    return;
  }

  if (mode === "dots") {
    const gap = Math.max(42, width * 0.07);
    const radius = Math.max(8, width * 0.012);
    context.fillStyle = colorB;

    for (let y = gap * 0.5; y < height; y += gap) {
      for (let x = gap * 0.5; x < width; x += gap) {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }
  }
}

function drawBackground(width, height) {
  if (controls.backgroundMode.value === "ai-image") {
    // Always paint an opaque base first so transparent pixels in generated
    // backgrounds do not leak through into exported PNGs.
    drawFallbackBackground(width, height);
    drawGeneratedBackground(width, height);
    return;
  }

  drawFallbackBackground(width, height);
}

function drawRoundedRectPath(targetContext, x, y, width, height, radius) {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
  targetContext.beginPath();
  targetContext.moveTo(x + safeRadius, y);
  targetContext.lineTo(x + width - safeRadius, y);
  targetContext.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  targetContext.lineTo(x + width, y + height - safeRadius);
  targetContext.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  targetContext.lineTo(x + safeRadius, y + height);
  targetContext.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  targetContext.lineTo(x, y + safeRadius);
  targetContext.quadraticCurveTo(x, y, x + safeRadius, y);
  targetContext.closePath();
}

function applyTextBoxBackgroundBlur(width, height) {
  if (controls.textBoxBlurEnabled.value !== "on") {
    return;
  }

  const blurAmount = Number(controls.textBoxBlurAmount.value);
  const feather = Number(controls.textBoxBlurFeather.value);
  const textBox = getTextBox(width, height);
  const padding = feather * 0.75;
  const blurRegion = {
    x: Math.max(0, textBox.x - padding),
    y: Math.max(0, textBox.y - padding),
    width: Math.min(width, textBox.width + padding * 2),
    height: Math.min(height, textBox.height + padding * 2),
  };

  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = width;
  sourceCanvas.height = height;
  const sourceContext = sourceCanvas.getContext("2d");
  sourceContext.drawImage(canvas, 0, 0);

  const blurredCanvas = document.createElement("canvas");
  blurredCanvas.width = width;
  blurredCanvas.height = height;
  const blurredContext = blurredCanvas.getContext("2d");
  blurredContext.filter = `blur(${blurAmount}px)`;
  blurredContext.drawImage(sourceCanvas, 0, 0);
  blurredContext.filter = "none";

  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskContext = maskCanvas.getContext("2d");
  maskContext.filter = `blur(${feather}px)`;
  maskContext.fillStyle = "#ffffff";
  drawRoundedRectPath(
    maskContext,
    blurRegion.x + feather * 0.35,
    blurRegion.y + feather * 0.35,
    Math.max(12, blurRegion.width - feather * 0.7),
    Math.max(12, blurRegion.height - feather * 0.7),
    Math.min(48, Math.max(18, feather * 0.6)),
  );
  maskContext.fill();
  maskContext.filter = "none";

  const compositeCanvas = document.createElement("canvas");
  compositeCanvas.width = width;
  compositeCanvas.height = height;
  const compositeContext = compositeCanvas.getContext("2d");
  compositeContext.drawImage(blurredCanvas, 0, 0);
  compositeContext.globalCompositeOperation = "destination-in";
  compositeContext.drawImage(maskCanvas, 0, 0);
  compositeContext.globalCompositeOperation = "source-over";

  context.drawImage(compositeCanvas, 0, 0);
}

function drawCenteredRule(x, y, width, lineWidth, color) {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(x - width / 2, y);
  context.lineTo(x + width / 2, y);
  context.stroke();
  context.restore();
}

function ensureLogoImagesLoaded() {
  Object.entries(logoAssetUrls).forEach(([key, url]) => {
    if (state.logoImages[key]) {
      return;
    }
    const image = new Image();
    image.onload = () => {
      render();
    };
    image.src = url;
    state.logoImages[key] = image;
  });
}

function ensureQuoteMarkImagesLoaded() {
  Object.entries(quoteMarkAssetUrls).forEach(([key, url]) => {
    if (state.logoImages[key]) {
      return;
    }
    const image = new Image();
    image.onload = () => {
      render();
    };
    image.src = url;
    state.logoImages[key] = image;
  });
}

function drawLogoAsset(assetKey, x, y, targetWidth, tintColor = null) {
  const image = state.logoImages[assetKey];
  if (!image || !image.complete || !image.naturalWidth) {
    return;
  }

  const aspectRatio = image.naturalWidth / image.naturalHeight;
  const width = targetWidth;
  const height = width / aspectRatio;
  const drawX = x - width / 2;
  const drawY = y - height / 2;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  if (!tintColor) {
    context.drawImage(image, drawX, drawY, width, height);
    return;
  }

  const pixelRatio = window.devicePixelRatio || 1;
  const offscreen = document.createElement("canvas");
  offscreen.width = Math.max(1, Math.round(width * pixelRatio));
  offscreen.height = Math.max(1, Math.round(height * pixelRatio));
  const offscreenContext = offscreen.getContext("2d");
  offscreenContext.imageSmoothingEnabled = true;
  offscreenContext.imageSmoothingQuality = "high";
  offscreenContext.drawImage(image, 0, 0, offscreen.width, offscreen.height);
  offscreenContext.globalCompositeOperation = "source-in";
  offscreenContext.fillStyle = tintColor;
  offscreenContext.fillRect(0, 0, offscreen.width, offscreen.height);
  context.drawImage(offscreen, drawX, drawY, width, height);
}

function drawTintedImage(image, x, y, width, height, tintColor = null) {
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  if (!tintColor) {
    context.drawImage(image, x, y, width, height);
    return;
  }

  const pixelRatio = window.devicePixelRatio || 1;
  const offscreen = document.createElement("canvas");
  offscreen.width = Math.max(1, Math.round(width * pixelRatio));
  offscreen.height = Math.max(1, Math.round(height * pixelRatio));
  const offscreenContext = offscreen.getContext("2d");
  offscreenContext.imageSmoothingEnabled = true;
  offscreenContext.imageSmoothingQuality = "high";
  offscreenContext.drawImage(image, 0, 0, offscreen.width, offscreen.height);
  offscreenContext.globalCompositeOperation = "source-in";
  offscreenContext.fillStyle = tintColor;
  offscreenContext.fillRect(0, 0, offscreen.width, offscreen.height);
  context.drawImage(offscreen, x, y, width, height);
}

function drawTemplateLogo(width, height) {
  const template = controls.templatePreset.value;
  const rule = templateLayerRules[template];
  if (rule && rule.logo === "none") {
    return;
  }
  const logoSpecs = {
    editorial: { asset: "semicolon-black", x: 0.9, y: 0.895, w: 0.042, tint: "match-text" },
    artsy: { asset: "none", x: 0.28, y: 0.9, w: 0.17 },
    badge: { asset: "none", x: 0.5, y: 0.88, w: 0.05 },
    "black-name-bar": { asset: "text-black", x: 0.5, y: 0.90, w: 0.12 },
    "circle-bar": { asset: "text-black", x: 0.5, y: 0.905, w: 0.16 },
    box: { asset: "semicolon-black", x: 0.5, y: 0.89, w: 0.04 },
    "typewriter-1": { asset: "text-black", x: 0.5, y: 0.895, w: 0.16 },
    "typewriter-2": { asset: "text-black", x: 0.5, y: 0.865, w: 0.18 },
    "text-emphasis": { asset: "none", x: 0.18, y: 0.88, w: 0.05 },
    "text-emphasis-logo": { asset: "semicolon-white", x: 0.19, y: 0.87, w: 0.045 },
    "white-on-black": { asset: "none", x: 0.5, y: 0.915, w: 0.04 },
    "white-on-black-45": { asset: "text-white", x: 0.5, y: 0.80, w: 0.12 },
    "crested-underline": { asset: "semicolon-black", x: 0.5, y: 0.88, w: 0.04 },
    simple: { asset: "text-black", x: 0.40, y: 0.81, w: 0.09 },
  };

  const spec = logoSpecs[template];
  if (!spec || spec.asset === "none") {
    return;
  }

  const tintColor =
    spec.tint === "match-text"
      ? controls.textColor.value
      : spec.tint === "match-attribution"
        ? controls.attributionColor.value
        : null;

  drawLogoAsset(spec.asset, width * spec.x, height * spec.y, width * spec.w, tintColor);
}

function drawTemplateOverlay(width, height) {
  const template = controls.templatePreset.value;
  context.save();

  if (template === "none") {
    context.restore();
    return;
  } else if (template === "artsy") {
    context.strokeStyle = "#c1cbc6";
    context.lineWidth = 2;
    for (let index = 0; index < 4; index += 1) {
      const inset = 18 + index * 10;
      context.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    }
  } else if (template === "badge") {
    context.strokeStyle = "#d6d6d6";
    context.lineWidth = 2;
    const gap = 36;
    for (let offset = -height; offset < width + height; offset += gap) {
      context.beginPath();
      context.moveTo(offset, 0);
      context.lineTo(offset + height, height);
      context.stroke();
    }
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(width / 2, height * 0.495, width * 0.34, 0, Math.PI * 2);
    context.fill();
    drawCenteredRule(width / 2, height * 0.295, width * 0.13, 4, "#ffffff");
    drawCenteredRule(width / 2, height * 0.665, width * 0.13, 4, "#ffffff");
  } else if (template === "black-name-bar") {
    context.globalAlpha = 0.12;
    context.fillStyle = "#d9d9d9";
    context.font = `700 ${width * 0.34}px "Georgia"`;
    context.textAlign = "left";
    context.fillText("“", width * 0.06, height * 0.22);
    context.globalAlpha = 1;
    context.fillStyle = "#000000";
    context.fillRect(width * 0.34, height * 0.74, width * 0.32, height * 0.05);
  } else if (template === "circle-bar") {
    drawCenteredRule(width / 2, height * 0.845, width * 0.28, 3, "#929292");
    context.strokeStyle = "#929292";
    context.lineWidth = 3;
    [width * 0.29, width * 0.71].forEach((x) => {
      context.beginPath();
      context.arc(x, height * 0.845, 8, 0, Math.PI * 2);
      context.stroke();
    });
  } else if (template === "box") {
    context.strokeStyle = "#2d2d2d";
    context.lineWidth = 2.5;
    const boxX = width * 0.16;
    const boxY = height * 0.28;
    const boxW = width * 0.68;
    const boxH = height * 0.38;
    context.strokeRect(boxX, boxY, boxW, boxH);
    context.fillStyle = "#f7f6f2";
    context.beginPath();
    context.arc(width / 2, boxY, width * 0.035, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.fillStyle = "#111111";
    context.font = `700 ${width * 0.04}px "Georgia"`;
    context.textAlign = "center";
    context.fillText("“", width / 2, boxY - width * 0.025);
  } else if (template === "typewriter-1" || template === "typewriter-2") {
    context.globalAlpha = 0.1;
    context.fillStyle = "#9b9b9b";
    for (let i = 0; i < 40; i += 1) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      context.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 6);
    }
    context.globalAlpha = 1;
  } else if (template === "text-emphasis" || template === "text-emphasis-logo") {
    context.strokeStyle = "#2c2c2c";
    context.lineWidth = width * 0.02;
    const inset = width * 0.09;
    const radius = width * 0.035;
    context.beginPath();
    context.moveTo(inset + radius, inset);
    context.lineTo(width - inset - radius, inset);
    context.quadraticCurveTo(width - inset, inset, width - inset, inset + radius);
    context.lineTo(width - inset, height - inset - radius);
    context.quadraticCurveTo(width - inset, height - inset, width - inset - radius, height - inset);
    context.lineTo(inset + radius, height - inset);
    context.quadraticCurveTo(inset, height - inset, inset, height - inset - radius);
    context.lineTo(inset, inset + radius);
    context.quadraticCurveTo(inset, inset, inset + radius, inset);
    context.stroke();
  } else if (template === "white-on-black") {
    context.strokeStyle = "#f0f0f0";
    context.lineWidth = 3;
    const inset = width * 0.03;
    context.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    context.strokeStyle = "#f0f0f0";
    context.lineWidth = 2.5;
    context.beginPath();
    context.arc(width / 2, height * 0.215, width * 0.03, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#f0f0f0";
    context.font = `700 ${width * 0.05}px "Georgia"`;
    context.textAlign = "center";
    context.fillText("“", width / 2, height * 0.226);
    context.beginPath();
    context.arc(width / 2 - width * 0.03, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.arc(width / 2 - width * 0.012, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.arc(width / 2 + width * 0.006, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.arc(width / 2 + width * 0.024, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.arc(width / 2 + width * 0.042, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.arc(width / 2 + width * 0.06, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.arc(width / 2 + width * 0.078, height * 0.72, width * 0.004, 0, Math.PI * 2);
    context.fill();
    drawCenteredRule(width / 2, height * 0.955, width * 0.58, 2, "#8b8b8b");
    context.fillStyle = "#9a9a9a";
    context.font = `400 ${width * 0.032}px "Georgia"`;
    context.textAlign = "center";
    context.fillText("buttonpoetry.com", width / 2, height * 0.94);
  } else if (template === "white-on-black-45") {
    drawCenteredRule(width / 2, height * 0.64, width * 0.05, 4, "#f5f3ee");
  } else if (template === "crested-underline") {
    drawCenteredRule(width / 2, height * 0.705, width * 0.48, 2, "#2b2b2b");
    context.fillStyle = "#2b2b2b";
    context.beginPath();
    context.moveTo(width / 2 - 36, height * 0.705);
    context.lineTo(width / 2 - 8, height * 0.698);
    context.lineTo(width / 2 - 8, height * 0.712);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(width / 2 + 36, height * 0.705);
    context.lineTo(width / 2 + 8, height * 0.698);
    context.lineTo(width / 2 + 8, height * 0.712);
    context.closePath();
    context.fill();
    context.beginPath();
    context.arc(width / 2, height * 0.705, 4, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(width / 2 - 10, height * 0.705, 3, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(width / 2 + 10, height * 0.705, 3, 0, Math.PI * 2);
    context.fill();
  } else if (template === "simple") {
    context.strokeStyle = "#8a8a8a";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(width * 0.46, height * 0.815);
    context.lineTo(width * 0.46, height * 0.885);
    context.stroke();
  }

  context.restore();
}

function measureSpacedText(text, letterSpacing) {
  if (!text) {
    return 0;
  }

  let width = 0;
  for (let index = 0; index < text.length; index += 1) {
    width += context.measureText(text[index]).width;
    if (index < text.length - 1) {
      width += letterSpacing;
    }
  }
  return width;
}

function drawSpacedText(text, x, y, align, letterSpacing) {
  if (!text) {
    return;
  }

  const totalWidth = measureSpacedText(text, letterSpacing);
  let cursorX = x;

  if (align === "center") {
    cursorX -= totalWidth / 2;
  } else if (align === "right") {
    cursorX -= totalWidth;
  }

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    context.fillText(character, cursorX, y);
    cursorX += context.measureText(character).width + letterSpacing;
  }
}

function getAlignedTextStartX(text, x, align, letterSpacing) {
  const totalWidth = measureSpacedText(text, letterSpacing);
  let cursorX = x;

  if (align === "center") {
    cursorX -= totalWidth / 2;
  } else if (align === "right") {
    cursorX -= totalWidth;
  }

  return cursorX;
}

function tokenizeTextChunks(text) {
  return text.match(/\s+|[^\s]+/g) || [];
}

function chooseChunkContrastColor(primaryColor, alternateColor, region, minimumContrast) {
  const averageBackground = sampleRegionAverageColor(region.x, region.y, region.width, region.height);
  const primaryRgb = toRgb(primaryColor);
  const alternateRgb = toRgb(alternateColor);

  if (!primaryRgb || !alternateRgb) {
    return { color: primaryColor, swapped: false };
  }

  const primaryContrast = contrastRatio(primaryRgb, averageBackground);
  const alternateContrast = contrastRatio(alternateRgb, averageBackground);

  if (primaryContrast >= minimumContrast || alternateContrast <= primaryContrast) {
    return { color: primaryColor, swapped: false };
  }

  if (alternateContrast >= minimumContrast) {
    return { color: alternateColor, swapped: true };
  }

  return { color: primaryColor, swapped: false };
}

function drawAdaptiveChunkedText(text, x, y, align, letterSpacing, options) {
  const {
    fontSize,
    primaryColor,
    alternateColor,
    minimumContrast,
    samplePadding,
  } = options;

  const tokens = tokenizeTextChunks(text);
  let cursorX = getAlignedTextStartX(text, x, align, letterSpacing);
  let swapped = false;

  tokens.forEach((token, tokenIndex) => {
    let tokenColor = primaryColor;
    if (token.trim()) {
      const tokenWidth = measureSpacedText(token, letterSpacing);
      const region = {
        x: cursorX - samplePadding,
        y: y - samplePadding,
        width: tokenWidth + samplePadding * 2,
        height: fontSize + samplePadding * 2,
      };
      const choice = chooseChunkContrastColor(primaryColor, alternateColor, region, minimumContrast);
      tokenColor = choice.color;
      swapped ||= choice.swapped;
    }

    for (let charIndex = 0; charIndex < token.length; charIndex += 1) {
      const character = token[charIndex];
      if (character.trim()) {
        context.fillStyle = tokenColor;
        context.fillText(character, cursorX, y);
      }
      const isLastCharacter = tokenIndex === tokens.length - 1 && charIndex === token.length - 1;
      cursorX += context.measureText(character).width + (isLastCharacter ? 0 : letterSpacing);
    }
  });

  return { swapped };
}

function wrapLine(line, maxWidth, letterSpacing) {
  if (!line.trim()) {
    return [""];
  }

  const words = line.split(" ");
  const wrapped = [];
  let currentLine = words.shift() || "";

  words.forEach((word) => {
    const candidate = `${currentLine} ${word}`;
    if (measureSpacedText(candidate, letterSpacing) <= maxWidth) {
      currentLine = candidate;
    } else {
      wrapped.push(currentLine);
      currentLine = word;
    }
  });

  wrapped.push(currentLine);
  return wrapped;
}

function buildLines(text, maxWidth, letterSpacing) {
  if (controls.layoutMode.value === "paragraph") {
    return wrapLine(text.replace(/\n+/g, " ").trim(), maxWidth, letterSpacing);
  }

  return text.split("\n").flatMap((line) => wrapLine(line, maxWidth, letterSpacing));
}

function getTextBox(width, height) {
  return {
    x: width * (Number(controls.textBoxX.value) / 100),
    y: height * (Number(controls.textBoxY.value) / 100),
    width: width * (Number(controls.textBoxWidth.value) / 100),
    height: height * (Number(controls.textBoxHeight.value) / 100),
  };
}

function pickPalette() {
  return editorialPalettes[Math.floor(Math.random() * editorialPalettes.length)];
}

function randomChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStep(min, max, step = 1) {
  const steps = Math.round((max - min) / step);
  return (min + randomInt(0, steps) * step).toFixed(step < 1 ? String(step).split(".")[1].length : 0);
}

function setControlValue(key, value) {
  if (!controls[key]) {
    return;
  }
  controls[key].value = String(value);
}

function applyPalette(palette) {
  controls.textColor.value = palette.text;
  controls.quoteMarkColor.value = palette.text;
  controls.attributionColor.value = palette.text;
  syncTitleColorToText();
  if (controls.backgroundMode.value !== "ai-image") {
    controls.backgroundColorA.value = palette.paperA;
    controls.backgroundColorB.value = palette.paperB;
  }
}

function syncTitleColorToText() {
  controls.titleColor.value = controls.textColor.value;
}

const LEADING_QUOTE_CHARS = ['"', "“", "”", "‘", "’", "'", "«", "‹"];
const TRAILING_QUOTE_CHARS = ['"', "”", "“", "’", "‘", "'", "»", "›"];

function stripRenderedOuterQuotes(text) {
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  let firstIndex = lines.findIndex((line) => line.trim());
  let lastIndex = -1;
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (lines[index].trim()) {
      lastIndex = index;
      break;
    }
  }

  if (firstIndex === -1 || lastIndex === -1) {
    return String(text || "");
  }

  lines[firstIndex] = lines[firstIndex].replace(
    /^(\s*)(["“”‘’'«‹]+)/,
    (match, leadingWhitespace) => leadingWhitespace,
  );
  lines[lastIndex] = lines[lastIndex].replace(
    /(["“”‘’'»›]+)(\s*)$/,
    (match, trailingQuotes, trailingWhitespace) => trailingWhitespace,
  );
  return lines.join("\n");
}

function renderedQuoteMode(rawText) {
  const hasDecorativeMark = controls.quoteMarkEnabled.value === "on";
  const policy = controls.quoteHandling.value || "auto";
  const text = String(rawText || "");
  const trimmed = text.trim();
  const hasLeadingQuote = trimmed ? LEADING_QUOTE_CHARS.includes(trimmed[0]) : false;
  const hasTrailingQuote = trimmed ? TRAILING_QUOTE_CHARS.includes(trimmed[trimmed.length - 1]) : false;
  const hasOuterQuotes = hasLeadingQuote || hasTrailingQuote;

  if (!hasDecorativeMark) {
    return { text, showDecorativeMark: false };
  }

  if (policy === "keep-both" || !hasOuterQuotes) {
    return { text, showDecorativeMark: true };
  }

  if (policy === "hide-mark") {
    return { text, showDecorativeMark: false };
  }

  return {
    text: stripRenderedOuterQuotes(text),
    showDecorativeMark: true,
  };
}

function ensureSelectedFontLoaded() {
  if (!document.fonts || typeof document.fonts.load !== "function") {
    return Promise.resolve();
  }

  const fontFamily = controls.fontFamily.value;
  if (!fontFamily) {
    controls.fontFamily.value = "Georgia";
    return Promise.resolve();
  }
  if (SYSTEM_FONT_FAMILIES.has(fontFamily)) {
    return Promise.resolve();
  }
  if (!GOOGLE_FONT_FAMILIES.has(fontFamily)) {
    controls.fontFamily.value = "Georgia";
    setStatus(`Font "${fontFamily}" is not wired into P.I.G. yet, so Georgia was selected instead.`);
    return Promise.resolve();
  }

  const specs = [
    `400 24px "${fontFamily}"`,
    `500 24px "${fontFamily}"`,
    `600 24px "${fontFamily}"`,
    `700 48px "${fontFamily}"`,
    `italic 500 24px "${fontFamily}"`,
    `italic 600 24px "${fontFamily}"`,
  ];

  return Promise.all(specs.map((spec) => document.fonts.load(spec)))
    .then((loadedFaces) => {
      if (!loadedFaces.flat().length) {
        throw new Error(`Font "${fontFamily}" did not load.`);
      }
    })
    .catch(() => {
      controls.fontFamily.value = "Georgia";
      setStatus(`Font "${fontFamily}" could not load, so Georgia was selected instead.`);
    });
}

async function prepareCanvasFontForExport() {
  await ensureSelectedFontLoaded();
  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => {});
  }
  render();
}

function quoteLinesForSize(text, maxWidth, letterSpacing, fontSize, fontWeight, fontFamily) {
  context.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  return buildLines(text, maxWidth, letterSpacing);
}

function fitQuoteFontSize(text, box, desiredFontSize) {
  const lineHeight = Number(controls.lineHeight.value);
  const letterSpacing = Number(controls.letterSpacing.value);
  const fontWeight = controls.fontWeight.value;
  const fontFamily = controls.fontFamily.value;
  const minFontSize = 24;
  let fontSize = desiredFontSize;
  let lines = quoteLinesForSize(text, box.width, letterSpacing, fontSize, fontWeight, fontFamily);

  while (fontSize > minFontSize) {
    const blockHeight = lines.length * fontSize * lineHeight;
    const widest = lines.reduce((max, line) => Math.max(max, measureSpacedText(line, letterSpacing)), 0);
    if (blockHeight <= box.height && widest <= box.width) {
      break;
    }
    fontSize -= 1;
    lines = quoteLinesForSize(text, box.width, letterSpacing, fontSize, fontWeight, fontFamily);
  }

  return { fontSize, lines };
}

function drawQuoteMark(width, height) {
  const quoteMode = renderedQuoteMode(controls.poemText.value);
  if (!quoteMode.showDecorativeMark) {
    return;
  }

  const fontSize = Number(controls.quoteMarkSize.value);
  const x = width * (Number(controls.quoteMarkX.value) / 100);
  const y = height * (Number(controls.quoteMarkY.value) / 100);
  const color = controls.quoteMarkColor.value;
  const style = controls.quoteMarkStyle.value;
  const weightScale = Number(controls.quoteMarkWeight.value);
  const textWeight = clamp(Math.round(weightScale * 500), 300, 900);

  context.save();
  context.fillStyle = color;
  context.strokeStyle = color;
  context.textBaseline = "top";

  if (style.startsWith("asset-")) {
    const image = state.logoImages[style];
    if (image && image.complete && image.naturalWidth) {
      context.save();
      context.filter = "none";
      const aspectRatio = image.naturalWidth / image.naturalHeight;
      const drawWidth = fontSize * 1.35 * clamp(weightScale, 0.7, 1.8);
      const drawHeight = drawWidth / aspectRatio;
      drawTintedImage(image, x, y, drawWidth, drawHeight, color);
      context.restore();
      context.restore();
      return;
    }
  }

  if (style === "single-classic") {
    context.font = `${textWeight} ${fontSize}px "${controls.fontFamily.value}"`;
    context.fillText('"', x, y - fontSize * 0.08);
    context.restore();
    return;
  }

  if (style === "double-classic") {
    context.font = `${textWeight} ${fontSize}px "${controls.fontFamily.value}"`;
    context.fillText('"', x, y - fontSize * 0.08);
    context.fillText('"', x + fontSize * 0.34, y - fontSize * 0.08);
    context.restore();
    return;
  }

  if (style === "double-curly") {
    context.font = `${textWeight} ${fontSize}px "${controls.fontFamily.value}"`;
    context.fillText("“", x, y);
    context.fillText("“", x + fontSize * 0.42, y);
    context.restore();
    return;
  }

  if (style === "circle-stamp" || style === "square-stamp") {
    const boxSize = fontSize * 0.95;
    context.lineWidth = Math.max(2, fontSize * 0.05 * weightScale);
    if (style === "circle-stamp") {
      context.beginPath();
      context.arc(x + boxSize * 0.5, y + boxSize * 0.5, boxSize * 0.42, 0, Math.PI * 2);
      context.stroke();
    } else {
      context.strokeRect(x, y, boxSize * 0.92, boxSize * 0.92);
    }
    context.font = `${textWeight} ${fontSize * 0.7}px "${controls.fontFamily.value}"`;
    context.fillText("“", x + boxSize * 0.18, y + boxSize * 0.08);
    context.restore();
    return;
  }

  context.font = `${textWeight} ${fontSize}px "${controls.fontFamily.value}"`;
  context.fillText('"', x, y - fontSize * 0.08);
  context.fillText('"', x + fontSize * 0.34, y - fontSize * 0.08);
  context.restore();
}

function drawAttribution(width, height, textMetrics = null) {
  if (controls.authorEnabled.value !== "on") {
    return { shifted: false, bottomY: 0, clamped: false };
  }
  const text = controls.attributionText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const fontSize = Number(controls.attributionFontSize.value);
  const x = width * (Number(controls.attributionX.value) / 100);
  const requestedY = height * (Number(controls.attributionY.value) / 100);
  const lineHeight = fontSize * 1.45;
  const letterSpacing = Number(controls.attributionLetterSpacing.value);
  const fontStyle = controls.attributionFontStyle.value;
  const centeredTemplates = new Set(["white-on-black", "white-on-black-45", "black-name-bar"]);
  const align = centeredTemplates.has(controls.templatePreset.value) ? "center" : "left";
  const minSafeY = textMetrics
    ? textMetrics.startY + textMetrics.blockHeight + height * 0.03
    : 0;
  const lines = text.split("\n");
  const maxSafeY = Math.max(0, height - lines.length * lineHeight - height * 0.02);
  const y = Math.min(Math.max(requestedY, minSafeY), maxSafeY);
  const clamped = y !== requestedY;

  context.font = `${fontStyle} 600 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const region = estimateTextRegionBox(x, y, lines, fontSize, 1.45, letterSpacing, align, 28);
  const resolvedColor = resolveAccessibleColorValue(controls.attributionColor.value, region, 4.5, { preserveAccent: true });
  context.fillStyle = resolvedColor.color;

  lines.forEach((line, index) => {
    drawSpacedText(line, x, y + index * lineHeight, align, letterSpacing);
  });
  return { shifted: resolvedColor.shifted, bottomY: y + lines.length * lineHeight, clamped };
}

function drawSecondaryAttribution(width, height, textMetrics = null, attributionMetrics = null) {
  if (controls.secondaryAttributionEnabled.value !== "on") {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const text = controls.secondaryAttributionText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const fontSize = Number(controls.secondaryAttributionFontSize.value);
  const x = width * (Number(controls.secondaryAttributionX.value) / 100);
  const requestedY = height * (Number(controls.secondaryAttributionY.value) / 100);
  const lineHeight = fontSize * 1.4;
  const letterSpacing = Number(controls.secondaryAttributionLetterSpacing.value);
  const fontStyle = controls.secondaryAttributionFontStyle.value;
  const centeredTemplates = new Set(["white-on-black", "white-on-black-45", "black-name-bar"]);
  const align = centeredTemplates.has(controls.templatePreset.value) ? "center" : "left";
  const textBottom = textMetrics ? textMetrics.startY + textMetrics.blockHeight : 0;
  const authorBottom = attributionMetrics?.bottomY || 0;
  const minSafeY = Math.max(textBottom + height * 0.04, authorBottom ? authorBottom + height * 0.012 : 0);
  const lines = text.split("\n");
  const maxSafeY = Math.max(0, height - lines.length * lineHeight - height * 0.02);
  const y = Math.min(Math.max(requestedY, minSafeY), maxSafeY);
  const clamped = y !== requestedY;

  context.font = `${fontStyle} 500 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const region = estimateTextRegionBox(x, y, lines, fontSize, 1.4, letterSpacing, align, 28);
  const resolvedColor = resolveAccessibleColorValue(controls.secondaryAttributionColor.value, region, 4.5, { preserveAccent: true });
  context.fillStyle = resolvedColor.color;

  lines.forEach((line, index) => {
    drawSpacedText(line, x, y + index * lineHeight, align, letterSpacing);
  });
  return { shifted: resolvedColor.shifted, bottomY: y + lines.length * lineHeight, clamped };
}

function drawTitle(width, height) {
  if (controls.titleEnabled.value !== "on") {
    return { shifted: false };
  }

  const text = controls.titleText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false };
  }

  const fontSize = Number(controls.titleFontSize.value);
  const x = width * (Number(controls.titleX.value) / 100);
  const y = height * (Number(controls.titleY.value) / 100);
  const letterSpacing = Number(controls.titleLetterSpacing.value);
  const fontStyle = controls.titleFontStyle.value;

  context.font = `${fontStyle} 600 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const lines = text.split("\n");
  const region = estimateTextRegionBox(x, y, lines, fontSize, 1.3, letterSpacing, "left", 26);
  const resolvedColor = resolveAccessibleColorValue(controls.titleColor.value, region, 4.5, { preserveAccent: true });
  context.fillStyle = resolvedColor.color;

  lines.forEach((line, index) => {
    drawSpacedText(line, x, y + index * fontSize * 1.3, "left", letterSpacing);
  });
  return { shifted: resolvedColor.shifted };
}

function drawText(width, height) {
  const desiredFontSize = Number(controls.fontSize.value);
  const lineHeight = Number(controls.lineHeight.value);
  const letterSpacing = Number(controls.letterSpacing.value);
  const textAlign = controls.textAlign.value;
  const fontFamily = controls.fontFamily.value;
  const fontWeight = controls.fontWeight.value;
  const quoteMode = renderedQuoteMode(controls.poemText.value);
  const text = quoteMode.text.replace(/\r\n/g, "\n");
  const box = getTextBox(width, height);
  const fitResult =
    controls.autoFitText.value === "on"
      ? fitQuoteFontSize(text, box, desiredFontSize)
      : {
          fontSize: desiredFontSize,
          lines: quoteLinesForSize(text, box.width, letterSpacing, desiredFontSize, fontWeight, fontFamily),
        };
  const fontSize = fitResult.fontSize;
  const lines = fitResult.lines;
  const resolvedTextColor = resolveAccessibleTextColor(box);
  const alternateChunkColor = controls.chunkContrastColor.value;
  const chunkContrastEnabled = controls.chunkContrastEnabled.value === "on";
  const chunkContrastThreshold = Number(controls.chunkContrastThreshold.value);
  const chunkContrastPadding = Number(controls.chunkContrastPadding.value);
  let chunkSwapped = false;

  context.fillStyle = resolvedTextColor;
  context.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  context.textBaseline = "top";

  const lineAdvance = fontSize * lineHeight;
  const blockHeight = lines.length * lineAdvance;
  let startY = box.y;
  if (blockHeight < box.height) {
    startY = box.y + (box.height - blockHeight) / 2;
  }

  let drawX = box.x;
  if (textAlign === "center") {
    drawX = box.x + box.width / 2;
  } else if (textAlign === "right") {
    drawX = box.x + box.width;
  }

  lines.forEach((line, index) => {
    const y = startY + index * lineAdvance;
    if (chunkContrastEnabled) {
      const result = drawAdaptiveChunkedText(line, drawX, y, textAlign, letterSpacing, {
        fontSize,
        primaryColor: resolvedTextColor,
        alternateColor: alternateChunkColor,
        minimumContrast: chunkContrastThreshold,
        samplePadding: chunkContrastPadding,
      });
      chunkSwapped ||= result.swapped;
    } else {
      drawSpacedText(line, drawX, y, textAlign, letterSpacing);
    }
  });

  return {
    desiredFontSize,
    actualFontSize: fontSize,
    wasClamped: fontSize !== desiredFontSize,
    resolvedTextColor,
    chunkSwapped,
    box,
    startY,
    blockHeight,
    lineAdvance,
    };
}

function fitEmphasisFontSize(text, box, desiredFontSize, lineHeight, letterSpacing, fontFamily) {
  let fontSize = desiredFontSize;
  let lines = quoteLinesForSize(text, box.width, letterSpacing, fontSize, "700", fontFamily);
  while (fontSize > 24) {
    const blockHeight = lines.length * fontSize * lineHeight;
    const widest = lines.reduce((max, line) => Math.max(max, measureSpacedText(line, letterSpacing)), 0);
    if (blockHeight <= box.height && widest <= box.width) {
      break;
    }
    fontSize -= 2;
    lines = quoteLinesForSize(text, box.width, letterSpacing, fontSize, "700", fontFamily);
  }
  return { fontSize, lines };
}

function drawEmphasisText(width, height, textMetrics) {
  if (controls.emphasisTextEnabled.value !== "on") {
    return { shifted: false, wasClamped: false };
  }

  const text = controls.emphasisText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false, wasClamped: false };
  }

  const lineHeight = Number(controls.emphasisLineHeight.value);
  const letterSpacing = Number(controls.letterSpacing.value);
  const textBox = getTextBox(width, height);
  const top = Math.max(
    textMetrics?.startY + textMetrics?.blockHeight + height * 0.02 || textBox.y + textBox.height + height * 0.015,
    textBox.y + textBox.height + height * 0.015,
  );
  const bottomCandidates = [
    controls.authorEnabled.value === "on" ? height * (Number(controls.attributionY.value) / 100) - height * 0.03 : Infinity,
    controls.secondaryAttributionEnabled.value === "on"
      ? height * (Number(controls.secondaryAttributionY.value) / 100) - height * 0.03
      : Infinity,
    height * 0.9,
  ];
  const emphasisBox = {
    x: textBox.x,
    y: top,
    width: textBox.width,
    height: Math.max(height * 0.08, Math.min(...bottomCandidates) - top),
  };
  const desiredFontSize = Number(controls.emphasisFontSize.value);
  const fitResult = fitEmphasisFontSize(
    text,
    emphasisBox,
    desiredFontSize,
    lineHeight,
    letterSpacing,
    controls.fontFamily.value,
  );
  const fontSize = fitResult.fontSize;
  const lines = fitResult.lines;
  const drawX =
    controls.emphasisTextAlign.value === "center"
      ? emphasisBox.x + emphasisBox.width / 2
      : controls.emphasisTextAlign.value === "right"
        ? emphasisBox.x + emphasisBox.width
        : emphasisBox.x;
  const blockHeight = lines.length * fontSize * lineHeight;
  const startY = emphasisBox.y + Math.max(0, (emphasisBox.height - blockHeight) / 2);
  const resolvedColor = resolveAccessibleColorValue(controls.textColor.value, emphasisBox, 3.2, {
    preserveAccent: true,
  });

  context.fillStyle = resolvedColor.color;
  context.font = `700 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";

  lines.forEach((line, index) => {
    drawSpacedText(line, drawX, startY + index * fontSize * lineHeight, controls.emphasisTextAlign.value, letterSpacing);
  });
  return {
    shifted: resolvedColor.shifted,
    wasClamped: fontSize !== desiredFontSize,
  };
}

function render() {
  syncCanvasSize();

  const width = canvas.width;
  const height = canvas.height;

  readouts.fontSize.textContent = controls.fontSize.value;
  readouts.actualFontSize.textContent = controls.fontSize.value;
  readouts.lineHeight.textContent = controls.lineHeight.value;
  readouts.emphasisFontSize.textContent = controls.emphasisFontSize.value;
  readouts.emphasisLineHeight.textContent = controls.emphasisLineHeight.value;
  readouts.textBoxWidth.textContent = controls.textBoxWidth.value;
  readouts.textBoxX.textContent = controls.textBoxX.value;
  readouts.textBoxY.textContent = controls.textBoxY.value;
  readouts.textBoxHeight.textContent = controls.textBoxHeight.value;
  readouts.letterSpacing.textContent = controls.letterSpacing.value;
  readouts.textBoxBlurAmount.textContent = controls.textBoxBlurAmount.value;
  readouts.textBoxBlurFeather.textContent = controls.textBoxBlurFeather.value;
  readouts.chunkContrastThreshold.textContent = controls.chunkContrastThreshold.value;
  readouts.chunkContrastPadding.textContent = controls.chunkContrastPadding.value;
  readouts.quoteMarkSize.textContent = controls.quoteMarkSize.value;
  readouts.quoteMarkX.textContent = controls.quoteMarkX.value;
  readouts.quoteMarkWeight.textContent = controls.quoteMarkWeight.value;
  readouts.quoteMarkY.textContent = controls.quoteMarkY.value;
  readouts.titleFontSize.textContent = controls.titleFontSize.value;
  readouts.titleLetterSpacing.textContent = controls.titleLetterSpacing.value;
  readouts.titleX.textContent = controls.titleX.value;
  readouts.titleY.textContent = controls.titleY.value;
  readouts.attributionFontSize.textContent = controls.attributionFontSize.value;
  readouts.attributionLetterSpacing.textContent = controls.attributionLetterSpacing.value;
  readouts.attributionX.textContent = controls.attributionX.value;
  readouts.attributionY.textContent = controls.attributionY.value;
  readouts.secondaryAttributionFontSize.textContent = controls.secondaryAttributionFontSize.value;
  readouts.secondaryAttributionLetterSpacing.textContent = controls.secondaryAttributionLetterSpacing.value;
  readouts.secondaryAttributionX.textContent = controls.secondaryAttributionX.value;
  readouts.secondaryAttributionY.textContent = controls.secondaryAttributionY.value;

  context.clearRect(0, 0, width, height);
  drawBackground(width, height);
  applyTextBoxBackgroundBlur(width, height);
  drawTemplateOverlay(width, height);
  drawTemplateLogo(width, height);
  drawQuoteMark(width, height);
  const textMetrics = drawText(width, height);
  const titleMetrics = drawTitle(width, height);
  const emphasisMetrics = drawEmphasisText(width, height, textMetrics);
  const attributionMetrics = drawAttribution(width, height, textMetrics);
  const secondaryAttributionMetrics = drawSecondaryAttribution(width, height, textMetrics, attributionMetrics);

  if (textMetrics) {
    readouts.actualFontSize.textContent = String(textMetrics.actualFontSize);
    if (controls.autoFitText.value === "on" && textMetrics.wasClamped) {
      readouts.fontFitHint.textContent = `Currently capped at ${textMetrics.actualFontSize}px by the text box. Increase box width/height or turn off Fit quote to box to go larger.`;
    } else if (controls.autoFitText.value === "on") {
      readouts.fontFitHint.textContent = "Fit quote to box is on.";
    } else {
      readouts.fontFitHint.textContent = "Fit quote to box is off.";
    }

    if (textMetrics.resolvedTextColor !== controls.textColor.value) {
      readouts.fontFitHint.textContent += ` Text color auto-shifted for contrast.`;
    }
    if (textMetrics.chunkSwapped) {
      readouts.fontFitHint.textContent += ` Text chunks swapped to the alternate color for local contrast.`;
    }
    if (emphasisMetrics?.wasClamped) {
      readouts.fontFitHint.textContent += ` Emphasis text was shrunk to fit.`;
    }
    if (emphasisMetrics?.shifted) {
      readouts.fontFitHint.textContent += ` Emphasis color auto-shifted for contrast.`;
    }
    if (titleMetrics?.shifted) {
      readouts.fontFitHint.textContent += ` Title color auto-shifted for contrast.`;
    }
    if (attributionMetrics?.shifted) {
      readouts.fontFitHint.textContent += ` Author color auto-shifted for contrast.`;
    }
    if (attributionMetrics?.clamped) {
      readouts.fontFitHint.textContent += ` Author position was adjusted to stay visible.`;
    }
    if (secondaryAttributionMetrics?.shifted) {
      readouts.fontFitHint.textContent += ` Book title color auto-shifted for contrast.`;
    }
    if (secondaryAttributionMetrics?.clamped) {
      readouts.fontFitHint.textContent += ` Book title position was adjusted to stay visible.`;
    }
  }
}

async function downloadImage() {
  await prepareCanvasFontForExport();
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "poem-image.png";
  link.click();
  markWeaverRequestSuppressed(state.selectedRecord, {
    completedAt: new Date().toISOString(),
    status: "downloaded_from_pig",
  });
  saveProjectSnapshot();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatLineBreakGuide(text) {
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  return lines
    .map((line, index) => {
      const visibleLine = line
        ? escapeHtml(line)
        : '<span class="line-break-guide-blank">(blank line)</span>';
      return `<span class="line-break-guide-line-number">${index + 1}.</span> ${visibleLine}<span class="line-break-guide-break"> ↵</span>`;
    })
    .join("\n");
}

function renderLineBreakGuide() {
  if (!controls.lineBreakGuide || !controls.toggleLineBreakGuideButton) {
    return;
  }

  controls.lineBreakGuide.hidden = !state.showLineBreakGuide;
  controls.toggleLineBreakGuideButton.textContent = state.showLineBreakGuide ? "Hide line breaks" : "Show line breaks";

  if (!state.showLineBreakGuide) {
    return;
  }

  controls.lineBreakGuide.innerHTML = formatLineBreakGuide(controls.poemText.value);
}

function describeSearchContext(item) {
  const details = [];
  if (item.queueSheetRow) {
    details.push(`Queue ${item.queueSheetRow}`);
  } else if (item.sourceRowNumber) {
    details.push(`Row ${item.sourceRowNumber}`);
  }
  if (item.sourceType === "poetry_please_ranked_texts") {
    if (item.poetryPleaseSourceType) {
      details.push(item.poetryPleaseSourceType);
    }
    if (Number.isFinite(item.rank) && item.rank > 0) {
      details.push(`#${item.rank}`);
    }
    if (Number.isFinite(item.score)) {
      details.push(`Score ${item.score}`);
    }
    if (Number.isFinite(item.totalVotes) && item.totalVotes > 0) {
      details.push(`${item.totalVotes} vote${item.totalVotes === 1 ? "" : "s"}`);
    }
    if (Number.isFinite(item.matchingGraphicCount) && item.matchingGraphicCount > 0) {
      details.push(`${item.matchingGraphicCount} existing graphic${item.matchingGraphicCount === 1 ? "" : "s"}`);
    }
  }
  return details.join(" · ");
}

function getMatchingGraphicUrl(graphic) {
  return (
    graphic?.driveLink ||
    graphic?.imageUrl ||
    graphic?.fileLink ||
    graphic?.url ||
    graphic?.bookLink ||
    ""
  );
}

function describeMatchingGraphic(graphic, index) {
  const parts = [];
  if (graphic?.imageType) {
    parts.push(graphic.imageType);
  }
  if (graphic?.title) {
    parts.push(graphic.title);
  }
  if (graphic?.imageId) {
    parts.push(graphic.imageId);
  }
  return parts.join(" · ") || `Variant ${index + 1}`;
}

function renderSelectedRecordMeta(record) {
  if (!record) {
    controls.selectedRecordMeta.textContent = "No library record loaded. Using placeholder text.";
    return;
  }

  const summaryParts = [
    record.sourceLabel,
    record.graphicsRequestId || "",
    record.queueSheetRow ? `Queue ${record.queueSheetRow}` : "",
    record.sourceRowNumber ? `Row ${record.sourceRowNumber}` : "",
    record.author || "Unknown author",
    record.bookTitle || "Unknown book",
    record.title || "Untitled",
  ].filter(Boolean);

  if (record.sourceType === "poetry_please_ranked_texts") {
    if (Number.isFinite(record.rank) && record.rank > 0) {
      summaryParts.push(`Rank #${record.rank}`);
    }
    if (Number.isFinite(record.score)) {
      summaryParts.push(`Score ${record.score}`);
    }
    if (Number.isFinite(record.totalVotes) && record.totalVotes > 0) {
      summaryParts.push(`${record.totalVotes} vote${record.totalVotes === 1 ? "" : "s"}`);
    }
    if (record.textId) {
      summaryParts.push(record.textId);
    }
    if (record.matchingStrategy) {
      summaryParts.push(`Match ${record.matchingStrategy.replaceAll("_", " ")}`);
    }
  }

  if (record.sourceType === "weaver_graphics_requests") {
    if (record.requestStatus) {
      summaryParts.push(`Status ${String(record.requestStatus).replaceAll("_", " ")}`);
    }
    if (Number.isFinite(record.completionCount) && record.completionCount > 0) {
      summaryParts.push(`${record.completionCount} completion${record.completionCount === 1 ? "" : "s"}`);
    }
    if (isWeaverRequestSuppressed(record)) {
      summaryParts.push("Suppressed after P.I.G. handoff");
    }
  }

  if (record.existingGraphicFileName) {
    summaryParts.push(`Existing graphic: ${record.existingGraphicFileName}`);
  }

  const htmlParts = [
    `<p>${escapeHtml(summaryParts.join(" · "))}</p>`,
  ];

  if (record.releaseCatalog) {
    htmlParts.push(`<p>Release catalog: ${escapeHtml(record.releaseCatalog)}</p>`);
  }

  if (record.bookLink) {
    htmlParts.push(
      `<p>Book link: <a href="${escapeHtml(record.bookLink)}" target="_blank" rel="noreferrer">${escapeHtml(record.bookLink)}</a></p>`,
    );
  }

  if (record.textHash) {
    htmlParts.push(`<p>Text hash: <code>${escapeHtml(record.textHash.slice(0, 16))}</code></p>`);
  }

  if (Number.isFinite(record.siblingRecordCount) && record.siblingRecordCount > 1) {
    htmlParts.push(`<p>Sibling source records: ${record.siblingRecordCount}</p>`);
  }

  if (Number.isFinite(record.matchingGraphicCount) && record.matchingGraphicCount > 0) {
    const matchingGraphics = Array.isArray(record.matchingGraphics) ? record.matchingGraphics : [];
    if (matchingGraphics.length) {
      const listItems = matchingGraphics
        .map((graphic, index) => {
          const label = escapeHtml(describeMatchingGraphic(graphic, index));
          const url = getMatchingGraphicUrl(graphic);
          if (url) {
            return `<li><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${label}</a></li>`;
          }
          return `<li>${label}</li>`;
        })
        .join("");
      htmlParts.push(
        `<p>Existing graphics: ${record.matchingGraphicCount}</p><ul class="record-meta-list">${listItems}</ul>`,
      );
    } else {
      htmlParts.push(`<p>Existing graphics: ${record.matchingGraphicCount}</p>`);
    }
  }

  controls.selectedRecordMeta.innerHTML = htmlParts.join("");
}

function renderResults(items) {
  if (!items.length) {
    controls.searchResults.innerHTML = '<div class="result-card"><p class="result-subtitle">No matches found.</p></div>';
    return;
  }

  controls.searchResults.innerHTML = items
    .map(
      (item) => `
        <article class="result-card">
          <h3 class="result-title">${escapeHtml(item.title || "Untitled")}</h3>
          <p class="result-subtitle">${escapeHtml(describeSearchContext(item))}</p>
          <p class="result-subtitle">${escapeHtml(item.author || "Unknown author")} · ${escapeHtml(item.bookTitle || "Unknown book")}</p>
          <p class="result-text">${escapeHtml(item.preview || "")}</p>
          <div class="result-actions">
            <button class="secondary-button inline-button" data-load-id="${escapeHtml(String(item.id || ""))}" data-source="${escapeHtml(item.sourceType)}">Load text</button>
          </div>
        </article>
      `,
    )
    .join("");

  controls.searchResults.querySelectorAll("[data-load-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      const match = items.find(
        (item) =>
          String(item.id || "") === button.dataset.loadId &&
          item.sourceType === button.dataset.source,
      );
      if (match) {
        button.disabled = true;
        const originalLabel = button.textContent;
        button.textContent = "Loading...";
        try {
          await loadRecord(match);
        } finally {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      }
    });
  });
}

function applyRecord(record, options = {}) {
  const { saveSnapshot = true } = options;
  state.currentProjectId = null;
  controls.poemText.value = record.text;
  seedBackgroundPromptFromPoem({ force: true });
  controls.emphasisText.value = "";
  controls.titleText.value = record.title || "";
  syncTitleColorToText();
  controls.attributionText.value = (record.author || "").toUpperCase();
  controls.secondaryAttributionText.value = (record.bookTitle || "").toUpperCase();
  state.selectedRecord = record;
  renderSelectedRecordMeta(record);
  renderLineBreakGuide();
  render();
  if (saveSnapshot) {
    scheduleProjectSnapshot();
  }
}

function normalizeWeaverSuppressedRequests(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }

  const deduped = new Map();
  entries.forEach((entry) => {
    const graphicsRequestId = String(entry?.graphicsRequestId || "").trim();
    if (!graphicsRequestId) {
      return;
    }
    deduped.set(graphicsRequestId, {
      graphicsRequestId,
      sourceSheetRow: String(entry?.sourceSheetRow || "").trim(),
      poemTitle: String(entry?.poemTitle || "").trim(),
      author: String(entry?.author || "").trim(),
      completedAt: String(entry?.completedAt || "").trim() || new Date().toISOString(),
      status: String(entry?.status || "sent_to_weaver_qc").trim() || "sent_to_weaver_qc",
    });
  });

  return [...deduped.values()]
    .sort((left, right) => String(right.completedAt || "").localeCompare(String(left.completedAt || "")))
    .slice(0, MAX_WEAVER_SUPPRESSED_REQUESTS);
}

function loadWeaverSuppressedRequests() {
  try {
    const raw = window.localStorage.getItem(WEAVER_SUPPRESSED_REQUESTS_KEY);
    if (!raw) {
      return [];
    }
    return normalizeWeaverSuppressedRequests(JSON.parse(raw));
  } catch (_error) {
    return [];
  }
}

function persistWeaverSuppressedRequests(entries) {
  window.localStorage.setItem(
    WEAVER_SUPPRESSED_REQUESTS_KEY,
    JSON.stringify(normalizeWeaverSuppressedRequests(entries)),
  );
}

function getWeaverSuppressionKeys(record) {
  if (!record) {
    return [];
  }
  return [
    record.queueSheetRow,
    record.sourceSheetRow,
    record.id,
    record.graphicsRequestId,
    record.requestId,
    record.recordId,
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
}

function isWeaverRequestSuppressed(record) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return false;
  }
  const identities = new Set(getWeaverSuppressionKeys(record));
  if (!identities.size) {
    return false;
  }
  return loadWeaverSuppressedRequests().some((entry) =>
    identities.has(String(entry.graphicsRequestId || "").trim()) ||
    identities.has(String(entry.sourceSheetRow || "").trim()),
  );
}

function numericRecordValue(record, keys) {
  let highestValue = 0;
  for (const key of keys) {
    const value = Number(record?.[key]);
    if (Number.isFinite(value)) {
      highestValue = Math.max(highestValue, value);
    }
  }
  return highestValue;
}

function normalizedRecordStatus(record) {
  const statusKeys = [
    "requestStatus",
    "graphicsStatus",
    "completionStatus",
    "qcStatus",
    "status",
    "state",
    "workflowStatus",
  ];
  return statusKeys
    .map((key) => String(record?.[key] || "").trim().toLowerCase())
    .filter(Boolean)
    .join(" ");
}

function isWeaverRequestAlreadyWorked(record) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return false;
  }

  const completionCount = numericRecordValue(record, [
    "completionCount",
    "completedGraphicCount",
    "completedGraphicsCount",
    "matchingGraphicCount",
    "variantCount",
  ]);
  if (completionCount > 0) {
    return true;
  }

  const listKeys = ["completions", "completedGraphics", "matchingGraphics", "variants"];
  if (listKeys.some((key) => Array.isArray(record?.[key]) && record[key].length > 0)) {
    return true;
  }

  const linkKeys = ["assetUrl", "assetPreviewUrl", "driveLink", "imageUrl", "previewUrl", "completedGraphicUrl"];
  if (linkKeys.some((key) => String(record?.[key] || "").trim())) {
    return true;
  }

  const status = normalizedRecordStatus(record);
  if (!status) {
    return false;
  }

  return [
    "complete",
    "completed",
    "done",
    "sent",
    "submitted",
    "pending qc",
    "pending_qc",
    "graphics qc",
    "graphics_qc",
    "in qc",
    "in_qc",
    "in progress",
    "in_progress",
    "working",
    "uploaded",
    "exported",
    "approved",
  ].some((token) => status.includes(token));
}

function filterSuppressedWeaverResults(items) {
  return items.filter((item) => !isWeaverRequestSuppressed(item) && !isWeaverRequestAlreadyWorked(item));
}

function markWeaverRequestSuppressed(record, completion = null) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return;
  }

  const graphicsRequestId = String(record.graphicsRequestId || record.requestId || record.id || "").trim();
  if (!graphicsRequestId) {
    return;
  }

  const next = [
    {
      graphicsRequestId,
      sourceSheetRow: String(record.queueSheetRow || completion?.sourceSheetRow || ""),
      poemTitle: String(record.title || completion?.poemTitle || ""),
      author: String(record.author || completion?.author || ""),
      completedAt: String(completion?.completedAt || new Date().toISOString()),
      status: String(completion?.status || "sent_to_weaver_qc"),
    },
    ...loadWeaverSuppressedRequests().filter((entry) => entry.graphicsRequestId !== graphicsRequestId),
  ];

  persistWeaverSuppressedRequests(next);
}

function renderWeaverBookOptions(books) {
  const currentValue = controls.weaverBookFilter.value;
  const defaultLabel =
    controls.weaverRequestFilter.value === "all" ? "All books" : "All current books";
  controls.weaverBookFilter.innerHTML = [
    `<option value="">${escapeHtml(defaultLabel)}</option>`,
    ...books.map((book) => `<option value="${escapeHtml(book.title || "")}">${escapeHtml(book.title || "")} (${book.count || 0})</option>`),
  ].join("");
  if ([...controls.weaverBookFilter.options].some((option) => option.value === currentValue)) {
    controls.weaverBookFilter.value = currentValue;
  }
}

function renderPoetryPleaseBookOptions(books) {
  const currentValue = controls.weaverBookFilter.value;
  controls.weaverBookFilter.innerHTML = [
    `<option value="">All ranked books</option>`,
    ...books.map((book) => `<option value="${escapeHtml(book.title || "")}">${escapeHtml(book.title || "")} (${book.count || 0})</option>`),
  ].join("");
  if ([...controls.weaverBookFilter.options].some((option) => option.value === currentValue)) {
    controls.weaverBookFilter.value = currentValue;
  }
}

async function loadWeaverBookFilters() {
  if (controls.sourceType.value !== "weaver_graphics_requests") {
    return;
  }

  try {
    const response = await fetch(
      `/api/weaver/graphics-request-books?filter=${encodeURIComponent(controls.weaverRequestFilter.value)}`,
    );
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Could not load Weaver book filters.");
    }
    renderWeaverBookOptions(payload.books || []);
  } catch (error) {
    setStatus(error.message);
  }
}

async function loadPoetryPleaseBookFilters() {
  if (controls.sourceType.value !== "poetry_please_ranked_texts") {
    return;
  }

  try {
    const response = await fetch("/api/poetry-please/ranked-text-books");
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Could not load Poetry Please book filters.");
    }
    renderPoetryPleaseBookOptions(payload.books || []);
  } catch (error) {
    setStatus(error.message);
  }
}

async function updateSourceFilterUi() {
  const source = controls.sourceType.value;

  if (source === "weaver_graphics_requests") {
    controls.sourceFiltersRow.hidden = false;
    controls.sourcePrimaryFilterBlock.hidden = false;
    controls.sourcePrimaryFilterLabel.textContent = "Weaver filter";
    controls.sourceBookFilterBlock.hidden = false;
    controls.sourceBookFilterLabel.textContent = "Book";
    await loadWeaverBookFilters();
    return;
  }

  if (source === "poetry_please_ranked_texts") {
    controls.sourceFiltersRow.hidden = false;
    controls.sourcePrimaryFilterBlock.hidden = true;
    controls.sourceBookFilterBlock.hidden = false;
    controls.sourceBookFilterLabel.textContent = "Book";
    await loadPoetryPleaseBookFilters();
    return;
  }

  controls.sourceFiltersRow.hidden = true;
  controls.sourcePrimaryFilterBlock.hidden = true;
  controls.sourceBookFilterBlock.hidden = true;
  controls.weaverBookFilter.innerHTML = '<option value="">All books</option>';
}

function applyFallbackPlaceholder(options = {}) {
  const { saveSnapshot = false } = options;
  state.currentProjectId = null;
  controls.poemText.value = `Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor\nincididunt ut labore.`;
  seedBackgroundPromptFromPoem({ force: true });
  controls.emphasisText.value = "";
  controls.titleText.value = "";
  controls.attributionText.value = "";
  controls.secondaryAttributionText.value = "";
  state.selectedRecord = null;
  renderSelectedRecordMeta(null);
  renderLineBreakGuide();
  render();
  if (saveSnapshot) {
    scheduleProjectSnapshot();
  }
}

async function loadRecord(summaryRecord) {
  if (isWeaverRequestSuppressed(summaryRecord) || isWeaverRequestAlreadyWorked(summaryRecord)) {
    setStatus("That Weaver request already appears worked, pending QC, or sent back from P.I.G.");
    return;
  }

  if (summaryRecord.text) {
    applyRecord(summaryRecord);
    setStatus("Record loaded into the text layer.");
    return;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), RECORD_LOAD_TIMEOUT_MS);
  try {
    setStatus("Loading selected record...");
    const response = await fetch(
      `/api/record?source=${encodeURIComponent(summaryRecord.sourceType)}&id=${encodeURIComponent(summaryRecord.id)}`,
      { signal: controller.signal },
    );
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Unable to load record.");
    }
    if (isWeaverRequestSuppressed(payload.record) || isWeaverRequestAlreadyWorked(payload.record)) {
      setStatus("That Weaver request already appears worked, pending QC, or sent back from P.I.G.");
      return;
    }
    applyRecord(payload.record);
    setStatus("Record loaded into the text layer.");
  } catch (error) {
    if (error.name === "AbortError") {
      setStatus("Record load timed out. Try Search source again; P.I.G. recovered instead of hanging.");
    } else {
      setStatus(error.message);
    }
  } finally {
    window.clearTimeout(timeout);
  }
}

async function searchLibrary() {
  const source = controls.sourceType.value;
  const query = controls.searchQuery.value.trim();
  const filterValue = controls.weaverRequestFilter.value;
  const bookTitle = controls.weaverBookFilter.value;

  try {
    setStatus("Searching local records...");
    const params = new URLSearchParams({
      source,
      q: query,
      limit: "12",
    });
    if (source === "weaver_graphics_requests") {
      params.set("filter", filterValue);
      if (bookTitle) {
        params.set("bookTitle", bookTitle);
      }
    } else if (source === "poetry_please_ranked_texts" && bookTitle) {
      params.set("bookTitle", bookTitle);
    }
    const response = await fetch(`/api/search?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Search failed.");
    }
    const visibleResults = filterSuppressedWeaverResults(payload.results || []);
    renderResults(visibleResults);
    const hiddenCount = Math.max(0, (payload.results || []).length - visibleResults.length);
    if (source === "weaver_graphics_requests" && !query) {
      setStatus(
        `Showing ${visibleResults.length} live Weaver graphics request${visibleResults.length === 1 ? "" : "s"}${hiddenCount ? ` (${hiddenCount} already worked or sent from P.I.G.)` : ""}.`,
      );
    } else if (source === "poetry_please_ranked_texts" && !query) {
      setStatus(
        `Showing ${visibleResults.length} top-ranked Poetry Please text${visibleResults.length === 1 ? "" : "s"}.`,
      );
    } else {
      setStatus(`Showing ${visibleResults.length} result${visibleResults.length === 1 ? "" : "s"}.`);
    }
  } catch (error) {
    setStatus(error.message);
  }
}

async function loadRandomRecord() {
  const source = controls.sourceType.value;

  try {
    setStatus("Loading a random text...");
    if (source === "weaver_graphics_requests") {
      const params = new URLSearchParams({
        source,
        q: "",
        limit: "500",
        filter: controls.weaverRequestFilter.value,
      });
      if (controls.weaverBookFilter.value) {
        params.set("bookTitle", controls.weaverBookFilter.value);
      }
      const response = await fetch(`/api/search?${params.toString()}`);
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Unable to load a random text.");
      }
      const visibleResults = filterSuppressedWeaverResults(payload.results || []);
      if (!visibleResults.length) {
        throw new Error("No unsent Weaver graphics requests are available.");
      }
      const record = visibleResults[Math.floor(Math.random() * visibleResults.length)];
      applyRecord(record);
      setStatus(`Loaded a random ${record.sourceLabel.toLowerCase()} record.`);
      return;
    }

    const params = new URLSearchParams({ source });
    if (source === "poetry_please_ranked_texts" && controls.weaverBookFilter.value) {
      params.set("bookTitle", controls.weaverBookFilter.value);
    }
    const response = await fetch(`/api/random?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Unable to load a random text.");
    }
    applyRecord(payload.record);
    setStatus(`Loaded a random ${payload.record.sourceLabel.toLowerCase()} record.`);
  } catch (error) {
    setStatus(error.message);
  }
}

async function loadStartupRecord() {
  try {
    if (!state.appConfig) {
      await loadAppConfig();
    }
    const desiredDefault = state.appConfig?.defaultSource || "weaver_graphics_requests";
    controls.sourceType.value = desiredDefault;
    controls.weaverRequestFilter.value = "current_titles";
    await loadWeaverBookFilters();
    const response = await fetch("/api/search?source=weaver_graphics_requests&filter=current_titles&limit=12");
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Unable to load live Weaver graphics requests.");
    }
    const visibleResults = filterSuppressedWeaverResults(payload.results || []);
    if (!visibleResults.length) {
      throw new Error("No Weaver graphics requests available.");
    }

    renderResults(visibleResults);
    applyRecord(visibleResults[0], { saveSnapshot: false });
    setStatus("Loaded the newest live Weaver graphics request.");
  } catch (_error) {
    try {
      const response = await fetch("/api/random?source=any");
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Unable to load a fallback record.");
      }
      controls.sourceType.value = payload.record.sourceType;
      applyRecord(payload.record, { saveSnapshot: false });
      setStatus(`Loaded a fallback ${payload.record.sourceLabel.toLowerCase()} record.`);
    } catch (__error) {
      applyFallbackPlaceholder({ saveSnapshot: false });
      setStatus("Using placeholder text because no startup library record could be loaded.");
    }
  }
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load generated image."));
    image.src = dataUrl;
  });
}

function openSnapshotDatabase() {
  if (!("indexedDB" in window)) {
    return Promise.resolve(null);
  }
  if (state.snapshotDbPromise) {
    return state.snapshotDbPromise;
  }

  state.snapshotDbPromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(PROJECT_SNAPSHOT_DB, PROJECT_SNAPSHOT_DB_VERSION);
    request.onerror = () => reject(new Error("Could not open the snapshot database."));
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PROJECT_BACKGROUND_STORE)) {
        database.createObjectStore(PROJECT_BACKGROUND_STORE);
      }
      if (!database.objectStoreNames.contains(BACKGROUND_ASSET_STORE)) {
        database.createObjectStore(BACKGROUND_ASSET_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
  });

  return state.snapshotDbPromise;
}

async function putProjectBackground(projectId, dataUrl) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return;
  }
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(PROJECT_BACKGROUND_STORE, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error("Could not save the project background."));
    transaction.objectStore(PROJECT_BACKGROUND_STORE).put(dataUrl, projectId);
  });
}

async function getProjectBackground(projectId) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return null;
  }
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(PROJECT_BACKGROUND_STORE, "readonly");
    const request = transaction.objectStore(PROJECT_BACKGROUND_STORE).get(projectId);
    request.onerror = () => reject(new Error("Could not load the project background."));
    request.onsuccess = () => resolve(request.result || null);
  });
}

async function deleteProjectBackground(projectId) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return;
  }
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(PROJECT_BACKGROUND_STORE, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error("Could not remove the project background."));
    transaction.objectStore(PROJECT_BACKGROUND_STORE).delete(projectId);
  });
}

async function pruneProjectBackgrounds(validIds) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return;
  }
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(PROJECT_BACKGROUND_STORE, "readwrite");
    const store = transaction.objectStore(PROJECT_BACKGROUND_STORE);
    const request = store.openCursor();

    request.onerror = () => reject(new Error("Could not prune stale project backgrounds."));
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        return;
      }
      if (!validIds.has(cursor.key)) {
        cursor.delete();
      }
      cursor.continue();
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error("Could not prune stale project backgrounds."));
  });
}

function generateBackgroundAssetId() {
  return `background-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function putBackgroundAssetData(assetId, dataUrl) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return;
  }
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(BACKGROUND_ASSET_STORE, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error("Could not save the background asset."));
    transaction.objectStore(BACKGROUND_ASSET_STORE).put(dataUrl, assetId);
  });
}

async function getBackgroundAssetData(assetId) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return null;
  }
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(BACKGROUND_ASSET_STORE, "readonly");
    const request = transaction.objectStore(BACKGROUND_ASSET_STORE).get(assetId);
    request.onerror = () => reject(new Error("Could not load the background asset."));
    request.onsuccess = () => resolve(request.result || null);
  });
}

async function deleteBackgroundAssetData(assetId) {
  const database = await openSnapshotDatabase();
  if (!database) {
    return;
  }
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(BACKGROUND_ASSET_STORE, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error("Could not delete the background asset."));
    transaction.objectStore(BACKGROUND_ASSET_STORE).delete(assetId);
  });
}

function loadBackgroundLibrary() {
  try {
    const raw = window.localStorage.getItem(BACKGROUND_LIBRARY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_BACKGROUND_LIBRARY) : [];
  } catch (_error) {
    return [];
  }
}

function persistBackgroundLibrary(library) {
  window.localStorage.setItem(
    BACKGROUND_LIBRARY_KEY,
    JSON.stringify(library.slice(0, MAX_BACKGROUND_LIBRARY)),
  );
}

function loadBackgroundModelPreference() {
  try {
    return window.localStorage.getItem(BACKGROUND_MODEL_PREFERENCE_KEY) || "";
  } catch (_error) {
    return "";
  }
}

function persistBackgroundModelPreference(model) {
  try {
    window.localStorage.setItem(BACKGROUND_MODEL_PREFERENCE_KEY, model);
  } catch (_error) {
    // If storage is unavailable, the selector still works for this session.
  }
}

function applyBackgroundModelPreference() {
  const preferredModel = loadBackgroundModelPreference();
  if (!preferredModel) {
    return;
  }

  const hasOption = Array.from(controls.backgroundModel.options).some(
    (option) => option.value === preferredModel,
  );
  if (hasOption) {
    controls.backgroundModel.value = preferredModel;
  }
}

function buildBackgroundAssetName() {
  return (
    controls.titleText.value.trim() ||
    controls.poemText.value.split("\n").find((line) => line.trim()) ||
    "Saved background"
  );
}

function renderBackgroundLibrary() {
  const library = loadBackgroundLibrary();
  if (!library.length) {
    controls.backgroundAssets.innerHTML =
      '<div class="result-card compact-card"><p class="result-subtitle">No saved backgrounds yet.</p></div>';
    return;
  }

  controls.backgroundAssets.innerHTML = library
    .map(
      (item) => `
        <article class="result-card compact-card">
          <div class="background-asset-row">
            <div class="background-asset-meta">
              <h3 class="result-title">${escapeHtml(item.name || "Saved background")}</h3>
              <p class="result-meta">${escapeHtml(new Date(item.updatedAt).toLocaleString())}</p>
            </div>
            <div class="result-actions">
              <button class="secondary-button inline-button" type="button" data-background-use="${item.id}">Use</button>
              <button class="ghost-button inline-button" type="button" data-background-delete="${item.id}">Delete</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  controls.backgroundAssets.querySelectorAll("[data-background-use]").forEach((button) => {
    button.addEventListener("click", async () => {
      const assetId = button.dataset.backgroundUse;
      const dataUrl = await getBackgroundAssetData(assetId);
      if (!dataUrl) {
        setStatus("Saved background not found.");
        return;
      }
      state.aiBackgroundDataUrl = dataUrl;
      state.aiBackgroundImage = await loadImageFromDataUrl(dataUrl);
      controls.backgroundMode.value = "ai-image";
      render();
      scheduleProjectSnapshot();
      setStatus("Saved background applied.");
    });
  });

  controls.backgroundAssets.querySelectorAll("[data-background-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      const assetId = button.dataset.backgroundDelete;
      const next = loadBackgroundLibrary().filter((item) => item.id !== assetId);
      persistBackgroundLibrary(next);
      await deleteBackgroundAssetData(assetId);
      renderBackgroundLibrary();
      setStatus("Saved background removed.");
    });
  });
}

function generateProjectId() {
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getSerializableControlIds() {
  return Object.entries(controls)
    .filter(([, control]) => control instanceof HTMLElement)
    .filter(([, control]) => !NON_SERIALIZED_CONTROL_IDS.has(control.id))
    .filter(([, control]) => control.tagName !== "BUTTON")
    .map(([key]) => key);
}

function captureControlValues() {
  const values = {};
  getSerializableControlIds().forEach((key) => {
    const control = controls[key];
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
      values[key] = control.value;
    }
  });
  return values;
}

function buildProjectTitle(snapshot) {
  return (
    snapshot?.selectedRecord?.title ||
    snapshot?.controlValues?.titleText ||
    snapshot?.controlValues?.poemText?.split("\n").find((line) => line.trim()) ||
    "Untitled project"
  );
}

function buildProjectSubtitle(snapshot) {
  const author = snapshot?.selectedRecord?.author || snapshot?.controlValues?.attributionText || "";
  const book = snapshot?.selectedRecord?.bookTitle || snapshot?.controlValues?.secondaryAttributionText || "";
  return [author, book].filter(Boolean).join(" · ");
}

function loadProjectHistory() {
  try {
    const raw = window.localStorage.getItem(PROJECT_HISTORY_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? normalizeProjectHistory(parsed) : [];
  } catch (_error) {
    return [];
  }
}

function snapshotIdentityKey(snapshot) {
  if (snapshot?.selectedRecord?.sourceType && (snapshot?.selectedRecord?.id || snapshot?.selectedRecord?.graphicsRequestId)) {
    return [
      snapshot.selectedRecord.sourceType,
      snapshot.selectedRecord.id || snapshot.selectedRecord.graphicsRequestId,
      snapshot.selectedRecord.textHash || "",
    ].join("::");
  }
  return [
    buildProjectTitle(snapshot),
    buildProjectSubtitle(snapshot),
    snapshot?.controlValues?.poemText || "",
  ].join("::");
}

function normalizeProjectHistory(history) {
  const deduped = [];
  const seenPlainSnapshots = new Set();
  const scrubbedTitle = "we learn the shape of silence";
  const scrubbedSubtitle = "ALY ACEVEDO, MY DEAR CULT LEADER";

  history.forEach((snapshot) => {
    const normalizedSnapshot = {
      ...snapshot,
      hasAiBackground: Boolean(snapshot?.hasAiBackground),
    };

    const snapshotTitle = buildProjectTitle(normalizedSnapshot).trim().toLowerCase();
    const snapshotSubtitle = buildProjectSubtitle(normalizedSnapshot).trim();
    if (snapshotTitle === scrubbedTitle || snapshotSubtitle === scrubbedSubtitle) {
      return;
    }

    if (!normalizedSnapshot.hasAiBackground) {
      const identity = snapshotIdentityKey(normalizedSnapshot);
      if (seenPlainSnapshots.has(identity)) {
        return;
      }
      seenPlainSnapshots.add(identity);
    }

    deduped.push(normalizedSnapshot);
  });

  return deduped.slice(0, MAX_PROJECT_HISTORY);
}

function persistProjectHistory(history) {
  window.localStorage.setItem(PROJECT_HISTORY_KEY, JSON.stringify(normalizeProjectHistory(history)));
}

function renderProjectHistory() {
  const history = loadProjectHistory();
  persistProjectHistory(history);
  if (!history.length) {
    controls.recentProjects.innerHTML = '<div class="result-card"><p class="result-subtitle">No saved snapshots yet.</p></div>';
    return;
  }

  controls.recentProjects.innerHTML = history
    .map(
      (snapshot) => `
        <article class="result-card">
          <h3 class="result-title">${escapeHtml(buildProjectTitle(snapshot))}</h3>
          <p class="result-subtitle">${escapeHtml(buildProjectSubtitle(snapshot) || "Saved project snapshot")}</p>
          <p class="result-meta">${escapeHtml(new Date(snapshot.updatedAt).toLocaleString())}</p>
          <div class="result-actions">
            <button class="secondary-button inline-button" data-project-load="${snapshot.id}">Open</button>
          </div>
        </article>
      `,
    )
    .join("");

  controls.recentProjects.querySelectorAll("[data-project-load]").forEach((button) => {
    button.addEventListener("click", async () => {
      await loadProjectSnapshot(button.dataset.projectLoad);
    });
  });
}

function snapshotCurrentProject() {
  return {
    id: state.currentProjectId || generateProjectId(),
    updatedAt: new Date().toISOString(),
    controlValues: captureControlValues(),
    hasAiBackground: Boolean(state.aiBackgroundDataUrl),
    selectedRecord: state.selectedRecord,
  };
}

async function saveProjectSnapshot(options = {}) {
  const hasUsefulContent = controls.poemText.value.trim() || state.selectedRecord;
  if (!hasUsefulContent) {
    return;
  }

  try {
    const snapshot = snapshotCurrentProject();
    state.currentProjectId = snapshot.id;
    if (state.aiBackgroundDataUrl) {
      await putProjectBackground(snapshot.id, state.aiBackgroundDataUrl);
    } else {
      await deleteProjectBackground(snapshot.id);
    }
    const history = loadProjectHistory();
    const next = [snapshot, ...history.filter((item) => item.id !== snapshot.id)].slice(0, MAX_PROJECT_HISTORY);
    persistProjectHistory(next);
    await pruneProjectBackgrounds(new Set(next.map((item) => item.id)));
    renderProjectHistory();
    if (options.announce) {
      setStatus("Project snapshot saved.");
    }
  } catch (error) {
    if (options.announce) {
      setStatus(error.message || "Could not save the project snapshot.");
    }
  }
}

function scheduleProjectSnapshot() {
  if (state.historySaveTimer) {
    window.clearTimeout(state.historySaveTimer);
  }
  state.historySaveTimer = window.setTimeout(() => {
    saveProjectSnapshot().catch(() => {});
  }, 900);
}

async function loadProjectSnapshot(projectId) {
  const snapshot = loadProjectHistory().find((item) => item.id === projectId);
  if (!snapshot) {
    setStatus("Saved project not found.");
    return;
  }

  state.currentProjectId = snapshot.id;
  state.selectedRecord = snapshot.selectedRecord || null;
  Object.entries(snapshot.controlValues || {}).forEach(([key, value]) => {
    const control = controls[key];
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
      control.value = value;
    }
  });
  state.lastBackgroundPromptSeed = computePoemPromptSeed();
  syncBackgroundPromptTouchState();
  if (controls.templatePreset.value) {
    syncFamilyVariantFromTemplate(controls.templatePreset.value);
  }

  const backgroundDataUrl = await getProjectBackground(projectId);
  if (backgroundDataUrl) {
    state.aiBackgroundDataUrl = backgroundDataUrl;
    state.aiBackgroundImage = await loadImageFromDataUrl(backgroundDataUrl);
  } else {
    state.aiBackgroundDataUrl = null;
    state.aiBackgroundImage = null;
  }

  if (state.selectedRecord) {
    renderSelectedRecordMeta(state.selectedRecord);
  } else {
    renderSelectedRecordMeta(null);
  }
  renderLineBreakGuide();
  render();
  setStatus("Project snapshot reopened.");
}

async function generateAiBackground() {
  const prompt = controls.backgroundPrompt.value.trim();
  if (!prompt) {
    setStatus("Add a background prompt first.");
    return;
  }

  try {
    setStatus("Generating AI background...");
    const response = await fetch("/api/generate-background", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: controls.backgroundModel.value,
        width: Number(controls.customWidth.value) || 1080,
        height: Number(controls.customHeight.value) || 1350,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Background generation failed.");
    }

    state.aiBackgroundImage = await loadImageFromDataUrl(payload.imageDataUrl);
    state.aiBackgroundDataUrl = payload.imageDataUrl;
    controls.backgroundMode.value = "ai-image";
    render();
    saveProjectSnapshot();
    setStatus("AI background applied.");
  } catch (error) {
    setStatus(error.message);
  }
}

function clearAiBackground() {
  state.aiBackgroundImage = null;
  state.aiBackgroundDataUrl = null;
  if (controls.backgroundMode.value === "ai-image") {
    controls.backgroundMode.value = "gradient";
  }
  render();
  scheduleProjectSnapshot();
  setStatus("AI background cleared.");
}

function slugifyFilenamePart(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function sanitizeDriveNamePart(value) {
  return (value || "")
    .replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildBookCode(value) {
  const words = (value || "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) {
    return "BOOK";
  }
  return words.map((word) => word[0].toUpperCase()).join("").slice(0, 6);
}

function extractFolderNamingParts() {
  const folderName = state.drive.selectedFolder?.name || "";
  const match = folderName.match(/^([^-]+?)\s*-\s*([A-Z0-9]+)\s*-\s*QI\b/i);
  if (!match) {
    return null;
  }
  return {
    authorCode: sanitizeDriveNamePart(match[1]).toUpperCase(),
    bookCode: sanitizeDriveNamePart(match[2]).toUpperCase(),
  };
}

function buildDefaultDriveFileName() {
  const record = state.selectedRecord || {};
  const folderParts = extractFolderNamingParts();
  const authorCode =
    folderParts?.authorCode ||
    sanitizeDriveNamePart((record.author || controls.attributionText.value).split(/\s+/).slice(-1)[0] || "AUTHOR").toUpperCase();
  const bookCode =
    folderParts?.bookCode ||
    buildBookCode(record.bookTitle || controls.secondaryAttributionText.value);
  const title = sanitizeDriveNamePart(record.title || controls.titleText.value || "QUOTE IMAGE").toUpperCase();
  return `${authorCode} - ${bookCode} - QUOTE IMAGE - ${title}`;
}

async function loadDriveConfig() {
  if (state.drive.config) {
    return state.drive.config;
  }

  const response = await fetch("/api/drive-config");
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Could not load Drive configuration.");
  }
  state.drive.config = payload;
  if (!state.drive.selectedFolder && payload.defaultFolder?.id) {
    state.drive.selectedFolder = payload.defaultFolder;
  }
  return payload;
}

function canvasToDataUrl() {
  return canvas.toDataURL("image/png");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the background image."));
    reader.readAsDataURL(file);
  });
}

async function waitForGlobal(checker, label) {
  const timeoutAt = Date.now() + 10000;
  while (Date.now() < timeoutAt) {
    const value = checker();
    if (value) {
      return value;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`${label} did not load.`);
}

async function ensureDriveReady() {
  const config = await loadDriveConfig();
  if (!config.enabled) {
    throw new Error("Google Drive upload is not configured yet. Add GOOGLE_OAUTH_CLIENT_ID and GOOGLE_API_KEY to P.I.G.'s environment.");
  }

  await waitForGlobal(() => window.google?.accounts?.oauth2, "Google Identity Services");
  const gapiObject = await waitForGlobal(() => window.gapi, "Google API script");

  if (!state.drive.pickerReady) {
    await new Promise((resolve, reject) => {
      gapiObject.load("picker", {
        callback: resolve,
        onerror: () => reject(new Error("Google Picker failed to load.")),
      });
    });
    state.drive.pickerReady = true;
  }

  if (!state.drive.tokenClient) {
    state.drive.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: config.clientId,
      scope: "https://www.googleapis.com/auth/drive",
      callback: () => {},
    });
  }

  return config;
}

async function requestDriveAccessToken(forcePrompt = false) {
  await ensureDriveReady();
  if (state.drive.accessToken && !forcePrompt) {
    return state.drive.accessToken;
  }
  return new Promise((resolve, reject) => {
    state.drive.tokenClient.callback = (response) => {
      if (response?.error) {
        reject(new Error(response.error));
        return;
      }
      state.drive.accessToken = response.access_token;
      resolve(response.access_token);
    };
    state.drive.tokenClient.requestAccessToken({
      prompt: state.drive.accessToken && !forcePrompt ? "" : "consent",
    });
  });
}

function isInvalidGoogleAuthPayload(payload) {
  const message = String(payload?.error?.message || payload?.error_description || payload?.error || "").toLowerCase();
  return (
    message.includes("invalid authentication credentials") ||
    message.includes("invalid credentials") ||
    message.includes("login required") ||
    message.includes("unauthenticated")
  );
}

async function googleApiFetchWithDriveAuth(url, options = {}, attempt = 0) {
  const token = await requestDriveAccessToken(attempt > 0);
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let payload = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }
  }

  if (response.ok) {
    return { response, payload };
  }

  const shouldRetry =
    attempt === 0 &&
    (response.status === 401 || response.status === 403 || isInvalidGoogleAuthPayload(payload));

  if (shouldRetry) {
    state.drive.accessToken = "";
    return googleApiFetchWithDriveAuth(url, options, attempt + 1);
  }

  const message = payload?.error?.message || payload?.error_description || payload?.error || "Google Drive request failed.";
  throw new Error(message);
}

async function pickDriveFolder() {
  const config = await ensureDriveReady();
  const token = await requestDriveAccessToken(!state.drive.accessToken);

  return new Promise((resolve, reject) => {
    const view = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
      .setIncludeFolders(true)
      .setSelectFolderEnabled(true)
      .setMimeTypes("application/vnd.google-apps.folder");

    const picker = new google.picker.PickerBuilder()
      .addView(view)
      .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
      .setOAuthToken(token)
      .setDeveloperKey(config.apiKey)
      .setAppId(config.appId || undefined)
      .setTitle("Choose a Drive folder for this graphic")
      .setCallback((data) => {
        if (data.action === google.picker.Action.PICKED) {
          const doc = data.docs?.[0];
          if (!doc?.id) {
            reject(new Error("No Drive folder was selected."));
            return;
          }
          resolve({ id: doc.id, name: doc.name || "Selected folder" });
          return;
        }
        if (data.action === google.picker.Action.CANCEL) {
          reject(new Error("Drive folder selection was cancelled."));
        }
      })
      .build();

    picker.setVisible(true);
  });
}

function canvasToBlob() {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not create the PNG blob."));
      }
    }, "image/png");
  });
}

async function uploadCurrentCanvasToDrive(folderId, fileName) {
  await prepareCanvasFontForExport();
  const blob = await canvasToBlob();
  const boundary = `pig-${Date.now()}`;
  const metadata = {
    name: fileName,
    mimeType: "image/png",
    parents: [folderId],
  };

  const { payload } = await googleApiFetchWithDriveAuth(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink,webContentLink,thumbnailLink",
    {
      method: "POST",
      headers: {
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: new Blob(
        [
          `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
          `--${boundary}\r\nContent-Type: image/png\r\n\r\n`,
          blob,
          `\r\n--${boundary}--`,
        ],
        { type: `multipart/related; boundary=${boundary}` },
      ),
    },
  );

  if (!payload?.id) {
    throw new Error("Drive upload failed.");
  }

  try {
    await googleApiFetchWithDriveAuth(
      `https://www.googleapis.com/drive/v3/files/${payload.id}/permissions?supportsAllDrives=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "reader",
          type: "anyone",
        }),
      },
    );
  } catch (error) {
    const message = error?.message || "";
    if (message.includes("File not found")) {
      throw new Error(
        "Google let you pick the folder, but this app still does not have permission to upload there. Try re-choosing the folder after re-consenting, or use a My Drive folder first.",
      );
    }
    throw error;
  }

  return {
    id: payload.id,
    assetUrl: payload.webViewLink || `https://drive.google.com/file/d/${payload.id}/view`,
    assetPreviewUrl: `https://drive.google.com/thumbnail?id=${payload.id}&sz=w1600`,
  };
}

function setDriveUploadStatus(message) {
  controls.driveUploadStatus.textContent = message;
}

async function openDriveUploadDialog() {
  if (!state.selectedRecord) {
    setStatus("Load a record before saving to Drive.");
    return;
  }
  controls.driveFileName.value = buildDefaultDriveFileName();
  controls.weaverProductionNotesDialog.value = controls.weaverProductionNotes.value;
  await loadDriveConfig();
  controls.driveFolderSummary.value = state.drive.selectedFolder
    ? `${state.drive.selectedFolder.name} (${state.drive.selectedFolder.id})`
    : "";
  setDriveUploadStatus(
    state.drive.selectedFolder
      ? "Default Drive folder loaded. You can upload now or choose a different folder."
      : "Choose a Drive folder, then upload and send.",
  );
  controls.driveUploadDialog.showModal();
  if (state.drive.config?.serverUploadEnabled) {
    setDriveUploadStatus(
      state.drive.selectedFolder
        ? "Default Shared Drive folder loaded. Upload will use P.I.G.'s server account."
        : "Choose a Drive folder if you want to override the default Shared Drive destination.",
    );
    return;
  }
  try {
    setDriveUploadStatus("Signing into Google Drive...");
    await requestDriveAccessToken(false);
    setDriveUploadStatus(
      state.drive.selectedFolder
        ? "Default Drive folder loaded. You can upload now or choose a different folder."
        : "Choose a Drive folder, then upload and send.",
    );
  } catch (error) {
    setDriveUploadStatus(error.message);
  }
}

function buildWeaverCompletionPayload() {
  if (!state.selectedRecord) {
    throw new Error("Load a record before sending a completion to Weaver.");
  }

  const assetUrl = controls.weaverAssetUrl.value.trim();
  if (!assetUrl) {
    throw new Error("Add the final asset URL first.");
  }

  const record = state.selectedRecord;
  const sourceSheetRow = record.queueSheetRow || record.sourceRowNumber || "";
  const sourceRecordId = record.recordId || record.sourceEntryId || record.id || "";
  const requestId = record.graphicsRequestId || (sourceSheetRow ? `weaver:row-${sourceSheetRow}` : `pig:record-${sourceRecordId || "manual"}`);

  return {
    completionId: `pig-${Date.now()}`,
    requestId,
    author: record.author || controls.attributionText.value.trim(),
    poemTitle: record.title || controls.titleText.value.trim(),
    bookTitle: record.bookTitle || controls.secondaryAttributionText.value.trim(),
    quoteText: controls.poemText.value.trim(),
    assetUrl,
    assetPreviewUrl: controls.weaverAssetPreviewUrl.value.trim(),
    sourceRecordId: String(sourceRecordId || ""),
    sourceSheetRow: sourceSheetRow || "",
    productionNotes: controls.weaverProductionNotes.value.trim(),
    completedAt: new Date().toISOString(),
    sourceTool: "P.I.G.",
  };
}

async function sendCompletionToWeaver(completion) {
  const response = await fetch("/api/weaver/completed-graphics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completions: [completion],
    }),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Weaver QC handoff failed.");
  }
  return payload;
}

async function sendToWeaverQc() {
  try {
    const completion = buildWeaverCompletionPayload();
    setStatus("Sending completion to Weaver QC...");
    await sendCompletionToWeaver(completion);
    markWeaverRequestSuppressed(state.selectedRecord, completion);
    setStatus("Sent to Weaver QC.");
  } catch (error) {
    setStatus(error.message);
  }
}

async function chooseDriveFolder() {
  const wasOpen = controls.driveUploadDialog.open;
  try {
    setDriveUploadStatus("Opening Drive folder picker...");
    if (wasOpen) {
      controls.driveUploadDialog.close();
    }
    const folder = await pickDriveFolder();
    state.drive.selectedFolder = folder;
    controls.driveFolderSummary.value = `${folder.name} (${folder.id})`;
    controls.driveFileName.value = buildDefaultDriveFileName();
    setDriveUploadStatus("Drive folder selected.");
  } catch (error) {
    setDriveUploadStatus(error.message);
  } finally {
    if (wasOpen && !controls.driveUploadDialog.open) {
      controls.driveUploadDialog.showModal();
    }
  }
}

async function saveToDriveAndSend() {
  try {
    if (!state.drive.selectedFolder?.id) {
      throw new Error("Choose a Drive folder first.");
    }

    controls.weaverProductionNotes.value = controls.weaverProductionNotesDialog.value.trim();
    setDriveUploadStatus("Uploading PNG to Drive...");
    const upload = state.drive.config?.serverUploadEnabled
      ? await uploadCurrentCanvasToDriveServer(
          state.drive.selectedFolder.id,
          controls.driveFileName.value.trim() || buildDefaultDriveFileName(),
        )
      : await uploadCurrentCanvasToDrive(
          state.drive.selectedFolder.id,
          controls.driveFileName.value.trim() || buildDefaultDriveFileName(),
        );
    controls.weaverAssetUrl.value = upload.assetUrl;
    controls.weaverAssetPreviewUrl.value = upload.assetPreviewUrl;
    setDriveUploadStatus("Drive upload finished. Sending to Weaver QC...");
    const completion = buildWeaverCompletionPayload();
    await sendCompletionToWeaver(completion);
    markWeaverRequestSuppressed(state.selectedRecord, completion);
    controls.driveUploadDialog.close();
    saveProjectSnapshot();
    setStatus("Saved to Drive and sent to Weaver QC.");
  } catch (error) {
    setDriveUploadStatus(error.message);
    setStatus(error.message);
  }
}

async function importBackgroundFromFile(file) {
  const dataUrl = await fileToDataUrl(file);
  state.aiBackgroundDataUrl = dataUrl;
  state.aiBackgroundImage = await loadImageFromDataUrl(dataUrl);
  controls.backgroundMode.value = "ai-image";
  render();
  saveProjectSnapshot();
  setStatus("Background photo imported.");
}

async function saveCurrentBackgroundToLibrary() {
  if (!state.aiBackgroundDataUrl) {
    setStatus("Import or generate a background first.");
    return;
  }

  const asset = {
    id: generateBackgroundAssetId(),
    name: buildBackgroundAssetName(),
    updatedAt: new Date().toISOString(),
  };
  await putBackgroundAssetData(asset.id, state.aiBackgroundDataUrl);
  const next = [asset, ...loadBackgroundLibrary()].slice(0, MAX_BACKGROUND_LIBRARY);
  persistBackgroundLibrary(next);
  renderBackgroundLibrary();
  setStatus("Background saved for reuse.");
}

async function uploadCurrentCanvasToDriveServer(folderId, fileName) {
  await prepareCanvasFontForExport();
  const response = await fetch("/api/drive/upload-generated-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folderId,
      fileName,
      imageDataUrl: canvasToDataUrl(),
    }),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Drive upload failed.");
  }
  return payload.upload;
}

function applyEditorialPreset() {
  applyTemplate("editorial");
}

function applyTemplate(templateKey, options = {}) {
  const { saveSnapshot = true, renderNow = true, announce = true } = options;
  const template = templateDefinitions[templateKey];
  if (!template) {
    return;
  }

  const baseValues = {
    titleEnabled: "on",
    authorEnabled: "on",
    secondaryAttributionEnabled: "off",
    emphasisTextEnabled: "off",
    quoteMarkEnabled: "off",
  };

  Object.entries(baseValues).forEach(([key, value]) => {
    if (controls[key]) {
      controls[key].value = value;
    }
  });

  Object.entries(template.values).forEach(([key, value]) => {
    if (controls[key]) {
      controls[key].value = value;
    }
  });

  controls.titleEnabled.value = "on";

  controls.templatePreset.value = templateKey;
  syncFamilyVariantFromTemplate(templateKey);

  if (template.randomPalette) {
    applyPalette(pickPalette());
  }

  syncTitleColorToText();
  if (renderNow) {
    render();
  }
  if (saveSnapshot) {
    scheduleProjectSnapshot();
  }
  if (announce) {
    const family = templateFamilies[controls.familyPreset.value];
    const variant = family?.variants?.[controls.variantPreset.value];
    const label = family && variant ? `${family.label} · ${variant.label}` : templateKey;
    setStatus(`${label} template applied.`);
  }
}

function randomizePalette() {
  applyPalette(pickPalette());
  render();
  setStatus("Text color palette shuffled.");
}

function normalizeRandomizedNoTemplateLayout() {
  const textBoxX = Number(controls.textBoxX.value);
  const textBoxY = Number(controls.textBoxY.value);
  const textBoxWidth = Number(controls.textBoxWidth.value);
  const textBoxHeight = Number(controls.textBoxHeight.value);

  const titleY = Math.max(4, Math.min(textBoxY - 5, 16));
  const titleX = Math.max(6, Math.min(textBoxX, 18));
  const attrY = Math.max(textBoxY + textBoxHeight + 3, 84);
  const attrX = controls.textAlign.value === "center" ? 50 : Math.max(6, Math.min(textBoxX, 24));
  const secondaryY = Math.min(attrY + 3, 95);
  const secondaryX = attrX;
  const quoteMarkX = Math.max(4, Math.min(textBoxX - 1, 16));
  const quoteMarkY = Math.max(4, Math.min(titleY - 1, 12));

  setControlValue("titleY", titleY);
  setControlValue("titleX", titleX);
  setControlValue("attributionY", attrY);
  setControlValue("attributionX", attrX);
  setControlValue("secondaryAttributionY", secondaryY);
  setControlValue("secondaryAttributionX", secondaryX);
  setControlValue("quoteMarkX", quoteMarkX);
  setControlValue("quoteMarkY", quoteMarkY);

  if (textBoxY + textBoxHeight > 74) {
    setControlValue("textBoxHeight", Math.max(30, 74 - textBoxY));
  }

  if (controls.textAlign.value === "center") {
    setControlValue("textBoxX", Math.max(12, Math.min(textBoxX, 26)));
    setControlValue("textBoxWidth", Math.max(44, Math.min(textBoxWidth, 72)));
  }
}

async function randomizeAllGraphicSettings() {
  const hasAiBackground = Boolean(state.aiBackgroundImage);
  const palette = pickPalette();
  const textColor = randomChoice([palette.text, ...RANDOM_TEXT_COLORS]);
  const metaColor = Math.random() < 0.7 ? textColor : randomChoice(RANDOM_TEXT_COLORS);
  const secondaryColor = Math.random() < 0.65 ? metaColor : randomChoice(RANDOM_TEXT_COLORS);
  const quoteMarkOn = Math.random() < 0.55 ? "on" : "off";
  const blurOn = hasAiBackground || Math.random() < 0.55 ? "on" : "off";

  applyTemplate("none", { saveSnapshot: false, renderNow: false, announce: false });

  setControlValue("fontFamily", randomChoice(RANDOM_FONT_FAMILIES));
  setControlValue("fontWeight", randomChoice(["500", "600", "700"]));
  setControlValue("layoutMode", randomChoice(["preserve", "paragraph"]));
  setControlValue("textAlign", randomChoice(["left", "center"]));
  setControlValue("fontSize", randomInt(58, 132));
  setControlValue("lineHeight", randomStep(1.0, 1.42, 0.05));
  setControlValue("autoFitText", "on");
  setControlValue("textBoxWidth", randomInt(42, 68));
  setControlValue("textBoxX", randomInt(8, 20));
  setControlValue("textBoxY", randomInt(14, 24));
  setControlValue("textBoxHeight", randomInt(34, 48));
  setControlValue("letterSpacing", randomStep(-0.4, 2.4, 0.2));
  setControlValue("textBoxBlurEnabled", blurOn);
  setControlValue("textBoxBlurAmount", randomInt(8, 30));
  setControlValue("textBoxBlurFeather", randomInt(24, 100));
  setControlValue("backgroundMode", hasAiBackground ? "ai-image" : randomChoice(["solid", "gradient"]));
  setControlValue("backgroundColorA", palette.paperA);
  setControlValue("backgroundColorB", palette.paperB);
  setControlValue("autoContrast", "on");
  setControlValue("textColor", textColor);
  setControlValue("titleEnabled", "on");
  setControlValue("titleFontStyle", randomChoice(["normal", "italic"]));
  setControlValue("titleFontSize", randomInt(16, 26));
  setControlValue("titleLetterSpacing", randomStep(0.5, 4, 0.5));
  setControlValue("titleColor", textColor);
  setControlValue("authorEnabled", "on");
  setControlValue("attributionFontSize", randomInt(14, 22));
  setControlValue("attributionLetterSpacing", randomStep(0.2, 3.6, 0.2));
  setControlValue("attributionColor", metaColor);
  setControlValue("attributionFontStyle", randomChoice(["normal", "italic"]));
  setControlValue("secondaryAttributionEnabled", "on");
  setControlValue("secondaryAttributionFontStyle", randomChoice(["normal", "italic"]));
  setControlValue("secondaryAttributionFontSize", randomInt(13, 20));
  setControlValue("secondaryAttributionLetterSpacing", randomStep(0.1, 3.2, 0.1));
  setControlValue("secondaryAttributionColor", secondaryColor);
  setControlValue("quoteHandling", "auto");
  setControlValue("quoteMarkEnabled", quoteMarkOn);
  setControlValue("quoteMarkStyle", randomChoice(RANDOM_QUOTE_MARK_STYLES));
  setControlValue("quoteMarkSize", randomInt(48, 120));
  setControlValue("quoteMarkWeight", randomStep(0.8, 1.6, 0.1));
  setControlValue("quoteMarkColor", Math.random() < 0.7 ? textColor : metaColor);
  setControlValue("emphasisTextEnabled", "off");
  normalizeRandomizedNoTemplateLayout();

  await ensureSelectedFontLoaded().catch(() => {});
  render();
  scheduleProjectSnapshot();
  setStatus("Graphic settings randomized for the current text.");
}

function populateFamilyOptions() {
  controls.familyPreset.innerHTML = Object.entries(templateFamilies)
    .map(([key, family]) => `<option value="${key}">${family.label}</option>`)
    .join("");
}

function populateVariantOptions(familyKey) {
  const family = templateFamilies[familyKey];
  if (!family) {
    controls.variantPreset.innerHTML = "";
    return;
  }

  controls.variantPreset.innerHTML = Object.entries(family.variants)
    .map(([key, variant]) => `<option value="${key}">${variant.label}</option>`)
    .join("");
}

function getSelectedTemplateKey() {
  const family = templateFamilies[controls.familyPreset.value];
  if (!family) {
    return "none";
  }

  const variant = family.variants[controls.variantPreset.value];
  return variant ? variant.template : Object.values(family.variants)[0].template;
}

function syncFamilyVariantFromTemplate(templateKey) {
  for (const [familyKey, family] of Object.entries(templateFamilies)) {
    for (const [variantKey, variant] of Object.entries(family.variants)) {
      if (variant.template === templateKey) {
        controls.familyPreset.value = familyKey;
        populateVariantOptions(familyKey);
        controls.variantPreset.value = variantKey;
        return;
      }
    }
  }
}

Object.values(controls).forEach((control) => {
  if (!(control instanceof HTMLElement)) {
    return;
  }

  if (
    control.tagName === "BUTTON" ||
    control.id === "searchResults" ||
    control.id === "statusMessage" ||
    control.id === "driveUploadDialog" ||
    control.id === "driveFileName" ||
    control.id === "driveFolderSummary" ||
    control.id === "weaverProductionNotesDialog" ||
    control.id === "driveUploadStatus"
  ) {
    return;
  }

  control.addEventListener("input", render);
  control.addEventListener("change", render);
  control.addEventListener("input", scheduleProjectSnapshot);
  control.addEventListener("change", scheduleProjectSnapshot);
});

[
  controls.textColor,
  controls.titleColor,
  controls.attributionColor,
  controls.secondaryAttributionColor,
].forEach((control) => {
  const handleManualColorChange = () => {
    if (controls.autoContrast.value !== "on") {
      return;
    }
    controls.autoContrast.value = "off";
    render();
    scheduleProjectSnapshot();
  };
  control.addEventListener("input", handleManualColorChange);
  control.addEventListener("change", handleManualColorChange);
});

controls.backgroundPrompt.addEventListener("input", syncBackgroundPromptTouchState);
controls.backgroundModel.addEventListener("change", () => {
  persistBackgroundModelPreference(controls.backgroundModel.value);
});
controls.poemText.addEventListener("input", () => {
  seedBackgroundPromptFromPoem();
  renderLineBreakGuide();
});
controls.toggleLineBreakGuideButton.addEventListener("click", () => {
  state.showLineBreakGuide = !state.showLineBreakGuide;
  renderLineBreakGuide();
});

controls.searchButton.addEventListener("click", searchLibrary);
controls.randomTextButton.addEventListener("click", loadRandomRecord);
controls.randomizeAllButton.addEventListener("click", () => {
  randomizeAllGraphicSettings();
});
controls.saveProjectButtonTop.addEventListener("click", () => saveProjectSnapshot({ announce: true }));
controls.saveProjectButton.addEventListener("click", () => saveProjectSnapshot({ announce: true }));
if (controls.applyEditorialPresetButton) {
  controls.applyEditorialPresetButton.addEventListener("click", () => {
    applyEditorialPreset();
  });
}
controls.sourceType.addEventListener("change", async () => {
  controls.weaverBookFilter.value = "";
  await updateSourceFilterUi();
});
controls.weaverRequestFilter.addEventListener("change", async () => {
  if (controls.sourceType.value === "weaver_graphics_requests") {
    await loadWeaverBookFilters();
    searchLibrary();
  }
});
controls.weaverBookFilter.addEventListener("change", () => {
  if (
    controls.sourceType.value === "weaver_graphics_requests" ||
    controls.sourceType.value === "poetry_please_ranked_texts"
  ) {
    searchLibrary();
  }
});
controls.familyPreset.addEventListener("change", () => {
  populateVariantOptions(controls.familyPreset.value);
  applyTemplate(getSelectedTemplateKey());
});
controls.variantPreset.addEventListener("change", () => applyTemplate(getSelectedTemplateKey()));
controls.templatePreset.addEventListener("change", () => {
  syncFamilyVariantFromTemplate(controls.templatePreset.value);
  applyTemplate(controls.templatePreset.value);
});
controls.applyTemplateButton.addEventListener("click", () => applyTemplate(getSelectedTemplateKey()));
controls.randomizePaletteButton.addEventListener("click", randomizePalette);
controls.sendToWeaverButton.addEventListener("click", sendToWeaverQc);
controls.saveToDriveAndSendButton.addEventListener("click", openDriveUploadDialog);
controls.pickDriveFolderButton.addEventListener("click", chooseDriveFolder);
controls.uploadDriveAndSendConfirmButton.addEventListener("click", saveToDriveAndSend);
controls.weaverProductionNotesDialog.addEventListener("input", () => {
  controls.weaverProductionNotes.value = controls.weaverProductionNotesDialog.value;
});
controls.searchQuery.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchLibrary();
  }
});
controls.generateBackgroundButton.addEventListener("click", generateAiBackground);
controls.importBackgroundButton.addEventListener("click", () => controls.backgroundImageUpload.click());
controls.backgroundImageUpload.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  try {
    await importBackgroundFromFile(file);
  } catch (error) {
    setStatus(error.message);
  } finally {
    controls.backgroundImageUpload.value = "";
  }
});
controls.saveBackgroundAssetButton.addEventListener("click", () => {
  saveCurrentBackgroundToLibrary().catch((error) => setStatus(error.message));
});
controls.clearBackgroundButton.addEventListener("click", clearAiBackground);
controls.downloadButton.addEventListener("click", downloadImage);
controls.fontFamily.addEventListener("change", async () => {
  await ensureSelectedFontLoaded();
  render();
});

ensureLogoImagesLoaded();
ensureQuoteMarkImagesLoaded();
populateFamilyOptions();
populateVariantOptions("none");
controls.familyPreset.value = "none";
controls.variantPreset.value = "clean";
renderBackgroundLibrary();
renderProjectHistory();
renderLineBreakGuide();
applyBackgroundModelPreference();
updateSourceFilterUi();
applyTemplate("none", { saveSnapshot: false });
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => render()).catch(() => {});
}
loadStartupRecord();
