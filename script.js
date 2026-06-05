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
  importAndSaveBackgroundButton: document.getElementById("importAndSaveBackgroundButton"),
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
  titleHandling: document.getElementById("titleHandling"),
  titleText: document.getElementById("titleText"),
  titleFontSize: document.getElementById("titleFontSize"),
  titleLetterSpacing: document.getElementById("titleLetterSpacing"),
  titleX: document.getElementById("titleX"),
  titleY: document.getElementById("titleY"),
  titleColor: document.getElementById("titleColor"),
  attributionText: document.getElementById("attributionText"),
  secondaryAttributionText: document.getElementById("secondaryAttributionText"),
  socialMediaEnabled: document.getElementById("socialMediaEnabled"),
  socialMediaDisplayText: document.getElementById("socialMediaDisplayText"),
  socialMediaInstagram: document.getElementById("socialMediaInstagram"),
  socialMediaTikTok: document.getElementById("socialMediaTikTok"),
  socialMediaTwitter: document.getElementById("socialMediaTwitter"),
  socialMediaFacebook: document.getElementById("socialMediaFacebook"),
  socialMediaWebsite: document.getElementById("socialMediaWebsite"),
  socialMediaOther: document.getElementById("socialMediaOther"),
  socialMediaNotes: document.getElementById("socialMediaNotes"),
  socialMediaLookupStatus: document.getElementById("socialMediaLookupStatus"),
  refreshSocialMediaButton: document.getElementById("refreshSocialMediaButton"),
  saveSocialMediaButton: document.getElementById("saveSocialMediaButton"),
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
  keepDriveRecordInQueue: document.getElementById("keepDriveRecordInQueue"),
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
  "2160x2700": { width: 2160, height: 2700 },
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
  contest: {
    label: "Short Form Contest",
    variants: {
      left: { label: "Left Block 4:5", template: "short-form-left" },
      center: { label: "Centered 4:5", template: "short-form-center" },
      right: { label: "Right Block 4:5", template: "short-form-right" },
      leftSquare: { label: "Left Square", template: "short-form-left-square" },
      centerSquare: { label: "Centered Square", template: "short-form-center-square" },
      rightSquare: { label: "Right Square", template: "short-form-right-square" },
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

const textEmphasisTemplateBaseValues = {
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
};

const templateDefinitions = {
  none: {
    mode: "none",
    values: {
      canvasPreset: "2160x2700",
      customWidth: "2160",
      customHeight: "2700",
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
      canvasPreset: "2160x2700",
      customWidth: "2160",
      customHeight: "2700",
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
      titleHandling: "auto",
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
      fontWeight: "900",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "72",
      lineHeight: "1.04",
      autoFitText: "on",
      textBoxWidth: "58",
      textBoxX: "21",
      textBoxY: "35.5",
      textBoxHeight: "21",
      letterSpacing: "0",
      backgroundMode: "solid",
      backgroundColorA: "#faf9f6",
      backgroundColorB: "#f2f2ef",
      textColor: "#ffffff",
      quoteMarkEnabled: "off",
      attributionFontSize: "23",
      attributionLetterSpacing: "3.4",
      attributionX: "50",
      attributionY: "72.7",
      attributionColor: "#d6d6d6",
      attributionFontStyle: "normal",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "23",
      secondaryAttributionLetterSpacing: "3.4",
      secondaryAttributionX: "50",
      secondaryAttributionY: "72.7",
      secondaryAttributionColor: "#d6d6d6",
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
      layoutMode: "preserve",
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
      ...textEmphasisTemplateBaseValues,
    },
  },
  "text-emphasis-logo": {
    mode: "text-emphasis-logo",
    values: {
      ...textEmphasisTemplateBaseValues,
      fontSize: "92",
      emphasisFontSize: "120",
      backgroundColorA: "#000000",
      backgroundColorB: "#101010",
      attributionLetterSpacing: "0.7",
      attributionColor: "#d8d8d8",
    },
  },
  "white-on-black": {
    mode: "white-on-black",
    values: {
      canvasPreset: "2160x2700",
      customWidth: "2160",
      customHeight: "2700",
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
      quoteMarkEnabled: "off",
      quoteMarkStyle: "circle-stamp",
      quoteMarkSize: "48",
      quoteMarkX: "47.2",
      quoteMarkY: "15",
      quoteMarkColor: "#f0f0f0",
      titleEnabled: "on",
      titleFontStyle: "italic",
      titleFontSize: "16",
      titleLetterSpacing: "4",
      titleX: "7",
      titleY: "15",
      titleColor: "#f2f2f2",
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
      layoutMode: "preserve",
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
  "short-form-left": {
    mode: "short-form-contest",
    values: {
      canvasPreset: "2160x2700",
      customWidth: "2160",
      customHeight: "2700",
      fontFamily: "Courier Prime",
      fontWeight: "400",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "46",
      lineHeight: "1.28",
      autoFitText: "on",
      textBoxWidth: "86",
      textBoxX: "7.4",
      textBoxY: "21",
      textBoxHeight: "45",
      letterSpacing: "1.1",
      textBoxBlurEnabled: "off",
      backgroundMode: "solid",
      backgroundColorA: "#050505",
      backgroundColorB: "#202020",
      textColor: "#f6f4ef",
      quoteMarkEnabled: "off",
      titleEnabled: "on",
      titleHandling: "auto",
      titleFontStyle: "normal",
      titleFontSize: "42",
      titleLetterSpacing: "1.1",
      titleX: "7.4",
      titleY: "10.8",
      authorEnabled: "on",
      attributionFontSize: "38",
      attributionLetterSpacing: "0.8",
      attributionX: "7.4",
      attributionY: "74",
      attributionColor: "#f6f4ef",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "29",
      secondaryAttributionLetterSpacing: "0.6",
      secondaryAttributionX: "7.4",
      secondaryAttributionY: "79",
      secondaryAttributionColor: "#f6f4ef",
      emphasisTextEnabled: "off",
    },
  },
  "short-form-center": {
    mode: "short-form-contest",
    values: {
      canvasPreset: "2160x2700",
      customWidth: "2160",
      customHeight: "2700",
      fontFamily: "Courier Prime",
      fontWeight: "400",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "46",
      lineHeight: "1.72",
      autoFitText: "on",
      textBoxWidth: "94",
      textBoxX: "3",
      textBoxY: "16",
      textBoxHeight: "48",
      letterSpacing: "1.1",
      textBoxBlurEnabled: "off",
      backgroundMode: "solid",
      backgroundColorA: "#303030",
      backgroundColorB: "#222222",
      textColor: "#f6f4ef",
      quoteMarkEnabled: "off",
      titleEnabled: "on",
      titleHandling: "auto",
      titleFontStyle: "normal",
      titleFontSize: "44",
      titleLetterSpacing: "1.1",
      titleX: "50",
      titleY: "7.8",
      authorEnabled: "on",
      attributionFontSize: "39",
      attributionLetterSpacing: "0.5",
      attributionX: "50",
      attributionY: "68",
      attributionColor: "#f6f4ef",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "30",
      secondaryAttributionLetterSpacing: "0.4",
      secondaryAttributionX: "50",
      secondaryAttributionY: "73",
      secondaryAttributionColor: "#f6f4ef",
      emphasisTextEnabled: "off",
    },
  },
  "short-form-right": {
    mode: "short-form-contest",
    values: {
      canvasPreset: "2160x2700",
      customWidth: "2160",
      customHeight: "2700",
      fontFamily: "Courier Prime",
      fontWeight: "400",
      textAlign: "right",
      layoutMode: "preserve",
      fontSize: "43",
      lineHeight: "1.58",
      autoFitText: "on",
      textBoxWidth: "83",
      textBoxX: "9",
      textBoxY: "22",
      textBoxHeight: "49",
      letterSpacing: "1.1",
      textBoxBlurEnabled: "off",
      backgroundMode: "solid",
      backgroundColorA: "#303030",
      backgroundColorB: "#222222",
      textColor: "#f6f4ef",
      quoteMarkEnabled: "off",
      titleEnabled: "on",
      titleHandling: "auto",
      titleFontStyle: "normal",
      titleFontSize: "42",
      titleLetterSpacing: "1.1",
      titleX: "92",
      titleY: "10.8",
      authorEnabled: "on",
      attributionFontSize: "38",
      attributionLetterSpacing: "0.5",
      attributionX: "92",
      attributionY: "78",
      attributionColor: "#f6f4ef",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "29",
      secondaryAttributionLetterSpacing: "0.4",
      secondaryAttributionX: "92",
      secondaryAttributionY: "83.5",
      secondaryAttributionColor: "#f6f4ef",
      emphasisTextEnabled: "off",
    },
  },
  "short-form-left-square": {
    mode: "short-form-contest",
    values: {
      canvasPreset: "1080x1080",
      customWidth: "1080",
      customHeight: "1080",
      fontFamily: "Courier Prime",
      fontWeight: "400",
      textAlign: "left",
      layoutMode: "preserve",
      fontSize: "46",
      lineHeight: "1.28",
      autoFitText: "on",
      textBoxWidth: "86",
      textBoxX: "7.4",
      textBoxY: "23",
      textBoxHeight: "40",
      letterSpacing: "1.1",
      textBoxBlurEnabled: "off",
      backgroundMode: "solid",
      backgroundColorA: "#050505",
      backgroundColorB: "#202020",
      textColor: "#f6f4ef",
      quoteMarkEnabled: "off",
      titleEnabled: "on",
      titleHandling: "auto",
      titleFontStyle: "normal",
      titleFontSize: "42",
      titleLetterSpacing: "1.1",
      titleX: "7.4",
      titleY: "13.2",
      authorEnabled: "on",
      attributionFontSize: "38",
      attributionLetterSpacing: "0.8",
      attributionX: "7.4",
      attributionY: "64.8",
      attributionColor: "#f6f4ef",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "29",
      secondaryAttributionLetterSpacing: "0.6",
      secondaryAttributionX: "7.4",
      secondaryAttributionY: "70.1",
      secondaryAttributionColor: "#f6f4ef",
      emphasisTextEnabled: "off",
    },
  },
  "short-form-center-square": {
    mode: "short-form-contest",
    values: {
      canvasPreset: "1080x1080",
      customWidth: "1080",
      customHeight: "1080",
      fontFamily: "Courier Prime",
      fontWeight: "400",
      textAlign: "center",
      layoutMode: "preserve",
      fontSize: "46",
      lineHeight: "1.72",
      autoFitText: "on",
      textBoxWidth: "94",
      textBoxX: "3",
      textBoxY: "17",
      textBoxHeight: "39",
      letterSpacing: "1.1",
      textBoxBlurEnabled: "off",
      backgroundMode: "solid",
      backgroundColorA: "#303030",
      backgroundColorB: "#222222",
      textColor: "#f6f4ef",
      quoteMarkEnabled: "off",
      titleEnabled: "on",
      titleHandling: "auto",
      titleFontStyle: "normal",
      titleFontSize: "44",
      titleLetterSpacing: "1.1",
      titleX: "50",
      titleY: "8.4",
      authorEnabled: "on",
      attributionFontSize: "39",
      attributionLetterSpacing: "0.5",
      attributionX: "50",
      attributionY: "58.2",
      attributionColor: "#f6f4ef",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "30",
      secondaryAttributionLetterSpacing: "0.4",
      secondaryAttributionX: "50",
      secondaryAttributionY: "63.6",
      secondaryAttributionColor: "#f6f4ef",
      emphasisTextEnabled: "off",
    },
  },
  "short-form-right-square": {
    mode: "short-form-contest",
    values: {
      canvasPreset: "1080x1080",
      customWidth: "1080",
      customHeight: "1080",
      fontFamily: "Courier Prime",
      fontWeight: "400",
      textAlign: "right",
      layoutMode: "preserve",
      fontSize: "43",
      lineHeight: "1.58",
      autoFitText: "on",
      textBoxWidth: "83",
      textBoxX: "9",
      textBoxY: "25",
      textBoxHeight: "45",
      letterSpacing: "1.1",
      textBoxBlurEnabled: "off",
      backgroundMode: "solid",
      backgroundColorA: "#303030",
      backgroundColorB: "#222222",
      textColor: "#f6f4ef",
      quoteMarkEnabled: "off",
      titleEnabled: "on",
      titleHandling: "auto",
      titleFontStyle: "normal",
      titleFontSize: "42",
      titleLetterSpacing: "1.1",
      titleX: "92",
      titleY: "13.4",
      authorEnabled: "on",
      attributionFontSize: "38",
      attributionLetterSpacing: "0.5",
      attributionX: "92",
      attributionY: "79",
      attributionColor: "#f6f4ef",
      attributionFontStyle: "italic",
      secondaryAttributionEnabled: "on",
      secondaryAttributionFontStyle: "italic",
      secondaryAttributionFontSize: "29",
      secondaryAttributionLetterSpacing: "0.4",
      secondaryAttributionX: "92",
      secondaryAttributionY: "84.4",
      secondaryAttributionColor: "#f6f4ef",
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
  "short-form-left": { logo: "none" },
  "short-form-center": { logo: "none" },
  "short-form-right": { logo: "none" },
  "short-form-left-square": { logo: "none" },
  "short-form-center-square": { logo: "none" },
  "short-form-right-square": { logo: "none" },
  "crested-underline": { logo: "semicolon-black" },
  simple: { logo: "text-black" },
};

const shortFormContestTemplates = new Set([
  "short-form-left",
  "short-form-center",
  "short-form-right",
  "short-form-left-square",
  "short-form-center-square",
  "short-form-right-square",
]);

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
  pendingBackgroundImportSave: false,
  showLineBreakGuide: false,
  lastExportState: null,
  currentSearchResults: [],
  shortFormBackgroundCache: new Map(),
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
const WEAVER_REPEAT_REQUESTS_KEY = "pig-weaver-repeat-requests-v1";
const SOCIAL_MEDIA_PROFILES_KEY = "pig-social-media-profiles-v1";
const BACKGROUND_MODEL_PREFERENCE_KEY = "pig-background-model-preference-v1";
const MAX_PROJECT_HISTORY = 20;
const MAX_BACKGROUND_LIBRARY = 36;
const MAX_WEAVER_SUPPRESSED_REQUESTS = 400;
const MAX_SHORT_FORM_BACKGROUND_CACHE = 3;
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
  "keepDriveRecordInQueue",
  "driveUploadStatus",
  "selectedRecordMeta",
  "socialMediaLookupStatus",
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

const HIGH_RES_TYPOGRAPHY_BASE_WIDTH = 1080;
const HIGH_RES_TYPOGRAPHY_MIN_WIDTH = 1600;

function typographyScaleForCanvas(width) {
  if (width < HIGH_RES_TYPOGRAPHY_MIN_WIDTH) {
    return 1;
  }
  return width / HIGH_RES_TYPOGRAPHY_BASE_WIDTH;
}

function scaledTypographyValue(value, width) {
  return Number(value) * typographyScaleForCanvas(width);
}

function scaledMinimumFontSize(width, baseSize = 24) {
  return baseSize * typographyScaleForCanvas(width);
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

  const width = clamp(Number(controls.customWidth.value) || 2160, 320, 4000);
  const height = clamp(Number(controls.customHeight.value) || 2700, 320, 4000);

  if (canvas.width !== width) {
    canvas.width = width;
  }
  if (canvas.height !== height) {
    canvas.height = height;
  }
}

function cleanStatusMessage(message) {
  const text = String(message || "");
  if (
    /sheets metadata read failed/i.test(text) ||
    /"status"\s*:\s*"UNAVAILABLE"/i.test(text) ||
    /service is currently unavailable/i.test(text)
  ) {
    return "Source metadata is temporarily unavailable. Try Search source again in a moment.";
  }
  return text;
}

function setStatus(message) {
  controls.statusMessage.textContent = cleanStatusMessage(message);
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

function shortFormContestLayout(template) {
  const key = String(template || "");
  if (key.includes("center")) {
    return "center";
  }
  if (key.includes("right")) {
    return "right";
  }
  return "left";
}

function isShortFormLeftTemplate(template) {
  return shortFormContestLayout(template) === "left";
}

function shortFormContestMetadataAlign(template) {
  const layout = shortFormContestLayout(template);
  if (layout === "center") {
    return "center";
  }
  if (layout === "right") {
    return "right";
  }
  return "left";
}

function shortFormContestYear() {
  const candidates = [
    state.selectedRecord?.bookTitle,
    controls.secondaryAttributionText.value,
    controls.weaverBookFilter.value,
  ];
  for (const candidate of candidates) {
    const match = String(candidate || "").match(/\b20\d{2}\b/);
    if (match) {
      return match[0];
    }
  }
  return String(new Date().getFullYear());
}

function deterministicUnit(index, salt = 0) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function drawShortFormGrain(width, height, intensity = 34, opacity = 0.14) {
  const grainSize = 220;
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = grainSize;
  grainCanvas.height = grainSize;
  const grainContext = grainCanvas.getContext("2d");
  const imageData = grainContext.createImageData(grainSize, grainSize);

  for (let index = 0; index < imageData.data.length; index += 4) {
    const pixel = index / 4;
    const noise = deterministicUnit(pixel, 44) - 0.5;
    const value = Math.max(0, Math.min(255, 128 + noise * intensity));
    imageData.data[index] = value;
    imageData.data[index + 1] = value;
    imageData.data[index + 2] = value;
    imageData.data[index + 3] = 255;
  }

  grainContext.putImageData(imageData, 0, 0);
  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "overlay";
  context.imageSmoothingEnabled = false;
  context.drawImage(grainCanvas, 0, 0, width, height);
  context.restore();
}

function drawShortFormConcreteMottle(width, height, template) {
  const isLeft = isShortFormLeftTemplate(template);
  context.save();
  context.globalCompositeOperation = "multiply";
  for (let index = 0; index < 52; index += 1) {
    const x = deterministicUnit(index, 1) * width;
    const y = deterministicUnit(index, 2) * height;
    const radius = width * (0.08 + deterministicUnit(index, 3) * 0.28);
    const gradient = context.createRadialGradient(x, y, radius * 0.06, x, y, radius);
    const opacity = isLeft
      ? 0.052 + deterministicUnit(index, 4) * 0.08
      : 0.025 + deterministicUnit(index, 4) * 0.055;
    gradient.addColorStop(0, `rgba(0,0,0,${opacity})`);
    gradient.addColorStop(0.58, `rgba(0,0,0,${opacity * 0.42})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
  context.restore();

  context.save();
  context.globalCompositeOperation = "screen";
  for (let index = 0; index < 24; index += 1) {
    const x = deterministicUnit(index, 14) * width;
    const y = deterministicUnit(index, 15) * height;
    const radius = width * (0.12 + deterministicUnit(index, 16) * 0.34);
    const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius);
    const opacity = isLeft
      ? 0.012 + deterministicUnit(index, 17) * 0.026
      : 0.018 + deterministicUnit(index, 17) * 0.04;
    gradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
  context.restore();
}

function drawShortFormLeftGrunge(width, height) {
  context.save();
  context.globalCompositeOperation = "screen";
  for (let index = 0; index < 68; index += 1) {
    const x = deterministicUnit(index, 24) * width;
    const y = height * (0.42 + deterministicUnit(index, 25) * 0.58);
    const radiusX = width * (0.06 + deterministicUnit(index, 26) * 0.26);
    const radiusY = height * (0.012 + deterministicUnit(index, 27) * 0.07);
    context.globalAlpha = 0.009 + deterministicUnit(index, 28) * 0.032;
    context.fillStyle = deterministicUnit(index, 29) > 0.5 ? "#4b4f4c" : "#222827";
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, deterministicUnit(index, 30) * Math.PI, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();

  context.save();
  context.globalCompositeOperation = "multiply";
  for (let index = 0; index < 34; index += 1) {
    const x = deterministicUnit(index, 31) * width;
    const y = height * (0.56 + deterministicUnit(index, 32) * 0.4);
    const radius = width * (0.05 + deterministicUnit(index, 33) * 0.2);
    const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius);
    gradient.addColorStop(0, `rgba(0,0,0,${0.16 + deterministicUnit(index, 34) * 0.16})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
  context.restore();
}

function drawShortFormFineWear(width, height, template) {
  const isLeft = isShortFormLeftTemplate(template);
  context.save();
  context.globalAlpha = isLeft ? 0.09 : 0.045;
  context.strokeStyle = "#121212";
  context.lineWidth = Math.max(1, width * 0.0012);
  for (let index = 0; index < 42; index += 1) {
    const x = deterministicUnit(index, 38) * width;
    const y = deterministicUnit(index, 39) * height;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width * (deterministicUnit(index, 40) - 0.5) * 0.018, y + height * (0.035 + deterministicUnit(index, 41) * 0.2));
    context.stroke();
  }
  context.restore();
}

function cacheShortFormContestBackground(template, width, height) {
  const cacheCanvas = document.createElement("canvas");
  cacheCanvas.width = width;
  cacheCanvas.height = height;
  cacheCanvas.getContext("2d").drawImage(canvas, 0, 0);
  state.shortFormBackgroundCache.set(`${template}:${width}x${height}`, cacheCanvas);
  while (state.shortFormBackgroundCache.size > MAX_SHORT_FORM_BACKGROUND_CACHE) {
    state.shortFormBackgroundCache.delete(state.shortFormBackgroundCache.keys().next().value);
  }
}

function drawShortFormContestBackground(width, height) {
  const template = controls.templatePreset.value;
  const cacheKey = `${template}:${width}x${height}`;
  const cachedBackground = state.shortFormBackgroundCache.get(cacheKey);
  if (cachedBackground) {
    context.drawImage(cachedBackground, 0, 0);
    return;
  }

  const isLeft = isShortFormLeftTemplate(template);
  const gradient = context.createLinearGradient(0, 0, width, height);
  if (isLeft) {
    gradient.addColorStop(0, "#010101");
    gradient.addColorStop(0.48, "#030303");
    gradient.addColorStop(1, "#151716");
  } else {
    gradient.addColorStop(0, "#393939");
    gradient.addColorStop(0.45, "#303030");
    gradient.addColorStop(1, "#222222");
  }
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.52, height * 0.28, width * 0.08, width * 0.52, height * 0.42, width * 0.86);
  glow.addColorStop(0, isLeft ? "rgba(255,255,255,0.018)" : "rgba(255,255,255,0.06)");
  glow.addColorStop(0.48, isLeft ? "rgba(255,255,255,0.008)" : "rgba(255,255,255,0.025)");
  glow.addColorStop(1, "rgba(0,0,0,0.18)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  drawShortFormConcreteMottle(width, height, template);
  if (isLeft) {
    drawShortFormLeftGrunge(width, height);
  }
  drawShortFormFineWear(width, height, template);
  drawShortFormGrain(width, height, isLeft ? 48 : 30, isLeft ? 0.18 : 0.11);

  const vignette = context.createRadialGradient(width * 0.52, height * 0.46, width * 0.18, width * 0.52, height * 0.5, width * 0.74);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.62, isLeft ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, isLeft ? "rgba(0,0,0,0.58)" : "rgba(0,0,0,0.34)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);

  cacheShortFormContestBackground(template, width, height);
}

function drawShortFormContestBadge(width, height) {
  const template = controls.templatePreset.value;
  const specs = {
    left: { x: 0.78, y: 0.805, w: 0.27 },
    center: { x: 0.5, y: 0.8, w: 0.27 },
    right: { x: 0.24, y: 0.805, w: 0.27 },
  };
  const spec = specs[shortFormContestLayout(template)];
  if (!spec) {
    return;
  }

  const scale = (width * spec.w) / 300;
  context.save();
  context.translate(width * spec.x, height * spec.y);
  context.scale(scale, scale);

  context.fillStyle = "#1e2426";
  context.beginPath();
  for (let index = 0; index < 32; index += 1) {
    const radius = index % 2 === 0 ? 112 : 99;
    const angle = -Math.PI / 2 + (index / 32) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath();
  context.fill();

  context.fillStyle = "#b8fff8";
  context.beginPath();
  context.arc(0, 0, 88, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#263235";
  context.lineWidth = 5;
  context.stroke();

  context.fillStyle = "#f4fbf7";
  context.beginPath();
  context.arc(0, 0, 74, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#243033";
  context.lineWidth = 4;
  context.stroke();

  context.strokeStyle = "#75e3dd";
  context.lineWidth = 7;
  context.beginPath();
  context.arc(0, 0, 58, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = "#172123";
  context.font = '700 10px "Archivo Narrow", "Arial", sans-serif';
  context.textBaseline = "middle";
  drawSpacedText("BUTTON POETRY", 0, -44, "center", 0.6);
  drawSpacedText("BUTTON POETRY", 0, 44, "center", 0.6);

  context.fillStyle = "#b8fff8";
  context.strokeStyle = "#263235";
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(-146, -26);
  context.lineTo(-102, -18);
  context.lineTo(-102, 28);
  context.lineTo(-146, 22);
  context.lineTo(-130, -2);
  context.closePath();
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(146, -26);
  context.lineTo(102, -18);
  context.lineTo(102, 28);
  context.lineTo(146, 22);
  context.lineTo(130, -2);
  context.closePath();
  context.fill();
  context.stroke();

  drawRoundedRectPath(context, -105, -31, 210, 62, 4);
  context.fillStyle = "#c7fff9";
  context.fill();
  context.strokeStyle = "#263235";
  context.lineWidth = 5;
  context.stroke();

  context.fillStyle = "#e87520";
  context.font = '700 15px "Archivo Narrow", "Arial", sans-serif';
  drawSpacedText(`${shortFormContestYear()} SHORT FORM`, 0, -18, "center", 2.1);
  context.font = '700 15px "Archivo Narrow", "Arial", sans-serif';
  drawSpacedText("CONTEST WINNER", 0, 3, "center", 1.8);

  context.restore();
}

function drawTemplateLogo(width, height) {
  const template = controls.templatePreset.value;
  if (shortFormContestTemplates.has(template)) {
    drawShortFormContestBadge(width, height);
    return;
  }
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

function strokeBadgeDiagonalPatch(x, y, patchWidth, patchHeight, direction, gap) {
  context.save();
  context.beginPath();
  context.rect(x, y, patchWidth, patchHeight);
  context.clip();

  for (let offset = -patchHeight; offset < patchWidth + patchHeight; offset += gap) {
    context.beginPath();
    if (direction > 0) {
      context.moveTo(x + offset, y);
      context.lineTo(x + offset + patchHeight, y + patchHeight);
    } else {
      context.moveTo(x + offset, y + patchHeight);
      context.lineTo(x + offset + patchHeight, y);
    }
    context.stroke();
  }

  context.restore();
}

function drawBadgeLineField(width, height) {
  context.save();
  context.strokeStyle = "#c7c7c7";
  context.lineWidth = Math.max(2, width * 0.0024);
  const gap = width * 0.026;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  strokeBadgeDiagonalPatch(0, 0, halfWidth, halfHeight, 1, gap);
  strokeBadgeDiagonalPatch(halfWidth, 0, halfWidth, halfHeight, -1, gap);
  strokeBadgeDiagonalPatch(0, halfHeight, halfWidth, halfHeight, -1, gap);
  strokeBadgeDiagonalPatch(halfWidth, halfHeight, halfWidth, halfHeight, 1, gap);
  context.restore();
}

function drawTemplateOverlay(width, height) {
  const template = controls.templatePreset.value;
  context.save();

  if (template === "none") {
    context.restore();
    return;
  } else if (shortFormContestTemplates.has(template)) {
    drawShortFormContestBackground(width, height);
  } else if (template === "artsy") {
    context.strokeStyle = "#c1cbc6";
    context.lineWidth = 2;
    for (let index = 0; index < 4; index += 1) {
      const inset = 18 + index * 10;
      context.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    }
  } else if (template === "badge") {
    drawBadgeLineField(width, height);
    context.fillStyle = "#000000";
    const circleRadius = Math.min(width, height) * 0.395;
    const circleY = height * 0.5;
    context.beginPath();
    context.arc(width / 2, circleY, circleRadius, 0, Math.PI * 2);
    context.fill();
    drawCenteredRule(width / 2, circleY - circleRadius * 0.49, width * 0.18, Math.max(4, width * 0.0034), "#ffffff");
    drawCenteredRule(width / 2, circleY + circleRadius * 0.38, width * 0.18, Math.max(4, width * 0.0034), "#ffffff");
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
    drawCenteredRule(width / 2, height * 0.94, width * 0.5, 2, "#777777");
    context.fillStyle = "#9a9a9a";
    context.font = `400 ${width * 0.026}px "Georgia"`;
    context.textAlign = "center";
    context.fillText("buttonpoetry.com", width / 2, height * 0.92);
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

  context.save();
  context.textAlign = "left";
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    context.fillText(character, cursorX, y);
    cursorX += context.measureText(character).width + letterSpacing;
  }
  context.restore();
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
  const hasDecorativeMark = false;
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
    return Promise.resolve(true);
  }

  const fontFamily = controls.fontFamily.value;
  if (!fontFamily) {
    controls.fontFamily.value = "Georgia";
    return Promise.resolve(false);
  }
  if (SYSTEM_FONT_FAMILIES.has(fontFamily)) {
    return Promise.resolve(true);
  }
  if (!GOOGLE_FONT_FAMILIES.has(fontFamily)) {
    controls.fontFamily.value = "Georgia";
    setStatus(`Font "${fontFamily}" is not wired into P.I.G. yet, so Georgia was selected instead.`);
    return Promise.resolve(false);
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
      return true;
    })
    .catch(() => {
      controls.fontFamily.value = "Georgia";
      setStatus(`Font "${fontFamily}" could not load, so Georgia was selected instead.`);
      return false;
    });
}

async function prepareCanvasFontForExport() {
  await ensureSelectedFontLoaded();
  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => {});
  }
  render();
}

function createFlattenedExportCanvas() {
  const flattenedCanvas = document.createElement("canvas");
  flattenedCanvas.width = canvas.width;
  flattenedCanvas.height = canvas.height;
  const flattenedContext = flattenedCanvas.getContext("2d");
  flattenedContext.save();
  flattenedContext.fillStyle = controls.backgroundColorA.value || "#f7f3ea";
  flattenedContext.fillRect(0, 0, flattenedCanvas.width, flattenedCanvas.height);
  flattenedContext.drawImage(canvas, 0, 0);
  flattenedContext.restore();
  return flattenedCanvas;
}

async function exportCanvasDataUrl() {
  await prepareCanvasFontForExport();
  return createFlattenedExportCanvas().toDataURL("image/png");
}

async function exportCanvasBlob() {
  await prepareCanvasFontForExport();
  const flattenedCanvas = createFlattenedExportCanvas();
  return new Promise((resolve, reject) => {
    flattenedCanvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Could not create the PNG blob."));
      }
    }, "image/png");
  });
}

function quoteLinesForSize(text, maxWidth, letterSpacing, fontSize, fontWeight, fontFamily) {
  context.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
  return buildLines(text, maxWidth, letterSpacing);
}

function fitQuoteFontSize(text, box, desiredFontSize, letterSpacing, minFontSize = 24) {
  const lineHeight = Number(controls.lineHeight.value);
  const fontWeight = controls.fontWeight.value;
  const fontFamily = controls.fontFamily.value;
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

  const fontSize = scaledTypographyValue(controls.quoteMarkSize.value, width);
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

function measureTextSegment(text, font, letterSpacing) {
  context.save();
  context.font = font;
  const width = measureSpacedText(text, letterSpacing);
  context.restore();
  return width;
}

function drawBadgeInlineAttribution(width, height, textMetrics = null) {
  if (controls.authorEnabled.value !== "on") {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const author = controls.attributionText.value.replace(/\r\n/g, "\n").trim();
  if (!author) {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const secondary =
    controls.secondaryAttributionEnabled.value === "on"
      ? controls.secondaryAttributionText.value.replace(/\r\n/g, "\n").trim()
      : "";
  const typographyScale = typographyScaleForCanvas(width);
  const fontSize = Number(controls.attributionFontSize.value) * typographyScale;
  const secondaryFontSize = Number(controls.secondaryAttributionFontSize.value) * typographyScale;
  const letterSpacing = Number(controls.attributionLetterSpacing.value) * typographyScale;
  const secondaryLetterSpacing = Number(controls.secondaryAttributionLetterSpacing.value) * typographyScale;
  const x = width * (Number(controls.attributionX.value) / 100);
  const requestedY = height * (Number(controls.attributionY.value) / 100);
  const lineHeight = Math.max(fontSize, secondaryFontSize) * 1.35;
  const textBottom = textMetrics ? textMetrics.startY + textMetrics.blockHeight : 0;
  const minSafeY = textBottom + height * 0.04;
  const maxSafeY = Math.max(0, height - lineHeight - height * 0.02);
  const y = Math.min(Math.max(requestedY, minSafeY), maxSafeY);
  const clamped = y !== requestedY;
  const fontFamily = controls.fontFamily.value;
  const authorText = author.toUpperCase();
  const separator = secondary ? ", " : "";
  const secondaryText = secondary.toUpperCase();
  const authorFont = `${controls.attributionFontStyle.value} 400 ${fontSize}px "${fontFamily}"`;
  const separatorFont = `normal 400 ${fontSize}px "${fontFamily}"`;
  const secondaryFont = `${controls.secondaryAttributionFontStyle.value} 400 ${secondaryFontSize}px "${fontFamily}"`;
  const authorWidth = measureTextSegment(authorText, authorFont, letterSpacing);
  const separatorWidth = measureTextSegment(separator, separatorFont, letterSpacing);
  const secondaryWidth = measureTextSegment(secondaryText, secondaryFont, secondaryLetterSpacing);
  const totalWidth = authorWidth + separatorWidth + secondaryWidth;
  const region = {
    x: Math.max(0, x - totalWidth / 2 - 28 * typographyScale),
    y: Math.max(0, y - 28 * typographyScale),
    width: Math.min(canvas.width, totalWidth + 56 * typographyScale),
    height: Math.min(canvas.height, lineHeight + 56 * typographyScale),
  };
  const resolvedColor = resolveAccessibleColorValue(controls.attributionColor.value, region, 4.5, { preserveAccent: true });
  let cursorX = x - totalWidth / 2;

  context.textBaseline = "top";
  context.fillStyle = resolvedColor.color;
  context.font = authorFont;
  drawSpacedText(authorText, cursorX, y, "left", letterSpacing);
  cursorX += authorWidth;

  if (separator) {
    context.font = separatorFont;
    drawSpacedText(separator, cursorX, y, "left", letterSpacing);
    cursorX += separatorWidth;
    context.font = secondaryFont;
    drawSpacedText(secondaryText, cursorX, y, "left", secondaryLetterSpacing);
  }

  return { shifted: resolvedColor.shifted, bottomY: y + lineHeight, clamped };
}

function drawAttribution(width, height, textMetrics = null) {
  if (controls.authorEnabled.value !== "on") {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  if (controls.templatePreset.value === "badge") {
    return drawBadgeInlineAttribution(width, height, textMetrics);
  }

  const text = controls.attributionText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const typographyScale = typographyScaleForCanvas(width);
  const fontSize = Number(controls.attributionFontSize.value) * typographyScale;
  const x = width * (Number(controls.attributionX.value) / 100);
  const requestedY = height * (Number(controls.attributionY.value) / 100);
  const lineHeight = fontSize * 1.45;
  const letterSpacing = Number(controls.attributionLetterSpacing.value) * typographyScale;
  const fontStyle = controls.attributionFontStyle.value;
  const template = controls.templatePreset.value;
  const centeredTemplates = new Set(["white-on-black", "white-on-black-45", "black-name-bar"]);
  const align = shortFormContestTemplates.has(template)
    ? shortFormContestMetadataAlign(template)
    : centeredTemplates.has(template)
      ? "center"
      : "left";
  const minSafeY = textMetrics
    ? textMetrics.startY + textMetrics.blockHeight + height * 0.03
    : 0;
  const lines = text.split("\n");
  const maxSafeY = Math.max(0, height - lines.length * lineHeight - height * 0.02);
  const y = Math.min(Math.max(requestedY, minSafeY), maxSafeY);
  const clamped = y !== requestedY;

  context.font = `${fontStyle} 600 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const region = estimateTextRegionBox(x, y, lines, fontSize, 1.45, letterSpacing, align, 28 * typographyScale);
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

  if (controls.templatePreset.value === "badge") {
    return { shifted: false, bottomY: attributionMetrics?.bottomY || 0, clamped: false };
  }

  const text = controls.secondaryAttributionText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const typographyScale = typographyScaleForCanvas(width);
  const fontSize = Number(controls.secondaryAttributionFontSize.value) * typographyScale;
  const x = width * (Number(controls.secondaryAttributionX.value) / 100);
  const requestedY = height * (Number(controls.secondaryAttributionY.value) / 100);
  const lineHeight = fontSize * 1.4;
  const letterSpacing = Number(controls.secondaryAttributionLetterSpacing.value) * typographyScale;
  const fontStyle = controls.secondaryAttributionFontStyle.value;
  const template = controls.templatePreset.value;
  const centeredTemplates = new Set(["white-on-black", "white-on-black-45", "black-name-bar"]);
  const align = shortFormContestTemplates.has(template)
    ? shortFormContestMetadataAlign(template)
    : centeredTemplates.has(template)
      ? "center"
      : "left";
  const textBottom = textMetrics ? textMetrics.startY + textMetrics.blockHeight : 0;
  const authorBottom = attributionMetrics?.bottomY || 0;
  const minSafeY = Math.max(textBottom + height * 0.04, authorBottom ? authorBottom + height * 0.012 : 0);
  const lines = text.split("\n");
  const maxSafeY = Math.max(0, height - lines.length * lineHeight - height * 0.02);
  const y = Math.min(Math.max(requestedY, minSafeY), maxSafeY);
  const clamped = y !== requestedY;

  context.font = `${fontStyle} 500 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const region = estimateTextRegionBox(x, y, lines, fontSize, 1.4, letterSpacing, align, 28 * typographyScale);
  const resolvedColor = resolveAccessibleColorValue(controls.secondaryAttributionColor.value, region, 4.5, { preserveAccent: true });
  context.fillStyle = resolvedColor.color;

  lines.forEach((line, index) => {
    drawSpacedText(line, x, y + index * lineHeight, align, letterSpacing);
  });
  return { shifted: resolvedColor.shifted, bottomY: y + lines.length * lineHeight, clamped };
}

function drawSocialMediaHandles(width, height, attributionMetrics = null, secondaryAttributionMetrics = null) {
  if (controls.socialMediaEnabled.value !== "on") {
    return { shifted: false, bottomY: 0, clamped: false };
  }
  const text = controls.socialMediaDisplayText.value.trim();
  if (!text) {
    return { shifted: false, bottomY: 0, clamped: false };
  }

  const typographyScale = typographyScaleForCanvas(width);
  const fontSize = Math.max(
    12 * typographyScale,
    Math.round(Number(controls.secondaryAttributionFontSize.value) * 0.9 * typographyScale),
  );
  const letterSpacing = 0.2 * typographyScale;
  const xPercent =
    controls.secondaryAttributionEnabled.value === "on"
      ? Number(controls.secondaryAttributionX.value)
      : Number(controls.attributionX.value);
  const x = width * (xPercent / 100);
  const previousBottom = Math.max(attributionMetrics?.bottomY || 0, secondaryAttributionMetrics?.bottomY || 0);
  const requestedY = previousBottom ? previousBottom + height * 0.012 : height * 0.92;
  const lineHeight = fontSize * 1.35;
  const maxSafeY = Math.max(0, height - lineHeight - height * 0.02);
  const y = Math.min(requestedY, maxSafeY);
  const clamped = y !== requestedY;
  const template = controls.templatePreset.value;
  const centeredTemplates = new Set(["white-on-black", "white-on-black-45", "black-name-bar"]);
  const align = shortFormContestTemplates.has(template)
    ? shortFormContestMetadataAlign(template)
    : centeredTemplates.has(template)
      ? "center"
      : "left";

  context.font = `500 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const region = estimateTextRegionBox(x, y, [text], fontSize, 1.35, letterSpacing, align, 28 * typographyScale);
  const resolvedColor = resolveAccessibleColorValue(controls.secondaryAttributionColor.value, region, 4.5, { preserveAccent: true });
  context.fillStyle = resolvedColor.color;
  drawSpacedText(text, x, y, align, letterSpacing);
  return { shifted: resolvedColor.shifted, bottomY: y + lineHeight, clamped };
}

function normalizeTitleMatchText(value) {
  return String(value || "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shouldRenderSeparateTitle() {
  return (
    controls.titleEnabled.value === "on" &&
    controls.titleHandling.value !== "excerpt" &&
    controls.titleText.value.trim()
  );
}

function stripDuplicateTitleLine(text) {
  if (controls.titleHandling.value !== "auto" || !shouldRenderSeparateTitle()) {
    return text;
  }

  const titleKey = normalizeTitleMatchText(controls.titleText.value);
  if (!titleKey) {
    return text;
  }

  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  const firstContentIndex = lines.findIndex((line) => line.trim());
  if (firstContentIndex === -1 || normalizeTitleMatchText(lines[firstContentIndex]) !== titleKey) {
    return text;
  }

  lines.splice(firstContentIndex, 1);
  while (lines.length && !lines[0].trim()) {
    lines.shift();
  }
  return lines.join("\n");
}

function drawTitle(width, height) {
  if (!shouldRenderSeparateTitle()) {
    return { shifted: false };
  }

  const text = controls.titleText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false };
  }

  const typographyScale = typographyScaleForCanvas(width);
  const fontSize = Number(controls.titleFontSize.value) * typographyScale;
  const x = width * (Number(controls.titleX.value) / 100);
  const y = height * (Number(controls.titleY.value) / 100);
  const letterSpacing = Number(controls.titleLetterSpacing.value) * typographyScale;
  const fontStyle = controls.titleFontStyle.value;
  const template = controls.templatePreset.value;
  const align = shortFormContestTemplates.has(template) ? shortFormContestMetadataAlign(template) : "left";

  context.font = `${fontStyle} 600 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";
  const lines = text.split("\n");
  const region = estimateTextRegionBox(x, y, lines, fontSize, 1.3, letterSpacing, align, 26 * typographyScale);
  const resolvedColor = resolveAccessibleColorValue(controls.titleColor.value, region, 4.5, { preserveAccent: true });
  context.fillStyle = resolvedColor.color;

  lines.forEach((line, index) => {
    drawSpacedText(line, x, y + index * fontSize * 1.3, align, letterSpacing);
  });
  return { shifted: resolvedColor.shifted };
}

function drawText(width, height) {
  const typographyScale = typographyScaleForCanvas(width);
  const desiredFontSize = Number(controls.fontSize.value) * typographyScale;
  const lineHeight = Number(controls.lineHeight.value);
  const letterSpacing = Number(controls.letterSpacing.value) * typographyScale;
  const textAlign = controls.textAlign.value;
  const fontFamily = controls.fontFamily.value;
  const fontWeight = controls.fontWeight.value;
  const quoteMode = renderedQuoteMode(stripDuplicateTitleLine(controls.poemText.value));
  const text = quoteMode.text.replace(/\r\n/g, "\n");
  const box = getTextBox(width, height);
  const fitResult =
    controls.autoFitText.value === "on"
      ? fitQuoteFontSize(text, box, desiredFontSize, letterSpacing, scaledMinimumFontSize(width))
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

function fitEmphasisFontSize(text, box, desiredFontSize, lineHeight, letterSpacing, fontFamily, minFontSize = 24) {
  let fontSize = desiredFontSize;
  let lines = quoteLinesForSize(text, box.width, letterSpacing, fontSize, "700", fontFamily);
  while (fontSize > minFontSize) {
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

function getEmphasisBox(width, height, textMetrics) {
  const textBox = getTextBox(width, height);
  const spacingBelowText = height * 0.02;
  const spacingBelowBox = height * 0.015;
  const textBottom = textMetrics
    ? Number(textMetrics.startY || 0) + Number(textMetrics.blockHeight || 0)
    : 0;
  const top = Math.max(
    textBottom ? textBottom + spacingBelowText : textBox.y + textBox.height + spacingBelowBox,
    textBox.y + textBox.height + spacingBelowBox,
  );
  const bottom = Math.min(
    controls.authorEnabled.value === "on"
      ? height * (Number(controls.attributionY.value) / 100) - height * 0.03
      : Infinity,
    controls.secondaryAttributionEnabled.value === "on"
      ? height * (Number(controls.secondaryAttributionY.value) / 100) - height * 0.03
      : Infinity,
    height * 0.9,
  );

  return {
    x: textBox.x,
    y: top,
    width: textBox.width,
    height: Math.max(height * 0.08, bottom - top),
  };
}

function getAlignedBoxX(box, align) {
  if (align === "center") {
    return box.x + box.width / 2;
  }
  if (align === "right") {
    return box.x + box.width;
  }
  return box.x;
}

function drawEmphasisText(width, height, textMetrics) {
  if (controls.emphasisTextEnabled.value !== "on") {
    return { shifted: false, wasClamped: false };
  }

  const text = controls.emphasisText.value.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { shifted: false, wasClamped: false };
  }

  const typographyScale = typographyScaleForCanvas(width);
  const lineHeight = Number(controls.emphasisLineHeight.value);
  const letterSpacing = Number(controls.letterSpacing.value) * typographyScale;
  const emphasisBox = getEmphasisBox(width, height, textMetrics);
  const desiredFontSize = Number(controls.emphasisFontSize.value) * typographyScale;
  const fitResult = fitEmphasisFontSize(
    text,
    emphasisBox,
    desiredFontSize,
    lineHeight,
    letterSpacing,
    controls.fontFamily.value,
    scaledMinimumFontSize(width),
  );
  const fontSize = fitResult.fontSize;
  const lines = fitResult.lines;
  const align = controls.emphasisTextAlign.value;
  const drawX = getAlignedBoxX(emphasisBox, align);
  const blockHeight = lines.length * fontSize * lineHeight;
  const startY = emphasisBox.y + Math.max(0, (emphasisBox.height - blockHeight) / 2);
  const resolvedColor = resolveAccessibleColorValue(controls.textColor.value, emphasisBox, 3.2, {
    preserveAccent: true,
  });

  context.fillStyle = resolvedColor.color;
  context.font = `700 ${fontSize}px "${controls.fontFamily.value}"`;
  context.textBaseline = "top";

  lines.forEach((line, index) => {
    drawSpacedText(line, drawX, startY + index * fontSize * lineHeight, align, letterSpacing);
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

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.filter = "none";
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
  const socialMediaMetrics = drawSocialMediaHandles(width, height, attributionMetrics, secondaryAttributionMetrics);

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
    if (socialMediaMetrics?.shifted) {
      readouts.fontFitHint.textContent += ` Handle color auto-shifted for contrast.`;
    }
    if (socialMediaMetrics?.clamped) {
      readouts.fontFitHint.textContent += ` Handle position was adjusted to stay visible.`;
    }
  }
}

async function downloadImage() {
  const exportedAt = new Date().toISOString();
  const link = document.createElement("a");
  link.href = await exportCanvasDataUrl();
  link.download = "poem-image.png";
  link.click();
  state.lastExportState = {
    status: "downloaded_from_pig",
    exportType: "download_png",
    exportedAt,
  };
  markWeaverRequestSuppressed(state.selectedRecord, {
    completedAt: exportedAt,
    status: "downloaded_from_pig",
  });
  await patchWeaverHandoff({
    pigStatus: "exported",
    handoffStatus: "exported",
    exportType: "download_png",
    exportedAt,
    sourceTool: "P.I.G.",
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

function getWeaverReworkNotes(record) {
  if (!isWeaverRequestRework(record)) {
    return [];
  }
  const requestedChanges =
    record.requestedChanges ||
    record.requestedChange ||
    record.reworkRequestedChanges ||
    record.reworkNotes ||
    record.revisionNotes;
  const productionNotes =
    record.productionNotes ||
    record.weaverProductionNotes ||
    record.qcProductionNotes ||
    record.editorialNotes;
  return [
    ["Reject reason", record.rejectReason],
    ["Rejected reason", record.rejectedReason],
    ["Requested changes", requestedChanges],
    ["Metadata issue", record.metadataIssue],
    ["Aesthetic issue", record.aestheticIssue],
    ["QC note", record.qcNote],
    ["QC status", record.qcStatus],
    ["Production notes", productionNotes],
    ["Notes", record.notes],
  ]
    .map(([label, value]) => [label, String(value || "").trim()])
    .filter(([, value]) => value);
}

function renderWeaverReworkNotes(record, compact = false) {
  const notes = getWeaverReworkNotes(record);
  if (!notes.length) {
    return "";
  }
  const body = notes
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
    .join("");
  return `<div class="rework-notes${compact ? " compact" : ""}"><h4>Rework Notes</h4>${body}</div>`;
}

function getPreviousGraphicFromProjectHistory(record) {
  const fingerprint = getWeaverSuppressionFingerprint(record);
  const match = loadProjectHistory().find((snapshot) => {
    const snapshotRecord = snapshot?.selectedRecord;
    if (!snapshotRecord) {
      return false;
    }
    if (isSameSourceRecord(snapshotRecord, record)) {
      return true;
    }
    return fingerprint && fingerprint === getWeaverSuppressionFingerprint(snapshotRecord);
  });
  const exportState = match?.exportState || {};
  const previewUrl = String(exportState.assetPreviewUrl || "").trim();
  const openUrl = String(exportState.assetUrl || exportState.driveLink || "").trim();
  if (previewUrl || openUrl) {
    return { previewUrl: previewUrl || openUrl, openUrl: openUrl || previewUrl };
  }
  return null;
}

function getPreviousGraphicInfo(record) {
  if (!isWeaverRequestRework(record)) {
    return null;
  }
  const directUrl =
    String(record.previousAssetPreviewUrl || "").trim() ||
    String(record.previousAssetUrl || "").trim() ||
    String(record.assetPreviewUrl || "").trim() ||
    String(record.assetUrl || "").trim() ||
    String(record.driveLink || "").trim() ||
    String(record.completedGraphicUrl || "").trim();
  const directOpenUrl =
    String(record.previousAssetUrl || "").trim() ||
    String(record.assetUrl || "").trim() ||
    String(record.driveLink || "").trim() ||
    String(record.completedGraphicUrl || "").trim() ||
    directUrl;
  if (directUrl) {
    return { previewUrl: directUrl, openUrl: directOpenUrl };
  }

  const identities = new Set(getWeaverSuppressionKeys(record));
  const fingerprint = getWeaverSuppressionFingerprint(record);
  const match = loadWeaverSuppressedRequests().find((entry) =>
    identities.has(String(entry.graphicsRequestId || "").trim()) ||
    identities.has(String(entry.sourceSheetRow || "").trim()) ||
    (fingerprint && fingerprint === String(entry.fingerprint || "")),
  );
  const historyPreview = String(match?.assetPreviewUrl || "").trim();
  const historyOpen = String(match?.assetUrl || match?.driveLink || "").trim();
  if (historyPreview || historyOpen) {
    return { previewUrl: historyPreview || historyOpen, openUrl: historyOpen || historyPreview };
  }
  return getPreviousGraphicFromProjectHistory(record);
}

function renderPreviousGraphic(record, compact = false) {
  const graphic = getPreviousGraphicInfo(record);
  if (!graphic) {
    return "";
  }
  const preview = graphic.previewUrl
    ? `<a href="${escapeHtml(graphic.openUrl)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(graphic.previewUrl)}" alt="Previous graphic preview" loading="lazy" /></a>`
    : "";
  return `
    <div class="previous-graphic${compact ? " compact" : ""}">
      <h4>Previous Graphic</h4>
      ${preview}
      <div class="previous-graphic-actions">
        <a href="${escapeHtml(graphic.openUrl)}" target="_blank" rel="noreferrer">Open previous</a>
        <button class="ghost-button inline-button" type="button" data-copy-previous-url="${escapeHtml(graphic.openUrl)}">Copy URL</button>
      </div>
    </div>
  `;
}

function bindPreviousGraphicActions(root) {
  root.querySelectorAll("[data-copy-previous-url]").forEach((button) => {
    button.addEventListener("click", async () => {
      const url = button.dataset.copyPreviousUrl || "";
      if (!url) {
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        setStatus("Previous graphic URL copied.");
      } catch (_error) {
        setStatus("Could not copy previous graphic URL.");
      }
    });
  });
}

function getWeaverRevisionInfo(record) {
  if (!isWeaverRequestRework(record)) {
    return null;
  }
  const originalGraphicsRequestId = String(
    record.originalGraphicsRequestId ||
      record.revisionOf ||
      record.graphicsRequestId ||
      record.requestId ||
      record.id ||
      "",
  ).trim();
  const revisionOf = String(record.revisionOf || originalGraphicsRequestId).trim();
  const currentVersion = Number(record.version || record.revisionVersion || record.completionCount || 1);
  return {
    originalGraphicsRequestId,
    revisionOf,
    version: Number.isFinite(currentVersion) ? Math.max(2, currentVersion + 1) : 2,
  };
}

function renderWeaverReworkActions(record) {
  if (!isWeaverRequestRework(record)) {
    return "";
  }
  return `
    <div class="rework-actions">
      <button class="secondary-button inline-button" type="button" data-rework-action="send-fixed">Mark fixed and send</button>
      <button class="ghost-button inline-button" type="button" data-rework-action="keep-pass">Keep for another pass</button>
    </div>
  `;
}

function bindWeaverReworkActions(root) {
  root.querySelectorAll("[data-rework-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.reworkAction || "";
      if (action === "send-fixed") {
        await openDriveUploadDialog();
        controls.keepDriveRecordInQueue.checked = false;
        setDriveUploadStatus("Rework loaded. Upload will mark this revision fixed and send it to Weaver QC.");
      }
      if (action === "keep-pass") {
        await openDriveUploadDialog();
        controls.keepDriveRecordInQueue.checked = true;
        setDriveUploadStatus("Rework loaded. Upload will send this version and keep the item available for another pass.");
      }
    });
  });
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

  const reworkNotesHtml = renderWeaverReworkNotes(record);
  if (reworkNotesHtml) {
    htmlParts.push(reworkNotesHtml);
  }
  const previousGraphicHtml = renderPreviousGraphic(record);
  if (previousGraphicHtml) {
    htmlParts.push(previousGraphicHtml);
  }
  const reworkActionsHtml = renderWeaverReworkActions(record);
  if (reworkActionsHtml) {
    htmlParts.push(reworkActionsHtml);
  }

  controls.selectedRecordMeta.innerHTML = htmlParts.join("");
  bindPreviousGraphicActions(controls.selectedRecordMeta);
  bindWeaverReworkActions(controls.selectedRecordMeta);
}

function renderResults(items) {
  state.currentSearchResults = items;
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
          ${renderWeaverReworkNotes(item, true)}
          ${renderPreviousGraphic(item, true)}
          <div class="result-actions">
            <button class="secondary-button inline-button" data-load-id="${escapeHtml(String(item.id || ""))}" data-source="${escapeHtml(item.sourceType)}">${isWeaverRequestRework(item) ? "Load rework" : "Load text"}</button>
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
  bindPreviousGraphicActions(controls.searchResults);
}

function getSourceRecordKeys(record) {
  if (!record) {
    return [];
  }
  const sourceType = String(record.sourceType || "").trim();
  return [
    record.id,
    record.recordId,
    record.sourceEntryId,
    record.graphicsRequestId,
    record.requestId,
    record.queueSheetRow,
    record.sourceSheetRow,
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .map((value) => `${sourceType}:${value}`);
}

function isSameSourceRecord(left, right) {
  const leftKeys = new Set(getSourceRecordKeys(left));
  return getSourceRecordKeys(right).some((key) => leftKeys.has(key));
}

function getNextSearchResultAfter(record) {
  const items = state.currentSearchResults || [];
  if (!items.length) {
    return null;
  }

  const currentIndex = items.findIndex((item) => isSameSourceRecord(item, record));
  const orderedItems =
    currentIndex >= 0
      ? [...items.slice(currentIndex + 1), ...items.slice(0, currentIndex)]
      : items;

  return (
    orderedItems.find((item) =>
      !isSameSourceRecord(item, record) &&
      !isWeaverRequestSuppressed(item) &&
      (isWeaverRequestAllowedForRepeat(item) || !isWeaverRequestAlreadyWorked(item)),
    ) || null
  );
}

function removeSearchResult(record) {
  const nextItems = (state.currentSearchResults || []).filter((item) => !isSameSourceRecord(item, record));
  if (nextItems.length !== (state.currentSearchResults || []).length) {
    renderResults(nextItems);
  }
}

async function advanceToNextSearchResult(completedRecord, completedMessage) {
  const nextRecord = getNextSearchResultAfter(completedRecord);
  if (!nextRecord) {
    removeSearchResult(completedRecord);
    setStatus(`${completedMessage} No next search result is available.`);
    return false;
  }

  await loadRecord(nextRecord);
  if (isSameSourceRecord(state.selectedRecord, nextRecord)) {
    removeSearchResult(completedRecord);
    setStatus(`${completedMessage} Loaded the next graphic request.`);
    return true;
  }

  setStatus(`${completedMessage} Could not auto-load the next result.`);
  return false;
}

const SOCIAL_MEDIA_PROFILE_FIELDS = [
  "instagram",
  "tiktok",
  "twitter",
  "facebook",
  "website",
  "other",
  "notes",
  "displayText",
];

function normalizeSocialMediaAuthor(author) {
  return String(author || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanSocialMediaValue(value) {
  const cleaned = String(value || "").trim();
  return /^n\/?a$/i.test(cleaned) ? "" : cleaned;
}

function mergeSocialMediaProfiles(...profiles) {
  const merged = {};
  profiles.forEach((profile) => {
    SOCIAL_MEDIA_PROFILE_FIELDS.forEach((field) => {
      const value = cleanSocialMediaValue(profile?.[field]);
      if (value) {
        merged[field] = value;
      }
    });
  });
  return merged;
}

function extractSocialMediaProfile(text) {
  const source = String(text || "");
  const findHandle = (labels) => {
    const match = source.match(new RegExp(`(?:${labels})\\s*(?::|-)\\s*(@[a-z0-9._-]+)`, "i"));
    return match?.[1] || "";
  };
  const website = source.match(/https?:\/\/[^\s,;)]+/i)?.[0] || "";
  const labeledHandles = [
    findHandle("instagram|insta|ig"),
    findHandle("tiktok|tik tok"),
    findHandle("twitter|x"),
    findHandle("facebook|fb"),
  ].filter(Boolean);
  const other = [...source.matchAll(/@[a-z0-9._-]+/gi)]
    .map((match) => match[0])
    .filter((handle) => !labeledHandles.includes(handle))
    .filter((handle, index, handles) => handles.indexOf(handle) === index)
    .join(" · ");
  return {
    instagram: findHandle("instagram|insta|ig"),
    tiktok: findHandle("tiktok|tik tok"),
    twitter: findHandle("twitter|x"),
    facebook: findHandle("facebook|fb"),
    website,
    other,
  };
}

function loadSavedSocialMediaProfiles() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SOCIAL_MEDIA_PROFILES_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_error) {
    return {};
  }
}

function captureSocialMediaProfile() {
  return {
    instagram: controls.socialMediaInstagram.value,
    tiktok: controls.socialMediaTikTok.value,
    twitter: controls.socialMediaTwitter.value,
    facebook: controls.socialMediaFacebook.value,
    website: controls.socialMediaWebsite.value,
    other: controls.socialMediaOther.value,
    notes: controls.socialMediaNotes.value,
    displayText: controls.socialMediaDisplayText.value,
  };
}

function applySocialMediaProfile(profile = {}) {
  controls.socialMediaInstagram.value = cleanSocialMediaValue(profile.instagram);
  controls.socialMediaTikTok.value = cleanSocialMediaValue(profile.tiktok);
  controls.socialMediaTwitter.value = cleanSocialMediaValue(profile.twitter);
  controls.socialMediaFacebook.value = cleanSocialMediaValue(profile.facebook);
  controls.socialMediaWebsite.value = cleanSocialMediaValue(profile.website);
  controls.socialMediaOther.value = cleanSocialMediaValue(profile.other);
  controls.socialMediaNotes.value = cleanSocialMediaValue(profile.notes);
  controls.socialMediaDisplayText.value = cleanSocialMediaValue(
    profile.displayText || profile.instagram || profile.tiktok || profile.twitter || profile.other,
  );
}

function saveSocialMediaProfile() {
  const author = state.selectedRecord?.author || controls.attributionText.value;
  const authorKey = normalizeSocialMediaAuthor(author);
  if (!authorKey) {
    setStatus("Load an author before saving social media info.");
    return;
  }
  const profiles = loadSavedSocialMediaProfiles();
  profiles[authorKey] = {
    ...captureSocialMediaProfile(),
    author,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(SOCIAL_MEDIA_PROFILES_KEY, JSON.stringify(profiles));
  controls.socialMediaLookupStatus.textContent = `Saved in this browser for ${author}.`;
  setStatus(`Saved social media info for ${author} in this browser.`);
  scheduleProjectSnapshot();
}

async function syncSocialMediaForRecord(record) {
  const author = String(record?.author || controls.attributionText.value || "").trim();
  const authorKey = normalizeSocialMediaAuthor(author);
  const extracted = extractSocialMediaProfile(record?.text || controls.poemText.value);
  const localProfile = loadSavedSocialMediaProfiles()[authorKey] || {};
  applySocialMediaProfile(mergeSocialMediaProfiles(extracted, localProfile));

  if (!authorKey) {
    controls.socialMediaLookupStatus.textContent = "No author loaded.";
    render();
    return;
  }

  controls.socialMediaLookupStatus.textContent = `Looking up ${author}...`;
  try {
    const response = await fetch(`/api/social-media/lookup?author=${encodeURIComponent(author)}`);
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Social media lookup failed.");
    }
    if (normalizeSocialMediaAuthor(state.selectedRecord?.author || controls.attributionText.value) !== authorKey) {
      return;
    }
    const profile = mergeSocialMediaProfiles(payload.record || {}, extracted, localProfile);
    applySocialMediaProfile(profile);
    const sources = [
      payload.record ? "Artist Handle Primary" : "",
      Object.keys(extracted).some((field) => extracted[field]) ? "source line" : "",
      Object.keys(localProfile).length ? "browser override" : "",
    ].filter(Boolean);
    controls.socialMediaLookupStatus.textContent = payload.warning
      ? `${payload.warning}${sources.length ? ` Used ${sources.join(", ")}.` : ""}`
      : sources.length
      ? `Loaded for ${author} from ${sources.join(", ")}.`
      : `No saved social media info found for ${author}.`;
  } catch (error) {
    controls.socialMediaLookupStatus.textContent = Object.keys(localProfile).length
      ? `Loaded browser override for ${author}. Shared lookup unavailable.`
      : `Shared lookup unavailable: ${error.message}`;
  }
  render();
  scheduleProjectSnapshot();
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
  syncSocialMediaForRecord(record);
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
      fingerprint: String(entry?.fingerprint || "").trim(),
      completedAt: String(entry?.completedAt || "").trim() || new Date().toISOString(),
      status: String(entry?.status || "sent_to_weaver_qc").trim() || "sent_to_weaver_qc",
      assetUrl: String(entry?.assetUrl || "").trim(),
      assetPreviewUrl: String(entry?.assetPreviewUrl || "").trim(),
      driveLink: String(entry?.driveLink || "").trim(),
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

function loadWeaverRepeatRequests() {
  try {
    const raw = window.localStorage.getItem(WEAVER_REPEAT_REQUESTS_KEY);
    if (!raw) {
      return [];
    }
    return normalizeWeaverSuppressedRequests(JSON.parse(raw));
  } catch (_error) {
    return [];
  }
}

function persistWeaverRepeatRequests(entries) {
  window.localStorage.setItem(
    WEAVER_REPEAT_REQUESTS_KEY,
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

function normalizeSuppressionText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getWeaverSuppressionFingerprint(record) {
  if (!record) {
    return "";
  }

  const activeRecordText =
    state.selectedRecord === record || getWeaverSuppressionKeys(state.selectedRecord).some((key) => getWeaverSuppressionKeys(record).includes(key))
      ? controls.poemText.value
      : "";
  const text = normalizeSuppressionText(
    activeRecordText ||
      record.text ||
      record.quoteText ||
      record.excerpt ||
      record.preview ||
      "",
  );
  const metadata = [
    record.author,
    record.title || record.poemTitle,
    record.bookTitle || record.book,
  ]
    .map(normalizeSuppressionText)
    .join("|");

  return text && metadata ? `${metadata}|${text}` : "";
}

function isWeaverRequestSuppressed(record) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return false;
  }
  const identities = new Set(getWeaverSuppressionKeys(record));
  const fingerprint = getWeaverSuppressionFingerprint(record);
  if (!identities.size && !fingerprint) {
    return false;
  }
  return loadWeaverSuppressedRequests().some((entry) =>
    identities.has(String(entry.graphicsRequestId || "").trim()) ||
    identities.has(String(entry.sourceSheetRow || "").trim()) ||
    (fingerprint && fingerprint === String(entry.fingerprint || "")),
  );
}

function isWeaverRequestAllowedForRepeat(record) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return false;
  }
  const identities = new Set(getWeaverSuppressionKeys(record));
  const fingerprint = getWeaverSuppressionFingerprint(record);
  if (!identities.size && !fingerprint) {
    return false;
  }
  return loadWeaverRepeatRequests().some((entry) =>
    identities.has(String(entry.graphicsRequestId || "").trim()) ||
    identities.has(String(entry.sourceSheetRow || "").trim()) ||
    (fingerprint && fingerprint === String(entry.fingerprint || "")),
  );
}

function clearWeaverRequestSuppressed(record) {
  const identities = new Set(getWeaverSuppressionKeys(record));
  const fingerprint = getWeaverSuppressionFingerprint(record);
  if (!identities.size && !fingerprint) {
    return;
  }
  persistWeaverSuppressedRequests(
    loadWeaverSuppressedRequests().filter((entry) =>
      !identities.has(String(entry.graphicsRequestId || "").trim()) &&
      !identities.has(String(entry.sourceSheetRow || "").trim()) &&
      (!fingerprint || fingerprint !== String(entry.fingerprint || "")),
    ),
  );
}

function clearWeaverRequestAllowedForRepeat(record) {
  const identities = new Set(getWeaverSuppressionKeys(record));
  const fingerprint = getWeaverSuppressionFingerprint(record);
  if (!identities.size && !fingerprint) {
    return;
  }
  persistWeaverRepeatRequests(
    loadWeaverRepeatRequests().filter((entry) =>
      !identities.has(String(entry.graphicsRequestId || "").trim()) &&
      !identities.has(String(entry.sourceSheetRow || "").trim()) &&
      (!fingerprint || fingerprint !== String(entry.fingerprint || "")),
    ),
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

function isWeaverRequestRework(record) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return false;
  }
  const status = normalizedRecordStatus(record);
  return status.includes("rework") || status.includes("reject");
}

function filterSuppressedWeaverResults(items) {
  return items.filter((item) =>
    isWeaverRequestRework(item) ||
    isWeaverRequestAllowedForRepeat(item) ||
    (!isWeaverRequestSuppressed(item) && !isWeaverRequestAlreadyWorked(item)),
  );
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
      fingerprint: getWeaverSuppressionFingerprint(record),
      completedAt: String(completion?.completedAt || new Date().toISOString()),
      status: String(completion?.status || "sent_to_weaver_qc"),
      assetUrl: String(completion?.assetUrl || record.assetUrl || record.driveLink || ""),
      assetPreviewUrl: String(completion?.assetPreviewUrl || record.assetPreviewUrl || ""),
      driveLink: String(completion?.driveLink || completion?.assetUrl || record.driveLink || ""),
    },
    ...loadWeaverSuppressedRequests().filter((entry) => entry.graphicsRequestId !== graphicsRequestId),
  ];

  persistWeaverSuppressedRequests(next);
  clearWeaverRequestAllowedForRepeat(record);
}

function markWeaverRequestAllowedForRepeat(record, completion = null) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return;
  }

  const graphicsRequestId = String(record.graphicsRequestId || record.requestId || record.id || "").trim();
  if (!graphicsRequestId) {
    return;
  }

  clearWeaverRequestSuppressed(record);
  const next = [
    {
      graphicsRequestId,
      sourceSheetRow: String(record.queueSheetRow || completion?.sourceSheetRow || ""),
      poemTitle: String(record.title || completion?.poemTitle || ""),
      author: String(record.author || completion?.author || ""),
      fingerprint: getWeaverSuppressionFingerprint(record),
      completedAt: String(completion?.completedAt || new Date().toISOString()),
      status: String(completion?.status || "repeat_requested"),
    },
    ...loadWeaverRepeatRequests().filter((entry) => entry.graphicsRequestId !== graphicsRequestId),
  ];

  persistWeaverRepeatRequests(next);
}

function renderWeaverBookOptions(books) {
  const currentValue = controls.weaverBookFilter.value;
  const defaultLabel =
    controls.weaverRequestFilter.value === "all"
      ? "All books"
      : controls.weaverRequestFilter.value === "rework"
        ? "All rework books"
        : "All current books";
  const bookOptions = books.map((book) => {
    const title = book.title || book.bookTitle || book.label || book.name || "";
    const count = book.count ?? book.bookCount ?? book.actionableCount ?? 0;
    return `<option value="${escapeHtml(title)}">${escapeHtml(title)} (${count})</option>`;
  });
  controls.weaverBookFilter.innerHTML = [
    `<option value="">${escapeHtml(defaultLabel)}</option>`,
    ...bookOptions,
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

function applyNoUsableRecordState(message) {
  state.currentProjectId = null;
  state.selectedRecord = null;
  controls.poemText.value = "";
  controls.emphasisText.value = "";
  controls.titleText.value = "No usable source text loaded";
  controls.attributionText.value = "";
  controls.secondaryAttributionText.value = "";
  renderResults([]);
  renderSelectedRecordMeta(null);
  renderLineBreakGuide();
  render();
  setStatus(message);
}

async function loadRecord(summaryRecord) {
  if (
    !isWeaverRequestRework(summaryRecord) &&
    !isWeaverRequestAllowedForRepeat(summaryRecord) &&
    (isWeaverRequestSuppressed(summaryRecord) || isWeaverRequestAlreadyWorked(summaryRecord))
  ) {
    setStatus("That Weaver request already appears worked, pending QC, or sent back from P.I.G.");
    return;
  }

  if (summaryRecord.text) {
    await claimWeaverHandoffRecord(summaryRecord);
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
    if (
      !isWeaverRequestRework(payload.record) &&
      !isWeaverRequestAllowedForRepeat(payload.record) &&
      (isWeaverRequestSuppressed(payload.record) || isWeaverRequestAlreadyWorked(payload.record))
    ) {
      setStatus("That Weaver request already appears worked, pending QC, or sent back from P.I.G.");
      return;
    }
    await claimWeaverHandoffRecord(payload.record);
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
      await claimWeaverHandoffRecord(record);
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
  } catch (error) {
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
      applyNoUsableRecordState(
        `${error.message || "No usable Weaver graphics requests available."} P.I.G. did not load placeholder text.`,
      );
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
            <div class="background-asset-thumb" data-background-thumb="${escapeHtml(item.id)}" aria-hidden="true"></div>
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

  controls.backgroundAssets.querySelectorAll("[data-background-thumb]").forEach((thumb) => {
    getBackgroundAssetData(thumb.dataset.backgroundThumb)
      .then((dataUrl) => {
        if (dataUrl) {
          thumb.style.backgroundImage = `url("${dataUrl}")`;
        }
      })
      .catch(() => {});
  });

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
    exportState: state.lastExportState,
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
  state.lastExportState = snapshot.exportState || null;
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
        width: Number(controls.customWidth.value) || 2160,
        height: Number(controls.customHeight.value) || 2700,
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
    await patchWeaverHandoff({
      pigStatus: "generated",
      handoffStatus: "generated",
      variant: controls.variantPreset.value || "",
      sourceTool: "P.I.G.",
    });
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
  const normalizedTitle = (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const knownBookCodes = {
    "a choir of honest killers": "ACHK",
    "i ll fly away": "IFA",
  };
  if (knownBookCodes[normalizedTitle]) {
    return knownBookCodes[normalizedTitle];
  }

  const words = (value || "")
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.toLowerCase() !== "and");
  if (!words.length) {
    return "BOOK";
  }
  if (words.length === 1) {
    return words[0].slice(0, 4).toUpperCase();
  }
  return words.map((word) => word[0].toUpperCase()).join("").slice(0, words.length === 2 ? 2 : 4);
}

function isValidBookCode(value) {
  return /^[A-Z0-9]{1,4}$/.test(String(value || "").trim());
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
    (isValidBookCode(folderParts?.bookCode) ? folderParts.bookCode : "") ||
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
  return createFlattenedExportCanvas().toDataURL("image/png");
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

async function uploadCurrentCanvasToDrive(folderId, fileName) {
  const blob = await exportCanvasBlob();
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
  controls.keepDriveRecordInQueue.checked = false;
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
  const revisionInfo = getWeaverRevisionInfo(record);

  return {
    completionId: `pig-${Date.now()}`,
    requestId,
    ...(revisionInfo || {}),
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
    completionType: revisionInfo ? "rework_revision" : "new_graphic",
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

function getGraphicsRequestId(record = state.selectedRecord) {
  if (!record || record.sourceType !== "weaver_graphics_requests") {
    return "";
  }
  return String(record.graphicsRequestId || record.requestId || record.id || "").trim();
}

async function patchWeaverHandoff(updates, options = {}) {
  const { silent = true } = options;
  const graphicsRequestId = getGraphicsRequestId();
  if (!graphicsRequestId) {
    return null;
  }

  try {
    const response = await fetch(
      `/api/weaver/graphics-handoff/${encodeURIComponent(graphicsRequestId)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      },
    );
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Graphics handoff ledger update failed.");
    }
    return payload;
  } catch (error) {
    if (!silent) {
      setStatus(error.message);
    }
    return null;
  }
}

async function claimWeaverHandoffRecord(record) {
  const graphicsRequestId = getGraphicsRequestId(record);
  if (!graphicsRequestId) {
    return;
  }

  try {
    await fetch(`/api/weaver/graphics-handoff/${encodeURIComponent(graphicsRequestId)}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claimedBy: "P.I.G." }),
    });
  } catch (_error) {
    // The legacy Weaver queue remains a safe fallback if the ledger is unavailable.
  }
}

async function sendToWeaverQc() {
  try {
    const completedRecord = state.selectedRecord;
    const completion = buildWeaverCompletionPayload();
    markWeaverRequestSuppressed(completedRecord, {
      ...completion,
      status: "handoff_started",
    });
    setStatus("Sending completion to Weaver QC...");
    await sendCompletionToWeaver(completion);
    await patchWeaverHandoff({
      handoffStatus: "sent_to_weaver_qc",
      pigStatus: "uploaded",
      assetUrl: completion.assetUrl,
      assetPreviewUrl: completion.assetPreviewUrl,
      originalGraphicsRequestId: completion.originalGraphicsRequestId,
      revisionOf: completion.revisionOf,
      version: completion.version,
      completionType: completion.completionType,
      sourceSheetRow: completion.sourceSheetRow,
      completedAt: completion.completedAt,
      sourceTool: "P.I.G.",
    });
    markWeaverRequestSuppressed(completedRecord, completion);
    await advanceToNextSearchResult(completedRecord, "Sent to Weaver QC.");
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

    const completedRecord = state.selectedRecord;
    const keepRecordInQueue = controls.keepDriveRecordInQueue.checked;
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
    state.lastExportState = {
      status: "drive_uploaded_pending_weaver_qc",
      exportType: "drive_png",
      assetUrl: upload.assetUrl,
      assetPreviewUrl: upload.assetPreviewUrl,
      driveFileId: upload.id || upload.fileId || "",
      driveFileName: upload.name || controls.driveFileName.value.trim() || buildDefaultDriveFileName(),
      exportedAt: new Date().toISOString(),
    };
    const pendingCompletion = {
      completedAt: state.lastExportState.exportedAt,
      status: "drive_uploaded_pending_weaver_qc",
      sourceSheetRow: completedRecord?.queueSheetRow || completedRecord?.sourceRowNumber || "",
    };
    if (keepRecordInQueue) {
      markWeaverRequestAllowedForRepeat(completedRecord, pendingCompletion);
    } else {
      markWeaverRequestSuppressed(completedRecord, pendingCompletion);
    }
    await patchWeaverHandoff({
      pigStatus: "uploaded",
      handoffStatus: "uploaded",
      assetUrl: upload.assetUrl,
      assetPreviewUrl: upload.assetPreviewUrl,
      driveFileId: upload.id || upload.fileId || "",
      driveFileName: upload.name || controls.driveFileName.value.trim() || buildDefaultDriveFileName(),
      mimeType: upload.mimeType || "image/png",
      exportType: "drive_png",
      sourceTool: "P.I.G.",
    });
    setDriveUploadStatus("Drive upload finished. Sending to Weaver QC...");
    const completion = buildWeaverCompletionPayload();
    await sendCompletionToWeaver(completion);
    await patchWeaverHandoff({
      pigStatus: "uploaded",
      handoffStatus: "sent_to_weaver_qc",
      assetUrl: completion.assetUrl,
      assetPreviewUrl: completion.assetPreviewUrl,
      originalGraphicsRequestId: completion.originalGraphicsRequestId,
      revisionOf: completion.revisionOf,
      version: completion.version,
      completionType: completion.completionType,
      sourceSheetRow: completion.sourceSheetRow,
      completedAt: completion.completedAt,
      sourceTool: "P.I.G.",
    });
    if (keepRecordInQueue) {
      markWeaverRequestAllowedForRepeat(completedRecord, completion);
    } else {
      markWeaverRequestSuppressed(completedRecord, completion);
    }
    controls.driveUploadDialog.close();
    state.lastExportState = {
      ...(state.lastExportState || {}),
      status: "sent_to_weaver_qc",
      sentToQcAt: completion.completedAt,
    };
    saveProjectSnapshot();
    if (keepRecordInQueue) {
      setStatus("Saved to Drive and sent to Weaver QC. Kept in P.I.G. for another graphic.");
    } else {
      await advanceToNextSearchResult(completedRecord, "Saved to Drive and sent to Weaver QC.");
    }
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

async function saveCurrentBackgroundToLibrary(options = {}) {
  const { announce = true } = options;
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
  if (announce) {
    setStatus("Background saved for reuse.");
  }
}

async function uploadCurrentCanvasToDriveServer(folderId, fileName) {
  const imageDataUrl = await exportCanvasDataUrl();
  const response = await fetch("/api/drive/upload-generated-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      folderId,
      fileName,
      imageDataUrl,
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

function getTemplateLabel(templateKey) {
  for (const family of Object.values(templateFamilies)) {
    for (const variant of Object.values(family.variants)) {
      if (variant.template === templateKey) {
        return `${family.label} · ${variant.label}`;
      }
    }
  }
  return templateKey;
}

function getRandomizableTemplateKeys() {
  const templateKeys = new Set();
  Object.values(templateFamilies).forEach((family) => {
    Object.values(family.variants).forEach((variant) => {
      if (templateDefinitions[variant.template]) {
        templateKeys.add(variant.template);
      }
    });
  });
  return Array.from(templateKeys);
}

function applyTemplate(templateKey, options = {}) {
  const { saveSnapshot = true, renderNow = true, announce = true } = options;
  const template = templateDefinitions[templateKey];
  if (!template) {
    return;
  }

  const baseValues = {
    titleEnabled: "on",
    titleHandling: "auto",
    authorEnabled: "on",
    secondaryAttributionEnabled: "on",
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
  controls.secondaryAttributionEnabled.value = "on";
  controls.quoteMarkEnabled.value = "off";

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
    setStatus(`${getTemplateLabel(templateKey)} template applied.`);
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
  const selectedTemplateKey = randomChoice(getRandomizableTemplateKeys());

  applyTemplate("none", { saveSnapshot: false, renderNow: false, announce: false });

  if (selectedTemplateKey !== "none") {
    applyTemplate(selectedTemplateKey, { saveSnapshot: false, renderNow: false, announce: false });
    await ensureSelectedFontLoaded().catch(() => {});
    render();
    scheduleProjectSnapshot();
    setStatus(`${getTemplateLabel(selectedTemplateKey)} template randomized.`);
    return;
  }

  const hasAiBackground = Boolean(state.aiBackgroundImage);
  const palette = pickPalette();
  const textColor = randomChoice([palette.text, ...RANDOM_TEXT_COLORS]);
  const metaColor = Math.random() < 0.7 ? textColor : randomChoice(RANDOM_TEXT_COLORS);
  const secondaryColor = Math.random() < 0.65 ? metaColor : randomChoice(RANDOM_TEXT_COLORS);
  const blurOn = hasAiBackground || Math.random() < 0.55 ? "on" : "off";

  setControlValue("fontFamily", randomChoice(RANDOM_FONT_FAMILIES));
  setControlValue("fontWeight", randomChoice(["500", "600", "700"]));
  setControlValue("layoutMode", "preserve");
  setControlValue("textAlign", randomChoice(["left", "center"]));
  setControlValue("fontSize", randomInt(52, 108));
  setControlValue("lineHeight", randomStep(1.0, 1.32, 0.04));
  setControlValue("autoFitText", "on");
  setControlValue("textBoxWidth", randomInt(48, 72));
  setControlValue("textBoxX", randomInt(8, 20));
  setControlValue("textBoxY", randomInt(16, 24));
  setControlValue("textBoxHeight", randomInt(38, 54));
  setControlValue("letterSpacing", randomStep(-0.3, 1.6, 0.1));
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
  setControlValue("quoteMarkEnabled", "off");
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
document.addEventListener("click", (event) => {
  const button = event.target.closest(".primary-button, .secondary-button, .ghost-button");
  if (!button || button.disabled) {
    return;
  }
  button.classList.remove("button-clicked");
  void button.offsetWidth;
  button.classList.add("button-clicked");
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
controls.refreshSocialMediaButton.addEventListener("click", () => {
  syncSocialMediaForRecord(state.selectedRecord);
});
controls.saveSocialMediaButton.addEventListener("click", saveSocialMediaProfile);
controls.socialMediaInstagram.addEventListener("input", () => {
  if (!controls.socialMediaDisplayText.value.trim()) {
    controls.socialMediaDisplayText.value = controls.socialMediaInstagram.value;
  }
});
controls.generateBackgroundButton.addEventListener("click", generateAiBackground);
controls.importBackgroundButton.addEventListener("click", () => {
  state.pendingBackgroundImportSave = false;
  controls.backgroundImageUpload.click();
});
controls.importAndSaveBackgroundButton.addEventListener("click", () => {
  state.pendingBackgroundImportSave = true;
  controls.backgroundImageUpload.click();
});
controls.backgroundImageUpload.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    state.pendingBackgroundImportSave = false;
    return;
  }
  try {
    await importBackgroundFromFile(file);
    if (state.pendingBackgroundImportSave) {
      await saveCurrentBackgroundToLibrary({ announce: false });
      setStatus("Background photo imported and saved for reuse.");
    }
  } catch (error) {
    setStatus(error.message);
  } finally {
    state.pendingBackgroundImportSave = false;
    controls.backgroundImageUpload.value = "";
  }
});
controls.saveBackgroundAssetButton.addEventListener("click", () => {
  saveCurrentBackgroundToLibrary().catch((error) => setStatus(error.message));
});
controls.clearBackgroundButton.addEventListener("click", clearAiBackground);
controls.downloadButton.addEventListener("click", downloadImage);
controls.fontFamily.addEventListener("change", async () => {
  const requestedFont = controls.fontFamily.value;
  const loaded = await ensureSelectedFontLoaded();
  render();
  if (loaded && controls.fontFamily.value === requestedFont) {
    setStatus(`Font "${requestedFont}" is available.`);
  }
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
