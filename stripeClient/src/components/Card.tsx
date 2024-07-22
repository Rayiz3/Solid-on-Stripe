import type * as stripeJs from '@stripe/stripe-js'
import type { Component } from 'solid-js'
import { mergeProps, splitProps } from 'solid-js'
import { createWrapper } from '../primitives/createWrapper'
import { createStripeElement } from '../primitives/createStripeElement'
import type { ElementProps } from '../Types'

export type CardElementProps = ElementProps<'card', stripeJs.StripeCardElementChangeEvent> & stripeJs.StripeCardElementOptions

// textboxes for card information forms (number, expiry, cvc)
export const Card: Component<CardElementProps> = (props) => {
  const [wrapper, setWrapper] = createWrapper()

  const defaultValues = {
    classes: {},
    style: {},
    hidePostalCode: false,
    hideIcon: false,
    disabled: false,
    iconStyle: 'default',
  }
  const merged = mergeProps(defaultValues, props)

  const [options] = splitProps(merged, Object.keys(defaultValues) as Array<keyof typeof defaultValues>)

  createStripeElement(
    wrapper,
    'card',
    options,
    (type, event) => props[type]?.(event),
  );

  (Card as any).__elementType = 'card'

  return <div class={props.class} ref={setWrapper} />
}
