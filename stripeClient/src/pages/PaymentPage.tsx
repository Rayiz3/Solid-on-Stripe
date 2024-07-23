import type { Component } from 'solid-js';
import { createEffect, onMount, Show } from 'solid-js';
import { style } from '@macaron-css/core';
import { stripeSys } from '../system/Stripe';
import CheckoutForm from '../components/CheckoutForm';

const container = style({
  fontFamily: "-apple-getSystemErrorMap, BlinkMacSystemFont, sans-serif",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  height: "100vh",
  width: "100vw",
  WebkitFontSmoothing: "antialiased",
})

const PaymentPage: Component = () => {
  // Make sure to call loadStripe only once to avoid recreating the Stripe object on every render.
  onMount(async () => await stripeSys.initialize());

  // Make element instance when stripe object is generated.
  createEffect(() => elementSys.getElements())

  // Pass the resulting promise from loadStripe & clientSecret to the <Elements> provider.
  // For details, see src/components/Elements.tsx
  // <Elements>
  //    Parameter     | Type                   | Default value  | Description
  // ========================================================================================================================== 
  //    stripe:         Stripe | null
  //    clientSecret?:  string                   = undefined      
  //    theme?:         Appearance['theme']      = 'stripe'       Main style of Payment Element UI
  //    variables?:     Appearance['variables']  = {}             Customize the Payment Element UI : color scheme, font, etc.
  //    rules?:         Appearance['rules']      = {}
  //    options?:       Record<string, any>
  //    labels?:        Appearance['labels']     = 'above'
  //    children?:      JSX.Element

  return (
    <div class={container}>
      <Show when={stripeSys.clientSecret()} fallback={<div>Loading stripe...</div>}>
        <CheckoutForm />
      </Show>
    </div>
  );
};

export default PaymentPage;
