import { createEffect, type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { style } from '@macaron-css/core';

import { themeSys } from '../system/Theme';
import { checkoutSys } from '../system/Checkout';
import PricingTableCode from '../components/PricingTableCode';
import Goback from '../components/Goback';

const container = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.154px',
    color: themeSys.state.text,

    height: '100vh',
    width: '100vw',
    
    backgroundColor : themeSys.state.bg1,
})

const PaymentCodePage: Component = () => {
    const navigator = useNavigate()
    
    createEffect(() => {
        checkoutSys.handleCheckoutSubmit(navigator)
    })

    return(
        <div class={container}>
            <PricingTableCode payType="payment"/>
            <Goback />
        </div>
    )
};
export default PaymentCodePage;