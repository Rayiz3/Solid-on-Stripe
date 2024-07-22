/* This file is no longer used */
import Stripe from "stripe";
import { keys } from "./property/Keys";

const stripe = new Stripe(keys.secretAudai);

const clientSecretFromServer = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional
    // because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
}).then((res) => res.client_secret);

export default clientSecretFromServer;