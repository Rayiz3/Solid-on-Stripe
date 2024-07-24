import type { Component } from 'solid-js'
import type { ElementProps } from '../Types'
import { StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js'
import { createWrapper } from '../primitives/createWrapper'
import { createStripeElement } from '../primitives/createStripeElement'
import { optionExpressCheckout } from '../property/LayoutOptions'

export type ExpressCheckoutProps = ElementProps<'expressCheckout', StripeExpressCheckoutElementConfirmEvent>

// payment request for single integration for Apple pay, Google pay, Microsoft pay, etc.
const ExpressCheckout: Component<ExpressCheckoutProps> = (props: ExpressCheckoutProps) => {
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

export default ExpressCheckout