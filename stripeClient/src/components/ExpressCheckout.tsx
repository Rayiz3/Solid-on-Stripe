import type { Component } from 'solid-js'
import type { ElementProps } from '../Types'
import { createWrapper } from '../primitives/createWrapper'
import { createStripeElement } from '../primitives/createStripeElement'
import { optionExpressCheckout } from '../property/LayoutOptions'
import { StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js'

export type ExpressCheckoutProps = ElementProps<'expressCheckout', StripeExpressCheckoutElementConfirmEvent>

// payment request for single integration for Apple pay, Google pay, Microsoft pay, etc.
export const ExpressCheckout: Component<ExpressCheckoutProps> = (props) => {
  const [wrapper, setWrapper] = createWrapper()      

  createStripeElement(
    wrapper,
    'expressCheckout',
    optionExpressCheckout,
    (type, event) => props[type]?.(event),
  );

  (ExpressCheckout as any).__elementType = 'expressCheckout'

  return <div class={props.class} ref={setWrapper} />
}