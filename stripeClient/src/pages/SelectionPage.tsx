import { Component } from 'solid-js'
import { style } from '@macaron-css/core';
import { themes, themeSys } from '../system/Theme';
import { size } from '../property/Size';
import { links } from '../property/Links';

const container = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: themeSys.state.bg1,

    width: '100vw',
    height: '100vh',
})

const selectionButton = style({
    backgroundColor: themeSys.state.primary1,
    color: themeSys.state.bg2,
    fontSize: size.fontSizes.sm,
    fontWeight: size.fontWeight.semiBold,

    border: 'none',
    borderRadius: size.radius.lg,

    padding: size.space.xxl,
    margin: size.space.xl,

    ":hover": {
        filter: 'brightness(1.12)',
    }
})

const SelectionPage: Component = () => {
    return (
        <div class={container}>
            <button class={selectionButton} onClick={() => window.location.href = links.localhost + "/payment"}>One-time payment (code)</button>
            <button class={selectionButton} onClick={() => window.location.href = links.localhost + "/subscribeCode"}>Subscription (code)</button>
            <button class={selectionButton} onClick={() => window.location.href = links.localhost + "/payment"}>One-time payment (dashboard)</button>
            <button class={selectionButton} onClick={() => window.location.href = links.localhost + "/subscribe"}>Subscription (dashboard)</button>
        </div>
    )
  }
  
export default SelectionPage