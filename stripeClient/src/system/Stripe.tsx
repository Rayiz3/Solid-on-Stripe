import { createSignal, Accessor, Setter } from 'solid-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { keys } from '../property/Keys';

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

    // GetStripe : load Stripe from public key 
    getStripe = async () => {
        const result = await loadStripe(keys.publicAudai);
        this.setStripe(result!);
    }

    // GetPaymentIntent : get client secret from server
    getPaymentIntent = async () => {
        const res = await fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.sampleData),
        }).then((res) => res.json())
        
        this.setClientSecret(res.clientSecret);
    }

    // GetClientSecret : get string typed client scret
    getClientSecret = () => {
        return this.clientSecret();
    }
}

export const stripeSys = new StripeSys()