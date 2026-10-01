import { Framework } from '../types/framework';

export const FRAMEWORKS: Framework[] = [
  // --- 1. ROOT CAUSE & DIAGNOSTICS ---
  {
    id: 'five-whys',
    name: '5 Whys Root Cause Analysis',
    shortName: '5 Whys',
    origin: 'Taiichi Ohno (Toyota Motor Corporation, 1950s)',
    tagline: 'Rapidly drill down beneath surface symptoms to uncover the human or systemic root cause.',
    category: 'root-cause',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Clear',
    bestFor: 'Single-thread operational glitches, recurring mechanical bugs, and process hiccups where cause-and-effect is linear.',
    whenToAvoid: 'Multifactorial systemic crises, software architectural rewrites, or complex political/cultural organizational issues.',
    summary: 'The 5 Whys is an iterative interrogative technique used to explore cause-and-effect relationships underlying a particular problem. By repeating "Why?" five times, teams bypass superficial blame to identify system deficiencies.',
    steps: [
      {
        number: 1,
        title: 'Define the Specific Problem Statement',
        description: 'Describe the exact symptom objectively without presupposing blame or solution.',
        actionableTip: 'Ensure the problem is observable, verifiable, and bounded by time/location.'
      },
      {
        number: 2,
        title: 'Ask the First "Why?"',
        description: 'Examine why this immediate symptom happened. Look for factual, direct triggers.',
        actionableTip: 'Rely on data and physical evidence, not speculation.'
      },
      {
        number: 3,
        title: 'Iterate 4 More Times',
        description: 'For each answer provided, ask "Why did that occur?" until reaching a controllable procedural or management failure.',
        actionableTip: 'Stop when the answer touches a systemic policy, training gap, or missing check rather than an individual mistake.'
      },
      {
        number: 4,
        title: 'Assign Countermeasures & Owners',
        description: 'Draft preventative systemic countermeasures (e.g. poka-yoke error-proofing) rather than telling people to "be more careful".',
        actionableTip: 'Assign a single DRI (Directly Responsible Individual) and a verification audit date.'
      }
    ],
    keyQuestions: [
      'Is each "why" logically and factually proven to cause the symptom above it?',
      'If we reverse the statements with "therefore", does the causal logic hold true?',
      'Are we blaming human carelessness or diagnosing a system design flaw?',
      'Will this countermeasure permanently prevent this specific failure from recurring?'
    ],
    exampleUseCase: {
      title: 'Production API Gateway Outage',
      scenario: 'The primary customer checkout API went down for 42 minutes on Black Friday.',
      application: 'Why? Memory exhausted. Why? Cache key explosion. Why? Missing TTL on anonymous carts. Why? Sprint deadline omitted non-auth validation. Why? QA checklist did not simulate anonymous mass-traffic load.',
      outcome: 'Added automated load tests verifying TTL expiration on anonymous cart requests before any release candidate is promoted.'
    },
    pros: [
      'Simple, intuitive, and zero learning curve',
      'Encourages teams to look beyond blaming individuals',
      'Fast execution within a 30-minute post-mortem'
    ],
    cons: [
      'Prone to single-track confirmation bias (linear trap)',
      'Results depend heavily on the investigator’s domain knowledge',
      'Cannot capture branching or interacting multi-variable causes'
    ],
    toolsNeeded: ['Whiteboard / Miro', 'Post-it notes', 'Incident log'],
    interactiveCanvasType: 'five-whys',
    plotCoordinates: {
      complexityScore: 18,
      analyticalVsCreative: 20
    }
  },
  {
    id: 'fishbone',
    name: 'Ishikawa / Fishbone Diagram (6M)',
    shortName: 'Fishbone (6M)',
    origin: 'Kaoru Ishikawa (University of Tokyo / Kawasaki Steel, 1968)',
    tagline: 'Categorize multi-variable contributors across 6 systemic dimensions to visualize root causes.',
    category: 'root-cause',
    complexity: 'Intermediate',
    timeframe: '1–2 days',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Complex manufacturing defects, cross-departmental bottlenecks, and issues where multiple factors compound.',
    whenToAvoid: 'Time-critical emergency firefights requiring split-second triage and immediate action.',
    summary: 'The Fishbone diagram is a cause-and-effect visualization tool mapping potential factors contributing to an overall defect into standard categories (Manpower, Machine, Method, Material, Measurement, Mother Nature).',
    steps: [
      {
        number: 1,
        title: 'Place the Problem at the Fish Head',
        description: 'Clearly write the problem statement at the far right spine point.',
        actionableTip: 'Quantify the defect (e.g., "Defect rate spiked from 1.2% to 4.8% in Q3").'
      },
      {
        number: 2,
        title: 'Draw the Primary 6M Ribs',
        description: 'Draw branches for Manpower, Machine, Method, Material, Measurement, and Milieu (Environment).',
        actionableTip: 'In software/service industries, adapt to 4S (Surroundings, Suppliers, Systems, Skills) or 8P.'
      },
      {
        number: 3,
        title: 'Brainstorm & Sub-Branch Causes',
        description: 'Team brainstorms all possible contributors, attaching smaller sub-bones to each major category.',
        actionableTip: 'Do not debate validity during brainstorming; log all hypotheses first.'
      },
      {
        number: 4,
        title: 'Prioritize & Validate Hypotheses',
        description: 'Vote or use Pareto analysis on the top 3 high-probability bones and gather telemetry to confirm.',
        actionableTip: 'Collect empirical data to prove or disprove the top 3 bones.'
      }
    ],
    keyQuestions: [
      'Have we accounted for environmental variables like temperature, shift changes, or server latency spikes?',
      'Are the measurement tools calibrated and reliable?',
      'Are cross-functional stakeholders from operations, QA, and frontline present?'
    ],
    exampleUseCase: {
      title: 'Customer Onboarding Drop-off',
      scenario: 'B2B SaaS product experienced a 35% drop in activation after a UI refresh.',
      application: 'Broke down causes: Method (new KYC step required up front), Machine (Safari WebKit rendering bug), Manpower (sales reps not trained on new flow), Measurement (analytics event dropped on mobile).',
      outcome: 'Discovered Safari cookie blocking + premature KYC were causing 80% of drops; deferred KYC to post-activation.'
    },
    pros: [
      'Forces holistic evaluation across operational categories',
      'Excellent for engaging cross-functional teams visually',
      'Prevents premature focus on obvious single culprits'
    ],
    cons: [
      'Can become sprawling and cluttered without strict facilitation',
      'Identifies potential causes, but does not prove statistical causality without follow-up'
    ],
    toolsNeeded: ['Whiteboard canvas', 'Sticky notes', 'Categorization markers'],
    interactiveCanvasType: 'fishbone',
    plotCoordinates: {
      complexityScore: 40,
      analyticalVsCreative: 35
    }
  },
  {
    id: 'kepner-tregoe',
    name: 'Kepner-Tregoe Problem Analysis',
    shortName: 'Kepner-Tregoe',
    origin: 'Charles Kepner & Benjamin Tregoe (RAND Corporation / KT, 1958)',
    tagline: 'Rigorous deductive troubleshooting using boundary contrasts: IS vs. IS NOT analysis.',
    category: 'root-cause',
    complexity: 'Advanced',
    timeframe: '1–2 days',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'High-stakes technical anomalies where an existing stable system suddenly developed unexpected deviation.',
    whenToAvoid: 'Brand new greenfield design challenges or open-ended creative concept generation.',
    summary: 'A disciplined, rational decision and troubleshooting methodology. KT Problem Analysis relies on the fundamental axiom: a problem is a deviation from standard performance caused by an unrecognized change. It pinpoints causes by contrasting what IS affected vs. what reasonably COULD BE affected but IS NOT.',
    steps: [
      {
        number: 1,
        title: 'State the Deviation',
        description: 'Precisely state what performance standard is broken.',
        actionableTip: 'Distinguish between the symptom and the expected baseline.'
      },
      {
        number: 2,
        title: 'Define the IS vs. IS NOT Matrix',
        description: 'Classify What, Where, When, and Extent. For each, specify what IS affected and what IS NOT affected but could be.',
        actionableTip: 'The clue to the cause lies in the distinctive difference between IS and IS NOT.'
      },
      {
        number: 3,
        title: 'Identify Distinctive Changes',
        description: 'Search for recent changes, releases, or shifts that correlate with those distinctive differences.',
        actionableTip: 'Review changelogs, supplier batches, environment configurations, and staff shifts.'
      },
      {
        number: 4,
        title: 'Test Probable Causes & Verify',
        description: 'Mentally and empirically test if the candidate cause explains every single IS and IS NOT fact.',
        actionableTip: 'If a hypothesis cannot explain why machine B did NOT fail, discard or refine it.'
      }
    ],
    keyQuestions: [
      'What is unique about the condition where the defect occurs compared to where it doesn’t?',
      'What changed around the exact time the deviation first appeared?',
      'Does our hypothesis account for ALL the IS NOT observations without contradictions?'
    ],
    exampleUseCase: {
      title: 'NASA Apollo 13 Oxygen Tank Investigation',
      scenario: 'Cryogenic oxygen tank exploded mid-mission. NASA needed indisputable root cause.',
      application: 'Used KT Problem Analysis to map IS (Tank 2 exploded) vs IS NOT (Tank 1 intact, previous ground tests normal). Identified change: 65V heater test applied on launch pad damaged thermostatic switch.',
      outcome: 'Redesigned heater switches with failsafe wiring, preventing loss of future spacecraft.'
    },
    pros: [
      'Extreme scientific rigor and elimination of guesswork',
      'Saves millions in high-stakes aerospace, semiconductor, and data center outages',
      'Filters out false correlations rapidly'
    ],
    cons: [
      'Requires substantial discipline and factual data',
      'Can feel slow if people are looking for quick emotional fixes'
    ],
    toolsNeeded: ['KT Specification Matrix Sheet', 'Telemetry logs', 'Change logs'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 55,
      analyticalVsCreative: 10
    }
  },
  {
    id: 'fmea',
    name: 'FMEA (Failure Mode and Effects Analysis)',
    shortName: 'FMEA',
    origin: 'US Military (MIL-P-1629, 1949) & NASA / Automotive AIAG',
    tagline: 'Proactively score and mitigate potential failures before they ever reach production.',
    category: 'root-cause',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Safety-critical engineering, medical devices, new system rollouts, and mission-critical hardware/software.',
    whenToAvoid: 'Fast-moving early ideation prototypes where requirements change hourly.',
    summary: 'FMEA is a structured, proactive method for evaluating a process or design to identify where and how it might fail, and to assess the relative impact of different failures using Risk Priority Numbers (RPN = Severity × Occurrence × Detection).',
    steps: [
      {
        number: 1,
        title: 'Break Down Components / Steps',
        description: 'Decompose the product, architecture, or workflow into discrete constituent parts.',
        actionableTip: 'Map every user touchpoint or system integration point.'
      },
      {
        number: 2,
        title: 'Identify Failure Modes & Effects',
        description: 'For each element, list every plausible way it could fail and the downstream consequences.',
        actionableTip: 'Consider both catastrophic failures and subtle degradation.'
      },
      {
        number: 3,
        title: 'Score Severity, Occurrence, & Detection (1-10)',
        description: 'Rate Severity (S), Likelihood of Occurrence (O), and Likelihood of Early Detection (D). Calculate RPN = S × O × D.',
        actionableTip: 'Prioritize items with Severity >= 9 regardless of overall RPN.'
      },
      {
        number: 4,
        title: 'Deploy Mitigations & Recalculate',
        description: 'Design preventative controls, automated testing, or redundant failsafes to slash RPN.',
        actionableTip: 'Re-audit post-implementation to demonstrate lowered residual risk.'
      }
    ],
    keyQuestions: [
      'What is the worst-case failure mode if our primary database or cloud region goes offline?',
      'Can our current monitoring detect silent corruption before our customers do?',
      'What design interlock can eliminate the occurrence entirely?'
    ],
    exampleUseCase: {
      title: 'Autonomous Vehicle Braking Actuator',
      scenario: 'Engineering self-driving braking system for Tier-1 automotive release.',
      application: 'FMEA revealed brake pedal sensor disconnect had S=10, O=3, D=7 (RPN 210). Implemented dual-channel Hall sensors with hardware watchdog voting.',
      outcome: 'Reduced Detection rating from 7 to 1, lowering RPN to 30, meeting ISO 26262 ASIL D safety standards.'
    },
    pros: [
      'Prevents catastrophic failures before launch',
      'Creates quantifiable, audited risk matrices',
      'Forces teams to think beyond happy-path scenarios'
    ],
    cons: [
      'Resource-intensive; can lead to analysis paralysis',
      'RPN scoring can be subjective across different evaluators'
    ],
    toolsNeeded: ['FMEA Worksheet / Excel', 'Design Schematics', 'Failure taxonomy'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 70,
      analyticalVsCreative: 15
    }
  },
  {
    id: 'pareto',
    name: 'Pareto Analysis (80/20 Rule)',
    shortName: 'Pareto (80/20)',
    origin: 'Vilfredo Pareto & Joseph Juran (Quality Control, 1941)',
    tagline: 'Pinpoint the vital 20% of root causes generating 80% of defects or customer friction.',
    category: 'prioritization',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Clear',
    bestFor: 'Triage when overwhelmed with hundreds of customer tickets, software bugs, or defect types.',
    whenToAvoid: 'When dealing with rare "Black Swan" events or single fatal safety risks.',
    summary: 'Pareto analysis uses quantitative sorting to separate the "vital few" from the "trivial many". By focusing resources on the small fraction of inputs causing the vast majority of problems, teams achieve exponential ROI on problem-solving effort.',
    steps: [
      {
        number: 1,
        title: 'Collect Problem Data',
        description: 'Aggregate defect logs, support tickets, or performance bottlenecks into a dataset.',
        actionableTip: 'Ensure a clean time window of representative telemetry.'
      },
      {
        number: 2,
        title: 'Categorize & Count Frequency',
        description: 'Group items by root cause category and tally total occurrences and financial cost.',
        actionableTip: 'Standardize naming so duplicate categories are merged.'
      },
      {
        number: 3,
        title: 'Plot Pareto Chart (Frequency vs Cumulative %)',
        description: 'Sort categories descending by frequency and calculate running cumulative percentages.',
        actionableTip: 'Look for the inflection elbow where the top 2-3 categories account for ~80% of volume.'
      },
      {
        number: 4,
        title: 'Focus All Firepower on the Vital Few',
        description: 'Concentrate immediate engineering sprints on solving just the top 20% contributors.',
        actionableTip: 'Ignore minor tail issues until the vital head is eradicated.'
      }
    ],
    keyQuestions: [
      'Which top 2 or 3 bug categories are generating 80% of user complaints?',
      'Are we wasting sprint cycles on low-frequency cosmetic fixes?',
      'What is the cost of defect vs the effort to eliminate it?'
    ],
    exampleUseCase: {
      title: 'Mobile App Crash Frequency',
      scenario: 'Mobile banking app received 1-star reviews citing frequent crashes across 84 device models.',
      application: 'Pareto analysis revealed 3 crash signatures accounted for 79.4% of all crash sessions (Bluetooth sync thread deadlock & null camera pointer).',
      outcome: 'Fixed the top 3 signatures in 48 hours; overall crash-free users jumped from 91% to 99.2%.'
    },
    pros: [
      'Instant clarity on where to allocate limited development resources',
      'Objective, data-driven prioritization that cuts through political opinions',
      'Fastest ROI on troubleshooting'
    ],
    cons: [
      'Focuses on historical frequency; misses rare but fatal risks',
      'Assumes all problems within a category have equal financial/human impact'
    ],
    toolsNeeded: ['Spreadsheet / SQL query', 'Pareto chart generator', 'Bug tracker'],
    interactiveCanvasType: 'rice-calc',
    plotCoordinates: {
      complexityScore: 15,
      analyticalVsCreative: 10
    }
  },

  // --- 2. STRATEGIC THINKING & SENSE-MAKING ---
  {
    id: 'cynefin',
    name: 'Cynefin Framework (Sense-Making)',
    shortName: 'Cynefin',
    origin: 'Dave Snowden (IBM Global Services / Cognitive Edge, 1999)',
    tagline: 'Diagnose the nature of your operating reality: Clear, Complicated, Complex, or Chaotic.',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complex',
    bestFor: 'Determining the correct management posture and avoiding applying rigid linear tools to unpredictable environments.',
    whenToAvoid: 'When the domain is already 100% known and you just need execution checklists.',
    summary: 'Cynefin is a sense-making framework that divides problems into five contexts: Clear (Best Practice: Sense-Categorize-Respond), Complicated (Good Practice: Sense-Analyze-Respond), Complex (Emergent: Probe-Sense-Respond), Chaotic (Novel: Act-Sense-Respond), and Confused/Aporia. It protects leaders from catastrophic categorization blunders.',
    steps: [
      {
        number: 1,
        title: 'Assess Cause-and-Effect Relationship',
        description: 'Is cause-and-effect repeatable (Clear), discoverable by experts (Complicated), emergent and non-linear (Complex), or non-existent/turbulent (Chaotic)?',
        actionableTip: 'Do not force certainty onto complex human/market dynamics.'
      },
      {
        number: 2,
        title: 'Identify Your Current Domain',
        description: 'Map the challenge to one of the 4 primary Cynefin quadrants.',
        actionableTip: 'Beware the boundary between Clear and Chaotic—overconfidence causes complacency collapse.'
      },
      {
        number: 3,
        title: 'Adopt the Domain’s Prescribed Response Mode',
        description: 'Clear -> Sense-Categorize-Respond. Complicated -> Sense-Analyze-Respond. Complex -> Probe-Sense-Respond. Chaotic -> Act-Sense-Respond.',
        actionableTip: 'In Complex domains, run multiple small safe-to-fail experiments instead of drafting giant master plans.'
      },
      {
        number: 4,
        title: 'Amplify Successes & Dampen Failures',
        description: 'Monitor feedback loops. Guide the system into Complicated or Clear domains once patterns stabilize.',
        actionableTip: 'Maintain diverse viewpoints to prevent falling into the Confused center.'
      }
    ],
    keyQuestions: [
      'Can an expert analyze this upfront, or will the answer only be visible in hindsight?',
      'Are we trying to apply rigid Six Sigma/5 Whys to a living, complex human ecosystem?',
      'If we are in Chaos, what single stabilizing action can stem the bleeding right now?'
    ],
    exampleUseCase: {
      title: 'Product Market Entry into Uncharted Territory',
      scenario: 'Tech company launching an AI assistant into healthcare clinics with high regulatory resistance.',
      application: 'Recognized this was a Complex domain (unpredictable human workflows). Abandoned a rigid 18-month Gantt chart; launched 4 parallel small-scale pilot experiments in contrasting clinics.',
      outcome: 'Discovered one pilot increased doctor trust by 300% via ambient audio transcription; pivoted entire product line around that emergent pattern.'
    },
    pros: [
      'Stops teams from using wrong tools on wrong problems',
      'Provides a shared vocabulary across executives, engineers, and creatives',
      'Recognizes the legitimacy of safe-to-fail experimentation'
    ],
    cons: [
      'Requires mental shift away from predictive command-and-control',
      'Can be misunderstood as a simple 2x2 categorization matrix rather than dynamic sense-making'
    ],
    toolsNeeded: ['Domain map canvas', 'Experiment design templates'],
    interactiveCanvasType: 'cynefin-tester',
    plotCoordinates: {
      complexityScore: 75,
      analyticalVsCreative: 55
    }
  },
  {
    id: 'mece-issue-trees',
    name: 'MECE & Hypothesis-Driven Issue Trees',
    shortName: 'MECE Issue Trees',
    origin: 'Barbara Minto (McKinsey & Company, 1960s)',
    tagline: 'Decompose complex business dilemmas into Mutually Exclusive, Collectively Exhaustive branches.',
    category: 'strategic',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Strategy consulting, business profitability turnarounds, M&A evaluations, and corporate market expansion.',
    whenToAvoid: 'Uncharted creative design where categories have not yet been invented.',
    summary: 'MECE (Mutually Exclusive, Collectively Exhaustive) is the gold-standard problem-solving framework of top management consultancies. It breaks a high-level question into structured issue trees where branches do not overlap (ME) and leave no gaps (CE), paired with early falsifiable hypotheses.',
    steps: [
      {
        number: 1,
        title: 'Formulate the Core Question',
        description: 'Write an actionable, focused question (e.g. "How can Company X increase operating margin by 5% in 18 months?").',
        actionableTip: 'Ensure the question is measurable, specific, and decision-oriented.'
      },
      {
        number: 2,
        title: 'Build the MECE Decomposition Tree',
        description: 'Divide the problem into 2-4 primary branches that do not overlap and cover all possibilities (e.g. Revenue vs. Cost).',
        actionableTip: 'Use algebraic formulas (e.g., Profit = Volume × Price - Fixed Costs - Variable Costs) for guaranteed MECE structure.'
      },
      {
        number: 3,
        title: 'Formulate Early Falsifiable Hypotheses',
        description: 'Develop an educated guess about which sub-branch holds the highest leverage opportunity.',
        actionableTip: 'A good hypothesis is capable of being proven wrong by data within days.'
      },
      {
        number: 4,
        title: 'Design "Work-Plan" Analyses to Test Hypotheses',
        description: 'Build targeted financial models and market surveys focused strictly on confirming or disproving the hypothesis.',
        actionableTip: 'Avoid "boiling the ocean"—do not analyze branches that have zero leverage.'
      }
    ],
    keyQuestions: [
      'Are the branches mutually exclusive (no double counting)?',
      'Are they collectively exhaustive (nothing missing from the universe of possibilities)?',
      'What data would prove our initial hypothesis wrong?'
    ],
    exampleUseCase: {
      title: 'E-commerce Retailer Margin Erosion',
      scenario: 'Online retailer saw gross margins collapse by 12% despite top-line sales growth.',
      application: 'Constructed MECE tree: Margin = (Average Order Value - COGS - Shipping - Returns). Formulated hypothesis that returns spiked. Analysis proved returns of high-value electronics jumped from 4% to 22% due to supplier repackaging defects.',
      outcome: 'Instituted pre-shipment inspections on electronics, restoring margin within 60 days.'
    },
    pros: [
      'Eliminates wasted work and unfocused research',
      'Provides bulletproof executive communication structure',
      'Scales to multi-billion dollar strategic transformations'
    ],
    cons: [
      'Requires high cognitive rigor to construct true MECE logic',
      'Can feel mechanical if forced onto non-quantitative social dynamics'
    ],
    toolsNeeded: ['Mind mapping software', 'Financial spreadsheets', 'Hypothesis ledger'],
    interactiveCanvasType: 'minto-pyramid',
    plotCoordinates: {
      complexityScore: 65,
      analyticalVsCreative: 25
    }
  },
  {
    id: 'ooda-loop',
    name: 'OODA Loop (Observe, Orient, Decide, Act)',
    shortName: 'OODA Loop',
    origin: 'Colonel John Boyd (United States Air Force, 1976)',
    tagline: 'Outmaneuver competition and crisis by cycling faster through perceptual and decision cycles.',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Chaotic',
    bestFor: 'High-stakes competitive strategy, cybersecurity incident response, volatile markets, and live combat/crisis triage.',
    whenToAvoid: 'Slow-moving bureaucratic compliance where speed is legally prohibited.',
    summary: 'Developed by military strategist John Boyd, the OODA Loop is a continuous mental model for dynamic conflict. The party that cycles through Observe-Orient-Decide-Act faster and more accurately gains decisive tempo, forcing adversaries into disorientation and collapse.',
    steps: [
      {
        number: 1,
        title: 'Observe (Raw Environmental Signals)',
        description: 'Collect real-time situational awareness. Detect anomalies, market moves, or adversary vectors without filtering.',
        actionableTip: 'Beware of relying solely on outdated historical dashboards.'
      },
      {
        number: 2,
        title: 'Orient (The Core Engine: Mental Models)',
        description: 'Synthesize observations through genetic heritage, cultural traditions, previous experience, new info, and cognitive schemas.',
        actionableTip: 'Orientation is the most critical stage: smash obsolete assumptions to adapt instantly.'
      },
      {
        number: 3,
        title: 'Decide (Select Falsifiable Course of Action)',
        description: 'Choose a swift, decisive move. Speed beats deliberation in chaotic environments.',
        actionableTip: 'Aim for a 70% certainty threshold—waiting for 95% certainty means you are already dead.'
      },
      {
        number: 4,
        title: 'Act (Execute & Observe Immediate Reaction)',
        description: 'Execute the action boldly and immediately cycle back to Observe the system’s feedback.',
        actionableTip: 'Action is not the conclusion; it is a probe that reveals the adversary’s reaction.'
      }
    ],
    keyQuestions: [
      'How fast is our feedback loop compared to the external rate of change?',
      'Which outdated mental model is blinding our team to current reality?',
      'What unexpected probe can we execute right now to reset the tempo in our favor?'
    ],
    exampleUseCase: {
      title: 'Zero-Day Ransomware Outbreak',
      scenario: 'Global logistics firm faced simultaneous lateral server encryption at 02:00 AM.',
      application: 'Security Ops executed fast OODA loop: Observed unusual SMB traffic, Oriented to active ransomware strain, Decided to sever core WAN connections instantly despite executive pushback, Acted within 4 minutes.',
      outcome: 'Isolated malware to 3 non-critical branch offices, saving 28,000 corporate workstations and $40M in ransom.'
    },
    pros: [
      'Builds supreme tactical agility and resilience in high volatility',
      'Emphasizes psychological adaptation over rigid predetermined plans',
      'Empowers rapid frontline autonomy'
    ],
    cons: [
      'Can lead to erratic knee-jerk decisions if "Orient" stage is rushed',
      'Demands high mental discipline and emotional control under pressure'
    ],
    toolsNeeded: ['Real-time telemetry', 'Command war room', 'Decision log'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 80,
      analyticalVsCreative: 60
    }
  },
  {
    id: 'inversion',
    name: 'Inversion & Second-Order Thinking',
    shortName: 'Inversion & 2nd Order',
    origin: 'Carl Jacobi / Charlie Munger / Howard Marks',
    tagline: 'Avoid disaster by solving problems backwards: "Invert, always invert."',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Complicated',
    bestFor: 'High-stakes investments, architectural roadmaps, risk management, and preventing catastrophic blindspots.',
    whenToAvoid: 'When you need initial positive inspiration and greenfield creative brainstorms.',
    summary: 'Championed by Charlie Munger ("All I want to know is where I’m going to die so I’ll never go there"), Inversion flips problems upside-down: instead of asking "How do we succeed?", ask "How could we guarantee failure?" and systematically eliminate those failure vectors.',
    steps: [
      {
        number: 1,
        title: 'Flip the Question 180°',
        description: 'State the exact reverse of your goal (e.g., "How could we guarantee our product launch is a catastrophic flop?").',
        actionableTip: 'Give the team full psychological safety to list disastrous outcomes.'
      },
      {
        number: 2,
        title: 'Map the "Failure Playbook"',
        description: 'Brainstorm all decisions, behaviors, or vulnerabilities that would guarantee that disaster.',
        actionableTip: 'Be painfully honest about current company habits that resemble these failure steps.'
      },
      {
        number: 3,
        title: 'Trace Second- and Third-Order Consequences',
        description: 'Ask: "And then what happens?" Trace ripple effects across incentives, competitive reactions, and downstream bottlenecks.',
        actionableTip: 'First-order thinking looks at immediate benefit; second-order thinking looks at long-term systemic fallout.'
      },
      {
        number: 4,
        title: 'Build Hard Guardrails and Invariants',
        description: 'Implement explicit constraints, checklists, or automated rules that make those failure steps impossible.',
        actionableTip: 'Focus on being consistently non-stupid rather than seeking fleeting brilliance.'
      }
    ],
    keyQuestions: [
      'If we wanted to completely bankrupt this initiative in 6 months, what would we do today?',
      'What are the second-order unintended consequences of our proposed solution?',
      'Are we trading a small immediate gain for a hidden catastrophic tail risk?'
    ],
    exampleUseCase: {
      title: 'Subscription Pricing Overhaul',
      scenario: 'SaaS company planned to mandate annual-only upfront billing to juice short-term cash flow.',
      application: 'Applied Inversion: How do we alienate our startup champions? Second-order analysis showed that removing monthly options would destroy grassroots developer adoption, shrinking top-of-funnel by 60%.',
      outcome: 'Kept monthly tier with modest price adjustment; introduced annual incentives without alienating core developer base.'
    },
    pros: [
      'Uncovers fatal vulnerabilities that optimistic brainstorming misses',
      'Lowers catastrophic downside risk dramatically',
      'Simple to facilitate in any team pre-mortem'
    ],
    cons: [
      'Can tilt cynical or demoralizing if not paired with forward momentum',
      'Does not generate novel value proposition concepts on its own'
    ],
    toolsNeeded: ['Pre-mortem canvas', 'Second-order impact matrix'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 50,
      analyticalVsCreative: 45
    }
  },
  {
    id: 'first-principles',
    name: 'First Principles Thinking',
    shortName: 'First Principles',
    origin: 'Aristotle / Physics & Engineering (popularized by Elon Musk)',
    tagline: 'Boil reality down to fundamental truths and reason up from there, rejecting reasoning by analogy.',
    category: 'strategic',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Radical cost reduction, disruptive breakthrough technology, and challenging entrenched industry dogma.',
    whenToAvoid: 'Routine operational chores where copying proven standard practice is 100x faster.',
    summary: 'First Principles thinking is the act of boiling a problem down to the most fundamental, indisputable truths you know, and then reasoning up from there rather than reasoning by analogy (copying what everyone else does with minor tweaks).',
    steps: [
      {
        number: 1,
        title: 'Identify & Articulate Current Dogma',
        description: 'List the current industry assumptions (e.g. "Batteries cost $600/kWh because that is what suppliers charge").',
        actionableTip: 'Challenge conventional wisdom by asking "Why must it be this way?"'
      },
      {
        number: 2,
        title: 'Deconstruct into Fundamental Physical Truths',
        description: 'Strip away all middlemen and historical baggage. What are the raw elemental ingredients or physical constraints?',
        actionableTip: 'Look at the London Metal Exchange or periodic table for raw material spot prices.'
      },
      {
        number: 3,
        title: 'Calculate the Theoretical Minimum',
        description: 'Sum the raw material/compute cost and theoretical energy needed. This is the true fundamental floor.',
        actionableTip: 'The gap between the theoretical floor and market price is pure engineering opportunity.'
      },
      {
        number: 4,
        title: 'Reconstruct a Novel Solution from Scratch',
        description: 'Design a process, product, or software architecture from the ground up to achieve that theoretical floor.',
        actionableTip: 'Reinvent the manufacturing or execution pipeline in-house if suppliers cannot meet fundamental physics.'
      }
    ],
    keyQuestions: [
      'Is this constraint dictated by the laws of physics, or by historical convention?',
      'What are the raw elemental components of this cost structure?',
      'If we were starting from zero today with modern technology, how would we build this?'
    ],
    exampleUseCase: {
      title: 'SpaceX Falcon 9 Rocket Reusability',
      scenario: 'Aerospace consensus held that space rockets were inherently expendable and cost $65M+ per launch.',
      application: 'Musk analyzed rocket materials: Aluminum, titanium, carbon fiber, rocket-grade kerosene, liquid oxygen. Raw materials accounted for only 2% of the rocket price. Concluded the rest was manufacturing overhead and single-use disposal.',
      outcome: 'Developed reusable first stages and in-house manufacturing, reducing launch costs by over 70% and dominating global space launch.'
    },
    pros: [
      'Enables 10x breakthrough innovations rather than 10% incremental tweaks',
      'Breaks through cartel pricing and legacy vendor markups',
      'Creates defensible technological moats'
    ],
    cons: [
      'Requires enormous cognitive effort, courage, and technical depth',
      'High risk of failure if fundamental physical assumptions are slightly miscalculated'
    ],
    toolsNeeded: ['Physics/chemistry specs', 'Material cost sheets', 'CAD / Architecture tools'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 85,
      analyticalVsCreative: 70
    }
  },

  // --- 3. HUMAN-CENTERED & CREATIVE INNOVATION ---
  {
    id: 'design-thinking',
    name: 'Design Thinking (5 Stages)',
    shortName: 'Design Thinking',
    origin: 'Stanford d.school / David Kelley & Tim Brown (IDEO, 1991)',
    tagline: 'Empathize, Define, Ideate, Prototype, and Test to solve human-centered, ambiguous challenges.',
    category: 'innovation',
    complexity: 'Intermediate',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complex',
    bestFor: 'User adoption issues, customer churn, new product discovery, and wicked human problems.',
    whenToAvoid: 'Purely mathematical, mechanical, or regulatory bugs with zero human element.',
    summary: 'Design Thinking is a non-linear, iterative process used to understand users, challenge assumptions, redefine problems, and create innovative solutions. It cycles through Empathize, Define, Ideate, Prototype, and Test.',
    steps: [
      {
        number: 1,
        title: 'Empathize (Immerse & Observe)',
        description: 'Conduct user interviews, shadowing, and contextual inquiry to feel real customer pain.',
        actionableTip: 'Observe what users DO, not just what they say they do.'
      },
      {
        number: 2,
        title: 'Define (Point of View & Problem Frame)',
        description: 'Synthesize observations into a human-centered Problem Statement: [User] needs [need] because [surprising insight].',
        actionableTip: 'Frame as "How Might We...?" (HMW) opportunity questions.'
      },
      {
        number: 3,
        title: 'Ideate (Divergent Brainstorming)',
        description: 'Generate a high volume of creative concepts without premature judgment.',
        actionableTip: 'Go for quantity and build on the ideas of others before filtering.'
      },
      {
        number: 4,
        title: 'Prototype (Low-Fidelity Tangibility)',
        description: 'Build fast paper mockups, click-through wireframes, or physical cardboard mockups in hours.',
        actionableTip: 'Keep prototypes low-fidelity so users feel comfortable critiquing them.'
      },
      {
        number: 5,
        title: 'Test (Iterate with Real End-Users)',
        description: 'Put prototypes into target users’ hands, observe behavior, listen to raw feedback, and refine.',
        actionableTip: 'Never defend your prototype during testing; ask "What did you expect to happen here?"'
      }
    ],
    keyQuestions: [
      'Whose pain are we actually solving, and have we watched them experience it?',
      'Are we framing the problem around user needs or around internal business metrics?',
      'What is the cheapest possible prototype that can test our core assumption today?'
    ],
    exampleUseCase: {
      title: 'Pediatric MRI Scanner Redesign (GE Healthcare)',
      scenario: 'Doug Dietz found that 80% of children required sedation due to terror entering sterile, noisy MRI machines.',
      application: 'Applied Design Thinking: Empathized with young patients, redefined the challenge from "redesigning the medical scanner" to "transforming the hospital journey into an adventure". Created the "GE Adventure Series" (pirate ship & safari themes).',
      outcome: 'Sedation rate dropped from 80% to under 0.5%, with hospital satisfaction scores exceeding 90%.'
    },
    pros: [
      'Unlocks genuine user empathy and adoption breakthroughs',
      'De-risks product launches via cheap low-fi prototyping',
      'Energizes cross-functional collaboration'
    ],
    cons: [
      'Can feel ambiguous or uncomfortable for purely analytical engineers',
      'Requires access to real, representative end-users'
    ],
    toolsNeeded: ['Interview scripts', 'Figma / Miro', 'Post-it notes', 'Rapid prototyping materials'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 50,
      analyticalVsCreative: 90
    }
  },
  {
    id: 'double-diamond',
    name: 'Double Diamond Process',
    shortName: 'Double Diamond',
    origin: 'Design Council UK (2004)',
    tagline: 'Balance divergent discovery with convergent focus: Discover, Define, Develop, Deliver.',
    category: 'innovation',
    complexity: 'Intermediate',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complex',
    bestFor: 'Service design, end-to-end product redesigns, and ensuring you solve the RIGHT problem before solving it RIGHT.',
    whenToAvoid: 'Quick tactical bug fixes that need an immediate patch in 30 minutes.',
    summary: 'The Double Diamond maps the design journey across two distinct diamonds representing divergent and convergent thinking: Diamond 1 (Discover & Define = Explore the problem space -> converge on the right problem); Diamond 2 (Develop & Deliver = Explore solution ideas -> converge on the validated solution).',
    steps: [
      {
        number: 1,
        title: 'Discover (Divergent Problem Exploration)',
        description: 'Broadly research context, trends, user behaviors, and edge cases with open inquiry.',
        actionableTip: 'Cast a wide net; resist jumping to solutions.'
      },
      {
        number: 2,
        title: 'Define (Convergent Problem Selection)',
        description: 'Synthesize research findings into a clear creative design brief with crisp constraints.',
        actionableTip: 'Ensure all stakeholders agree on the single core problem definition.'
      },
      {
        number: 3,
        title: 'Develop (Divergent Solution Generation)',
        description: 'Co-design multiple candidate solutions, technical architectures, and user journeys.',
        actionableTip: 'Encourage cross-discipline input from engineers, designers, and marketers.'
      },
      {
        number: 4,
        title: 'Deliver (Convergent Validation & Launch)',
        description: 'Test, pilot, refine, and ship the chosen solution with monitoring metrics in place.',
        actionableTip: 'Instrument analytics and feedback loops to measure real-world impact.'
      }
    ],
    keyQuestions: [
      'Are we currently in a divergent (expanding) or convergent (narrowing) mode?',
      'Have we validated that we are solving the real root problem, or just the symptom?',
      'What evidence proves our delivered solution fulfills the defined brief?'
    ],
    exampleUseCase: {
      title: 'UK Government Digital Service (GDS) Renewal',
      scenario: 'Gov.uk needed to unify hundreds of confusing departmental websites into one seamless citizen portal.',
      application: 'Used Double Diamond: Discovered citizen frustrations across life events (tax, voting, birth). Defined common user journeys. Developed standardized design system components. Delivered single Gov.uk portal.',
      outcome: 'Saved taxpayers billions in IT overhead and won the Design of the Year award.'
    },
    pros: [
      'Clear visual model separating problem definition from solution execution',
      'Prevents premature convergence on the wrong problem',
      'Standard framework used across global enterprise design teams'
    ],
    cons: [
      'Can be treated as a rigid linear waterfall if teams ignore feedback loops',
      'Requires strong facilitation to transition between divergent and convergent phases'
    ],
    toolsNeeded: ['Research repository', 'Journey mapping', 'Figma', 'User testing suite'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 55,
      analyticalVsCreative: 85
    }
  },
  {
    id: 'triz',
    name: 'TRIZ (Theory of Inventive Problem Solving)',
    shortName: 'TRIZ',
    origin: 'Genrich Altshuller & Soviet Navy Patent Office (1946–1985)',
    tagline: 'Resolve engineering and physical contradictions without compromise using 40 inventive principles.',
    category: 'innovation',
    complexity: 'Advanced',
    timeframe: '1–2 days',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Hard engineering bottlenecks where improving one parameter (e.g. speed) degrades another (e.g. weight or heat).',
    whenToAvoid: 'Social/interpersonal human disputes, subjective artistic aesthetics, or routine task scheduling.',
    summary: 'TRIZ is an algorithmic, systematic innovation methodology derived from the study of over 400,000 patents. It posits that all technical breakthroughs resolve contradictions (e.g., strength vs. weight) using universal inventive principles (Segmentation, Inversion, Cushioning, Prior Action, etc.).',
    steps: [
      {
        number: 1,
        title: 'Formulate the Specific Problem as a Contradiction',
        description: 'State the engineering conflict: "If I improve Parameter X (e.g. Strength), Parameter Y (e.g. Weight) gets worse."',
        actionableTip: 'Do not settle for a mediocre compromise trade-off; demand the resolution of both.'
      },
      {
        number: 2,
        title: 'Map to Standard 39 Engineering Parameters',
        description: 'Translate your domain terms into the standardized TRIZ parameter definitions.',
        actionableTip: 'Use standard parameters like Mass, Dimensions, Speed, Loss of Substance, Temperature.'
      },
      {
        number: 3,
        title: 'Look Up TRIZ Contradiction Matrix',
        description: 'Consult the matrix to uncover the 3-4 inventive principles that historically solved this exact conflict.',
        actionableTip: 'Review principles like #1 Segmentation, #10 Prior Action, #15 Dynamicity, #35 Parameter Changes.'
      },
      {
        number: 4,
        title: 'Translate Abstract Principle into Concrete Design',
        description: 'Apply the suggested inventive principle to your mechanical, chemical, or software system.',
        actionableTip: 'Aim for the "Ideal Final Result" (IFR) where the system performs the function with zero weight, cost, or energy.'
      }
    ],
    keyQuestions: [
      'What fundamental contradiction are we currently accepting as an unavoidable trade-off?',
      'How would nature or the 40 TRIZ principles resolve this contradiction?',
      'Can the function be delivered by an existing element in the system for free?'
    ],
    exampleUseCase: {
      title: 'Samsung Galaxy Chip Thermal Dissipation',
      scenario: 'Engineering high-performance smartphone CPU generated excessive heat, but adding heat sinks violated slim chassis limits.',
      application: 'Applied TRIZ Contradiction Matrix: Parameter to improve = Thermal Conductivity; Parameter worsening = Thickness/Weight. Suggested Principle #35 (Parameter Changes) and #2 (Taking Out). Implemented micro-vapor chamber heat pipes.',
      outcome: 'Reduced CPU throttling by 40% while preserving ultra-thin form factor; adopted across flagship smartphone line.'
    },
    pros: [
      'Eliminates the need for blind random trial-and-error brainstorming',
      'Directly resolves seemingly impossible physical and technical trade-offs',
      'Generated thousands of patented commercial breakthroughs at Samsung, Intel, and Boeing'
    ],
    cons: [
      'Steep learning curve and specialized terminology',
      'Less suited for pure marketing or social challenges'
    ],
    toolsNeeded: ['TRIZ Contradiction Matrix', '40 Inventive Principles Handbook', 'Patent database'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 78,
      analyticalVsCreative: 75
    }
  },
  {
    id: 'scamper',
    name: 'SCAMPER Ideation Method',
    shortName: 'SCAMPER',
    origin: 'Alex Osborn (Brainstorming pioneer) & Bob Eberle (1971)',
    tagline: 'Spark lateral innovations by applying 7 creative mutation prompts to existing products.',
    category: 'innovation',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Clear',
    bestFor: 'Rapid feature brainstorming, product refreshments, unblocking creative ruts, and sprint ideation.',
    whenToAvoid: 'Fixing complex, multi-root manufacturing defects or fatal security vulnerabilities.',
    summary: 'SCAMPER is an acronym-based creative thinking prompt technique: Substitute, Combine, Adapt, Modify/Magnify, Put to another use, Eliminate, and Reverse/Rearrange. It systematically mutates an existing solution into fresh alternatives.',
    steps: [
      {
        number: 1,
        title: 'Select the Focus Object or Process',
        description: 'Isolate the specific product, feature, or workflow you want to transform.',
        actionableTip: 'Keep the subject concrete (e.g. "Our weekly onboarding email sequence").'
      },
      {
        number: 2,
        title: 'Apply the 7 Mutation Prompts in Sequence',
        description: 'S - Substitute materials/steps; C - Combine with another tool; A - Adapt from another industry; M - Modify/Magnify features; P - Put to another use; E - Eliminate bloat; R - Reverse the flow.',
        actionableTip: 'Spend 5 focused minutes on each letter without judging viability.'
      },
      {
        number: 3,
        title: 'Harvest & Filter Novel Ideas',
        description: 'Review the list of generated mutations and select the top 2 high-impact, feasible candidates.',
        actionableTip: 'Combine crazy wild ideas with grounded technical execution.'
      }
    ],
    keyQuestions: [
      'What can we eliminate completely to make the experience 10x simpler?',
      'What feature from gaming or finance can we adapt into our workflow?',
      'What happens if we reverse the sequence of events entirely?'
    ],
    exampleUseCase: {
      title: 'Fast-Food Drive-Through Innovation (McDonald’s)',
      scenario: 'Speeding up service during peak breakfast and lunch rush hours.',
      application: 'Applied SCAMPER: Substitute (touchscreen kiosks for order takers), Combine (drive-through payment and pickup windows), Eliminate (printed menus with dynamic digital boards), Reverse (prepare food before orders arrive based on predictive AI).',
      outcome: 'Cut customer wait times by 28 seconds and boosted drive-through revenue.'
    },
    pros: [
      'Accessible, playful, and yields immediate results in under 45 minutes',
      'Provides structured prompts that cure "blank page" syndrome',
      'Great for solo creators and team workshops alike'
    ],
    cons: [
      'Iterates on existing concepts; rarely conceives entirely unprecedented paradigms from scratch',
      'Requires separate prioritization filter afterwards'
    ],
    toolsNeeded: ['SCAMPER Prompt Cards', 'Timer', 'Sticky notes'],
    interactiveCanvasType: 'scamper-board',
    plotCoordinates: {
      complexityScore: 22,
      analyticalVsCreative: 88
    }
  },
  {
    id: 'six-thinking-hats',
    name: 'Six Thinking Hats (Parallel Thinking)',
    shortName: 'Six Thinking Hats',
    origin: 'Edward de Bono (Lateral Thinking Pioneer, 1985)',
    tagline: 'Eliminate adversarial debate by having the whole team wear the same cognitive perspective simultaneously.',
    category: 'innovation',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'High-conflict committee meetings, controversial product decisions, and breaking executive stalemates.',
    whenToAvoid: 'Deep quantitative algorithmic debugging with a single software engineer.',
    summary: 'Created by Edward de Bono, Six Thinking Hats organizes group thinking into six distinct modes: White (Facts & Data), Red (Emotions & Intuition), Black (Critical Judgment & Risks), Yellow (Optimism & Value), Green (Creativity & Alternatives), and Blue (Process Control & Synthesis). The team wears one hat together at a time.',
    steps: [
      {
        number: 1,
        title: 'Blue Hat: Set Objectives and Sequence',
        description: 'Facilitator outlines the agenda, rules, and sequence of hats to be worn.',
        actionableTip: 'Keep time allocations tight (e.g. 5 mins for Red Hat, 10 mins for Black Hat).'
      },
      {
        number: 2,
        title: 'White & Red Hats: Facts followed by Gut Feelings',
        description: 'Examine hard verified data (White), then allow everyone to share raw emotional reactions without justification (Red).',
        actionableTip: 'Red Hat eliminates passive-aggressive political resistance early.'
      },
      {
        number: 3,
        title: 'Yellow & Green Hats: Potential Value & Creative Alternatives',
        description: 'Explore the upside, benefits, and novel ways to expand the concept.',
        actionableTip: 'Force cynics to wear Yellow Hat and contribute genuine optimism.'
      },
      {
        number: 4,
        title: 'Black Hat: Stress-Testing & Fatal Flaws',
        description: 'Subject the concept to ruthless risk analysis, legal scrutiny, and failure modes.',
        actionableTip: 'Black hat is crucial, but must be time-boxed so it does not smother creativity.'
      },
      {
        number: 5,
        title: 'Blue Hat: Synthesize & Agree on Next Action',
        description: 'Summarize consensus, document mitigations for Black Hat risks, and assign next steps.',
        actionableTip: 'Check if any unresolved intuition remains before closing.'
      }
    ],
    keyQuestions: [
      'Are we all wearing the same hat right now, or are people slipping into argument?',
      'What do the raw numbers say (White), and what does our gut feel (Red)?',
      'What are the strongest risks (Black), and what creative counter-ideas (Green) can solve them?'
    ],
    exampleUseCase: {
      title: 'Controversial Remote Work Policy Shift',
      scenario: 'Executive leadership was bitterly split over mandating a 3-day in-office return policy.',
      application: 'Conducted Six Hats workshop: White Hat verified commuter distance and productivity metrics. Red Hat surfaced burnout fears and team cohesion desires. Black Hat exposed attrition risk of senior engineers. Green Hat generated "Core Collaboration Weeks" with flexible off-site schedules.',
      outcome: 'Reached unanimous consensus within 90 minutes without toxic shouting matches.'
    },
    pros: [
      'Cuts meeting time in half by replacing ego-driven debate with parallel thinking',
      'Ensures critical risk evaluation (Black Hat) happens constructively',
      'Gives introverts equal psychological voice'
    ],
    cons: [
      'Requires an active, disciplined facilitator (Blue Hat)',
      'Can feel theatrical if participants resist adopting designated hats'
    ],
    toolsNeeded: ['Six colored hats / cards', 'Meeting timer', 'Shared notes doc'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 35,
      analyticalVsCreative: 65
    }
  },

  // --- 4. CONTINUOUS QUALITY & EXECUTION SYSTEMS ---
  {
    id: 'pdca',
    name: 'PDCA / PDSA Cycle (Deming Wheel)',
    shortName: 'PDCA Cycle',
    origin: 'Walter Shewhart & W. Edwards Deming (1939 / 1950s)',
    tagline: 'Iterative 4-stage management loop for continuous empirical quality improvement.',
    category: 'quality',
    complexity: 'Beginner',
    timeframe: '1–4 weeks',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Clear',
    bestFor: 'Continuous process optimization, standard work refinement, and testing operational incremental changes.',
    whenToAvoid: 'One-off radical paradigm disruptions or sudden crisis survival.',
    summary: 'The PDCA (Plan-Do-Check-Act or Plan-Do-Study-Act) cycle is an established iterative loop for the continuous improvement of processes and products. It embodies the scientific method applied to operational management.',
    steps: [
      {
        number: 1,
        title: 'Plan (Hypothesis & Baseline)',
        description: 'Define the target objective, understand current baseline metrics, and design a change with predicted outcomes.',
        actionableTip: 'State the hypothesis explicitly: "If we do X, metric Y will change by Z%."'
      },
      {
        number: 2,
        title: 'Do (Small-Scale Trial Execution)',
        description: 'Implement the planned change on a controlled, limited scope or single pilot shift.',
        actionableTip: 'Do not roll out organization-wide yet; maintain control variables.'
      },
      {
        number: 3,
        title: 'Check / Study (Analyze Results vs Prediction)',
        description: 'Gather performance data, compare actual outcome against the Plan hypothesis, and record discrepancies.',
        actionableTip: 'Celebrate learning from failures—Study is where real knowledge forms.'
      },
      {
        number: 4,
        title: 'Act / Standardize (Adopt, Adapt, or Abandon)',
        description: 'If successful, standardize the new procedure into permanent operating manuals; if unsuccessful, adapt or restart cycle.',
        actionableTip: 'Update standard operating procedures (SOPs) so gains do not backslide.'
      }
    ],
    keyQuestions: [
      'What specific numerical metric are we trying to shift, and what is the baseline?',
      'Can we test this on a small pilot group before risking the entire operation?',
      'Have we codified the winning process into permanent documentation?'
    ],
    exampleUseCase: {
      title: 'Customer Support Response Time Reduction',
      scenario: 'Tier-1 SaaS support tickets took an average of 4.2 hours to first response.',
      application: 'Plan: Hypothesis that auto-routing by customer tier would cut first response to < 1 hour. Do: Tested on APAC region for 2 weeks. Study: APAC response dropped to 48 minutes with no drop in CSAT. Act: Standardized routing logic across EMEA and Americas.',
      outcome: 'Global median first response plunged to 52 minutes company-wide.'
    },
    pros: [
      'Simple, scientific, and fosters an evolutionary continuous-improvement culture',
      'Minimizes operational risk via controlled pilot testing',
      'Ensures organizational learning is retained and standardized'
    ],
    cons: [
      'Can be slow if incremental steps are over-analyzed',
      'Tends to produce local optimization rather than global disruptions'
    ],
    toolsNeeded: ['Control charts', 'SOP documentation', 'Pilot test tracker'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 25,
      analyticalVsCreative: 30
    }
  },
  {
    id: 'dmaic',
    name: 'DMAIC (Six Sigma)',
    shortName: 'DMAIC (Six Sigma)',
    origin: 'Bill Smith & Bob Galvin (Motorola, 1986) / Jack Welch (GE)',
    tagline: 'Data-driven, 5-phase statistical framework to eliminate process variation and defects to 3.4 DPMO.',
    category: 'quality',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Established high-volume processes with excess variance, high scrap rates, or expensive operational waste.',
    whenToAvoid: 'Early-stage startup experiments, high-uncertainty creative projects, or where zero historical data exists.',
    summary: 'DMAIC (Define, Measure, Analyze, Improve, Control) is the premier data-driven quality strategy used to improve processes. It treats every problem mathematically as Y = f(X), using statistical tools to identify the critical input variables (Xs) controlling output performance (Y).',
    steps: [
      {
        number: 1,
        title: 'Define (Charter & Voice of Customer)',
        description: 'Draft the project charter, business case, problem statement, and Critical to Quality (CTQ) customer requirements.',
        actionableTip: 'Quantify financial impact: every DMAIC project must tie to bottom-line savings.'
      },
      {
        number: 2,
        title: 'Measure (Baseline Data & Process Capability)',
        description: 'Map the process (SIPOC), validate measurement system reliability (Gage R&R), and measure baseline capability (Cp, Cpk).',
        actionableTip: 'Ensure your sensors and metrics are accurate before trusting the numbers.'
      },
      {
        number: 3,
        title: 'Analyze (Root Cause Verification & Statistics)',
        description: 'Use regression, ANOVA, multi-vari charts, and hypothesis testing to mathematically isolate vital inputs (Xs).',
        actionableTip: 'Prove statistical significance with p-values < 0.05 rather than gut feel.'
      },
      {
        number: 4,
        title: 'Improve (Design of Experiments & Countermeasures)',
        description: 'Develop, pilot, and implement solutions that optimize the key process settings (DOE).',
        actionableTip: 'Run simulations or response surface experiments to dial in optimal parameters.'
      },
      {
        number: 5,
        title: 'Control (Standardization & Statistical Process Control)',
        description: 'Institute Statistical Process Control (SPC) run charts, poke-yoke error-proofing, and transition plan to process owner.',
        actionableTip: 'Set automated alarm thresholds so drifts are arrested immediately.'
      }
    ],
    keyQuestions: [
      'What is the mathematical equation Y = f(X) governing our process output?',
      'Is our measurement system capable and free of operator bias?',
      'Have we implemented Statistical Process Control to prevent regression to old habits?'
    ],
    exampleUseCase: {
      title: 'General Electric Aircraft Engine Turbine Blade Casting',
      scenario: 'Defect rate on high-pressure turbine blade casting was generating $8.5M in annual scrap.',
      application: 'DMAIC project: Defined blade porosity limits. Measured thermal gradients across molds. Analyzed data with ANOVA: found pouring temperature and vacuum seal vacuum rate were the primary drivers. Improved furnace induction PID loops. Controlled via automated SPC chart alarms.',
      outcome: 'Scrap rate plummeted by 73%, delivering $6.2M in annual recurring cost savings.'
    },
    pros: [
      'Unsurpassed statistical rigor and variance elimination',
      'Massive measurable financial savings in scaled operations',
      'Creates permanent, audited process stability'
    ],
    cons: [
      'Heavy statistical overhead; requires trained Green/Black Belts',
      'Can stifle speed in environments where fast iteration beats six-decimal precision'
    ],
    toolsNeeded: ['Minitab / Python SciPy', 'Process flow maps', 'Control charts', 'Measurement gauges'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 82,
      analyticalVsCreative: 12
    }
  },
  {
    id: 'eight-disciplines',
    name: '8D Problem Solving (Eight Disciplines)',
    shortName: '8D Problem Solving',
    origin: 'Ford Motor Company / US Department of Defense (1987)',
    tagline: 'Standard containment, root cause identification, and systemic recurrence prevention for critical customer escapes.',
    category: 'quality',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Major customer complaints, quality spills, automotive/aerospace supplier non-conformances, and safety audits.',
    whenToAvoid: 'Minor internal cosmetic bugs that can be squashed in 10 minutes.',
    summary: 'The 8D (Eight Disciplines) model is an exhaustive problem-solving methodology designed to find the root cause of a problem, devise short-term containment to protect the customer, implement long-term corrective actions, and prevent systemic recurrence.',
    steps: [
      {
        number: 1,
        title: 'D1 & D2: Form Team & Describe the Problem',
        description: 'Assemble cross-functional experts with a champion. Detail the problem using 5W2H (Who, What, Where, When, Why, How, How many).',
        actionableTip: 'Include frontline operators who handle the affected component daily.'
      },
      {
        number: 2,
        title: 'D3: Implement Immediate Interim Containment Action (ICA)',
        description: 'Protect the customer immediately! Quarantine suspicious stock, add 100% inspection, or deploy emergency rollback.',
        actionableTip: 'Containment stops customer bleeding within 24 hours while root cause investigation proceeds.'
      },
      {
        number: 3,
        title: 'D4: Identify and Verify Root Cause & Escape Point',
        description: 'Isolate root causes using Fishbone/5 Whys. Crucial: explain both why the defect occurred AND why the quality system let it escape undetected.',
        actionableTip: 'Never close D4 without explaining the failure of the detection control.'
      },
      {
        number: 4,
        title: 'D5 & D6: Choose and Verify Permanent Corrective Actions (PCA)',
        description: 'Select permanent engineering/procedural solutions that eliminate the root cause. Implement and test on production run.',
        actionableTip: 'Remove interim containment only after PCA is proven in active production.'
      },
      {
        number: 5,
        title: 'D7 & D8: Prevent Recurrence & Congratulate the Team',
        description: 'Update FMEAs, control plans, and corporate engineering standards. Recognize team members formally.',
        actionableTip: 'Audit sister production lines to eliminate identical vulnerabilities across other facilities.'
      }
    ],
    keyQuestions: [
      'Are customers 100% protected right now via containment while we investigate?',
      'Why did our internal inspection fail to catch this before it escaped to the customer?',
      'What systemic company standard or training module must be updated to prevent recurrence forever?'
    ],
    exampleUseCase: {
      title: 'Automotive Electric Power Steering Controller Recall',
      scenario: 'Tier-1 automotive supplier received urgent notification: steering assist cut out on 14 vehicles in extreme cold.',
      application: 'Deployed 8D: D3 contained all inventory at vehicle assembly plants within 18 hours. D4 diagnosed cold-temperature solder embrittlement on solder joint pin 4 under -30°C. D5 switched to high-ductility silver solder alloy. D7 updated global solder paste design standards across all product divisions.',
      outcome: 'Averted full federal safety recall; zero steering assist failures recorded in following 5 years.'
    },
    pros: [
      'Prioritizes immediate customer protection via containment before deep analysis',
      'Mandates finding both root cause AND the escape point breakdown',
      'Universally recognized in global supply chain contracts'
    ],
    cons: [
      'Documentation-heavy and demanding on cross-department resources',
      'Can feel bureaucratic if applied to minor internal tasks'
    ],
    toolsNeeded: ['8D Official Report Template', 'Containment tracking log', 'FMEA database'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 72,
      analyticalVsCreative: 20
    }
  },
  {
    id: 'a3-problem-solving',
    name: 'A3 Problem Solving (Toyota Management System)',
    shortName: 'A3 Canvas',
    origin: 'Toyota Motor Corporation / Taiichi Ohno (1960s)',
    tagline: 'Condense an entire complex problem, diagnosis, countermeasure, and execution plan onto a single A3 sheet.',
    category: 'quality',
    complexity: 'Intermediate',
    timeframe: '1–2 days',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Cross-department alignment, executive buy-in, operational bottleneck elimination, and structured consensus.',
    whenToAvoid: 'Flash emergency firefighting where you have 5 minutes to act.',
    summary: 'A3 Problem Solving is Toyota’s legendary one-page management tool based on the PDCA cycle. Because everything must fit onto a single sheet of A3 paper (11" x 17"), it forces practitioners to strip away corporate fluff, communicate with visual clarity, and foster nemawashi (consensus-building).',
    steps: [
      {
        number: 1,
        title: 'Theme & Background',
        description: 'State the problem concisely and explain why it matters to company strategic goals.',
        actionableTip: 'Hook the reader with business context in 2 clear sentences.'
      },
      {
        number: 2,
        title: 'Current Condition & Target State',
        description: 'Visually map what is happening right now using process maps, charts, and metrics. State the quantified target goal.',
        actionableTip: 'Use simple diagrams, graphs, and callout bubbles rather than dense paragraphs.'
      },
      {
        number: 3,
        title: 'Root Cause Analysis',
        description: 'Drill down using 5 Whys or Fishbone directly on the sheet to identify underlying breakdowns.',
        actionableTip: 'Ensure the link between root cause and the problem is visually obvious.'
      },
      {
        number: 4,
        title: 'Countermeasures & Implementation Plan',
        description: 'Specify the systemic solutions, Who does What by When (Gantt/table), and risk contingencies.',
        actionableTip: 'Address root causes directly with sustainable error-proofing.'
      },
      {
        number: 5,
        title: 'Effect Confirmation & Follow-up',
        description: 'Track post-implementation metrics against target state; schedule follow-up reflection audits.',
        actionableTip: 'Share the finished A3 with peers to cross-pollinate organizational knowledge.'
      }
    ],
    keyQuestions: [
      'Can an executive understand the entire problem, diagnosis, and plan in 3 minutes just by looking at this sheet?',
      'Does each proposed countermeasure tie directly to a proven root cause?',
      'Have all affected stakeholders reviewed and initialed the sheet (nemawashi)?'
    ],
    exampleUseCase: {
      title: 'Warehouse Order Picking Bottleneck',
      scenario: 'Distribution center missing next-day delivery SLA by 18% during peak season.',
      application: 'Operations manager drafted an A3 sheet: Visualized warehouse spaghetti diagram showing pickers walking 14 miles per shift. Root cause analysis revealed high-velocity items were shelved randomly across 4 levels. Proposed zoning reorganization.',
      outcome: 'Executive approved $15k reorganization in 10-minute review; average walking distance cut by 45%, SLA climbed to 99.4%.'
    },
    pros: [
      'Eliminates 50-page PowerPoint decks in favor of dense, visual clarity',
      'Forces disciplined storytelling and consensus across departments',
      'Directly links diagnosis to an accountable execution plan'
    ],
    cons: [
      'Takes practice to distill complex narratives into tight 1-page visual formats',
      'Requires leadership culture that respects conciseness'
    ],
    toolsNeeded: ['A3 Paper / Template', 'Process flow diagrams', 'Pencil and eraser'],
    interactiveCanvasType: 'a3-canvas',
    plotCoordinates: {
      complexityScore: 48,
      analyticalVsCreative: 40
    }
  },

  // --- 5. PRIORITIZATION & DECISION TRADE-OFFS ---
  {
    id: 'eisenhower-matrix',
    name: 'Eisenhower Decision Matrix (Urgent vs. Important)',
    shortName: 'Eisenhower Matrix',
    origin: 'Dwight D. Eisenhower (1954) / Stephen Covey (7 Habits, 1989)',
    tagline: 'Sort tasks into 4 quadrants to stop letting the loud Urgent crowd out the vital Important.',
    category: 'prioritization',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Clear',
    bestFor: 'Individual time management, executive burnout, task overload, and freeing strategic bandwidth.',
    whenToAvoid: 'Multifactor technical architectural trade-offs or complex customer research.',
    summary: 'The Eisenhower Matrix organizes tasks along two axes: Urgency (demands immediate attention) and Importance (contributes to long-term goals). It partitions work into 4 quadrants: Q1: Do First (Urgent & Important), Q2: Schedule / Deep Work (Not Urgent, but Important), Q3: Delegate / Automate (Urgent, Not Important), Q4: Eliminate (Neither).',
    steps: [
      {
        number: 1,
        title: 'Brainstorm the Entire Task Backlog',
        description: 'Dump every lingering project, fire, email obligation, and goal onto a raw list.',
        actionableTip: 'Do not censor during the dump; get everything out of your head.'
      },
      {
        number: 2,
        title: 'Classify into the 4 Quadrants',
        description: 'Assign each task objectively to Q1 (Do), Q2 (Schedule), Q3 (Delegate), or Q4 (Delete).',
        actionableTip: 'Be ruthless: most "emergencies" in your inbox are other people’s Q3 distractions.'
      },
      {
        number: 3,
        title: 'Protect Quadrant 2 Calendar Blocks',
        description: 'Schedule dedicated deep-work blocks for Q2 strategic initiatives before fires ignite.',
        actionableTip: 'High performance comes from spending 60%+ of your time in Q2.'
      },
      {
        number: 4,
        title: 'Purge Q4 and Delegate Q3',
        description: 'Delete time-wasting vanity projects and automate or delegate administrative tasks.',
        actionableTip: 'Politely say "no" to protect focus on high-leverage outcomes.'
      }
    ],
    keyQuestions: [
      'Am I confusing urgency with true long-term value?',
      'How many hours did I spend this week on proactive Quadrant 2 strategic growth?',
      'What can I eliminate today that nobody will actually miss?'
    ],
    exampleUseCase: {
      title: 'Engineering Director Burnout',
      scenario: 'Tech director working 75-hour weeks feeling exhausted while core platform migration stalled.',
      application: 'Applied Eisenhower Matrix: Realized 60% of week was spent in Q3 (attending meetings where presence wasn’t required, answering Slack fires). Delegated meeting attendance to tech leads, blocked mornings for Q2 architecture docs, deleted Q4 reporting syncs.',
      outcome: 'Work hours dropped to 45/week while platform migration completed 3 weeks ahead of schedule.'
    },
    pros: [
      'Instant psychological relief and mental clarity',
      'Protects vital proactive strategy from operational firefighting',
      'Can be applied in 15 minutes every Monday morning'
    ],
    cons: [
      'Solo tool; does not resolve cross-team resource dependencies on its own',
      'Subjective judgment on what is genuinely "important"'
    ],
    toolsNeeded: ['2x2 quadrant board', 'Calendar scheduling app'],
    interactiveCanvasType: 'eisenhower-board',
    plotCoordinates: {
      complexityScore: 10,
      analyticalVsCreative: 20
    }
  },
  {
    id: 'rice-scoring',
    name: 'RICE / ICE Prioritization Scoring',
    shortName: 'RICE Scoring',
    origin: 'Sean Ellis (Growth Hackers) & Intercom Product Team (2016)',
    tagline: 'Quantify roadmap debates with Reach, Impact, Confidence, and Effort formula scoring.',
    category: 'prioritization',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Clear',
    bestFor: 'Product roadmap feature prioritization, growth hacking experiments, and eliminating HIPPO bias.',
    whenToAvoid: 'Single existential emergency firefights where calculation delays survival.',
    summary: 'RICE is a standardized scoring model designed to help product managers evaluate project ideas objectively. RICE Score = (Reach × Impact × Confidence) / Effort. It penalizes speculative pet projects and elevates high-leverage, confident wins.',
    steps: [
      {
        number: 1,
        title: 'Estimate Reach (R)',
        description: 'How many customers will this initiative impact within a specific timeframe (e.g. users/month)?',
        actionableTip: 'Use verified analytics numbers, not wishful estimates.'
      },
      {
        number: 2,
        title: 'Estimate Impact (I)',
        description: 'Rate the effect on the target metric for each user: 3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal.',
        actionableTip: 'Tie impact to a single primary north-star KPI.'
      },
      {
        number: 3,
        title: 'Assess Confidence (C %)',
        description: 'How confident are you in your estimates? 100% = High evidence, 80% = Medium, 50% = Moonshot/Low evidence.',
        actionableTip: 'Confidence acts as a brake on inflated hype.'
      },
      {
        number: 4,
        title: 'Calculate Effort (E) & Rank by Score',
        description: 'Estimate total person-months/sprints required. Calculate: (Reach × Impact × Confidence) / Effort.',
        actionableTip: 'Sort descending to generate an objective backlog ranking.'
      }
    ],
    keyQuestions: [
      'What evidence justifies our Confidence percentage (interviews, prototype, or just intuition)?',
      'Is this feature a pet idea of an executive (HiPPO) with artificially deflated Effort estimates?',
      'What is the highest-scoring initiative with an Effort rating under 2 sprints?'
    ],
    exampleUseCase: {
      title: 'FinTech Mobile App Q4 Roadmap Prioritization',
      scenario: 'Product team had 24 candidate features but only engineering capacity for 4.',
      application: 'Scored all 24 using RICE. A flashy "Crypto Portfolio Tracker" had high Reach but low Confidence (50%) and massive Effort (8 person-months, score: 75). In contrast, "One-Tap Biometric Login" had Reach 20,000, Impact 2, Confidence 100%, Effort 1 month (score: 40,000).',
      outcome: 'Shipped Biometric Login first; app retention jumped 18% in the first month.'
    },
    pros: [
      'Democratizes decision-making and silences the Highest Paid Person’s Opinion (HiPPO)',
      'Forces teams to confront real engineering effort before committing',
      'Extremely quick and easily automated in spreadsheets'
    ],
    cons: [
      'Can be gamed by inflating Reach or deflating Effort estimates',
      'Assumes all features are modular and independent'
    ],
    toolsNeeded: ['Spreadsheet calculator', 'User analytics telemetry'],
    interactiveCanvasType: 'rice-calc',
    plotCoordinates: {
      complexityScore: 16,
      analyticalVsCreative: 15
    }
  },
  {
    id: 'minto-pyramid',
    name: 'The Minto Pyramid Principle & SCQA Model',
    shortName: 'Minto Pyramid & SCQA',
    origin: 'Barbara Minto (McKinsey & Company, 1973)',
    tagline: 'Structure thinking and communication top-down with Answer-First logic and the SCQA narrative hook.',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Complicated',
    bestFor: 'Executive briefings, board presentations, strategic business proposals, memo writing, and leadership alignment.',
    whenToAvoid: 'Exploratory creative free-writing, emotional therapy, or situations where the conclusion is genuinely unknown.',
    summary: 'The Minto Pyramid Principle is the premier structured communication and thinking framework pioneered at McKinsey. It mandates "Answer First" (BLUF - Bottom Line Up Front), where the core governing thought sits at the apex of a pyramid, supported downwards by MECE groupings of logical arguments. It opens with the SCQA storyline (Situation, Complication, Question, Answer) to hook stakeholder attention before laying out the supporting pillars.',
    steps: [
      {
        number: 1,
        title: 'Craft the SCQA Narrative Hook',
        description: 'Establish undisputed Situation, introduce the catalyst Complication, formulate the core Question, and state the governing Answer.',
        actionableTip: 'Ensure the Situation is factual and uncontroversial so all stakeholders start in total agreement.'
      },
      {
        number: 2,
        title: 'Define the Governing Thought (Apex)',
        description: 'State the core recommendation or conclusion in a single crisp, actionable sentence at the top of the pyramid.',
        actionableTip: 'Adopt BLUF (Bottom Line Up Front)—never hide the punchline at the end.'
      },
      {
        number: 3,
        title: 'Build the Supporting Pillars (Key Line)',
        description: 'Group 3 to 4 mutually exclusive, collectively exhaustive (MECE) arguments that explain "Why" or "How" the Answer is true.',
        actionableTip: 'Limit to 3-5 pillars; human working memory cannot retain more in an executive discussion.'
      },
      {
        number: 4,
        title: 'Substantiate with Evidentiary Data',
        description: 'Anchor each pillar with concrete empirical facts, metrics, historical precedents, and operational telemetry.',
        actionableTip: 'Use inductive groupings of facts or tight deductive syllogisms (Premise → Premise → Conclusion).'
      }
    ],
    keyQuestions: [
      'Did we deliver the core Answer within the first 30 seconds of the briefing?',
      'Is the Situation non-controversial and accepted by every stakeholder in the room?',
      'Are our supporting key-line pillars mutually exclusive and collectively exhaustive?',
      'Could an executive make a confident go/no-go decision reading only the top two tiers?'
    ],
    exampleUseCase: {
      title: 'Global Enterprise Cloud Infrastructure Modernization',
      scenario: 'VP of Engineering needed board sign-off for a $35M multi-cloud migration project over 18 months.',
      application: 'Structured pitch via SCQA: (S) Company operates 4 legacy on-premise datacenters. (C) Hardware lease renewal is due in 90 days with maintenance costs jumping 45%. (Q) How do we avoid cost escalations without service disruption? (A) Migrate core workloads to hybrid cloud. Supported by 3 MECE pillars: 1) Mitigate $16M in 3-year costs; 2) Accelerate feature deployment velocity 4x; 3) Meet global SOC2/GDPR compliance.',
      outcome: 'Board approved the $35M allocation in 20 minutes with zero digression.'
    },
    pros: [
      'Drastically reduces cognitive fatigue for executive decision-makers',
      'Forces deep intellectual rigor and logical clarity before presenting',
      'Instantly aligns disparate stakeholders around a shared narrative hook'
    ],
    cons: [
      'Requires strong conviction in the conclusion early on',
      'Can feel too abrupt for cultures that prioritize indirect inductive storytelling'
    ],
    toolsNeeded: ['Executive memo template', 'Pyramid logic canvas', 'SCQA worksheet'],
    interactiveCanvasType: 'minto-pyramid',
    plotCoordinates: {
      complexityScore: 42,
      analyticalVsCreative: 32
    }
  }
];

