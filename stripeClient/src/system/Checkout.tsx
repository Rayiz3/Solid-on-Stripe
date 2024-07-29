import { Navigator } from "@solidjs/router"
import { Accessor, createSignal, Setter } from "solid-js"

class CheckoutSys {
    sessionId: Accessor<string>
    setSessionId: Setter<string>

    constructor() {
        ([this.sessionId, this.setSessionId] = createSignal<string>(""))
    }

    handleCheckoutSubmit = (navigate: Navigator) => {
        const query = new URLSearchParams(window.location.search)

        // when payment successes
        if (query.get('success')){
            this.setSessionId(query.get('session_id')!);
            navigate('/redirection', {replace: true,
                                      state: {sessionId: this.sessionId(),
                                              pageFrom: `${query.get('mode')}Code`}})
        }
    }
}

export const checkoutSys = new CheckoutSys()