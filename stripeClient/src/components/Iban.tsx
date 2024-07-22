import type { Component } from 'solid-js'
import { mergeProps, splitProps } from 'solid-js'
import type { StripeIbanElementChangeEvent, StripeIbanElementOptions } from '@stripe/stripe-js'
import { createWrapper } from '../primitives/createWrapper'
import { createStripeElement } from '../primitives/createStripeElement'
import type { ElementProps } from '../Types'

export type IbanElementProps = ElementProps<'iban', StripeIbanElementChangeEvent> & StripeIbanElementOptions

// for SEPA payments
export const Iban: Component<IbanElementProps> = (props) => {
  const [wrapper, setWrapper] = createWrapper()

  const defaultValues = {
    classes: {},
    style: {},
    supportedCountries: [],
    placeholderCountry: '',
    disabled: false,
    iconStyle: 'default',
  }
  const merged = mergeProps(defaultValues, props)
  const [options] = splitProps(merged, Object.keys(defaultValues) as Array<keyof typeof defaultValues>)

  createStripeElement(
    wrapper,
    'iban',
    options,
    (type, event) => props[type]?.(event),
  );

  (Iban as any).__elementType = 'iban'

  return (
    <>
      <div class={props.class} ref={setWrapper} />
    </>
  )
}
