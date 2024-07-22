import type { Component } from 'solid-js';
import { createEffect, createSignal, Show } from "solid-js";
import { style } from '@macaron-css/core';
import { useStripe, useElements } from './Elements';
import { PaymentElement } from './PaymentElement';
import { paymentSys } from '../system/Payment';
import PaynowButton from './PaynowButton';
import { ExpressCheckout } from './ExpressCheckout';
import { LinkAuthenticationElement } from './LinkAuthenticationElement';
import { Address } from './Address';
import { Card } from './Card';
import { CardNumber } from './CardNumber';
import { CardExpiry } from './CardExpiry';
import { CardCvc } from './CardCvc';
import { Iban } from './Iban';
import { Ideal } from './Ideal';
import { stripeSys } from '../system/Stripe';

const fromContainer = style({
  width: "30vw",
  minWidth: "500px",
  alignSelf: "center",
  boxShadow: "0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)",
  borderRadius: "7px",
  padding: "40px",
})

const elementsMargin = style({
  marginBottom: "24px",
})

const linkAuthMargin = style({
  marginBottom: "48px",
})

const CheckoutForm: Component = () => {
  // Access the Stripe & StripeElement objects provided from the <Elements>
  // caution : ustStripe() and useElements() must be used in <Elements>
  const stripe = useStripe(); 
  const elements = useElements();

  // whenever the Signal stripe() is changed, shows redirection page and prints payment message
  createEffect(() => {
    paymentSys.redirect(stripe())
  });

  // <form> : When your customer clicks the pay button, call paymentSys.handleSubmit()
  // <PaymentElement> : embeds an iframe with a dynamic form that collects payment details for a variety of payment methods.
  //   For details, see src/components/PaymentElements.tsx
  return (
    <>
      <form class={fromContainer} onSubmit={(event) => paymentSys.handleSubmit(event, stripe(), elements())}>
        
          <ExpressCheckout class={elementsMargin} onConfirm={() => paymentSys.handleExpressCheckout(stripe(), elements())} />

          <LinkAuthenticationElement class={linkAuthMargin} defaultValues={ { email : 'foo@bar.com'} } />

          <PaymentElement class={elementsMargin} />

          {/*<Address mode={'shipping'} class={elementsMargin} />*/}

          {/*<Card class={elementsMargin}/>*/}

          {/*<CardNumber class={elementsMargin}/>*/}
          {/*<CardExpiry class={elementsMargin}/>*/}
          {/*<CardCvc class={elementsMargin}/>*/}

          {/*<Iban class={elementsMargin} supportedCountries={['SEPA']}/>*/}
          
          {/*<Ideal class={elementsMargin} />*/}

          <PaynowButton />
      </form>
      
    </>
  );

  // Stripe sends multiple events during the payment process and after the payment is complete.
  // Receiving the events and running actions are available using Dashboard webhook tool.
  // Stripe recommends handling these events:
  //     - payment_intent.succeeded
  //     - payment_intent.processing
  //     - payment_intent.payment_failed events.
  //
  // On the client, the customer could close the browser window or quit the app before the callback executes,
  // and malicious clients could manipulate the response.
}

export default CheckoutForm;