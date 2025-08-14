# 💰 Currency Input Component

A specialized input component for currency values with automatic formatting, number validation, and customizable styling.

## 📦 Installation

```bash
import { CurrencyInput } from '@ingenico-challenge/ui'
```

## 🚀 Usage

### Basic Currency Input

```tsx
import { CurrencyInput } from '@ingenico-challenge/ui'

function MyComponent() {
  const [amount, setAmount] = useState<number>()

  return (
    <CurrencyInput
      value={amount}
      onChange={setAmount}
      placeholder="Enter amount"
    />
  )
}
```

### Currency Input with Prefix/Suffix

```tsx
import { DollarSign } from 'lucide-react'

// With currency symbol prefix
<CurrencyInput
  value={amount}
  onChange={setAmount}
  prefix={<DollarSign size={20} />}
  placeholder="0.00"
/>

// With currency code suffix
<CurrencyInput
  value={amount}
  onChange={setAmount}
  suffix="USD"
  placeholder="0.00"
/>
```

### Different Sizes

```tsx
// Small input
<CurrencyInput size="sm" value={amount} onChange={setAmount} />

// Medium input (default)
<CurrencyInput size="md" value={amount} onChange={setAmount} />

// Large input
<CurrencyInput size="lg" value={amount} onChange={setAmount} />
```

### Controlled Component with Form Integration

```tsx
import { useForm } from 'react-hook-form'
import { CurrencyInput } from '@ingenico-challenge/ui'

function FormExample() {
  const { register, setValue, watch } = useForm()
  const amount = watch('amount')

  return (
    <form>
      <CurrencyInput
        value={amount}
        onChange={(value) => setValue('amount', value)}
        placeholder="Enter price"
      />
    </form>
  )
}
```

### Currency Input with Validation

```tsx
function ValidatedCurrencyInput() {
  const [amount, setAmount] = useState<number>()
  const [error, setError] = useState('')

  const handleChange = (value: number | undefined) => {
    setAmount(value)
    
    if (value && value > 10000) {
      setError('Amount cannot exceed $10,000')
    } else {
      setError('')
    }
  }

  return (
    <div>
      <CurrencyInput
        value={amount}
        onChange={handleChange}
        placeholder="Enter amount"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| undefined` | - | Current currency value |
| `onChange` | `(value: number \| undefined) => void` | - | Callback when value changes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size variant |
| `placeholder` | `string` | `'0.00'` | Placeholder text |
| `prefix` | `ReactNode` | - | Content to display before input |
| `suffix` | `ReactNode` | - | Content to display after input |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disables the input |
| `ref` | `Ref<HTMLInputElement>` | - | Ref to the input element |
| `...props` | `NumericFormatProps` | - | All NumericFormat props except overridden ones |

## 🎨 Styling

The component uses Class Variance Authority (CVA) for consistent styling:

### Base Styling
- Full width and height
- Transparent background
- No border (handled by InputBase)
- Neutral text color
- Medium font weight
- Placeholder styling

### Size Variants
- **Small**: `text-sm px-3`
- **Medium**: `text-lg px-4` (default)
- **Large**: `text-2xl px-6`

### Focus States
- Focus ring removed (handled by InputBase)
- Custom focus styling through InputBase

## 🔧 Features

### Automatic Formatting
- Thousand separators (commas)
- Decimal separator (period)
- Fixed 2 decimal places
- No negative values allowed

### Number Handling
- Converts string input to number
- Handles undefined values
- Maintains precision

### Accessibility
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## 🧪 Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { CurrencyInput } from './currency-input'

test('renders currency input with placeholder', () => {
  render(<CurrencyInput placeholder="Enter amount" />)
  expect(screen.getByTestId('currency-input')).toHaveAttribute('placeholder', 'Enter amount')
})

test('handles value changes', () => {
  const handleChange = jest.fn()
  render(<CurrencyInput onChange={handleChange} />)
  
  const input = screen.getByTestId('currency-input')
  fireEvent.change(input, { target: { value: '123.45' } })
  
  expect(handleChange).toHaveBeenCalledWith(123.45)
})

test('formats numbers correctly', () => {
  const handleChange = jest.fn()
  render(<CurrencyInput value={1234.56} onChange={handleChange} />)
  
  const input = screen.getByTestId('currency-input')
  expect(input).toHaveValue('1,234.56')
})
```

## 📚 Storybook

View interactive examples and documentation in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Navigate to the Currency Input component in the Storybook sidebar.

## 🎯 Best Practices

1. **Always provide onChange handler** for controlled usage
2. **Use appropriate size** for your UI context
3. **Include currency symbols** for better UX
4. **Handle validation** for business rules
5. **Provide meaningful placeholders**
6. **Consider accessibility** with proper labels

## 🔧 Customization

### Custom Currency Symbol

```tsx
import { Euro } from 'lucide-react'

<CurrencyInput
  value={amount}
  onChange={setAmount}
  prefix={<Euro size={20} className="text-green-600" />}
/>
```

### Custom Styling

```tsx
<CurrencyInput
  value={amount}
  onChange={setAmount}
  className="border-2 border-blue-500 rounded-lg"
  size="lg"
/>
```

### Integration with Form Libraries

```tsx
// With React Hook Form
const { register, setValue } = useForm()

<CurrencyInput
  onChange={(value) => setValue('amount', value)}
  {...register('amount')}
/>

// With Formik
<CurrencyInput
  value={values.amount}
  onChange={(value) => setFieldValue('amount', value)}
/>
```
