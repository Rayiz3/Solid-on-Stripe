import type * as stripeJs from '@stripe/stripe-js'
import type { Component } from 'solid-js'
import { mergeProps, splitProps } from 'solid-js'
import { createWrapper } from '../primitives/createWrapper'
import { createStripeElement } from '../primitives/createStripeElement'
import type { ElementProps } from '../Types'

export type CardNumberElementProps = ElementProps<'cardNumber', stripeJs.StripeCardNumberElementChangeEvent> & stripeJs.StripeCardNumberElementOptions

// textbox for card number
const CardNumber: Component<CardNumberElementProps> = (props: CardNumberElementProps) => {
  const [wrapper, setWrapper] = createWrapper()

  const defaultValues = {
    classes: {},
    style: {},
    placeholder: 'Card number',
    disabled: false,
    showIcon: true,
    iconStyle: 'default',
  }
  const merged = mergeProps(defaultValues, props)
  const [options] = splitProps(merged, Object.keys(defaultValues) as Array<keyof typeof defaultValues>)

  createStripeElement(
    wrapper,
    'cardNumber',
    options,
    (type, event) => props[type]?.(event),
  );

  (CardNumber as any).__elementType = 'cardNumber'

  return <div class={props.class} ref={setWrapper} />
}

export default CardNumber