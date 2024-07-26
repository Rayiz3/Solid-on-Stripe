import { createEffect, createSignal, Show, type Component } from 'solid-js';
import { style } from '@macaron-css/core';

import { themeSys } from '../system/Theme';
import PricingTableCode from '../components/PricingTableCode';
import Goback from '../components/Goback';
import RedirectPage from './RedirectPage';

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

const SubscriptionCodePage: Component = () => {
    const [success, setSuccess] = createSignal<boolean>(false);
    const [sessionId, setSessionId] = createSignal<string>("");

    createEffect(() => {
        const query = new URLSearchParams(window.location.search)
        
        // when payment successes
        if (query.get('success')){
            setSuccess(true);
            setSessionId(query.get('session_id')!);
        }
        
        // when user goes back to the previous page (here)
        if (query.get('canceled')) {
            setSuccess(false);
        }
    })

    return(
        <div class={container}>
            <Show when={!success()} fallback={<RedirectPage pageFrom='subscriptionCode' sessionId={sessionId()}/>}>
                <PricingTableCode />
                <Goback />
            </Show>
        </div>
    )
};
export default SubscriptionCodePage;