# 📝 Field Component

A flexible form field wrapper component that provides consistent layout and styling for form elements with support for labels and validation messages.

## 📦 Installation

```bash
import { Field } from '@ingenico-challenge/ui'
```

## 🚀 Usage

### Basic Field with Label

```tsx
import { Field } from '@ingenico-challenge/ui'

function MyForm() {
  return (
    <Field>
      <Field.Label>Email Address</Field.Label>
      <input type="email" placeholder="Enter your email" />
    </Field>
  )
}
```

### Field with Validation

```tsx
import { Field } from '@ingenico-challenge/ui'

function FormWithValidation() {
  const [error, setError] = useState('')

  return (
    <Field>
      <Field.Label>Password</Field.Label>
      <input 
        type="password" 
        onChange={(e) => {
          if (e.target.value.length < 8) {
            setError('Password must be at least 8 characters')
          } else {
            setError('')
          }
        }}
      />
      {error && <Field.Validation>{error}</Field.Validation>}
    </Field>
  )
}
```

### Field with Custom Styling

```tsx
<Field className="max-w-md">
  <Field.Label className="text-blue-600">Custom Label</Field.Label>
  <input type="text" />
  <Field.Validation className="text-red-500 font-bold">
    Custom error styling
  </Field.Validation>
</Field>
```

### Field with React Hook Form

```tsx
import { useForm } from 'react-hook-form'
import { Field } from '@ingenico-challenge/ui'

function HookFormExample() {
  const { register, formState: { errors } } = useForm()

  return (
    <form>
      <Field>
        <Field.Label>Username</Field.Label>
        <input {...register('username', { required: 'Username is required' })} />
        {errors.username && (
          <Field.Validation>{errors.username.message}</Field.Validation>
        )}
      </Field>
    </form>
  )
}
```

## 📋 Props

### Field Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Field content (label, input, validation) |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `DivHTMLAttributes` | - | All standard div attributes |

### Field.Label Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Label text content |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `LabelHTMLAttributes` | - | All standard label attributes |

### Field.Validation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Validation message content |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `SpanHTMLAttributes` | - | All standard span attributes |

## 🎨 Styling

The component uses Class Variance Authority (CVA) for consistent styling:

### Field Container
- Flexbox column layout
- Gap between elements (`gap-2`)
- Customizable with className

### Field.Label
- Small text size (`text-xs`)
- Neutral color (`text-neutral-500`)
- Uppercase styling
- Wide letter spacing
- Medium font weight

### Field.Validation
- Error color (`text-error-400`)
- Small text size (`text-xs`)

## ♿ Accessibility

- Semantic HTML structure
- Proper label-input associations
- Error message accessibility
- Screen reader friendly

## 🔧 Customization

### Custom Field Layout

```tsx
<Field className="grid grid-cols-2 gap-4">
  <Field.Label>First Name</Field.Label>
  <input type="text" />
</Field>
```

### Custom Label Styling

```tsx
<Field.Label className="text-lg font-bold text-blue-600">
  Custom Styled Label
</Field.Label>
```

### Custom Validation Styling

```tsx
<Field.Validation className="text-red-600 font-semibold italic">
  Custom error message styling
</Field.Validation>
```

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react'
import { Field } from './field'

test('renders field with label and input', () => {
  render(
    <Field>
      <Field.Label>Test Label</Field.Label>
      <input data-testid="test-input" />
    </Field>
  )
  
  expect(screen.getByText('Test Label')).toBeInTheDocument()
  expect(screen.getByTestId('test-input')).toBeInTheDocument()
})

test('renders validation message when present', () => {
  render(
    <Field>
      <Field.Label>Test Label</Field.Label>
      <input />
      <Field.Validation>Error message</Field.Validation>
    </Field>
  )
  
  expect(screen.getByText('Error message')).toBeInTheDocument()
})
```

## 📚 Storybook

View interactive examples and documentation in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Navigate to the Field component in the Storybook sidebar.

## 🎯 Best Practices

1. **Always use Field.Label** for proper accessibility
2. **Place validation messages** after the input element
3. **Use semantic HTML** for form elements
4. **Provide meaningful error messages** for better UX
5. **Consider using React Hook Form** for complex form management
