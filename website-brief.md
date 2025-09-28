# MASTER PROMPT: Platinum Media Website Development

## YOUR ROLE

You are an expert full-stack web developer specializing in premium creative agency websites. You will create a stunning, professional website for Platinum Media - a creative agency from Belgrade, Serbia that creates graphics and videos for football players.

## PROJECT CONTEXT

This is a high-stakes project for a professional creative agency. The website must reflect the same level of quality and attention to detail that Platinum Media delivers to their football player clients. Every animation, every responsive breakpoint, and every visual detail matters.

## CRITICAL SUCCESS FACTORS (NON-NEGOTIABLE)

### 1. ANIMATION EXCELLENCE 🎨

- **MANDATORY:** Every hover interaction must be beautiful, smooth, and multi-layered
- **MANDATORY:** All animations must run at 60fps across all devices
- **MANDATORY:** Use the "Digital Pitch" design system animations (grid reveals, elastic easing)
- **MANDATORY:** Implement hardware acceleration for smooth performance

### 2. RESPONSIVE PERFECTION 📱

- **MANDATORY:** Flawless functionality from 320px to 4K displays
- **MANDATORY:** Perfect typography scaling and layout adaptation
- **MANDATORY:** Touch-optimized interactions for mobile devices
- **MANDATORY:** Zero horizontal scrolling or layout breaks

### 3. PROFESSIONAL QUALITY 💎

- **MANDATORY:** Premium aesthetic matching a high-end creative agency
- **MANDATORY:** Clean, semantic HTML structure
- **MANDATORY:** Performance-optimized CSS and JavaScript
- **MANDATORY:** Cross-browser compatibility

## DESIGN SYSTEM TO IMPLEMENT

You have been provided with the complete "Digital Pitch" design system specifications. Follow these exactly:

