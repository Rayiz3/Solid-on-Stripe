import type { Component } from 'solid-js';
import { style } from '@macaron-css/core';

import { themeSys } from '../system/Theme';
import PricingTable from '../components/PricingTable';
import Goback from '../components/Goback';

const container = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",

    backgroundColor: themeSys.state.bg1,

    width: "100vw",
    height: "100vh",
})

// pricing table id : see https://dashboard.stripe.com/test/pricing-tables/prctbl_1Pgjc0G1Ea829cAumRKcl1OB
// publishable-key : keys.public.Audai
const PaymentDashboardPage: Component = () => {
    return(
        <div class={container}>
            <PricingTable payType='payment'/>
            <Goback />
        </div>
    )
};

export default PaymentDashboardPage;
