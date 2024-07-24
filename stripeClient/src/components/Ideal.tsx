import type { Component } from 'solid-js'
import type { StripeIdealBankElementOptions } from '@stripe/stripe-js'
import { mergeProps, splitProps } from 'solid-js'
import { createWrapper } from '../primitives/createWrapper'
import { createStripeElement } from '../primitives/createStripeElement'
import type { ElementProps } from '../Types'

export type IdealBankElementProps = ElementProps<'idealBank'> & StripeIdealBankElementOptions

// for iDEAL payments
const Ideal: Component<IdealBankElementProps> = (props: IdealBankElementProps) => {
  const [wrapper, setWrapper] = createWrapper()

  const defaultValues = {
    classes: {},
    style: {},
    value: '',
    disabled: false,
    hideIcon: true,
  }
  const merged = mergeProps(defaultValues, props)
  const [options] = splitProps(merged, Object.keys(defaultValues) as Array<keyof typeof defaultValues>)

  createStripeElement(
    wrapper,
    'idealBank',
    options,
    (type, event) => props[type]?.(event),
  );

  (Ideal as any).__elementType = 'idealBank'

  return <div class={props.class} ref={setWrapper} />
}

export default Ideal