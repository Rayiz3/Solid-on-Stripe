import type { LayoutOption, StripeExpressCheckoutElementOptions, StripePaymentElementOptions, LayoutObject } from "@stripe/stripe-js"
import { size } from "./Size"

// *** Layout for PaymentElement *** //

export const LayoutStylesPaymentElement: { [style: string]: LayoutObject } = {
    tabs: {
        type: 'tabs',
        defaultCollapsed: false,
    },
    tabsCollapsed: {
        type: 'tabs',
        defaultCollapsed: true,
    },
    accordionRadio: {
        type: 'accordion',
        defaultCollapsed: false,
        radios: true,
        spacedAccordionItems: false
      },
    accordion: {
        type: 'accordion',
        defaultCollapsed: false,
        radios: false,
        spacedAccordionItems: false
    },
}

export const optionsPaymentElement: StripePaymentElementOptions = {
    // Specify the layout for the Payment Element.
    layout: LayoutStylesPaymentElement.tabs,

    // Payment methods that are specified in here are shown first, followed by any additional payment methods.
    // If there are payment method types that Stripe wouldn’t show, they’re ignored.
    paymentMethodOrder: ['card', 'cash_app_pay', 'link', 'afterPay']
}


// *** Layout for ExpressCheckout *** //

export const LayoutStylesExpressCheckout: {[name: string]: LayoutOption} = {
    sample : {
        maxColumns : 3,
        maxRows : 1,
        overflow : "auto" // "auto" | "never" | undefined
    }
}
// type of paymentMethods
//  applePay:   'auto' | 'never' | 'always'
//  googlePay:  'auto' | 'never' | 'always'
//  amazonPay:  'auto' | 'never'
//  link:       'auto' | 'never'
//  paypal:     'auto' | 'never'

// type of buttonType
//  applePay :
//   | 'add-money'
//   | 'book'
//   | 'buy'
//   | 'check-out'
//   | 'contribute'
//   | 'donate'
//   | 'order'
//   | 'plain'
//   | 'reload'
//   | 'rent'
//   | 'subscribe'
//   | 'support'
//   | 'tip'
//   | 'top-up'
//  googlePay :
//   | 'book'
//   | 'buy'
//   | 'checkout'
//   | 'donate'
//   | 'order'
//   | 'pay'
//   | 'plain'
//   | 'subscribe'

// type of buttonTheme
//  applePay : 'black' | 'white' | 'white-outline'
//  googlePay : 'black' | 'white'
//  paypal : 'gold' | 'blue' | 'silver' | 'white' | 'black'

export const optionExpressCheckout: StripeExpressCheckoutElementOptions = {
    layout: LayoutStylesExpressCheckout.sample,
    wallets: {
        applePay: 'always',
        googlePay: 'always',
    },
    paymentMethods: {
        amazonPay: 'auto',
        applePay: 'always',
        googlePay: 'always',
        link: 'auto',
        paypal: 'auto',
    },
    paymentMethodOrder: ['link', 'googlePay', 'applePay', 'amazonPay'],
    buttonType: {
        googlePay: 'checkout',
        applePay: 'check-out',
    },
    buttonTheme: {
        applePay: 'white-outline',
    },
    buttonHeight: size.button.lg // defaults : 44px
}