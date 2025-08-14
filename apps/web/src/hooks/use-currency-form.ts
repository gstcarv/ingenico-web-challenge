import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { currencyFormSchema, type CurrencyFormData } from '../lib/helpers/currency-schema'

export const useCurrencyForm = () => {
  const form = useForm<CurrencyFormData>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: {
      fromCurrency: '',
      toCurrency: '',
      amount: 0,
      date: undefined
    }
  })

  const onSubmit = (data: CurrencyFormData) => {
    console.log('Form submitted:', data)
    // TODO: Implement currency conversion logic
  }

  const handleSwapCurrencies = () => {
    const fromCurrency = form.getValues('fromCurrency')
    const toCurrency = form.getValues('toCurrency')
    
    form.setValue('fromCurrency', toCurrency)
    form.setValue('toCurrency', fromCurrency)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleSwapCurrencies,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors
  }
}
