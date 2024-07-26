import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js';

import { style } from '@macaron-css/core';
import { links } from '../property/Links';
import { size } from '../property/Size';
import { themeSys } from '../system/Theme';

interface pageFromType {
  pageFrom: 'payment' | 'subscriptionCode' | 'subscriptionDashboard'
  sessionId?: string
}

const redirectMessage = style({
    color: themeSys.state.text,
    fontSize: "16px",
    lineHeight: "20px",
    paddingTop: "12px",
    textAlign: "center",

    margin: size.space.section,
  })

const RedirectPage: Component<pageFromType> = (props: pageFromType) => {
  return (
    <>
      <div class={redirectMessage}>Payment succeeded!</div>
      <Switch>
        <Match when={props.pageFrom === 'subscriptionCode'}>
          <form class="getPortal" action={links.serverAddress + "/create-portal-session"} method="post">
            <input type="hidden" name="session_id" value={props.sessionId}/>
            <button type="submit"> Manage your billing information </button>
          </form>
        </Match>
      </Switch>
    </>
  )
}

export default RedirectPage