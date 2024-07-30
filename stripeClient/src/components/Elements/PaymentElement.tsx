import type { Component } from 'solid-js'
import type { StripePaymentElementChangeEvent } from '@stripe/stripe-js'
import type { ElementProps } from '../../Types'
import { createWrapper } from '../../primitives/createWrapper'
import { createStripeElement } from '../../primitives/createStripeElement'
import { optionsPaymentElement } from '../../property/LayoutOptions'

export type PaymentElementProps = ElementProps<'payment', StripePaymentElementChangeEvent & { error: undefined }>

// payment method, card number, expiry, CVC and nation forms for payment
const PaymentElement: Component<PaymentElementProps> = (props: PaymentElementProps) => {
    const [wrapper, setWrapper] = createWrapper()

    createStripeElement(
        wrapper,
        'payment',
        optionsPaymentElement,
        (type, event) => props[type]?.(event),
    );

    (PaymentElement as any).__elementType = 'payment'

    return <div class={props.class} ref={setWrapper} />
}

export default PaymentElement