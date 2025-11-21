import type { Question, InsertQuestion } from "@shared/schema";

export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
}

const seedQuestions: Question[] = [
  {
    id: 1,
    scenario: "إعطاء كلمة السر الخاصة بك لصديقك المفضل",
    tip: "❌ خطأ! لا تشارك كلمة المرور الخاصة بك مع أي شخص، حتى لو كان صديقك المقرب. احتفظ بها سرية وآمنة.",
    correctAnswer: false,
    category: "passwords",
  },
  {
    id: 2,
    scenario: "إخبار شخص غريب على الإنترنت بعنوان منزلك",
    tip: "❌ خطير جداً! لا تعطي أبداً عنوان منزلك أو رقم هاتفك أو اسم مدرستك لأي شخص غريب على الإنترنت!",
    correctAnswer: false,
    category: "strangers",
  },
  {
    id: 3,
    scenario: "طلب الإذن من والديك قبل نشر صورتك على الإنترنت",
    tip: "✅ صحيح تماماً! دائماً اطلب من شخص بالغ موثوق قبل نشر الصور على الإنترنت. يمكنهم مساعدتك في اتخاذ خيارات آمنة!",
    correctAnswer: true,
    category: "sharing",
  },
  {
    id: 4,
    scenario: "قبول طلب صداقة من شخص لا تعرفه في الحياة الحقيقية",
    tip: "❌ خطير! لا تقبل أبداً طلبات الصداقة من الغرباء! تواصل فقط مع الأشخاص الذين تعرفهم في الحياة الحقيقية.",
    correctAnswer: false,
    category: "strangers",
  },
  {
    id: 5,
    scenario: "جعل حسابك خاصاً باستخدام إعدادات الخصوصية",
    tip: "✅ ممتاز! استخدم دائماً إعدادات الخصوصية! اجعل ملفك الشخصي خاصاً حتى يتمكن الأشخاص الذين تعرفهم فقط من رؤية ما تشاركه.",
    correctAnswer: true,
    category: "privacy",
  },
  {
    id: 6,
    scenario: "إعطاء بريدك الإلكتروني لموقع يعدك بجائزة مجانية",
    tip: "❌ احذر! هذه خدعة! لا تعطي أبداً بريدك الإلكتروني أو معلوماتك الشخصية مقابل هدايا مجانية.",
    correctAnswer: false,
    category: "strangers",
  },
  {
    id: 7,
    scenario: "استخدام كلمة مرور صعبة فيها أحرف وأرقام ورموز",
    tip: "✅ رائع! كلمات المرور القوية التي تحتوي على أنواع مختلفة من الأحرف يصعب تخمينها. أحسنت صنعاً بالبقاء آمناً!",
    correctAnswer: true,
    category: "passwords",
  },
  {
    id: 8,
    scenario: "إخبار والديك إذا أرسل لك أحد رسالة سيئة على الإنترنت",
    tip: "✅ صحيح جداً! أخبر دائماً والديك أو معلمك أو شخصاً بالغاً موثوقاً إذا كان شخص ما لئيماً معك على الإنترنت. يمكنهم المساعدة!",
    correctAnswer: true,
    category: "strangers",
  },
  {
    id: 9,
    scenario: "نشر صورة أنت فيها وفي الخلفية اسم مدرستك واضح",
    tip: "❌ خطر! لا تشارك صوراً تُظهر مدرستك أو رقم منزلك أو معلومات أخرى عن مكان وجودك! الغرباء يمكن أن يعرفوا أين تذهب.",
    correctAnswer: false,
    category: "sharing",
  },
  {
    id: 10,
    scenario: "سؤال شخص كبير قبل الضغط على رابط أرسله لك شخص لا تعرفه",
    tip: "✅ ذكي جداً! اسأل دائماً شخصاً بالغاً قبل النقر على الروابط من أشخاص لا تعرفهم. الروابط يمكن أن تكون غير آمنة أو فيها فيروسات!",
    correctAnswer: true,
    category: "privacy",
  },
];

export class MemStorage implements IStorage {
  private questions: Map<number, Question>;

  constructor() {
    this.questions = new Map();
    
    seedQuestions.forEach((q) => {
      this.questions.set(q.id, q);
    });
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }
}

export const storage = new MemStorage();
