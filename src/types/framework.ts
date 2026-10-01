export type FrameworkCategory = 
  | 'root-cause'
  | 'strategic'
  | 'innovation'
  | 'quality'
  | 'prioritization';

export type ComplexityLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Timeframe = '< 1 hour' | '1–2 days' | '1–4 weeks' | 'Continuous';

export type TeamSize = 'Solo' | 'Small Team (2–6)' | 'Cross-Functional (5–15)' | 'Organization-wide';

export type CynefinDomain = 'Clear' | 'Complicated' | 'Complex' | 'Chaotic' | 'Confused';

export type CanvasType = 
  | 'five-whys' 
  | 'fishbone' 
  | 'cynefin-tester' 
  | 'rice-calc' 
  | 'eisenhower-board' 
  | 'scamper-board' 
  | 'a3-canvas' 
  | 'action-plan'
  | 'minto-pyramid';

export interface FrameworkStep {
  number: number;
  title: string;
  description: string;
  actionableTip: string;
}

export interface Framework {
  id: string;
  name: string;
  shortName: string;
  origin: string; // e.g., "Taiichi Ohno (Toyota, 1950s)"
  tagline: string;
  category: FrameworkCategory;
  complexity: ComplexityLevel;
  timeframe: Timeframe;
  teamSize: TeamSize;
  cynefinDomain: CynefinDomain;
  bestFor: string;
  whenToAvoid: string;
  summary: string;
  steps: FrameworkStep[];
  keyQuestions: string[];
  exampleUseCase: {
    title: string;
    scenario: string;
    application: string;
    outcome: string;
  };
  pros: string[];
  cons: string[];
  toolsNeeded: string[];
  interactiveCanvasType?: CanvasType;
  // Matrix plot coordinates (0 to 100)
  plotCoordinates: {
    complexityScore: number; // 0 = Simple/Clear, 100 = Highly Complex/Chaotic
    analyticalVsCreative: number; // 0 = Pure Analytical/Deductive, 100 = Pure Creative/Generative
  };
}

export interface WizardQuestionOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
  // Framework IDs with weighted scores (1-10)
  scores: Record<string, number>;
  penalties?: Record<string, number>; // Frameworks that should be penalized or flagged as avoid
}

export interface WizardQuestion {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  options: WizardQuestionOption[];
}

export interface WizardResult {
  topFramework: Framework;
  topScore: number;
  matchReason: string;
  runnerUps: Array<{
    framework: Framework;
    score: number;
    fitReason: string;
  }>;
  avoidFrameworks: Array<{
    framework: Framework;
    reason: string;
  }>;
  userAnswers: Record<string, string>;
}
