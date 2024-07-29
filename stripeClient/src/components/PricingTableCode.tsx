import { Show, type Component } from "solid-js"
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

const PricingTableCode: Component<{payType: "payment" | "subscription"}> = (props) => {
    return (
        <div class={container}>
            <Show when={props.payType === "payment"}>
                <Plan name='Starter Product' price={10.00} lookupKey="test_prod_1000" payType="payment"/>
                <Plan name='Advanced Product' price={20.00} lookupKey="test_prod_2000" payType="payment"/>
            </Show>
            <Show when={props.payType === "subscription"}>
                <Plan name='Starter Plan' price={5.00} interval="Month" lookupKey="test_sub_500pm" payType="subscription"/>
                <Plan name='Advanced Plan' price={7.50} interval="Month" lookupKey="test_sub_750pm" payType="subscription"/>
            </Show>
        </div>
    )
}

export default PricingTableCode