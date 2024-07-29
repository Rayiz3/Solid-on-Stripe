import { createEffect, createSignal, Show, type Component } from 'solid-js';
import { style } from '@macaron-css/core';

import { themeSys } from '../system/Theme';
import PricingTableCode from '../components/PricingTableCode';
import Goback from '../components/Goback';
import { useNavigate } from '@solidjs/router';

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
    const [sessionId, setSessionId] = createSignal<string>("");
    const navigate = useNavigate();

    createEffect(() => {
        const query = new URLSearchParams(window.location.search)
        
        // when payment successes
        if (query.get('success')){
            setSessionId(query.get('session_id')!);
            navigate('/redirection', {replace: true, state: {sessionId: sessionId(), pageFrom: `${query.get('mode')}Code`}})
        }
    })

    return(
        <div class={container}>
            <PricingTableCode payType="subscription"/>
            <Goback />
        </div>
    )
};
export default SubscriptionCodePage;