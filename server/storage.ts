import type { Question, InsertQuestion } from "@shared/schema";

export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
}

const seedQuestions: Question[] = [
  {
    id: 1,
    scenario: "لا تشارك المرور مع أي أحد",
    tip: "لا تشارك كلمة المرور الخاصة بك مع أي شخص، حتى لو كان صديقك المقرب. احتفظ بها سرية وآمنة.",
    correctAnswer: true,
    category: "passwords",
  },
  {
    id: 2,
    scenario: "شخص غريب يطلب منك عنوانك",
    tip: "لا تعطي أبداً عنوان منزلك أو رقم هاتفك أو اسم مدرستك لأي شخص على الإنترنت!",
    correctAnswer: false,
    category: "strangers",
  },
  {
    id: 3,
    scenario: "اسأل والديك قبل نشر صورة",
    tip: "دائماً اطلب من شخص بالغ موثوق قبل نشر الصور على الإنترنت. يمكنهم مساعدتك في اتخاذ خيارات آمنة!",
    correctAnswer: true,
    category: "sharing",
  },
  {
    id: 4,
    scenario: "قبول طلب صداقة من شخص لا تعرفه",
    tip: "لا تقبل أبداً طلبات الصداقة من الغرباء! تواصل فقط مع الأشخاص الذين تعرفهم في الحياة الحقيقية.",
    correctAnswer: false,
    category: "strangers",
  },
  {
    id: 5,
    scenario: "استخدام إعدادات الخصوصية على حسابك",
    tip: "استخدم دائماً إعدادات الخصوصية! اجعل ملفك الشخصي خاصاً حتى يتمكن الأشخاص الذين تعرفهم فقط من رؤية ما تشاركه.",
    correctAnswer: true,
    category: "privacy",
  },
  {
    id: 6,
    scenario: "شخص يعدك بهدية مجانية مقابل بريدك الإلكتروني",
    tip: "لا تعطي أبداً بريدك الإلكتروني أو معلوماتك الشخصية مقابل هدايا مجانية. قد يكون هذا خدعة!",
    correctAnswer: false,
    category: "strangers",
  },
  {
    id: 7,
    scenario: "استخدام كلمة مرور قوية بأحرف وأرقام ورموز",
    tip: "كلمات المرور القوية التي تحتوي على أنواع مختلفة من الأحرف يصعب تخمينها. أحسنت صنعاً بالبقاء آمناً!",
    correctAnswer: true,
    category: "passwords",
  },
  {
    id: 8,
    scenario: "إخبار شخص بالغ موثوق إذا قال لك أحد أشياء سيئة على الإنترنت",
    tip: "أخبر دائماً والديك أو معلمك أو شخصاً بالغاً موثوقاً إذا كان شخص ما لئيماً معك على الإنترنت. يمكنهم المساعدة!",
    correctAnswer: true,
    category: "strangers",
  },
  {
    id: 9,
    scenario: "نشر صورة تظهر اسم مدرستك في الخلفية",
    tip: "لا تشارك صوراً تُظهر مدرستك أو رقم منزلك أو معلومات أخرى عن مكان وجودك!",
    correctAnswer: false,
    category: "sharing",
  },
  {
    id: 10,
    scenario: "سؤال شخص بالغ قبل النقر على رابط أرسله لك شخص ما",
    tip: "اسأل دائماً شخصاً بالغاً قبل النقر على الروابط من أشخاص لا تعرفهم. الروابط يمكن أن تكون غير آمنة!",
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
