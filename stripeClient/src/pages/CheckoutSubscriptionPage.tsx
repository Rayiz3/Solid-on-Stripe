import type { Component } from 'solid-js';
import { style } from '@macaron-css/core';

import { themeSys } from '../system/Theme';
import PricingTableCheckout from '../components/PricingTable/PricingTableCheckout';
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

const CheckoutSubscriptionPage: Component = () => {
    return(
        <div class={container}>
            <PricingTableCheckout payType="subscription"/>
            <Goback />
        </div>
    )
};
export default CheckoutSubscriptionPage;