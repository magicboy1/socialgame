# Design Guidelines: Children's Social Media Safety Educational Game

## Design Approach
**Reference-Based Approach**: Drawing from the provided reference image and modern educational game interfaces like Khan Academy Kids, ABCmouse, and Duolingo Kids. Focus on playful, safe, child-friendly aesthetics with clear visual hierarchy optimized for touchscreen interaction.

## Core Design Principles
- **Child-Centric Safety**: Large touch targets (minimum 80px), clear visual feedback, no complex interactions
- **Educational Clarity**: Single-focus screens with one primary task per view
- **Playful Learning**: Reward-based progression with encouraging visual feedback
- **Accessibility**: High contrast between interactive elements and backgrounds, simple iconography

## Typography System

**Primary Font**: Rounded sans-serif (e.g., Nunito, Poppins, Fredoka)
- Game Title: Bold, 48-56px
- Question/Scenario Text: Semi-bold, 24-28px
- Button Text: Bold, 20-24px
- Feedback Messages: Semi-bold, 32-36px

**Secondary Font**: Same family, medium weight for supporting text
- Score/Progress: 16-18px
- Mascot dialogue: 18-20px

All text should have generous line-height (1.6-1.8) for readability.

## Layout System

**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-8 to p-12
- Between elements: gap-6 to gap-8
- Screen edges: p-8 to p-12

**Grid Structure**: 
- Single-column centered layout (max-w-5xl)
- Full-screen viewport (100vh) with proper touch-safe areas
- Rounded container boxes with generous padding

## Component Library

### Game Screen Layout
**Top Bar** (h-24):
- Left: Mascot character illustration (w-20 h-20, rounded-full with border)
- Center: Score/star display with icon
- Right: Progress indicator (e.g., "Question 3/10")
- Spacing: justify-between items-center px-8

**Central Card Area**:
- Large rounded card (rounded-3xl) with soft shadow
- Padding: p-12
- Contains scenario illustration/image placeholder at top (h-48 to h-64)
- Question/tip text below with p-6
- Minimum height to prevent layout shift

**Choice Buttons Area** (bottom section):
- Grid of 2x2 or 4 horizontal buttons
- Each button: h-20 to h-24, rounded-2xl
- Gap between buttons: gap-6
- Full-width touch targets with clear affordance
- Icon + text layout within each button

### Mascot Integration
- Fixed position mascot in corner (w-32 h-32 to w-40 h-40)
- Appears with encouraging messages
- Speech bubble component (rounded-2xl, tail pointing to mascot)

### Feedback/Reward Screens
- Full-screen overlay with celebration graphics
- Large success/try-again message (text-5xl)
- Star rating or progress visualization
- Continue button (centered, extra large)

## Interactive Elements

**Button States**:
- Default: Soft shadow, clear borders
- Active/Pressed: Scale down (scale-95), deeper shadow
- Correct Answer: Success indicator animation
- Wrong Answer: Gentle shake animation

**Touch Feedback**:
- Immediate visual response on touch
- No hover states (touchscreen-only)
- Sound effects placeholders for interactions

## Animations
**Minimal, purposeful only**:
- Card entrance: Gentle slide-up fade-in
- Correct answer: Gentle bounce + checkmark appearance
- Wrong answer: Small shake (2-3px horizontal)
- Star rewards: Pop-in scale animation
- Transition between questions: Smooth fade

## Images

**Mascot Character**:
- Friendly superhero girl illustration
- PNG with transparency
- Consistent style throughout
- Placement: Top-left corner of each screen or floating near questions

**Scenario Illustrations**:
- Each question card includes a contextual illustration
- Simple, flat 2D style matching overall aesthetic
- Depicts social media scenarios (phone, computer, chat bubbles)
- Size: 300-400px width, aspect ratio 16:9 or 4:3
- Placement: Top of question card

**Background Elements**:
- Soft gradient backgrounds (full-screen)
- Optional decorative elements (stars, sparkles) as SVG icons
- No photography - all illustrated assets

## Responsive Considerations
**Primary Target**: Tablet landscape (1024x768 to 1366x1024)
- Optimize for 10-12 inch touchscreens
- All elements scale proportionally
- Mobile portrait: Stack buttons vertically, reduce card size
- Desktop: Center game area, add decorative side elements

## Success Metrics Integration
- Star counter (top-right): Large, colorful, animated on increment
- Progress bar: Thin, rounded, positioned below top bar
- Level/difficulty indicator: Small badge next to title

**Critical**: All touch targets meet minimum 80px size. Visual hierarchy guides children's attention from mascot → question → choices in natural reading flow.