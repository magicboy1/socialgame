import type { Question, InsertQuestion } from "@shared/schema";

export interface IStorage {
  getAllQuestions(): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
}

const seedQuestions: Question[] = [
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
    scenario: "طلب صداقة من شخص لا تعرفه في الحياة الحقيقية. ماذا تفعل؟",
    choice1: "أقبل الطلب لأنه يبدو لطيفاً",
    choice2: "أرفض الطلب",
    choice3: "أسأله أسئلة أولاً",
    choice4: "أقبله لكن لا أتحدث معه",
    correctAnswer: 2,
    tip: "الأشخاص على الإنترنت ليسوا دائماً من يقولون أنهم هم. قبول صداقة الغرباء خطر كبير!",
    category: "strangers",
  },
  {
    id: 5,
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
    id: 6,
    scenario: "موقع يعدك بجائزة مجانية ويطلب بريدك الإلكتروني. ماذا تفعل؟",
    choice1: "أعطيه بريدي الإلكتروني بسرعة",
    choice2: "أعطيه بريد إلكتروني مزيف",
    choice3: "لا أعطيه أي شيء وأخبر والديّ",
    choice4: "أعطيه رقم هاتف بدلاً من البريد",
    correctAnswer: 3,
    tip: "المواقع اللي تعدك بجوائز مجانية غالباً كذب وخدعة. لا تعطي معلوماتك أبداً لأي موقع مشكوك فيه!",
    category: "strangers",
  },
  {
    id: 7,
    scenario: "تريد إنشاء كلمة مرور جديدة. أي واحدة أفضل؟",
    choice1: "123456",
    choice2: "اسمك وتاريخ ميلادك",
    choice3: "كلمة مرور فيها أحرف وأرقام ورموز",
    choice4: "نفس كلمة مرور كل أصدقائك",
    correctAnswer: 3,
    tip: "كلمات المرور القوية صعب جداً على الناس السيئة أنها تخمنها. استخدم حروف وأرقام ورموز دائماً!",
    category: "passwords",
  },
  {
    id: 8,
    scenario: "أرسل لك أحد رسالة سيئة ومزعجة على الإنترنت. ماذا تفعل؟",
    choice1: "أرد عليه برسالة سيئة",
    choice2: "أتجاهل الرسالة",
    choice3: "أخبر والديّ أو معلمي فوراً",
    choice4: "أحذف الرسالة فقط",
    correctAnswer: 3,
    tip: "لو حد قال لك كلام وحش على النت، أهلك أو معلمك يقدروا يساعدوك ويحموك. لا تخاف تقول لهم!",
    category: "strangers",
  },
  {
    id: 9,
    scenario: "التقطت صورة في المدرسة واسم مدرستك واضح في الخلفية. ماذا تفعل؟",
    choice1: "أنشر الصورة كما هي",
    choice2: "لا أنشر الصورة لأن فيها معلومات خطيرة",
    choice3: "أنشرها لكن أكتب اسم مدرسة أخرى",
    choice4: "أنشرها لأصدقائي المقربين فقط",
    correctAnswer: 2,
    tip: "الصور اللي فيها اسم مدرستك أو أماكن تروحها تخلي الغرباء يعرفوا فين يلاقوك. دي معلومات خطيرة جداً!",
    category: "sharing",
  },
  {
    id: 10,
    scenario: "أرسل لك شخص لا تعرفه رابطاً وقال اضغط عليه. ماذا تفعل؟",
    choice1: "أضغط على الرابط لأرى ما فيه",
    choice2: "أسأل شخصاً كبيراً قبل الضغط عليه",
    choice3: "أرسل الرابط لأصدقائي",
    choice4: "أضغط عليه لكن بسرعة",
    correctAnswer: 2,
    tip: "الروابط من ناس مش عارفهم ممكن تكون فيها فيروسات أو حاجات خطيرة. دايماً اسأل شخص كبير الأول!",
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