- **Colors:** Deep black (#0D0D0D), Interface black (#181818), Bright white (#FFFFFF), etc.
- **Typography:** Archivo Black for headers, Inter for body text
- **Spacing:** 6px base unit with 18-column grid
- **Animations:** 0.6s duration with cubic-bezier(0.68, -0.55, 0.265, 1.55) easing
- **Grid Effects:** Football pitch-inspired grid lines that reveal on scroll/hover

## DEVELOPMENT APPROACH

### Phase 1: Foundation

1. Create semantic HTML structure with proper accessibility
2. Implement the complete CSS design system with custom properties
3. Set up responsive grid system (18 columns with intelligent collapsing)
4. Implement critical CSS for above-the-fold content

### Phase 2: Interactions & Animations

1. Create beautiful hover animations for all interactive elements
2. Implement the signature grid reveal effects
3. Add smooth scroll animations and micro-interactions
4. Optimize all animations for 60fps performance

### Phase 3: Responsive Excellence

1. Test and perfect layouts across all 6 breakpoints
2. Implement touch-optimized interactions for mobile
3. Add adaptive features (fluid typography, container queries)
4. Ensure perfect functionality on all devices

### Phase 4: Performance & Polish

1. Optimize images, fonts, and assets
2. Implement lazy loading and resource hints
3. Test cross-browser compatibility
4. Final performance audit and optimizations

## TECHNICAL REQUIREMENTS

### Must Use Technologies

- **HTML5** with semantic markup and proper accessibility
- **CSS3** with custom properties, Grid, and Flexbox
- **Bootstrap 5** for responsive grid foundation
- **Vanilla JavaScript** for animations and interactions (no jQuery)

### Performance Standards

- Page load time: <3 seconds on 3G
- Lighthouse score: 90+ on all metrics
- Cross-browser support: Chrome, Firefox, Safari, Edge

### Code Quality Standards

- Clean, readable, well-commented code
- Semantic HTML with proper ARIA labels
- Modular CSS with reusable components
- Efficient JavaScript with proper event handling

## CONTENT STRUCTURE PRIORITIES

### Hero Section (MOST IMPORTANT)

This is the first impression - it must be stunning:

- Animated grid background with football pitch inspiration
- Premium typography with perfect hierarchy
- Smooth call-to-action buttons with beautiful hover effects
- Responsive across all screen sizes

### Featured Work Preview (KEY FEATURE)

- Graphics/Videos filter (Graphics shown first, no "All" option)
- Beautiful hover animations revealing project details
- Grid layout that adapts perfectly to all screen sizes
- Smooth transitions between Graphics and Videos content

### Navigation & Interactions

- Smooth, responsive navigation with elegant hover states
- Mobile hamburger menu with smooth animations
- Perfect touch targets for mobile users
- Consistent interaction patterns throughout

## QUALITY ASSURANCE CHECKLIST

Before considering the project complete, verify:

✅ **Animations:** All hover effects are smooth, beautiful
✅ **Responsiveness:** Perfect functionality on 320px, 768px, 1200px, and 4K  
✅ **Performance:** <3 second load time, smooth scrolling, no jank  
✅ **Visual Quality:** Matches the premium aesthetic of a high-end creative agency  
✅ **Accessibility:** Proper semantic HTML, ARIA labels, keyboard navigation  
✅ **Cross-browser:** Works flawlessly in Chrome, Firefox, Safari, Edge  
✅ **Mobile Experience:** Touch-optimized with perfect usability  
✅ **Code Quality:** Clean, readable, well-structured code

## COMMUNICATION STYLE

When presenting your work:

- Highlight the key features and animations you've implemented
- Explain any technical decisions or optimizations made
- Mention how you've addressed the specific requirements
- Be confident about the quality and professionalism of your solution

## SUCCESS MINDSET

Remember: You're not just building a website, you're creating a digital showcase for a creative agency that serves professional football players. Every detail matters. Every animation should feel premium. Every responsive breakpoint should be perfect.

The client expects the same level of excellence they deliver to their football player clients. This website should make Platinum Media proud to show it to potential high-profile clients.

## FINAL NOTE

If you encounter any technical challenges or need clarification on any aspect of the requirements, ask specific questions rather than making assumptions. The goal is to deliver a website that exceeds expectations and truly represents the quality of Platinum Media's work.

---

# Platinum Media Website Development Brief

## Project Overview

**Client:** Platinum Media  
**Location:** Belgrade, Serbia 🇷🇸  
**Business Type:** Digital creator & Creative agency  
**Primary Focus:** Graphics and videos for football players  
**Instagram:** @platinum.media* (Digital creator, Creative agency ◻️◼️)  
**Instagram URL:** https://www.instagram.com/platinum.media*/

## Project Scope

Create a 3-page website structure:

1. **Main/Home Page** (Primary focus for this phase)
2. **Graphics Page** (future development)
3. **Videos Page** (future development)

The main page should be structured to easily accommodate the graphics and video showcase pages while maintaining a unique identity for Platinum Media.

## Design System: "Digital Pitch"

### Core Philosophy

The football field translated into digital space with grid-like precision. The design should feel like a premium digital representation of a football pitch under stadium lights.

### Color Palette

```css
/* Primary Colors */
--deep-black: #0d0d0d; /* Night pitch background */
--interface-black: #181818; /* Sideline areas, cards */
--bright-white: #ffffff; /* Field lines, primary text */
--warm-white: #fafafa; /* Grass highlights under lights */
--charcoal: #333333; /* Equipment, secondary elements */
```

### Psychological Reasoning

- Slightly warmer blacks suggest organic nature of grass while maintaining premium feel
- White creates iconic field line structure
- Color combination evokes professional stadium lighting

### Typography System

```css
/* Font Families */
--header-font: "Archivo Black"; /* Bold, sports-inspired */
--subheader-font: "Archivo SemiBold"; /* Consistent family */
--body-font: "Inter Regular"; /* Neutral readability */
--caption-font: "Inter Medium"; /* Emphasis without weight */

/* Font Sizes */
--h1-size: 72px; /* Hero headlines */
--h2-size: 52px; /* Section headers */
--h3-size: 36px; /* Subsection headers */
--h4-size: 24px; /* Card titles */
--body-size: 16px; /* Body text */
--caption-size: 12px; /* Captions, metadata */
```

### Spacing System

```css
/* Base Grid System */
--base-unit: 6px; /* Field marking precision */
--grid-columns: 18; /* Responsive grid columns */
--grid-gutters: 18px; /* Space between grid items */

/* Spacing Scale (based on 6px) */
--space-xs: 6px;
--space-sm: 12px;
--space-md: 18px;
--space-lg: 24px;
--space-xl: 36px;
--space-xxl: 48px;
```

### Signature Visual Elements

#### Grid Lines Effect

- Subtle grid lines that appear on hover/scroll
- Mimicking football pitch markings
- Fade in behind content sections creating depth
- Field association through visual metaphor

#### Aspect Ratios

- Use 3:2 aspect ratios (field-inspired proportions)
- Apply to image containers, video embeds, and card layouts

### Motion Principles

#### Animation Specifications

```css
/* Primary Animation */
--duration: 0.6s;
--duration-fast: 0.3s;
--duration-slow: 0.9s;
--easing: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Elastic feel */
--easing-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth transitions */

/* Animation Types */
- Grid reveal on scroll (field lines appearing)
- Smooth elastic animations for interactions
- **Beautiful hover effects** with multiple layers of animation
- Scroll-triggered content animations
- **Premium micro-interactions** throughout the interface
```

#### Beautiful Hover Animations (CRITICAL REQUIREMENT)

- **Card hovers:** Scale, shadow, and grid line reveals simultaneously
- **Button hovers:** Smooth color transitions with subtle scale and glow effects
- **Image hovers:** Parallax movement with overlay animations
- **Navigation hovers:** Elegant underline animations with easing
- **Portfolio item hovers:** Multi-layer effects (scale, blur, overlay, text reveal)
- **Social media hovers:** Icon transformations with smooth color transitions
- **Text hovers:** Subtle letter-spacing and color animations
- **Grid line reveals:** Behind elements on hover with perfect timing

#### Animation Behaviors

- **Smooth and premium feel** - every interaction should feel polished
- Elements should animate in with elastic easing
- Grid lines should subtly reveal behind content sections
- **Hover states must be immediately responsive** (no delays)
- **Multiple animation layers** working together for rich interactions
- Scroll animations should be smooth and purposeful
- **Performance optimized** - use transforms and opacity for smooth 60fps animations

## Technical Requirements

### Framework & Libraries

- **HTML5** (semantic markup)
- **CSS3** (custom properties, grid, flexbox)
- **Bootstrap 5** (responsive grid system)
- **Vanilla JavaScript** (animations, interactions)

### Performance Optimization (CRITICAL FOR SMOOTH ANIMATIONS)

- **animations** - use transform and opacity properties
- **Lazy loading** for images with intersection observer
- **Optimized font loading** with font-display: swap
- **Critical CSS inlining** for above-the-fold content
- **WebP images** with fallbacks for maximum quality/size ratio
- **Minified and compressed** CSS/JS assets
- **Hardware acceleration** for animations (will-change property)
- **Smooth scrolling optimizations** with passive event listeners
- **Resource hints:** preload, prefetch, preconnect for faster loading
- **Animation performance:**
  - Use transform3d() to trigger GPU acceleration
  - Avoid animating layout-triggering properties
  - Implement animation throttling on scroll
  - Reduce animations on low-end devices

### Responsive Design (EXCELLENT RESPONSIVENESS REQUIRED)

- **Mobile-first approach** with progressive enhancement
- **Perfect adaptation** across all screen sizes
- **18-column grid system** for desktop with intelligent collapsing
- **Fluid typography** scaling smoothly between breakpoints
- **Touch-optimized interactions** for mobile devices
- **Breakpoints:** 320px, 576px, 768px, 992px, 1200px, 1400px
- **Advanced responsive features:**
  - Adaptive image sizing with srcset
  - Container queries where beneficial
  - Responsive animations (reduced motion on mobile if needed)
  - Smart navigation collapsing
  - Optimized touch targets (min 44px)
  - Swipe gestures for portfolio sections

#### Device-Specific Optimizations

- **Mobile (320px-767px):**
  - Single column layouts
  - Larger touch targets
  - Simplified hover states (tap-based)
  - Optimized font sizes
  - Stack-based navigation
- **Tablet (768px-1199px):**
  - Hybrid layouts (2-3 columns)
  - Maintained hover animations
  - Adaptive grid systems
- **Desktop (1200px+):**
  - Full grid utilization
  - Enhanced hover animations
  - Multi-column complex layouts
  - Advanced interactions

### Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## Content Structure for Main Page

### Header/Navigation

- Logo: Platinum Media
- Navigation: Home, Graphics, Videos, About, Contact
- Location indicator: Belgrade, Serbia flag
- Mobile hamburger menu

### Hero Section

- **Headline:** Premium digital content for football excellence
- **Subheadline:** Creative agency crafting stunning graphics and videos for players and brands
- **CTA Buttons:** View Graphics, Watch Videos
- **Background:** Animated grid pattern with subtle football field elements

### Services Section

- **Graphics Design:** Premium visual content for social media
- **Video Production:** Professional highlight reels and promotional content
- **Brand Identity:** Complete visual identity packages
- **Social Media Management:** Content strategy and execution

### Featured Work Preview

- Grid showcase of best graphics and videos
- Filter tabs: Graphics (default), Videos
- **Default display:** Graphics content shown first
- **Interaction:** Click Videos tab to switch to video content
- Hover effects revealing project details
- Links to dedicated Graphics/Videos pages

### About Section

- Agency story and mission
- Team introduction (if applicable)
- Belgrade, Serbia location highlight
- Instagram/social media integration

### Contact Section

- Contact form
- Social media links
- Location: Belgrade, Serbia
- Professional email and phone

### Footer

- Links to all pages
- Social media icons
- Copyright and location
- Back to top button

## Inspiration References

### Design Inspiration

- Nike Football campaigns (premium sports aesthetic)
- Pitch by Pitch app interface (clean, grid-based)
- Stadium lighting aesthetics
- Professional football broadcast graphics

### Similar Structure Reference

Based on Field Focus website structure but with unique Platinum Media identity:

- Hero with animated background
- Service cards in grid layout
- Work showcase carousel/grid
- Team section
- Contact section

## Development Phases

### Phase 1: Main Page (Current Focus)

- Complete main page with all sections
- Implement grid animation system
- Responsive design across all devices
- Performance optimization

### Phase 2: Graphics Page (Future)

- Dedicated graphics portfolio
- Category filtering
- Lightbox gallery
- Project detail views

### Phase 3: Videos Page (Future)

- Video portfolio showcase
- YouTube/Vimeo integration
- Video player with custom controls
- Project case studies

## Additional Notes

### Brand Elements to Incorporate

- ◻️◼️ (white and black squares from Instagram bio)
- Serbian flag/Belgrade reference
- Football/soccer visual metaphors
- Premium, professional aesthetic

### Technical Considerations

- Prepare structure for easy addition of Graphics and Videos pages
- Implement consistent design system across all future pages
- Create reusable components and CSS classes
- Plan for content management system integration if needed

## SUCCESS REQUIREMENTS (NON-NEGOTIABLE)

### Animation Quality Standards

- **✅ MANDATORY:** Beautiful, smooth hover animations on ALL interactive elements
- **✅ MANDATORY:** performance across all devices
- **✅ MANDATORY:** Multi-layered hover effects that feel premium and professional
- **✅ MANDATORY:** Consistent animation timing and easing throughout

### Responsiveness Excellence Standards

- **✅ MANDATORY:** Perfect functionality on ALL screen sizes (320px to 4K)
- **✅ MANDATORY:** Smooth transitions between breakpoints
- **✅ MANDATORY:** Touch-optimized experience on mobile/tablet
- **✅ MANDATORY:** No horizontal scrolling or layout breaks on any device
- **✅ MANDATORY:** Typography that scales beautifully across all screen sizes

### Technical Performance Requirements

- **✅ MANDATORY:** Page load time under 3 seconds on 3G connection
- **✅ MANDATORY:** Smooth scrolling with zero jank
- **✅ MANDATORY:** All animations run at 60fps without frame drops
- **✅ MANDATORY:** Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## File Structure Recommendation

```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   └── animations.js
│   └── img/
│       ├── logo.webp
│       ├── hero-bg.webp
│       └── showcase/
├── graphics/ (future)
│   └── index.html
└── videos/ (future)
    └── index.html
```

## Deliverables Expected

1. **Complete HTML structure** with semantic markup
2. **CSS implementation** of Digital Pitch design system
3. **JavaScript functionality** for animations and interactions
4. **Responsive design** working across all devices
5. **Optimized performance** with fast loading times
6. **Grid animation system** implementing the signature visual elements
7. **Content structure** ready for Graphics and Videos page integration
