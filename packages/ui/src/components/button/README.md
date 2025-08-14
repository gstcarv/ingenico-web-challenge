# 🎯 Button Component

A flexible and accessible button component with multiple variants and sizes.

## 📦 Installation

```bash
import { Button } from '@ingenico-challenge/ui'
```

## 🚀 Usage

### Basic Button

```tsx
import { Button } from '@ingenico-challenge/ui'

function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  )
}
```

### Button Variants

```tsx
// Primary button (default)
<Button variant="primary">Primary</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Outline button
<Button variant="outline">Outline</Button>

// Ghost button
<Button variant="ghost">Ghost</Button>

// Destructive button
<Button variant="destructive">Delete</Button>
```

### Button Sizes

```tsx
// Small button
<Button size="sm">Small</Button>

// Medium button (default)
<Button size="md">Medium</Button>

// Large button
<Button size="lg">Large</Button>
```

### Disabled State

```tsx
<Button disabled onClick={() => console.log('This won\'t fire')}>
  Disabled Button
</Button>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `ButtonHTMLAttributes` | - | All standard button attributes |

## 🎨 Styling

The component uses Class Variance Authority (CVA) for styling variants and supports custom className overrides.

### Base Classes
- Focus-visible ring for accessibility
- Disabled state styling
- Smooth transitions
- Rounded corners

### Variant Styles
- **Primary**: Brand color with shadow effect
- **Secondary**: Neutral background
- **Outline**: Bordered style
- **Ghost**: Minimal styling
- **Destructive**: Error color scheme

## ♿ Accessibility

- Proper focus management with visible focus ring
- Disabled state handling
- Semantic HTML button element
- Keyboard navigation support

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

test('renders button with correct text', () => {
  render(<Button>Test Button</Button>)
  expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument()
})

test('handles click events', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  screen.getByRole('button').click()
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## 📚 Storybook

View interactive examples and documentation in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Navigate to the Button component in the Storybook sidebar.
