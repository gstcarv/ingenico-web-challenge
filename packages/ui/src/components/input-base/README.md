# 🔧 Input Base Component

A foundational input wrapper component that provides consistent styling, prefix/suffix support, and error state handling for form inputs.

## 📦 Installation

```bash
import { InputBase } from '@ingenico-challenge/ui'
```

## 🚀 Usage

### Basic Input Base

```tsx
import { InputBase } from '@ingenico-challenge/ui'

function MyComponent() {
  return (
    <InputBase>
      <input type="text" placeholder="Enter text..." />
    </InputBase>
  )
}
```

### Input Base with Prefix

```tsx
import { Search, Mail } from 'lucide-react'

<InputBase prefix={<Search size={20} />}>
  <input type="text" placeholder="Search..." />
</InputBase>

<InputBase prefix={<Mail size={20} />}>
  <input type="email" placeholder="Enter email..." />
</InputBase>
```

### Input Base with Suffix

```tsx
import { Eye, EyeOff } from 'lucide-react'

<InputBase suffix={<Eye size={20} />}>
  <input type="password" placeholder="Enter password..." />
</InputBase>
```

### Input Base with Both Prefix and Suffix

```tsx
import { DollarSign, Percent } from 'lucide-react'

<InputBase 
  prefix={<DollarSign size={20} />}
  suffix={<Percent size={20} />}
>
  <input type="number" placeholder="0.00" />
</InputBase>
```

### Input Base with Error State

```tsx
import { Field } from '@ingenico-challenge/ui'

<Field>
  <Field.Label>Email</Field.Label>
  <InputBase>
    <input type="email" />
  </InputBase>
  <Field.Validation>Invalid email format</Field.Validation>
</Field>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | `ReactNode` | - | Content to display before the input |
| `suffix` | `ReactNode` | - | Content to display after the input |
| `children` | `ReactNode` | - | Input element or other content |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `DivHTMLAttributes` | - | All standard div attributes |

## 🎨 Styling

The component uses Class Variance Authority (CVA) for styling and includes:

### Base Styling
- Fixed height (`h-16`) and width (`w-70`)
- White background with border
- Rounded corners (`rounded-lg`)
- Subtle shadow (`shadow-lg`)
- Relative positioning for prefix/suffix

### Error State
- Red border color when error is present
- Error ring on focus when in error state
- Automatic error detection through Field context

### Prefix/Suffix Positioning
- Absolute positioning at left/right edges
- Centered vertically with transform
- Neutral color (`text-neutral-500`)
- Consistent spacing (`left-4`, `right-4`)

## ♿ Accessibility

- **Focus Management**: Proper focus ring and focus-within states
- **Error Indication**: Visual error states for screen readers
- **Semantic Structure**: Maintains proper input semantics
- **Keyboard Navigation**: Supports standard input navigation

## 🔧 Customization

### Custom Styling

```tsx
<InputBase className="custom-input-base">
  <input type="text" />
</InputBase>
```

### Custom Prefix/Suffix Styling

```tsx
<InputBase 
  prefix={<div className="text-blue-500">$</div>}
  suffix={<div className="text-green-500">USD</div>}
>
  <input type="number" />
</InputBase>
```

### Complex Input with Multiple Elements

```tsx
<InputBase>
  <div className="flex items-center w-full">
    <input type="text" className="flex-1" />
    <button type="button" className="ml-2">Clear</button>
  </div>
</InputBase>
```

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react'
import { InputBase } from './input-base'

test('renders input base with children', () => {
  render(
    <InputBase data-testid="input-base">
      <input type="text" />
    </InputBase>
  )
  
  expect(screen.getByTestId('input-base')).toBeInTheDocument()
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('renders prefix when provided', () => {
  render(
    <InputBase prefix={<span data-testid="prefix">$</span>}>
      <input type="text" />
    </InputBase>
  )
  
  expect(screen.getByTestId('prefix')).toBeInTheDocument()
})

test('renders suffix when provided', () => {
  render(
    <InputBase suffix={<span data-testid="suffix">USD</span>}>
      <input type="text" />
    </InputBase>
  )
  
  expect(screen.getByTestId('suffix')).toBeInTheDocument()
})
```

## 📚 Storybook

View interactive examples and documentation in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Navigate to the Input Base component in the Storybook sidebar.

## 🎯 Best Practices

1. **Use with Field component** for proper error handling
2. **Provide meaningful prefixes/suffixes** for better UX
3. **Maintain consistent spacing** with prefix/suffix elements
4. **Use semantic input types** for better accessibility
5. **Test error states** with Field validation
6. **Consider responsive design** for different screen sizes

## 🔗 Integration

### With Field Component

```tsx
import { Field, InputBase } from '@ingenico-challenge/ui'

<Field>
  <Field.Label>Amount</Field.Label>
  <InputBase prefix={<DollarSign />}>
    <input type="number" step="0.01" />
  </InputBase>
  <Field.Validation>Please enter a valid amount</Field.Validation>
</Field>
```

### With Form Libraries

```tsx
import { useForm } from 'react-hook-form'
import { InputBase } from '@ingenico-challenge/ui'

function MyForm() {
  const { register } = useForm()
  
  return (
    <InputBase prefix={<Mail />}>
      <input {...register('email')} type="email" />
    </InputBase>
  )
}
```

## 🔗 Dependencies

- **class-variance-authority**: Styling variants
- **lucide-react**: Icons (optional)
- **Field component**: Error state integration
