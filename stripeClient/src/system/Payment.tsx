import { createSignal, Accessor, Setter } from 'solid-js';
import { Stripe, StripeElements, StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js';
import { stripeSys } from './Stripe';
import { CardNumber } from '../components/CardNumber';
import { CardCvc } from '../components/CardCvc';
import { Iban } from '../components/Iban';
import { Ideal } from '../components/Ideal';
import { links } from '../property/Links';

class PaymentSys {
    message: Accessor<string | null>
    setMessage: Setter<string | null>
    isLoading: Accessor<boolean>
    setIsLoading: Setter<boolean>
    constructor() {
        // Initialize some state to keep track of the payment, show errors, and manage the user interface.
        ([this.message, this.setMessage] = createSignal<string|null>(null)),
        ([this.isLoading, this.setIsLoading] = createSignal<boolean>(false))
    }

    // redirect : whenever the Signal stripe() is changed, shows redirection page and prints payment message
    redirect(stripe: Stripe | null){
        if (!stripe){
            return
        }
        
        // When Stripe redirects the customer to the "return_url",
        // the "payment_intent_client_secret" query parameter is appended by Stripe.js.
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        // We can get the "payment_intent_client_secret" and varify whether it is valid
        if (!clientSecret) {
            return;
        }

        // Use" payment_intent_client_secret" to retrieve the PaymentIntent status update
        // and determine what to show to the customer.
        stripe!.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent!.status) {
            case "succeeded":
                this.setMessage("Payment succeeded!");
                break;
            case "processing":
                this.setMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                this.setMessage("Your payment was not successful, please try again.");
                break;
            default:
                this.setMessage("Something went wrong.");
                break;
            }
        });
        console.log('redirect() done',this.message())
    }

    // handleSubmit : handler for <PaymentElement> & <LinkAuthenticationElement>
    handleSubmit = async (e: Event) => {
        e.preventDefault();

        if (!stripeSys.stripe() || !stripeSys.elements()) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        this.setIsLoading(true);
    
        // call confirmPayment with the PaymentElement
        const { error } = await stripeSys.stripe()!.confirmPayment({
          elements: stripeSys.elements()!,
          confirmParams: {
            // return_url indicates where Stripe redirects the user after they complete the payment.
            // Make sure to change this to your payment completion page
    
            // For payments that require authentication, Stripe displays a modal for 3D Secure authentication
            // or redirects the customer to an authentication page, depending on the payment method.
            // After the customer completes the authentication process, they’re redirected to the return_url.
            return_url: links.redirection,
            // more about confirmParams : https://docs.stripe.com/js/payment_intents/confirm_payment
          },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            this.setMessage(error.message as string);
        } else {
            this.setMessage("An unexpected error occurred.");
        }
    
        this.setIsLoading(false);
    }

    // handExpressCheckout : handler for <ExpressCheckout>
    handleExpressCheckout = async () => {
        if (!stripeSys.stripe() || !stripeSys.elements()) {
            return;
        }

        this.setIsLoading(true);

        const { error } = await stripeSys.stripe()!.confirmPayment({
            elements: stripeSys.elements()!,
            clientSecret: stripeSys.clientSecret(),
            confirmParams: {
                return_url: links.redirection,
            }
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            this.setMessage(error.message as string);
        } else {
            this.setMessage("An unexpected error occurred.");
        }
    
        this.setIsLoading(false);
    }

    // handleCardSubmit : handler for <CardNumber> & <CardExpiry> & <CardCvc>. I don't know why it does not work on <Card> :(
    handleCardSubmit = async (e: Event) => {
        e.preventDefault();

        if (!stripeSys.stripe() || !stripeSys.elements()) {
            return;
        }

        this.setIsLoading(true);
        
        const { error } = await stripeSys.stripe()!.confirmCardPayment(stripeSys.clientSecret(), {
            payment_method: {
                card: stripeSys.elements()!.getElement(CardNumber)!,
                billing_details: {
                    // address : { city, country, line1, line2, postal_code, state }
                    // email : string | null
                    // name : string | null
                    // phone : string | null
                },
                // more about payment_method : https://docs.stripe.com/api/payment_methods
            },
            return_url: links.redirection,
            // more about confirmCardPayment : https://docs.stripe.com/js/payment_intents/confirm_card_payment
        })

        if(error){
            this.setMessage(error.message as string);
        }
        
        this.setIsLoading(false);
    }

    // handlerSEPASubmit : handler for <Iban>. It requires billing_details: { name: string, email: string }
    handleSEPASubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const { error } = await stripeSys.stripe()!.confirmSepaDebitPayment(stripeSys.clientSecret(), {
            payment_method: {
                sepa_debit: stripeSys.elements()!.getElement(Iban)!,
                billing_details: {
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                }
            },
            return_url: links.redirection,
        })
    }
    
    // handlerIdealSubmit : handler for <Ideal>
    handleIdealSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const { error } = await stripeSys.stripe()!.confirmIdealPayment(stripeSys.clientSecret(), {
            payment_method: {
                ideal: stripeSys.elements()!.getElement(Ideal)!
            },
            return_url: links.redirection,
        })
    }
}

export const paymentSys = new PaymentSys()