# 📅 Date Picker Component

A flexible and accessible date picker component built with React Day Picker, featuring a customizable input field and dropdown calendar.

## 📦 Installation

```bash
import { DatePicker } from '@ingenico-challenge/ui'
```

## 🚀 Usage

### Basic Date Picker

```tsx
import { DatePicker } from '@ingenico-challenge/ui'

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select a date..."
    />
  )
}
```

### Date Picker with Custom Format

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  format="MM/DD/YYYY"
  placeholder="MM/DD/YYYY"
/>
```

### Date Picker with Custom Prefix/Suffix

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  prefix={<CalendarIcon />}
  suffix={<ChevronDownIcon />}
/>
```

### Disabled Date Picker

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  disabled
  placeholder="Date picker disabled"
/>
```

### Custom Input Rendering

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  renderInput={({ value, placeholder, onClick, onKeyDown, disabled }) => (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className="custom-button"
    >
      {value || placeholder}
    </button>
  )}
/>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| undefined` | - | Selected date value |
| `onChange` | `(date: Date \| undefined) => void` | - | Callback when date changes |
| `placeholder` | `string` | `"Select date..."` | Placeholder text |
| `format` | `string` | `"DD/MM/YYYY"` | Date format (dayjs format) |
| `disabled` | `boolean` | `false` | Disables the date picker |
| `className` | `string` | - | Additional CSS classes |
| `prefix` | `ReactNode` | - | Content before the input |
| `suffix` | `ReactNode` | - | Content after the input (defaults to Calendar icon) |
| `renderInput` | `(props: DatePickerRenderInputProps) => ReactNode` | - | Custom input renderer |
| `data-testid` | `string` | - | Test ID for testing |
| `...props` | `DayPickerProps` | - | All React Day Picker props |

### DatePickerRenderInputProps

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Formatted date string |
| `placeholder` | `string` | Placeholder text |
| `onClick` | `() => void` | Click handler for opening picker |
| `onKeyDown` | `(e: React.KeyboardEvent) => void` | Keyboard event handler |
| `disabled` | `boolean` | Disabled state |
| `data-testid` | `string` | Test ID |

## 🎨 Styling

The component uses Class Variance Authority (CVA) for styling and includes:

### Base Styling
- Relative positioning for dropdown
- Smooth transitions and animations
- Focus-visible ring for accessibility
- Z-index management for dropdown

### Dropdown Styling
- Absolute positioning
- White background with border
- Rounded corners and shadow
- Smooth scale and opacity transitions

### Input Styling
- Transparent background
- Customizable prefix/suffix positioning
- Read-only input field
- Cursor pointer for interaction

## ♿ Accessibility

- **Keyboard Navigation**: Enter/Space to open, Escape to close
- **ARIA Attributes**: Proper `aria-haspopup`, `aria-expanded`, `aria-label`
- **Focus Management**: Visible focus ring and proper tab order
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Click Outside**: Closes dropdown when clicking outside

## 🔧 Customization

### Custom Date Format

```tsx
<DatePicker
  format="YYYY-MM-DD"
  placeholder="YYYY-MM-DD"
/>
```

### Custom Styling

```tsx
<DatePicker
  className="custom-date-picker"
  value={selectedDate}
  onChange={setSelectedDate}
/>
```

### Custom Calendar Props

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  showOutsideDays={false}
  disabled={{ before: new Date() }}
  modifiers={{ today: new Date() }}
/>
```

## 🧪 Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { DatePicker } from './date-picker'

test('renders date picker with placeholder', () => {
  render(<DatePicker data-testid="date-picker" />)
  expect(screen.getByTestId('date-picker')).toBeInTheDocument()
})

test('opens calendar on click', () => {
  render(<DatePicker data-testid="date-picker" />)
  
  fireEvent.click(screen.getByTestId('date-picker'))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

test('calls onChange when date is selected', () => {
  const handleChange = jest.fn()
  render(
    <DatePicker
      data-testid="date-picker"
      onChange={handleChange}
    />
  )
  
  fireEvent.click(screen.getByTestId('date-picker'))
  // Select a date from the calendar
  const dateButton = screen.getByRole('button', { name: /15/ })
  fireEvent.click(dateButton)
  
  expect(handleChange).toHaveBeenCalled()
})
```

## 📚 Storybook

View interactive examples and documentation in Storybook:

```bash
cd packages/ui
pnpm storybook
```

Navigate to the Date Picker component in the Storybook sidebar.

## 🎯 Best Practices

1. **Always provide onChange handler** for controlled usage
2. **Use meaningful placeholders** to guide users
3. **Consider date format** based on your locale/requirements
4. **Handle disabled state** appropriately in your UI
5. **Test keyboard navigation** for accessibility compliance
6. **Use custom renderInput** for complex input requirements

## 🔗 Dependencies

- **react-day-picker**: Calendar component
- **dayjs**: Date formatting and manipulation
- **lucide-react**: Icons
- **class-variance-authority**: Styling variants
