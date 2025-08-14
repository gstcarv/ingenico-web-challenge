import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CurrencyInput } from '../currency-input'

describe('CurrencyInput', () => {
  it('renders input element with correct attributes', () => {
    render(<CurrencyInput data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.tagName).toBe('INPUT')
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('inputMode', 'decimal')
  })

  it('applies custom className', () => {
    const { container } = render(
      <CurrencyInput className="custom-class" data-testid="currency-input" />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders default USD currency symbol', () => {
    render(<CurrencyInput data-testid="currency-input" />)

    expect(screen.getByText('$')).toBeInTheDocument()
  })

  it('renders custom currency symbol', () => {
    render(<CurrencyInput currency="EUR" data-testid="currency-input" />)

    expect(screen.getByText('€')).toBeInTheDocument()
  })

  it('renders custom prefix when provided', () => {
    render(<CurrencyInput prefix="R$" data-testid="currency-input" />)

    expect(screen.getByText('R$')).toBeInTheDocument()
  })

  it('renders React node prefix', () => {
    const TestIcon = () => <span data-testid="icon">💰</span>

    render(<CurrencyInput prefix={<TestIcon />} data-testid="currency-input" />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders suffix when provided', () => {
    render(<CurrencyInput suffix="USD" data-testid="currency-input" />)

    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('handles value prop correctly', () => {
    const handleChange = vi.fn()

    render(
      <CurrencyInput value={1234.56} onChange={handleChange} data-testid="currency-input" />
    )

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveValue('1,234.56')
  })

  it('handles empty value', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput value={undefined} onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveValue('')
  })

  it('formats input value on change', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '1234.56' } })

    expect(handleChange).toHaveBeenCalledWith(1234.56)
    expect(inputElement).toHaveValue('1,234.56')
  })

  it('handles empty input', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    // First set a value, then clear it
    fireEvent.change(inputElement, { target: { value: '123' } })
    fireEvent.change(inputElement, { target: { value: '' } })

    expect(handleChange).toHaveBeenCalledWith(123)
    expect(handleChange).toHaveBeenCalledWith(undefined)
    expect(inputElement).toHaveValue('')
  })

  it('handles invalid input gracefully', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: 'abc' } })

    expect(handleChange).not.toHaveBeenCalled()
    expect(inputElement).toHaveValue('abc')
  })

  it('handles multiple decimal points', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '123.45.67' } })

    expect(handleChange).not.toHaveBeenCalled()
    expect(inputElement).toHaveValue('123.45.67')
  })

  it('formats value on blur', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '1234' } })
    fireEvent.blur(inputElement)

    expect(inputElement).toHaveValue('1,234.00')
  })

  it('clears invalid value on blur', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: 'abc' } })
    fireEvent.blur(inputElement)

    expect(inputElement).toHaveValue('')
  })

  it('handles different precision values', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput precision={0} onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '1234.56' } })

    expect(handleChange).toHaveBeenCalledWith(1234.56)
    expect(inputElement).toHaveValue('1,235')
  })

  it('allows negative values when allowNegative is true', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput allowNegative onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '-1234.56' } })

    expect(handleChange).toHaveBeenCalledWith(-1234.56)
    expect(inputElement).toHaveValue('-1,234.56')
  })

  it('prevents negative values when allowNegative is false', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput allowNegative={false} onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    fireEvent.change(inputElement, { target: { value: '-1234.56' } })

    expect(handleChange).not.toHaveBeenCalled()
    expect(inputElement).toHaveValue('-1234.56')
  })

  it('uses custom placeholder', () => {
    render(<CurrencyInput placeholder="Enter amount" data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('placeholder', 'Enter amount')
  })

  it('uses default placeholder', () => {
    render(<CurrencyInput data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('placeholder', '0.00')
  })

  it('handles different size variants', () => {
    const { container } = render(
      <CurrencyInput size="lg" data-testid="currency-input" />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('forwards all HTML input attributes', () => {
    render(
      <CurrencyInput
        data-testid="currency-input"
        name="amount"
        id="amount-input"
        required
        aria-label="Enter amount"
        disabled
      />
    )

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('name', 'amount')
    expect(inputElement).toHaveAttribute('id', 'amount-input')
    expect(inputElement).toHaveAttribute('required')
    expect(inputElement).toHaveAttribute('aria-label', 'Enter amount')
    expect(inputElement).toBeDisabled()
  })

  it('handles ref forwarding', () => {
    const ref = vi.fn()

    render(<CurrencyInput ref={ref} data-testid="currency-input" />)

    expect(ref).toHaveBeenCalled()
  })

  it('supports different currency codes', () => {
    const currencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL']
    const symbols = ['€', '£', '¥', 'C$', 'A$', 'CHF', '¥', '₹', 'R$']

    currencies.forEach((currency, index) => {
      const { unmount } = render(
        <CurrencyInput currency={currency} data-testid="currency-input" />
      )

      expect(screen.getByText(symbols[index])).toBeInTheDocument()
      unmount()
    })
  })

  it('falls back to currency code when symbol not found', () => {
    render(<CurrencyInput currency="XYZ" data-testid="currency-input" />)

    expect(screen.getByText('XYZ')).toBeInTheDocument()
  })
})

describe('CurrencyInput Integration', () => {
  it('works with form elements', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault())

    render(
      <form onSubmit={handleSubmit}>
        <CurrencyInput name="amount" data-testid="currency-input" />
        <button type="submit">Submit</button>
      </form>
    )

    const inputElement = screen.getByTestId('currency-input')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(inputElement, { target: { value: '1234.56' } })
    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard navigation', () => {
    const handleChange = vi.fn()

    render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')

    // Focus the input
    inputElement.focus()
    expect(inputElement).toHaveFocus()

    // Simulate keyboard input
    fireEvent.change(inputElement, { target: { value: '1234.56' } })

    expect(handleChange).toHaveBeenCalledWith(1234.56)
  })
})

describe('CurrencyInput Accessibility', () => {
  it('supports aria-label', () => {
    render(<CurrencyInput aria-label="Enter amount" data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('aria-label', 'Enter amount')
  })

  it('supports aria-describedby', () => {
    render(<CurrencyInput aria-describedby="description" data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('aria-describedby', 'description')
  })

  it('supports role attribute', () => {
    render(<CurrencyInput role="spinbutton" data-testid="currency-input" />)

    const inputElement = screen.getByTestId('currency-input')
    expect(inputElement).toHaveAttribute('role', 'spinbutton')
  })
})
