import { Framework, WizardResult } from '../types/framework';
import { FRAMEWORKS } from '../data/frameworks';
import { WIZARD_QUESTIONS } from '../data/wizardQuestions';

export function calculateRecommendation(answers: Record<string, string>): WizardResult {
  const scores: Record<string, number> = {};
  const penalties: Record<string, number> = {};

  FRAMEWORKS.forEach(fw => {
    scores[fw.id] = 0;
    penalties[fw.id] = 0;
  });

  // Calculate scores and penalties from answered questions
  WIZARD_QUESTIONS.forEach(question => {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) return;

    const option = question.options.find(opt => opt.id === selectedOptionId);
    if (!option) return;

    // Apply positive scores
    Object.entries(option.scores).forEach(([fwId, points]) => {
      if (scores[fwId] !== undefined) {
        scores[fwId] += points;
      }
    });

    // Apply penalties
    if (option.penalties) {
      Object.entries(option.penalties).forEach(([fwId, penaltyPoints]) => {
        if (penalties[fwId] !== undefined) {
          penalties[fwId] += penaltyPoints;
        }
      });
    }
  });

  // Calculate net score with maximum possible score normalization
  // With 6 questions and max ~10 points each, max theoretical score is ~55-60
  const maxPossible = 58;

  const rankedFrameworks = FRAMEWORKS.map(fw => {
    const rawScore = (scores[fw.id] || 0) - (penalties[fw.id] || 0) * 1.5;
    const clampedRaw = Math.max(5, rawScore);
    const normalizedPercent = Math.min(99, Math.max(35, Math.round((clampedRaw / maxPossible) * 100)));
    return {
      framework: fw,
      score: normalizedPercent,
      rawScore
    };
  }).sort((a, b) => b.score - a.score);

  const topMatch = rankedFrameworks[0];
  const topFramework = topMatch.framework;

  // Generate dynamic fit explanation
  const selectedNature = answers['nature'];
  const selectedComplexity = answers['complexity'];
  const selectedTime = answers['timeframe'];

  let matchReason = `Ranked #${1} with a ${topMatch.score}% affinity match. `;
  if (selectedTime === 'rapid-flash') {
    matchReason += `Perfect for your high-urgency timeline (< 1 hour) without bloated procedural overhead. `;
  } else if (selectedTime === 'deep-initiative') {
    matchReason += `Ideal for multi-week strategic rigor where permanent systemic resolution is paramount. `;
  }

  if (selectedComplexity === 'complex-emergent') {
    matchReason += `Embraces non-linear, experimental feedback loops rather than forcing rigid causal assumptions.`;
  } else if (selectedComplexity === 'chaotic-crisis') {
    matchReason += `Enables immediate tactical stabilization and rapid tempo under high uncertainty.`;
  } else if (selectedComplexity === 'complicated-expert') {
    matchReason += `Provides the deep diagnostic decomposition required for intricate technical problems.`;
  } else {
    matchReason += `Directly targets ${topFramework.bestFor.toLowerCase()}`;
  }

  // Runner-ups (next 2-3)
  const runnerUps = rankedFrameworks.slice(1, 4).map(item => {
    let fitReason = `Strong alternative (${item.score}% match) if you prefer `;
    if (item.framework.category !== topFramework.category) {
      fitReason += `a more ${item.framework.category.replace('-', ' ')} approach.`;
    } else {
      fitReason += `a method taking ${item.framework.timeframe} geared for ${item.framework.teamSize.toLowerCase()}.`;
    }
    return {
      framework: item.framework,
      score: item.score,
      fitReason
    };
  });

  // Frameworks to avoid (lowest scores or highest penalties)
  const avoidList = rankedFrameworks
    .slice(-3)
    .filter(item => (penalties[item.framework.id] || 0) > 4 || item.score < 45)
    .slice(0, 2)
    .map(item => {
      let reason = item.framework.whenToAvoid;
      if (penalties[item.framework.id] && penalties[item.framework.id] > 5) {
        reason = `High mismatch penalty: using this in your current context risks severe friction, unnecessary overhead, or wrong assumptions.`;
      }
      return {
        framework: item.framework,
        reason
      };
    });

  return {
    topFramework,
    topScore: topMatch.score,
    matchReason,
    runnerUps,
    avoidFrameworks: avoidList,
    userAnswers: answers
  };
}
