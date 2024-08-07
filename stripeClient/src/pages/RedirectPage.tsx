import type { Component } from 'solid-js'
import { createEffect, Show } from 'solid-js';

import { style } from '@macaron-css/core';
import { links } from '../property/Links';
import { size } from '../property/Size';
import { themeSys } from '../system/Theme';
import { checkoutSys } from '../system/Checkout';
import Goback from '../components/Goback';

const container = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: themeSys.state.bg1,

    width: '100vw',
    height: '100vh',

    color: themeSys.state.text,
    fontSize: "16px",
    lineHeight: "20px",
    paddingTop: "12px",
    textAlign: "center",
})

const message = style({
    fontWeight: size.fontWeight.normal,
    fontSize: size.fontSizes.xs,
    lineHeight: size.fontSizes.md,
    color: themeSys.state.text,

    margin: size.space.section,
})

const portalButton = style({
  width: size.button.long,
  height: size.button.lg,
  background: themeSys.state.primary1,

  color: themeSys.state.bg1,
  fontSize: size.fontSizes.xxs,
  fontWeight: size.fontWeight.semiBold,

  transition: size.transition.fast,
  boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
  borderRadius: size.radius.sm,
  border: 'none',

  cursor: 'pointer',

  margin: size.space.section,

  ':hover': {
      filter: 'brightness(1.12)',
  }
})

const RedirectPage: Component = () => {

  createEffect(() => {
    checkoutSys.handleCheckoutSubmit()
  })

  return (
    <div class={container}>
      <div class={message}>Payment succeeded!</div>
        <Show when={checkoutSys.sessionId()}>
          <form class="getPortal" action={links.serverAddress + "/create-portal-session"} method="post">
            <input type="hidden" name="session_id" value={checkoutSys.sessionId()}/>
            <button class={portalButton} type="submit"> Manage your billing information </button>
          </form>
        </Show>
      <Goback/>
    </div>
  )
}

export default RedirectPage