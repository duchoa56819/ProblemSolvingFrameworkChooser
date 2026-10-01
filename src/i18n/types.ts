export type Language = 'en' | 'vi';

export interface Translations {
  appName: string;
  appTagline: string;
  searchPlaceholder: string;
  views: {
    library: string;
    matrix: string;
    canvases: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    ctaFinder: string;
    cta5Whys: string;
    ctaRice: string;
    quickPillars: string;
  };
  filter: {
    allMethods: string;
    anyComplexity: string;
    anyTimeframe: string;
    showing: string;
    of: string;
    frameworks: string;
    bookmarkedOnly: string;
    clearFilters: string;
    noResultsTitle: string;
    noResultsDesc: string;
  };
  card: {
    compare: string;
    removeCompare: string;
    bookmark: string;
    removeBookmark: string;
    interactiveCanvas: string;
    viewPlaybook: string;
  };
  categories: {
    'root-cause': string;
    'strategic': string;
    'innovation': string;
    'quality': string;
    'prioritization': string;
  };
  complexity: {
    Beginner: string;
    Intermediate: string;
    Advanced: string;
  };
  matrix: {
    title: string;
    subtitle: string;
    all: string;
    yAxisTop: string;
    yAxisBottom: string;
    xAxisLeft: string;
    xAxisRight: string;
    watermarkTopLeft: string;
    watermarkTopRight: string;
    watermarkBottomLeft: string;
    watermarkBottomRight: string;
    viewPlaybook: string;
    canvasBtn: string;
  };
  canvasesHub: {
    title: string;
    subtitle: string;
    openBtn: string;
  };
  modal: {
    close: string;
    copy: string;
    copied: string;
    exportReport: string;
    overviewTab: string;
    stepsTab: string;
    questionsTab: string;
    caseStudyTab: string;
    bestFor: string;
    whenToAvoid: string;
    timeframe: string;
    teamSize: string;
    complexityLevel: string;
    toolsNeeded: string;
    strengths: string;
    tradeoffs: string;
    proTip: string;
    questionsIntro: string;
    caseChallenge: string;
    caseApplication: string;
    caseOutcome: string;
    launchCanvas: string;
  };
  wizard: {
    title: string;
    stepPrefix: string;
    of: string;
    completeTitle: string;
    reset: string;
    previousStep: string;
    optimalMatch: string;
    affinityMatch: string;
    whyFits: string;
    domain: string;
    timeframe: string;
    team: string;
    readyToExecute: string;
    readyToExecuteDesc: string;
    launchCanvas: string;
    viewPlaybook: string;
    blueprintTitle: string;
    runnerUpsTitle: string;
    avoidTitle: string;
    noAvoid: string;
    retake: string;
  };
  compareModal: {
    title: string;
    comparingPrefix: string;
    frameworkWord: string;
    frameworksWord: string;
    clearAll: string;
    emptyText: string;
    dimension: string;
    category: string;
    origin: string;
    tagline: string;
    cynefinDomain: string;
    bestFor: string;
    whenToAvoid: string;
    timeCommitment: string;
    teamStructure: string;
    complexity: string;
    interactiveCanvas: string;
    openCanvas: string;
    none: string;
  };
  footer: {
    openSource: string;
    githubRepo: string;
    takeDiagnostic: string;
  };
}