export const CATEGORY_METADATA: Record<Framework['category'], {
  name: string;
  badgeColor: string;
  accentBg: string;
  borderColor: string;
  description: string;
}> = {
  'root-cause': {
    name: 'Root Cause & Diagnostics',
    badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-800/60',
    accentBg: 'from-rose-500/10 via-rose-500/5 to-transparent',
    borderColor: 'border-rose-500/30',
    description: 'Pinpoint why things broke, eradicate recurrent bugs, and unearth underlying failure mechanics.'
  },
  'strategic': {
    name: 'Strategic & Sense-Making',
    badgeColor: 'text-indigo-400 bg-indigo-950/40 border-indigo-800/60',
    accentBg: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'border-indigo-500/30',
    description: 'Navigate market uncertainty, challenge assumptions, and structure high-stakes dilemmas.'
  },
  'innovation': {
    name: 'Human-Centered & Innovation',
    badgeColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
    accentBg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    borderColor: 'border-emerald-500/30',
    description: 'Empathize with users, spark lateral creative breakthroughs, and resolve engineering contradictions.'
  },
  'quality': {
    name: 'Continuous Quality & Systems',
    badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
    accentBg: 'from-amber-500/10 via-amber-500/5 to-transparent',
    borderColor: 'border-amber-500/30',
    description: 'Eliminate process variation, standardize flawless operations, and prevent customer escapes.'
  },
  'prioritization': {
    name: 'Prioritization & Trade-offs',
    badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60',
    accentBg: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'border-cyan-500/30',
    description: 'Rank backlogs objectively, cut vanity work, and maximize team execution leverage.'
  }
};
