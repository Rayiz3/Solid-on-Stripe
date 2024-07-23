/* this is legacy feature! use Express Checkout Element instead */
import type {
  PaymentRequestOptions,
  PaymentRequestPaymentMethodEvent,
  StripePaymentRequestButtonElementOptions,
} from '@stripe/stripe-js'
import type { Component, Setter } from 'solid-js'
import { createEffect, mergeProps, onCleanup } from 'solid-js'
import type { ElementProps } from '../Types'
import { stripeSys } from '../system/Stripe'
import { elementSys } from '../system/Element'

export type PaymentRequestButtonProps = ElementProps<'paymentRequestButton'>
& Omit<StripePaymentRequestButtonElementOptions, 'paymentRequest'>
& {
  setCanMakePayment?: Setter<boolean>
  paymentRequest: PaymentRequestOptions
  onPaymentMethod: (payload: PaymentRequestPaymentMethodEvent) => void
}

// payment request for single integration for Apple pay, Google pay, Microsoft pay, etc.
export const PaymentRequestButton: Component<PaymentRequestButtonProps> = (props) => {
  let wrapper!: HTMLDivElement

  const merged = mergeProps(
    {
      classes: {},
      style: {},
    },
    props,
  )

  createEffect(() => {
    if (!stripeSys.stripe() && !elementSys.elements())
      return

    const paymentRequestObject = stripeSys.stripe()!.paymentRequest(props.paymentRequest)

    const element = elementSys.elements()!.create('paymentRequestButton', {
      classes: merged.classes,
      style: {
        paymentRequestButton: merged.style as any,
      },
      paymentRequest: paymentRequestObject,
    })

    paymentRequestObject.canMakePayment()
      .then((result) => {
        if (result) {
          props.setCanMakePayment?.(true)
          element?.mount(wrapper)
          paymentRequestObject.on('paymentmethod', (e) => {
            props.onPaymentMethod(e)
          })
        }
        else {
          props.setCanMakePayment?.(false)
          wrapper.style.display = 'none'
        }
      })

    onCleanup(() => {
      element.unmount()
    })
  });

  (PaymentRequestButton as any).__elementType = 'paymentRequestButton'

  return <div class={props.class} ref={wrapper} />
}
