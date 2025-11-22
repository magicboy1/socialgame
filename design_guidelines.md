# Design Guidelines: Game Show Style Quiz - "من سيربح المليون" Aesthetic

## Design Philosophy
**Game Show Inspiration**: Drawing heavily from "Who Wants to Be a Millionaire" - dramatic, sophisticated, and engaging. Dark, rich backgrounds with dramatic lighting, metallic gold accents, and a sense of high stakes and excitement.

## Core Design Principles
- **Dramatic Presentation**: Dark backgrounds with spotlight effects and dramatic gradients
- **High Stakes Feel**: Build tension through lighting, colors, and transitions
- **Clear Hierarchy**: Question dominates the screen, choices are prominent and easy to tap
- **Luxurious Aesthetic**: Gold, bronze, and deep blue/purple tones for sophistication
- **Child-Safe Arabic Design**: All text in Arabic with RTL support, but with adult-level polish

## Color Palette

### Primary Colors (Game Show Theme)
- **Deep Background**: Dark navy blue to deep purple gradients `hsl(230, 35%, 7%)` to `hsl(260, 40%, 12%)`
- **Spotlight Gold**: Bright metallic gold `hsl(45, 100%, 55%)`
- **Bronze Accents**: Rich bronze for borders `hsl(30, 45%, 45%)`
- **Correct Answer**: Bright emerald green `hsl(145, 65%, 45%)`
- **Wrong Answer**: Deep dramatic red `hsl(0, 75%, 45%)`

### Accent Colors
- **Text Primary**: Crisp white with subtle glow `hsl(0, 0%, 98%)`
- **Text Secondary**: Light gold `hsl(45, 80%, 75%)`
- **Highlight/Glow**: Bright cyan-blue for spotlights `hsl(195, 100%, 65%)`
- **Card Background**: Dark semi-transparent `rgba(20, 25, 45, 0.85)`

## Typography System

**Primary Font**: 'Baloo Bhaijaan 2' (already installed, Arabic-friendly, rounded but professional)

- **Game Title**: Extra Bold, 48-64px, gold color with text shadow
- **Question Text**: Bold, 24-32px, white with subtle glow
- **Choice Buttons**: Semi-bold, 18-24px, white text
- **Feedback/Tips**: Bold, 28-36px, gold or white depending on context
- **Score Display**: Bold, 20-24px, gold

**Text Effects**:
- All important text has subtle text-shadow for depth
- Gold text uses layered shadows (dark shadow + colored glow)
- RTL direction for all Arabic content

## Layout System

### Welcome Screen
- **Full-screen dramatic background**: Dark gradient with animated spotlight beams
- **Centered title**: Large, gold, with dramatic shadow effects
- **Mascot**: Positioned with spotlight effect
- **Start button**: Large, gold, pulsing glow animation

### Game Screen Layout
**Top Bar** (h-16 to h-20):
- Left: Progress indicator (e.g., "السؤال 3 من 10")
- Center: Dramatic game logo/title (smaller)
- Right: Score with star icon and gold color

**Question Card** (center, dominant):
- Large semi-transparent dark card with gold border
- Question text centered, white, generous padding
- Subtle spotlight glow effect on card
- Rounded corners with dramatic shadow

**Choice Buttons Area** (bottom 40% of screen):
- 4 large buttons in 2x2 grid
- Each button:
  - Dark background with gold border (2-3px)
  - Arabic letter prefix (أ، ب، ج، د) in gold circle on right
  - Choice text in white, RTL aligned
  - Hover: Bright glow effect
  - Correct: Green glow animation
  - Wrong: Red pulse effect
- Generous spacing between buttons (gap-4 to gap-6)
- Full-width touch targets

### Mascot Integration
- Positioned in bottom-left or top-left corner
- Size: w-24 to w-32
- Appears with encouraging messages in speech bubbles
- Speech bubble: Dark background, gold border, white text

### Feedback Screen
- Full-screen overlay with dramatic effect
- Correct: Green spotlight beams, confetti, gold stars
- Wrong: Red dramatic lighting, consoling message
- Large feedback message with tip
- Continue button: Gold, prominent, pulsing

### Completion Screen
- Full-screen celebration
- Final score prominently displayed in gold
- Star rating visualization
- Congratulations message based on score
- Play again button: Gold, large, centered

## Interactive Elements

### Choice Buttons (Game Show Style)
**Default State**:
- Dark background `rgba(20, 30, 50, 0.7)`
- Gold border `border-2 sm:border-3`
- White text with subtle shadow
- Minimum height: h-16 sm:h-20 md:h-24

**Hover/Focus**:
- Bright gold glow effect
- Scale slightly: `scale-[1.02]`
- Increased border brightness

**Selected/Active**:
- Bright gold background
- Dark navy text
- Pulsing animation

**Correct Answer**:
- Green glow animation
- Green border
- Checkmark icon appears
- Celebratory sound effect placeholder

**Wrong Answer**:
- Red glow pulse
- Shake animation
- X icon appears

### Animations

**Screen Transitions**:
- Fade in/out with dramatic timing
- Question cards slide up with ease-out
- Choices stagger-fade in from bottom

**Success Animations**:
- Confetti particles
- Spotlight sweep
- Star burst effects
- Gold shimmer on text

**Failure Animations**:
- Gentle shake on wrong answer
- Red pulse glow
- Consoling mascot appearance

**Background Effects**:
- Slow-moving spotlight beams
- Subtle particle drift
- Gradient shifts

## Special Effects

### Spotlights
- Animated beams crossing the dark background
- Radial gradients with opacity
- Cyan-blue to gold color shifts
- Slow rotation animation

### Glows and Shadows
- Text: Multiple layered shadows for depth
- Buttons: Outer glow on hover (box-shadow with blur)
- Cards: Dramatic drop shadow with blur
- Gold elements: Bright yellow glow

### Particles
- Small animated circles or stars
- Drift upward slowly
- Gold and cyan colors
- Low opacity for subtlety

## Responsive Behavior

**Mobile (< 640px)**:
- Stack buttons vertically
- Reduce text sizes by 25-30%
- Smaller spotlight effects
- Maintain aspect ratios

**Tablet (640px - 1024px)**:
- 2x2 button grid
- Medium text sizes
- Full spotlight effects
- Balanced layout

**Desktop (> 1024px)**:
- Maximum visual effects
- Large, comfortable spacing
- Full dramatic presentation

## Accessibility

- High contrast between text and backgrounds (WCAG AA)
- Large touch targets (minimum 60px, ideal 80px+)
- Clear visual feedback on all interactions
- RTL support throughout
- Keyboard navigation support

## Key Differences from Kids' Design

1. **Sophisticated Colors**: Dark dramatic instead of bright playful
2. **Metallic Accents**: Gold/bronze instead of primary colors
3. **Lighting Effects**: Spotlights and glows instead of flat colors
4. **Typography**: Professional drama instead of cartoonish
5. **Animations**: Smooth and dramatic instead of bouncy
6. **Layout**: Centered elegance instead of scattered playfulness

This creates an engaging, dramatic quiz experience that feels like a high-stakes game show while remaining appropriate and accessible for children ages 6-10.
