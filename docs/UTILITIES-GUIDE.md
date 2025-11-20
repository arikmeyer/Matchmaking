# Terminal Utilities - Complete Guide

A comprehensive guide to leveraging Tailwind v4's advanced features in this project.

## 🎯 Quick Start

### Most Used Patterns

```tsx
// Interactive card with scroll animation
<div className="terminal-card terminal-interactive terminal-scroll-fade">

// Centered flex container
<div className="flex-center gap-4">

// Glass morphism effect
<div className="terminal-glass terminal-neon">

// Text with glow animation
<span className="terminal-text-glow">
```

## 📚 Complete Utility Reference

### Layout Utilities

#### `terminal-card`
Complete card styling with surface background, border, rounded corners, shadow.

**Replaces:**
```tsx
// Before
<div className="bg-terminal-surface border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">

// After
<div className="terminal-card">
```

#### `flex-center`
Flex container with centered items (used 42+ times in codebase).

**Usage:**
```tsx
<div className="flex-center gap-2">
  <Icon />
  <span>Text</span>
</div>
```

#### `terminal-grid`
Responsive grid with auto-fit columns.

```tsx
<div className="terminal-grid">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Visual Effects

#### `terminal-glow`
Animated glow effect with pulsing animation.

```tsx
<div className="terminal-glow">
  Glowing element
</div>
```

#### `terminal-neon`
Neon border effect with hover enhancement.

```tsx
<button className="terminal-neon">
  Click me
</button>
```

#### `terminal-glass`
Glass morphism with backdrop blur.

```tsx
<div className="terminal-glass p-6">
  Semi-transparent content
</div>
```

### Scroll-Driven Animations

#### `terminal-scroll-fade`
Fade in as element enters viewport.

```tsx
<section className="terminal-scroll-fade">
  Content fades in on scroll
</section>
```

#### `terminal-scroll-slide`
Slide up with scale effect on scroll.

```tsx
<div className="terminal-scroll-slide">
  Slides up dramatically
</div>
```

#### `terminal-parallax`
Parallax scrolling effect.

```tsx
<div className="terminal-parallax">
  Moves slower than scroll
</div>
```

### Interactive States

#### `terminal-interactive`
Complete hover/focus system with color transitions.

```tsx
<div className="terminal-interactive">
  Responds to hover and focus
</div>
```

#### `terminal-focus`
Modern focus ring following accessibility guidelines.

```tsx
<button className="terminal-focus">
  Accessible button
</button>
```

### Container Queries

#### `terminal-container`
Sets up container query context.

```tsx
<div className="terminal-container">
  <p className="terminal-responsive-text">
    Size changes based on container, not viewport
  </p>
</div>
```

### Internationalization

#### Logical Properties
For RTL/LTR support:

```tsx
// Use logical properties instead of directional
<div className="terminal-border-inline-start">
  Works in both LTR and RTL
</div>

<div className="terminal-spacing-inline">
  Horizontal padding that respects text direction
</div>
```

### Theme System

#### Runtime Theme Switching

```tsx
// Switch themes via data attribute
document.documentElement.setAttribute('data-theme', 'matrix');

// Available themes
type Theme = 'default' | 'matrix' | 'cyberpunk' | 'light';
```

#### Theme-Aware Components

```tsx
<div className="terminal-card terminal-theme-transition">
  Smoothly transitions when theme changes
</div>
```

## 🎨 Composition Patterns

### Pattern: Interactive Card
```tsx
<div className="terminal-card terminal-interactive terminal-scroll-fade p-6">
  <h3 className="terminal-text-glow">Title</h3>
  <p className="terminal-text">Content</p>
</div>
```

**Features:**
- Surface styling
- Hover/focus states
- Scroll animation
- Semantic spacing

### Pattern: Glass Navigation
```tsx
<nav className="terminal-glass terminal-border-glow">
  <div className="flex-center gap-4">
    <Logo />
    <div className="flex-center gap-2">
      {links.map(link => (
        <a className="terminal-interactive terminal-focus">{link}</a>
      ))}
    </div>
  </div>
</nav>
```

### Pattern: Grid with Animations
```tsx
<div className="terminal-grid">
  {items.map((item, i) => (
    <div
      key={item.id}
      className="terminal-card terminal-scroll-slide"
      style={{ animationDelay: `${i * 0.1}s` }}
    >
      {item.content}
    </div>
  ))}
</div>
```

## 🚀 Performance Tips

### 1. Use Scroll Animations Sparingly
```tsx
// Good: Animates important sections
<section className="terminal-scroll-fade">

// Avoid: Animating every small element
<span className="terminal-scroll-fade">
```

### 2. Combine Utilities Efficiently
```tsx
// Good: Semantic combinations
<div className="terminal-card terminal-interactive">

// Avoid: Redundant utilities
<div className="terminal-card border border-neutral-800">
```

### 3. Respect User Preferences
Reduced motion is automatically handled, but test with:
```bash
# macOS
System Preferences → Accessibility → Display → Reduce motion
```

## 🎭 Accessibility Features

All utilities respect:
- `prefers-reduced-motion`: Disables animations
- `prefers-contrast: high`: Increases contrast
- `focus-visible`: Modern focus indicators
- Logical properties: RTL/LTR support

## 🔧 Customization

### Adding New Utilities

```css
/* In src/index.css */
@utility my-custom-utility {
  /* Your styles */
  background: color-mix(in oklch, var(--color-terminal-bg) 90%, blue 10%);

  &:hover {
    background: color-mix(in oklch, var(--color-terminal-bg) 80%, blue 20%);
  }
}
```

### Creating New Themes

```css
:root[data-theme="my-theme"] {
  --color-terminal-green: oklch(75% 0.25 200);
  --color-terminal-bg: oklch(10% 0.02 200);
}
```

## 📊 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| oklch() | 111+ | 113+ | 15+ | 111+ |
| @property | 85+ | 128+ | ❌ | 85+ |
| Container Queries | 105+ | 110+ | 16+ | 105+ |
| Scroll Animations | 115+ | ❌ | ❌ | 115+ |
| View Transitions | 111+ | ❌ | ❌ | 111+ |

Progressive enhancement ensures graceful fallbacks for all features.

## 🎓 Learning Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [oklch() Color Space](https://oklch.com)
- [Scroll-Driven Animations](https://scroll-driven-animations.style)
- [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)

## 💡 Pro Tips

1. **Use TypeScript types** - Import from `terminal-utilities.d.ts` for autocomplete
2. **Compose patterns** - Create semantic combinations for common use cases
3. **Theme switching** - Implement UI for runtime theme changes
4. **Performance** - Use `will-change` sparingly, let browser optimize
5. **Accessibility** - Always test with keyboard navigation and screen readers

---

**Questions?** Check the source code in `src/index.css` - every utility is documented with comments.
