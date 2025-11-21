# مواصفات واجهة المستخدم - لعبة LITTLE SISTER - XO Game

## 📋 نظرة عامة

لعبة تيك-تاك-تو (XO) تفاعلية للأطفال (6-12 سنة) بواجهة عربية (RTL) وتصميم مسطح مستوحى من أكشاك الألعاب (Booth-Inspired Flat Design).

---

## 🎨 لوحة الألوان الأساسية

### الألوان الرئيسية:
```css
--teal: #48A079         /* تركواز - الخلفية الرئيسية */
--navy: #2C3A52         /* كحلي داكن - الحدود الأساسية */
--orange-red: #F46A4E   /* برتقالي-أحمر - التأكيدات والظلال */
--yellow: #E5F26B       /* أصفر ليموني - الظلال والتحديدات */
--white: #FFFFFF        /* أبيض - الخلفيات والبطاقات */
--black: #000000        /* أسود - الحدود الخارجية */
--dark-text: #2D3748    /* نص غامق */
--shadow: rgba(0, 0, 0, 0.2)  /* ظلال */
```

### استخدام الألوان:
- **الخلفية العامة**: Teal (#48A079)
- **البطاقات والخلايا**: White (#FFFFFF)
- **الحدود الرئيسية**: Navy (#2C3A52) بسمك 8-10px
- **الحدود الثانوية**: Yellow (#E5F26B) بسمك 4px
- **الظلال**: Orange-Red (#F46A4E)
- **التحديدات المختارة**: Yellow (#E5F26B) كخلفية

---

## 🔤 الخطوط (Typography)

### الخطوط المستخدمة:
```css
font-family: 'Baloo Bhaijaan 2', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### مصادر الخطوط:
- **Baloo Bhaijaan 2**: خط عربي سلس ومناسب للأطفال (من Google Fonts)
  - أوزان: 400, 500, 600, 700, 800
- **Inter**: خط إنجليزي احتياطي
  - أوزان: 400, 500, 600, 700, 800

### أحجام النصوص (Responsive):
- **العناوين الرئيسية**: `clamp(2rem, 6vw, 3.5rem)` - وزن 800
- **أسماء الشخصيات**: `clamp(1.1rem, 3vw, 1.6rem)` - وزن 800
- **الأزرار**: `clamp(0.9rem, 2vw, 1.2rem)` - وزن 800
- **مؤشر اللاعب**: `clamp(1rem, 2.5vw, 1.4rem)` - وزن 800
- **رسائل الحالة**: `clamp(1.1rem, 3vw, 1.7rem)` - وزن 800
- **أيقونات الخلايا**: `clamp(3rem, 12vw, 5rem)`
- **أيقونات الشخصيات**: `clamp(3.5rem, 10vw, 6rem)`

### ظلال النصوص:
```css
text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
```

---

## 🎴 الشخصيات (Characters)

### الشخصيات المتاحة (5 شخصيات):

| اسم الشخصية | الاسم العربي | اسم الملف | الوصف |
|-------------|--------------|-----------|--------|
| wisal | وصال | girl.png | فتاة |
| dhaki | ذكي | robot.png | روبوت |
| sahaba | سحابة | sahaba.png | فتاة برتقالي |
| salama | سلامة | salama.png | ولد أخضر |
| aman | أمان | aman.png | ولد أزرق |

### مواصفات بطاقات الشخصيات:

```css
.character-card {
  width: clamp(160px, 22vw, 200px);
  height: clamp(180px, 26vw, 230px);
  aspect-ratio: 0.85;
  background: white;
  border: 8px solid navy;
  border-radius: 15px;
  box-shadow: 0 6px 0px orange-red;
}

.character-card::before {
  /* حد داخلي أصفر */
  border: 4px solid yellow;
  inset: -4px;
  border-radius: 19px;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 0px orange-red;
}

.character-card.selected {
  border-color: orange-red;
  background: yellow;
  box-shadow: 0 6px 0px navy;
  transform: scale(1.03);
}
```

### أحجام أيقونات الشخصيات:
- **في البطاقة**: `clamp(90px, 16vw, 130px)`
- **في الهيدر**: `clamp(35px, 6vw, 50px)`

---

## 🎮 لوحة اللعب (Game Board)

### التصميم الثلاثي الطبقات (Triple-Layered Border):

```css
.game-board {
  max-width: min(95vw, 650px);
  padding: clamp(25px, 5vw, 35px);
  background: white;
  border: 10px solid black;              /* الطبقة 1: حد أسود */
  box-shadow: 
    0 8px 0px yellow,                    /* ظل أصفر */
    0 0 0 14px orange-red,               /* الطبقة 2: حد برتقالي-أحمر */
    0 0 0 18px navy;                     /* الطبقة 3: حد كحلي */
  border-radius: 0;                      /* حواف مربعة */
}
```

### شبكة اللعب:
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: clamp(15px, 3vw, 20px);
```

### الخلايا (Cells):

```css
.game-cell {
  aspect-ratio: 1;
  background: white;
  border: 3px solid teal;
  border-radius: 8px;
  min-height: 60px;
}

.game-cell.clickable:hover {
  background: yellow;
  transform: scale(1.05);
  border-color: orange-red;
}

.cell-icon {
  width: 85%;
  height: 85%;
}
```

---

## 🎛️ الأزرار (Buttons)

### أزرار الهيدر والتحكم:

```css
.header-button {
  background: white;
  color: dark-text;
  border: 3px solid navy;
  padding: clamp(6px, 1vw, 10px) clamp(10px, 1.5vw, 14px);
  border-radius: 8px;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 800;
  box-shadow: 0 3px 0px yellow;
}

.header-button:hover {
  background: yellow;
  transform: translateY(-2px);
  box-shadow: 0 5px 0px orange-red;
}

.header-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 0px yellow;
}
```

### أزرار الوضع والصعوبة:

```css
.mode-button, .difficulty-button {
  width: clamp(240px, 80vw, 450px);
  padding: clamp(25px, 5vw, 35px) clamp(30px, 6vw, 45px);
  background: white;
  border: 8px solid navy;
  border-radius: 0;
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 800;
  box-shadow: 0 8px 0px orange-red;
}

/* حد داخلي أصفر */
::before {
  border: 5px solid yellow;
  inset: -6px;
}

:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 0px orange-red;
  background: yellow;
}

:active {
  transform: translateY(-2px);
  box-shadow: 0 6px 0px orange-red;
}
```

---

## 📱 الهيدر (Game Header)

### التصميم:

```css
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(10px, 2vw, 16px) clamp(15px, 3vw, 25px);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  gap: clamp(10px, 2vw, 20px);
}
```

### مؤشر اللاعب:

```css
.player-indicator {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.5vw, 10px);
  background: white;
  padding: clamp(6px, 1vw, 10px) clamp(10px, 1.5vw, 14px);
  border-radius: 8px;
  border: 3px solid navy;
  box-shadow: 0 3px 0px yellow;
}
```

### رسالة الحالة:

```css
.status-message {
  font-size: clamp(1.1rem, 3vw, 1.7rem);
  font-weight: 800;
  color: white;
  text-align: center;
  flex: 1;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
}
```

---

## ✨ الحركات (Animations)

### العناوين:
```css
@keyframes titleBounceIn {
  0% {
    transform: scale(0) translateY(-50px);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) translateY(10px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
animation: titleBounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### بطاقات الشخصيات:
```css
@keyframes cardSlideIn {
  /* مماثلة لـ titleBounceIn */
}
animation: cardSlideIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
animation-delay: calc(0.2s + index * 0.1s);
```

### خلايا اللعب:
```css
@keyframes cellPopIn {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.15) rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
animation: cellPopIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### الأيقونات داخل الخلايا:
```css
@keyframes popIn {
  0% {
    transform: scale(0) rotate(-10deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
animation: popIn 0.4s ease;
```

### الهيدر:
```css
@keyframes headerSlideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
animation: headerSlideDown 0.6s ease;
```

---

## 🔊 الأصوات (Audio)

### الملفات الصوتية المتاحة:

| الملف | الحجم | الاستخدام |
|-------|-------|-----------|
| `hit.mp3` | 1.2 KB | صوت النقر على الأزرار والخلايا |
| `success.mp3` | 12 KB | صوت الفوز والنجاح |
| `background.mp3` | 854 KB | موسيقى خلفية |

### المسارات:
```
client/public/sounds/hit.mp3
client/public/sounds/success.mp3
client/public/sounds/background.mp3
```

### الاستخدام:
- **النقر**: عند الضغط على أي زر أو خلية
- **النجاح**: عند الفوز باللعبة
- **الخلفية**: موسيقى متواصلة (اختيارية)

---

## 📐 المقاسات والتباعد (Spacing & Sizing)

### نظام clamp للاستجابة:
اللعبة تستخدم نظام `clamp(min, preferred, max)` لجعل جميع العناصر مستجيبة:

```css
/* أمثلة */
padding: clamp(25px, 5vw, 35px);
width: clamp(160px, 22vw, 200px);
font-size: clamp(1rem, 2.5vw, 1.4rem);
gap: clamp(15px, 3vw, 20px);
```

### الفجوات (Gaps):
- بطاقات الشخصيات: `clamp(1rem, 3vw, 2rem)`
- خلايا اللعب: `clamp(15px, 3vw, 20px)`
- عناصر الهيدر: `clamp(10px, 2vw, 20px)`
- أزرار الهيدر: `clamp(8px, 1.5vw, 12px)`

### الحدود (Borders):
- **سميكة (Thick)**: 8-10px للعناصر الرئيسية
- **متوسطة (Medium)**: 3-5px للعناصر الثانوية
- **داخلية (Inner)**: 4px للحدود المزدوجة

### الظلال (Shadows):
- **قياسية**: `0 6px 0px color`
- **مرفوعة (Hover)**: `0 10px 0px color`
- **منخفضة (Active)**: `0 2px 0px color`

---

## 🎭 حالات التفاعل (Interaction States)

### الأزرار:
1. **Default**: حد كحلي، ظل أصفر، خلفية بيضاء
2. **Hover**: خلفية صفراء، رفع `-2px` إلى `-5px`، ظل برتقالي
3. **Active**: رجوع للوضع الطبيعي مع ظل مخفض
4. **Selected**: حد برتقالي، خلفية صفراء، ظل كحلي

### الخلايا:
1. **Empty**: بيضاء، حد تركواز
2. **Hover**: خلفية صفراء، حد برتقالي، تكبير `scale(1.05)`
3. **Filled**: تثبيت، عدم السماح بالنقر
4. **Winner**: (يمكن إضافة تأثيرات خاصة)

---

## 🌐 الاتجاه (Direction)

### RTL (من اليمين لليسار):
جميع الشاشات تستخدم:
```html
dir="rtl"
```

### التطبيق:
- شاشة اختيار الوضع
- شاشة اختيار الصعوبة
- شاشة اختيار الشخصية
- الهيدر
- رسائل اللعبة
- شاشة انتهاء اللعبة

---

## 📱 الاستجابة (Responsiveness)

### نقاط التحول (Breakpoints):
اللعبة تستخدم نظام مرن دون نقاط تحول صارمة، بل تعتمد على:

1. **الوحدات النسبية**: `vw`, `vh`, `%`
2. **Clamp**: للتحكم في الحدود الدنيا والقصوى
3. **Flexbox & Grid**: للترتيب التلقائي
4. **aspect-ratio**: للحفاظ على النسب

### الحد الأقصى للعرض:
```css
max-width: min(95vw, 650px);  /* للوحة اللعب */
max-width: 800px;             /* لبطاقات الشخصيات */
width: clamp(240px, 80vw, 450px);  /* للأزرار */
```

---

## 🎯 التفاصيل الإضافية

### Backdrop Filter:
```css
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.15);
```

### Border Radius:
- **مربع تماماً**: `border-radius: 0` (اللوحة الرئيسية)
- **زوايا دائرية**: `border-radius: 8px` (الأزرار الصغيرة)
- **زوايا متوسطة**: `border-radius: 15px` (بطاقات الشخصيات)

### Transitions:
```css
transition: all 0.2s ease;
```

### Z-Index Layers:
- **لوحة اللعب**: `z-index: 10`
- **الهيدر**: `z-index: 10`
- **Game Over Overlay**: `z-index: 100`
- **Confetti**: (أعلى طبقة)

---

## 🎨 فلسفة التصميم

### مبادئ التصميم:
1. **Flat Design**: تصميم مسطح دون تدرجات معقدة
2. **Bold Borders**: حدود سميكة وواضحة (8-10px)
3. **Triple Layers**: حدود ثلاثية الطبقات للعناصر الرئيسية
4. **Bright Colors**: ألوان زاهية ومبهجة للأطفال
5. **Smooth Animations**: حركات سلسة وممتعة
6. **Responsive Everything**: كل شيء يتكيف مع حجم الشاشة

### الأولوية:
- **الوضوح**: كل عنصر واضح ومقروء
- **السهولة**: واجهة بسيطة للأطفال
- **المرح**: ألوان وحركات جذابة
- **العربية**: دعم كامل للغة العربية والاتجاه RTL

---

## 📦 الملفات المهمة

```
client/src/index.css              # جميع الأنماط
client/src/components/GameUI.tsx  # واجهة اللعب
client/src/components/CharacterSelection.tsx  # اختيار الشخصيات
client/src/components/GameBoard.tsx           # لوحة اللعب
client/public/characters/         # صور الشخصيات
client/public/sounds/             # الأصوات
```

---

## 🚀 ملاحظات التطوير

### Progressive Web App (PWA):
- دعم العمل دون اتصال بالإنترنت
- إمكانية التثبيت على الجهاز
- Service Worker متاح في `client/public/sw.js`

### التوافقية:
- يعمل على جميع المتصفحات الحديثة
- متوافق مع الشاشات الصغيرة (الهواتف) والكبيرة (الأجهزة اللوحية وسطح المكتب)

---

**آخر تحديث**: نوفمبر 2025  
**الإصدار**: 1.0  
**اللغة**: العربية (RTL)
