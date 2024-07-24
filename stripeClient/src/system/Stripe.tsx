import { createSignal, Accessor, Setter } from 'solid-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { keys } from '../property/Keys';
import { links } from '../property/Links';
import { elementStyle } from "../property/Styles"


class StripeSys {
    stripe: Accessor<Stripe | null>
    setStripe: Setter<Stripe | null>
    clientSecret: Accessor<string>
    setClientSecret: Setter<string>
    elements: Accessor<StripeElements|null>
    setElements: Setter<StripeElements|null>
    sampleData = {
        items: [
            {
                id: "sample",
            },
        ],
    }

    constructor() {
        ([this.stripe, this.setStripe] = createSignal<Stripe|null>(null)),
        ([this.clientSecret, this.setClientSecret] = createSignal<string>("")),
        ([this.elements, this.setElements] = createSignal<StripeElements | null>(null))
    }

    // initialize : get stripe, client secret
    //     stripe - entrypoint to the rest of the Stripe.js SDK.
    //     client secret - string value that is used for user identification
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

    // getElements : make element instance using client secret & styles
    //     element - object for payment UI (payment element, express check, etc.)
    getElements = () => {
        if(stripeSys.stripe() && stripeSys.clientSecret() && !this.elements()){
            const instance = stripeSys.stripe()!.elements({
                clientSecret: stripeSys.clientSecret()!,
                appearance: elementStyle,
            })
            this.setElements(instance)
        }
    }
}

export const stripeSys = new StripeSys()