import type { Component } from "solid-js"
import { style } from "@macaron-css/core"

import { themeSys } from "../system/Theme"
import { size } from "../property/Size"
import { links } from "../property/Links"

const goback = style({
    backgroundColor: themeSys.state.primary1,
    color: themeSys.state.bg2,
    fontSize: size.fontSizes.xxs,
    fontWeight: size.fontWeight.semiBold,
    lineHeight: size.fontSizes.xxs,

    border: 'none',
    borderRadius: size.radius.xs,

    width: 100,
    height: 50,

    margin: size.space.xl,

    ":hover": {
        filter: 'brightness(1.12)',
    }
})

const Goback: Component = () => {
    return(
        <button class={goback} onClick={() => window.location.href = links.localhost}>go back</button>
    )
}