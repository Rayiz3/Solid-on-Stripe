import { Accessor, createSignal, Setter } from "solid-js"

class CheckoutSys {
    sessionId: Accessor<string>
    setSessionId: Setter<string>

    constructor() {
        ([this.sessionId, this.setSessionId] = createSignal<string>(""))
    }

    handleCheckoutSubmit = () => {
        const query = new URLSearchParams(window.location.search)
        // when payment successes
        if (query.get('success')){
            this.setSessionId(query.get('session_id')!);
        }
    }
}

export const checkoutSys = new CheckoutSys()