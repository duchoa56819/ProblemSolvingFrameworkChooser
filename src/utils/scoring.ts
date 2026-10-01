import { WizardResult } from '../types/framework';
import { FRAMEWORKS } from '../data/frameworks';
import { FRAMEWORKS_VI } from '../data/frameworksVi';
import { WIZARD_QUESTIONS } from '../data/wizardQuestions';
import { Language } from '../i18n/types';

export function calculateRecommendation(answers: Record<string, string>, lang: Language = 'vi'): WizardResult {
  const scores: Record<string, number> = {};
  const penalties: Record<string, number> = {};
  const activeFrameworks = lang === 'vi' ? FRAMEWORKS_VI : FRAMEWORKS;

  activeFrameworks.forEach(fw => {
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
  const maxPossible = 58;

  const rankedFrameworks = activeFrameworks.map(fw => {
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
  const selectedComplexity = answers['complexity'];
  const selectedTime = answers['timeframe'];

  let matchReason = '';
  if (lang === 'vi') {
    matchReason = `Xếp hạng #1 với độ tương thích ${topMatch.score}%. `;
    if (selectedTime === 'rapid-flash') {
      matchReason += `Rất phù hợp cho khung thời gian khẩn cấp (< 1 giờ) của bạn mà không tốn công sức quy trình rườm rà. `;
    } else if (selectedTime === 'deep-initiative') {
      matchReason += `Lý tưởng cho sáng kiến chiến lược nhiều tuần đòi hỏi độ chặt chẽ và giải quyết triệt để mang tính hệ thống. `;
    }

    if (selectedComplexity === 'complex-emergent') {
      matchReason += `Tận dụng các vòng lặp phản hồi thử nghiệm thay vì gượng ép các giả định nhân quả cứng nhắc.`;
    } else if (selectedComplexity === 'chaotic-crisis') {
      matchReason += `Cho phép ổn định tình hình ngay lập tức và tạo nhịp độ tác chiến nhanh trong khủng hoảng.`;
    } else if (selectedComplexity === 'complicated-expert') {
      matchReason += `Cung cấp khả năng phân rã chẩn đoán sâu cần thiết cho các vấn đề kỹ thuật phức tạp.`;
    } else {
      matchReason += `Nhắm thẳng vào ${topFramework.bestFor.toLowerCase()}`;
    }
  } else {
    matchReason = `Ranked #1 with a ${topMatch.score}% affinity match. `;
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
  }

  // Runner-ups (next 2-3)
  const runnerUps = rankedFrameworks.slice(1, 4).map(item => {
    let fitReason = '';
    if (lang === 'vi') {
      fitReason = `Lựa chọn thay thế mạnh mẽ (tương thích ${item.score}%) nếu bạn ưu tiên một phương pháp thực hiện trong ${item.framework.timeframe} dành cho ${item.framework.teamSize.toLowerCase()}.`;
    } else {
      fitReason = `Strong alternative (${item.score}% match) if you prefer a method taking ${item.framework.timeframe} geared for ${item.framework.teamSize.toLowerCase()}.`;
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
        reason = lang === 'vi'
          ? `Nguy cơ xung đột cao: áp dụng phương pháp này trong bối cảnh hiện tại sẽ lãng phí nguồn lực hoặc đưa ra giả định sai lầm.`
          : `High mismatch penalty: using this in your current context risks severe friction, unnecessary overhead, or wrong assumptions.`;
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
