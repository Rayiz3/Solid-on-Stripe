import { StripeElements } from "@stripe/stripe-js"
import { Accessor, createSignal, Setter } from "solid-js"
import { stripeSys } from "./Stripe"
import { elementStyle } from "../property/Styles"

class ElementSys {
    elements: Accessor<StripeElements|null>
    setElements: Setter<StripeElements|null>

    constructor() {
        ([this.elements, this.setElements] = createSignal<StripeElements | null>(null))
    }

    // getElements : make element instance using client secret and applied styles
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

export const elementSys = new ElementSys()