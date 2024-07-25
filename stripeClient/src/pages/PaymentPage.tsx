import type { Component } from 'solid-js';
import { onMount, Show } from 'solid-js';
import { style } from '@macaron-css/core';

import { size } from '../property/Size';
import { fonts } from '../property/Styles';
import { stripeSys } from '../system/Stripe';
import { themeSys } from '../system/Theme';
import CheckoutForm from '../components/CheckoutForm';
import Goback from '../components/Goback';

const container = style({
  fontFamily: fonts.page,
  fontSize: size.fontSizes.sm,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  WebkitFontSmoothing: "antialiased",

  backgroundColor: themeSys.state.bg1,
  color: themeSys.state.text,
})

const PaymentPage: Component = () => {
  // Make sure to call loadStripe only once to avoid recreating the Stripe object on every render.
  onMount(async () => stripeSys.initialize());

  return (
    <div class={container}>
      <Show when={stripeSys.clientSecret()} fallback={<div>Loading stripe...</div>}>
        <CheckoutForm />
      </Show>
      <Goback />
    </div>
  );
};

export default PaymentPage;
