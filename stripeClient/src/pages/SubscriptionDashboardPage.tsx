import type { Component } from 'solid-js';
import { style } from '@macaron-css/core';

import { themeSys } from '../system/Theme';
import { size } from '../property/Size';
import { links } from '../property/Links';
import PricingTable from '../components/PricingTable';

const container = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",

    backgroundColor: themeSys.state.bg1,

    width: "100vw",
    height: "100vh",
})

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

// pricing table id : see https://dashboard.stripe.com/test/pricing-tables/prctbl_1PgGdoG1Ea829cAuivcJYiGE
// publishable-key : keys.public.Audai
const SubscriptionDashboardPage: Component = () => {
    return(
        <div class={container}>
            <PricingTable/>
            <button class={goback} onClick={() => window.location.href = links.localhost}>go back</button>
        </div>
    )
};

export default SubscriptionDashboardPage;
