# 📋 Select Component

A customizable select dropdown component with support for prefixes, suffixes, and accessible design.

## 📦 Installation

```bash
import { Select } from '@ingenico-challenge/ui'
```

## 🚀 Usage

### Basic Select

```tsx
import { Select } from '@ingenico-challenge/ui'

function MyComponent() {
  return (
    <Select>
      <Select.Option value="">Select an option</Select.Option>
      <Select.Option value="option1">Option 1</Select.Option>
      <Select.Option value="option2">Option 2</Select.Option>
      <Select.Option value="option3">Option 3</Select.Option>
    </Select>
  )
}
```

### Select with Prefix/Suffix

```tsx
// With prefix icon
<Select prefix={<CurrencyIcon />}>
  <Select.Option value="USD">USD</Select.Option>
  <Select.Option value="EUR">EUR</Select.Option>
  <Select.Option value="GBP">GBP</Select.Option>
</Select>

// With suffix (custom suffix will override default chevron)
<Select suffix={<CustomIcon />}>
  <Select.Option value="option1">Option 1</Select.Option>
</Select>
```

### Controlled Select

```tsx
import { useState } from 'react'
import { Select } from '@ingenico-challenge/ui'

function ControlledSelect() {
  const [value, setValue] = useState('')

  return (
    <Select value={value} onChange={(e) => setValue(e.target.value)}>
      <Select.Option value="">Select currency</Select.Option>
      <Select.Option value="USD">US Dollar</Select.Option>
      <Select.Option value="EUR">Euro</Select.Option>
      <Select.Option value="GBP">British Pound</Select.Option>
    </Select>
  )
}
```

### Select with Form Integration

```tsx
import { useForm } from 'react-hook-form'
import { Select } from '@ingenico-challenge/ui'

function FormSelect() {
  const { register } = useForm()

  return (
    <Select {...register('currency')}>
      <Select.Option value="">Select currency</Select.Option>
      <Select.Option value="USD">USD</Select.Option>
      <Select.Option value="EUR">EUR</Select.Option>
    </Select>
  )
}
```

## 📋 Props

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | `ReactNode` | - | Content to display before the select input |
| `suffix` | `ReactNode` | `<ChevronDown />` | Content to display after the select input |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `SelectHTMLAttributes` | - | All standard select attributes |

### Select.Option Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Option value |
| `disabled` | `boolean` | `false` | Disables the option |
| `...props` | `OptionHTMLAttributes` | - | All standard option attributes |

## 🎨 Styling

The component extends `InputBase` for consistent styling and supports:

- Custom prefix/suffix positioning
- Focus states with brand color ring
- Disabled state styling
- Responsive design
- Custom className overrides

### Default Styling
- Rounded corners (`rounded-lg`)
- Focus ring with brand primary color
- Chevron down icon on the right
- Proper spacing for prefix content

## ♿ Accessibility

- Semantic HTML select element
- Proper focus management
- Keyboard navigation support
- Screen reader friendly
- ARIA attributes support

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react'
import { Select } from './select'

test('renders select with options', () => {
  render(
    <Select>
      <Select.Option value="option1">Option 1</Select.Option>
      <Select.Option value="option2">Option 2</Select.Option>
    </Select>
  )
  
  expect(screen.getByRole('combobox')).toBeInTheDocument()
  expect(screen.getByText('Option 1')).toBeInTheDocument()
  expect(screen.getByText('Option 2')).toBeInTheDocument()
})

test('handles value changes', () => {
  const handleChange = jest.fn()
  render(
    <Select onChange={handleChange}>
      <Select.Option value="option1">Option 1</Select.Option>
    </Select>
  )
  
  const select = screen.getByRole('combobox')
  select.value = 'option1'
  select.dispatchEvent(new Event('change'))
  
  expect(handleChange).toHaveBeenCalled()
})
```

## 📚 Storybook

View interactive examples and documentation in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Navigate to the Select component in the Storybook sidebar.

## 🔧 Customization

### Custom Icons

```tsx
import { DollarSign, Globe } from 'lucide-react'

// Currency selector with dollar icon
<Select prefix={<DollarSign size={20} />}>
  <Select.Option value="USD">USD</Select.Option>
  <Select.Option value="EUR">EUR</Select.Option>
</Select>

// Language selector with globe icon
<Select prefix={<Globe size={20} />}>
  <Select.Option value="en">English</Select.Option>
  <Select.Option value="es">Spanish</Select.Option>
</Select>
```

### Styling Overrides

```tsx
<Select className="w-64 bg-gray-50">
  <Select.Option value="option1">Option 1</Select.Option>
</Select>
```
