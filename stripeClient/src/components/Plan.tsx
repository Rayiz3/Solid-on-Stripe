import type { Component } from "solid-js"
import { style } from "@macaron-css/core"

import { themeSys } from "../system/Theme"
import { fonts } from '../property/Styles';
import { size } from "../property/Size"
import { links } from "../property/Links"

type PlanType = {
    name: string,
    price: number,
    interval: "Day" | "Week" | "Month" | "Year",
    lookup_key: string,
}

const container = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    fontFamily: fonts.page,
    fontSize: size.fontSizes.sm,

    backgroundColor: themeSys.state.bg1,

    WebkitFontSmoothing: "antialiased",

    margin: size.space.section,
})
  
const description = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    fontWeight: size.fontWeight.normal,
    fontSize: size.fontSizes.xs,
    lineHeight: size.fontSizes.md,
    color: themeSys.state.text,

    width: size.button.long,
    height: "100",
    backgroundColor: themeSys.state.bg2,

    padding: `${size.space.xxl}px 0 ${size.space.xxl+10}px 0`,
    borderRadius: `${size.radius.sm}px ${size.radius.sm}px 0 0`,
})

const checkoutButton = style({
    width: size.button.long,
    height: size.button.lg,
    background: themeSys.state.primary1,

    color: themeSys.state.bg1,
    fontSize: size.fontSizes.xxs,
    fontWeight: size.fontWeight.semiBold,

    transition: size.transition.fast,
    boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
    borderRadius: `0 0 ${size.radius.sm}px ${size.radius.sm}px`,
    border: 'none',

    cursor: 'pointer',

    ':hover': {
        filter: 'brightness(1.12)',
    }
})

const Plan: Component<PlanType> = (props: PlanType) => {
    return (
        <div class={container}>
            <div class={description}>
                {/* such parts require coded-products */}
                <h3>{props.name}</h3>
                <h5>{`$ ${props.price.toFixed(2)} / ${props.interval}`}</h5>
            </div>
            <form action={links.serverAddress + "/create-checkout-session"} method="post">
                {/*  lookup_keys : server can search the price with these lookup_keys  */}
                {/*  You can specify up to 10 lookup_keys.                             */}
                <input type="hidden" name="lookup_key" value={props.lookup_key} />
                <button class={checkoutButton} type="submit">
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default Plan