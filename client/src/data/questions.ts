import type { Question } from "@shared/schema";

export const questions: Question[] = [
  {
    id: 1,
    scenario: "صديقك المفضل طلب منك كلمة المرور الخاصة بحسابك. ماذا تفعل؟",
    choice1: "أعطيه كلمة المرور لأنه صديقي",
    choice2: "أقول له لا، كلمة المرور سرية",
    choice3: "أعطيه نصف كلمة المرور فقط",
    choice4: "أقول له سأفكر في الأمر لاحقاً",
    correctAnswer: 2,
    tip: "كلمة المرور مثل مفتاح بيتك - لا تعطيها لأحد أبداً، حتى لو كان أقرب صديق لك! احفظها سرية دائماً.",
    category: "passwords",
  },
  {
    id: 2,
    scenario: "شخص غريب على الإنترنت سألك عن عنوان منزلك. ماذا تفعل؟",
    choice1: "أخبره بعنوان منزلي",
    choice2: "أعطيه اسم المدينة فقط",
    choice3: "لا أخبره بأي شيء وأخبر والديّ",
    choice4: "أعطيه عنوان مزيف",
    correctAnswer: 3,
    tip: "عنوان بيتك معلومة سرية جداً. لا تعطيها أبداً لأي شخص غريب على الإنترنت وأخبر والديك فوراً!",
    category: "strangers",
  },
  {
    id: 3,
    scenario: "التقطت صورة جميلة وتريد نشرها على الإنترنت. ماذا تفعل؟",
    choice1: "أنشرها فوراً",
    choice2: "أطلب الإذن من والديّ أولاً",
    choice3: "أنشرها لكن أحذف وجهي منها",
    choice4: "أرسلها لأصدقائي فقط",
    correctAnswer: 2,
    tip: "دائماً اسأل والديك قبل نشر أي صورة. هم يساعدونك تبقى آمناً على الإنترنت!",
    category: "sharing",
  },
  {
    id: 4,
    scenario: "تريد حماية حسابك على السوشيال ميديا. ماذا تفعل؟",
    choice1: "أجعل حسابي عاماً ليراه الجميع",
    choice2: "أجعل حسابي خاصاً باستخدام إعدادات الخصوصية",
    choice3: "لا أفعل شيئاً",
    choice4: "أقبل كل طلبات الصداقة",
    correctAnswer: 2,
    tip: "إعدادات الخصوصية تحميك! خلي حسابك خاص عشان الغرباء ما يشوفوا صورك ومعلوماتك.",
    category: "privacy",
  },
  {
    id: 5,
    scenario: "أرسل لك أحد رسالة سيئة ومزعجة على الإنترنت. ماذا تفعل؟",
    choice1: "أرد عليه برسالة سيئة",
    choice2: "أتجاهل الرسالة",
    choice3: "أخبر والديّ أو معلمي فوراً",
    choice4: "أحذف الرسالة فقط",
    correctAnswer: 3,
    tip: "لو حد قال لك كلام وحش على النت، أهلك أو معلمك يقدروا يساعدوك ويحموك. لا تخاف تقول لهم!",
    category: "strangers",
  },
];

export function shuffleQuestions(): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function checkAnswer(questionId: number, selectedAnswer: number): {
  isCorrect: boolean;
  tip: string;
} {
  const question = questions.find(q => q.id === questionId);
  if (!question) {
    return {
      isCorrect: false,
      tip: "السؤال غير موجود!",
    };
  }

  return {
    isCorrect: selectedAnswer === question.correctAnswer,
    tip: question.tip,
  };
}
