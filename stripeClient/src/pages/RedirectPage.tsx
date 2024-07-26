import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js';
import { useLocation } from '@solidjs/router';

import { style } from '@macaron-css/core';
import { links } from '../property/Links';
import { size } from '../property/Size';
import { themeSys } from '../system/Theme';
import Goback from '../components/Goback';

type pageFromType = 'payment' | 'subscriptionCode' | 'subscriptionDashboard'

const container = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: themeSys.state.bg1,

    width: '100vw',
    height: '100vh',

    color: themeSys.state.text,
    fontSize: "16px",
    lineHeight: "20px",
    paddingTop: "12px",
    textAlign: "center",
})

const RedirectPage: Component = () => {
  const location = useLocation()
  const state = location.state as {sessionId: string, pageFrom: pageFromType}

  return (
    <div class={container}>
      <div>Payment succeeded!</div>
      <Switch>
        <Match when={state.pageFrom === 'subscriptionCode'}>
          <form class="getPortal" action={links.serverAddress + "/create-portal-session"} method="post">
            <input type="hidden" name="session_id" value={state.sessionId}/>
            <button type="submit"> Manage your billing information </button>
          </form>
        </Match>
      </Switch>
      <Goback/>
    </div>
  )
}

export default RedirectPage