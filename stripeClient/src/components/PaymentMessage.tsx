import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { paymentSys } from '../system/Payment';
import { style } from '@macaron-css/core';

const redirectMessage = style({
  color: "rgb(105, 115, 134)",
  fontSize: "16px",
  lineHeight: "20px",
  paddingTop: "12px",
  textAlign: "center",
})

const RedirectMessage: Component = () => {
    console.log('in RedirectMessage', paymentSys.message())
    return (
        <Show when={paymentSys.message()}>
            <div class={redirectMessage}>{paymentSys.message()}</div>
        </Show>
    )
}

export default RedirectMessage;