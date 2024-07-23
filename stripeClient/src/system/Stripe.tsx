import { createSignal, Accessor, Setter } from 'solid-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { keys } from '../property/Keys';
import { links } from '../property/Links';

class StripeSys {
    stripe: Accessor<Stripe | null>
    setStripe: Setter<Stripe | null>
    clientSecret: Accessor<string>
    setClientSecret: Setter<string>
    sampleData = {
        items: [
            {
                id: "sample",
            },
        ],
    }

    constructor() {
        ([this.stripe, this.setStripe] = createSignal<Stripe|null>(null)),
        ([this.clientSecret, this.setClientSecret] = createSignal<string>(""))
    }

    // initialize : get stripe, client secret and elements
    //     stripe - entrypoint to the rest of the Stripe.js SDK.
    //     client secret - string value that is used for user identification
    //     element - object for payment UI (payment element, express check, etc.)
    initialize = () => {
        // load Stripe from public key 
        loadStripe(keys.publicAudai).then((res) => this.setStripe(res!))
        
        // get client secret from server
        fetch(links.requestToServer, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.sampleData),
        }).then((res) => res.json())
          .then((res) => this.setClientSecret(res.clientSecret))
    }
}

export const stripeSys = new StripeSys()