import type { Component } from "solid-js"
import { style } from "@macaron-css/core"

import { themeSys } from "../system/Theme"
import { fonts } from '../property/Styles';
import { size } from "../property/Size"
import Plan from './Plan';

const container = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    fontFamily: fonts.page,
    fontSize: size.fontSizes.sm,

    backgroundColor: themeSys.state.bg1,

    WebkitFontSmoothing: "antialiased",
    
})

const PricingTableCode: Component = () => {
    return (
        <div class={container}>
            <Plan name='Starter Plan' price={5.00} interval="Month" lookup_key="test_sub_500pm"/>
            <Plan name='Advanced Plan' price={7.50} interval="Month" lookup_key="test_sub_750pm"/>
        </div>
    )
}

export default PricingTableCode