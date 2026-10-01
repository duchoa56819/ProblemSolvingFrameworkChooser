import { WizardQuestion } from '../types/framework';

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: 'nature',
    stepNumber: 1,
    title: 'What is the primary nature of your challenge?',
    subtitle: 'Identify the domain where the friction or opportunity is rooted.',
    options: [
      {
        id: 'defect-failure',
        label: 'System Glitch, Defect, or Outage',
        description: 'Something that used to work suddenly broke, failed quality checks, or experienced an outage.',
        iconName: 'AlertTriangle',
        scores: {
          'five-whys': 9,
          'fishbone': 9,
          'kepner-tregoe': 10,
          'eight-disciplines': 9,
          'fmea': 7,
          'dmaic': 6
        },
        penalties: {
          'design-thinking': 5,
          'scamper': 6
        }
      },
      {
        id: 'strategy-market',
        label: 'Strategic Dilemma or Business Decision',
        description: 'High-stakes capital allocation, business model choice, market entry, or competing hypotheses.',
        iconName: 'Compass',
        scores: {
          'mece-issue-trees': 10,
          'cynefin': 9,
          'inversion': 9,
          'first-principles': 8,
          'ooda-loop': 7
        },
        penalties: {
          'five-whys': 4,
          'scamper': 5
        }
      },
      {
        id: 'user-experience',
        label: 'Customer Pain, Churn, or Low Adoption',
        description: 'Users aren’t behaving as expected, engagement is sluggish, or a human need remains unmet.',
        iconName: 'Users',
        scores: {
          'design-thinking': 10,
          'double-diamond': 9,
          'six-thinking-hats': 6
        },
        penalties: {
          'triz': 6,
          'fmea': 4
        }
      },
      {
        id: 'engineering-contradiction',
        label: 'Technical Trade-off or Creative Bottleneck',
        description: 'Improving one aspect (e.g. speed/weight/cost) breaks another, or the team is stuck in a creative rut.',
        iconName: 'Cpu',
        scores: {
          'triz': 10,
          'first-principles': 9,
          'scamper': 8,
          'six-thinking-hats': 7
        },
        penalties: {
          'eisenhower-matrix': 5
        }
      },
      {
        id: 'process-variation',
        label: 'Process Inefficiency & Operational Waste',
        description: 'Existing workflow is too slow, suffers from high variance, excess scrap, or bottlenecks.',
        iconName: 'Activity',
        scores: {
          'dmaic': 10,
          'pdca': 9,
          'a3-problem-solving': 9,
          'pareto': 8,
          'fishbone': 8
        }
      },
      {
        id: 'prioritization-overload',
        label: 'Backlog Overload & Resource Constraint',
        description: 'Too many competing tasks, ideas, or feature requests with limited engineering bandwidth.',
        iconName: 'Layers',
        scores: {
          'rice-scoring': 10,
          'eisenhower-matrix': 10,
          'pareto': 9
        },
        penalties: {
          'triz': 8,
          'first-principles': 6
        }
      }
    ]
  },
  {
    id: 'complexity',
    stepNumber: 2,
    title: 'How predictable is the cause-and-effect relationship?',
    subtitle: 'Understanding the problem certainty prevents using rigid tools in volatile environments.',
    options: [
      {
        id: 'clear-linear',
        label: 'Clear & Repeatable',
        description: 'Cause and effect is directly discoverable; we just need systematic discipline and standard work.',
        iconName: 'CheckCircle2',
        scores: {
          'five-whys': 9,
          'pdca': 9,
          'pareto': 9,
          'eisenhower-matrix': 9
        },
        penalties: {
          'cynefin': 4
        }
      },
      {
        id: 'complicated-expert',
        label: 'Complicated (Needs Expert Analysis)',
        description: 'A tough technical puzzle. The answer exists, but requires structured root cause diagnostics.',
        iconName: 'GitBranch',
        scores: {
          'kepner-tregoe': 10,
          'fishbone': 9,
          'mece-issue-trees': 9,
          'dmaic': 9,
          'eight-disciplines': 9,
          'triz': 8,
          'fmea': 8
        }
      },
      {
        id: 'complex-emergent',
        label: 'Complex (Human & Unpredictable)',
        description: 'Interacting variables and emergent human behaviors. Answers can only be proven via experiments.',
        iconName: 'Network',
        scores: {
          'cynefin': 10,
          'design-thinking': 10,
          'double-diamond': 9,
          'inversion': 7
        },
        penalties: {
          'five-whys': 5,
          'dmaic': 5
        }
      },
      {
        id: 'chaotic-crisis',
        label: 'Chaotic (Turbulent Emergency)',
        description: 'Active emergency with zero time for deep analysis; immediate triage and decisive containment is vital.',
        iconName: 'Flame',
        scores: {
          'ooda-loop': 10,
          'eight-disciplines': 8,
          'cynefin': 8
        },
        penalties: {
          'dmaic': 9,
          'fmea': 8,
          'mece-issue-trees': 7
        }
      }
    ]
  },
  {
    id: 'data',
    stepNumber: 3,
    title: 'What primary type of data or evidence do you hold?',
    subtitle: 'Select the primary format of evidence at your disposal.',
    options: [
      {
        id: 'hard-metrics',
        label: 'Numerical Telemetry & Datasets',
        description: 'Log metrics, error rates, financial figures, sensor telemetry, and statistical databases.',
        iconName: 'BarChart3',
        scores: {
          'dmaic': 10,
          'pareto': 10,
          'kepner-tregoe': 9,
          'fmea': 8,
          'rice-scoring': 8
        }
      },
      {
        id: 'qualitative-interviews',
        label: 'User Stories & Human Emotions',
        description: 'Customer interviews, user recordings, complaints, team sentiment, and behavioral feedback.',
        iconName: 'MessageSquare',
        scores: {
          'design-thinking': 10,
          'double-diamond': 9,
          'six-thinking-hats': 8
        },
        penalties: {
          'dmaic': 5
        }
      },
      {
        id: 'physical-architecture',
        label: 'Technical Schematics & System Models',
        description: 'Component architecture, codebases, hardware blueprints, or contractual supply agreements.',
        iconName: 'Cpu',
        scores: {
          'triz': 10,
          'fishbone': 8,
          'first-principles': 9,
          'fmea': 9
        }
      },
      {
        id: 'sparse-uncertainty',
        label: 'Limited Historical Data / Uncharted Context',
        description: 'Brand new market, unprecedented technology, or fog-of-war emergency.',
        iconName: 'HelpCircle',
        scores: {
          'cynefin': 10,
          'ooda-loop': 9,
          'scamper': 8,
          'inversion': 8,
          'first-principles': 8
        },
        penalties: {
          'dmaic': 8,
          'pareto': 7
        }
      }
    ]
  },
  {
    id: 'timeframe',
    stepNumber: 4,
    title: 'What is your available timeframe & urgency?',
    subtitle: 'Match framework depth with your deadline reality.',
    options: [
      {
        id: 'rapid-flash',
        label: 'Immediate Flash (< 1 Hour)',
        description: 'Need immediate direction, triage, or unblocking in a single meeting or post-mortem.',
        iconName: 'Zap',
        scores: {
          'five-whys': 10,
          'eisenhower-matrix': 10,
          'ooda-loop': 9,
          'scamper': 9,
          'pareto': 8,
          'six-thinking-hats': 8,
          'cynefin': 8
        },
        penalties: {
          'dmaic': 10,
          'fmea': 9,
          'mece-issue-trees': 8,
          'eight-disciplines': 7
        }
      },
      {
        id: 'sprint-days',
        label: 'Focused Sprint (1–2 Days)',
        description: 'A dedicated team workshop, hackathon, or structured two-day investigation.',
        iconName: 'Clock',
        scores: {
          'fishbone': 10,
          'a3-problem-solving': 10,
          'kepner-tregoe': 9,
          'triz': 9,
          'rice-scoring': 8
        }
      },
      {
        id: 'deep-initiative',
        label: 'Strategic Project (1–4 Weeks)',
        description: 'Thorough, enterprise-grade initiative with multi-stakeholder testing and validation.',
        iconName: 'Calendar',
        scores: {
          'design-thinking': 10,
          'mece-issue-trees': 10,
          'dmaic': 10,
          'eight-disciplines': 9,
          'double-diamond': 9,
          'fmea': 9,
          'first-principles': 9
        },
        penalties: {
          'five-whys': 3
        }
      },
      {
        id: 'continuous-cadence',
        label: 'Ongoing Continuous Loop',
        description: 'A permanent standard operating cadence for sustained quality and weekly refinement.',
        iconName: 'Repeat',
        scores: {
          'pdca': 10,
          'a3-problem-solving': 8,
          'eisenhower-matrix': 8
        }
      }
    ]
  },
  {
    id: 'team',
    stepNumber: 5,
    title: 'Who is collaborating on this problem?',
    subtitle: 'Frameworks depend on team cognitive bandwidth and facilitation needs.',
    options: [
      {
        id: 'solo-contributor',
        label: 'Solo Thinker / Individual Contributor',
        description: 'Working autonomously at your desk, needing personal clarity and focused output.',
        iconName: 'User',
        scores: {
          'eisenhower-matrix': 10,
          'scamper': 10,
          'inversion': 9,
          'first-principles': 9,
          'pareto': 8,
          'ooda-loop': 8
        },
        penalties: {
          'six-thinking-hats': 8,
          'eight-disciplines': 7,
          'dmaic': 6
        }
      },
      {
        id: 'tactical-team',
        label: 'Small Core Team (2–6 People)',
        description: 'Close-knit engineers, product leads, or task force members with high trust.',
        iconName: 'Users',
        scores: {
          'five-whys': 9,
          'kepner-tregoe': 9,
          'a3-problem-solving': 9,
          'rice-scoring': 9,
          'pdca': 8,
          'triz': 8
        }
      },
      {
        id: 'cross-functional',
        label: 'Cross-Functional Squad (5–15 People)',
        description: 'Multi-departmental mix: Engineering, Design, Ops, QA, Product, and Customer Support.',
        iconName: 'Share2',
        scores: {
          'design-thinking': 10,
          'fishbone': 10,
          'six-thinking-hats': 10,
          'eight-disciplines': 9,
          'double-diamond': 9,
          'dmaic': 9,
          'fmea': 8
        }
      },
      {
        id: 'executive-boardroom',
        label: 'Executive Leadership / Committee',
        description: 'Senior stakeholders balancing strategic trade-offs, resource allocation, and organizational alignment.',
        iconName: 'Award',
        scores: {
          'mece-issue-trees': 10,
          'cynefin': 9,
          'a3-problem-solving': 8,
          'inversion': 8,
          'six-thinking-hats': 7
        }
      }
    ]
  },
  {
    id: 'deliverable',
    stepNumber: 6,
    title: 'What is your desired primary output artifact?',
    subtitle: 'Define the concrete end deliverable you need to produce.',
    options: [
      {
        id: 'root-cause-fix',
        label: 'Verified Root Cause & Poka-Yoke Prevention',
        description: 'Irrefutable diagnosis of why it happened, paired with automated prevention so it never happens again.',
        iconName: 'CheckCircle',
        scores: {
          'five-whys': 10,
          'kepner-tregoe': 10,
          'eight-disciplines': 9,
          'fishbone': 8,
          'dmaic': 8
        }
      },
      {
        id: 'tested-prototype',
        label: 'Validated User Prototype or Concept',
        description: 'A tested solution prototype with real user quotes, validation evidence, and high desirability.',
        iconName: 'Sparkles',
        scores: {
          'design-thinking': 10,
          'double-diamond': 10,
          'scamper': 8
        }
      },
      {
        id: 'prioritized-roadmap',
        label: 'Ranked Priority Backlog / ROI List',
        description: 'A transparent, quantified ranking of candidate projects or tasks based on impact and effort.',
        iconName: 'ListOrdered',
        scores: {
          'rice-scoring': 10,
          'eisenhower-matrix': 9,
          'pareto': 9
        }
      },
      {
        id: 'executive-decision',
        label: 'Strategic Roadmap & Falsifiable Hypotheses',
        description: 'Structured business thesis, risk trade-offs, and logical decomposition for executive decision-makers.',
        iconName: 'TrendingUp',
        scores: {
          'mece-issue-trees': 10,
          'first-principles': 9,
          'inversion': 9,
          'cynefin': 8
        }
      },
      {
        id: 'a3-one-pager',
        label: 'Single-Page Visual Consensus Document',
        description: 'A concise, visual summary combining background, current metrics, diagnosis, and action plan.',
        iconName: 'FileText',
        scores: {
          'a3-problem-solving': 10,
          'pdca': 7
        }
      }
    ]
  }
];
