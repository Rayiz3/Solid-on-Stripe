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

// pricing table id : see https://dashboard.stripe.com/test/pricing-tables/prctbl_1PgGdoG1Ea829cAuivcJYiGE
// publishable-key : keys.public.Audai
const SubscriptionDashboardPage: Component = () => {
    return(
        <div class={container}>
            <PricingTable payType="subscribe"/>
            <Goback />
        </div>
    )
};

export default SubscriptionDashboardPage;
