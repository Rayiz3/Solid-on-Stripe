import { createEffect, createSignal, Show, type Component } from 'solid-js';
import { style } from '@macaron-css/core';

import { size } from '../property/Size';
import { fonts } from '../property/Styles';
import { links } from '../property/Links';
import { themeSys } from '../system/Theme';
import Goback from '../components/Goback';

const container = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    fontFamily: fonts.page,
    fontSize: size.fontSizes.sm,

    backgroundColor: themeSys.state.bg1,

    height: "100vh",
    width: "100vw",
    WebkitFontSmoothing: "antialiased",
})
  
const description = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: size.button.long,
    height: "100",
    backgroundColor: themeSys.state.bg2,

    padding: `${size.space.xxl}px 0 ${size.space.xxl+10}px 0`,
    borderRadius: `${size.radius.sm}px ${size.radius.sm}px 0 0`,
})

const descriptionText = style({
    fontWeight: size.fontWeight.normal,
    fontSize: size.fontSizes.xs,
    lineHeight: size.fontSizes.md,
    color: themeSys.state.text,
    margin: 0,
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

const messageStyle = style({
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.154px',
    color: themeSys.state.text,
    height: '100%',
    width: '100%',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    background: '#556cd6',
    transition: 'all 0.2s ease',
    boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
    borderRadius: '0 0 6px 6px',
    cursor: 'pointer',
    border: 0
})

const ProductDisplay: Component = () => {
    return (
        <div class={container}>
            <div class={description}>
                {/* such parts require coded-products */}
                <h3 class={descriptionText}>Starter plan</h3>
                <h5 class={descriptionText}>$5.00 / month</h5>
            </div>
            <form action={links.serverAddress + "/create-checkout-session"} method="post">
                {/*  lookup_keys : server can search the price with these lookup_keys  */}
                {/*  You can specify up to 10 lookup_keys.                             */}
                <input type="hidden" name="lookup_key" value="test_sub" />
                <button class={checkoutButton} type="submit">
                    Subscribe
                </button>
            </form>
            <Goback />
        </div>
    )
}

const SubscriptionCodePage: Component = () => {
    const [message, setMessage] = createSignal<string>('');
    const [success, setSuccess] = createSignal<boolean>(false);
    const [sessionId, setSessionId] = createSignal<string>('');

    createEffect(() => {
        const query = new URLSearchParams(window.location.search)
        console.log(query)

        if (query.get('success')){
            setSuccess(true)
            setSessionId(query.get('session_id')!)
        }
        else if (query.get('canceled')) {
            setSuccess(false);
            setMessage("Order canceled -- continue to shop around and checkout when you're ready.")
        }
    })

    return(
        <Show when={!success() && !message()}
            fallback={
            <div class={messageStyle}>{message()}</div>
            }>
            <ProductDisplay />
        </Show>
    )
};
export default SubscriptionCodePage;