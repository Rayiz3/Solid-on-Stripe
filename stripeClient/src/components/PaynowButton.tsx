import type { Component } from 'solid-js';
import { paymentSys } from '../system/Payment';
import { keyframes, style } from '@macaron-css/core';
import { stripeSys } from '../system/Stripe';
import { elementSys } from '../system/Element';
import { themeSys } from '../system/Theme';
import { fonts } from '../property/Styles';
import { size } from '../property/Size';

const paynowButton = style({
    display: "block",
    padding: size.space.lg,

    fontSize: size.fontSizes.xxs,
    fontWeight: size.fontWeight.semiBold,
    fontFamily: fonts.paynow,

    transition: size.transition.fast,
    boxSizing: 'border-box',
    boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
    borderRadius: size.radius.sm,
    backgroundColor: themeSys.state.primary1,
    color: themeSys.state.bg1,
    width: "100%",
    border: 'none',

    cursor: "pointer",

    ":hover": {
      filter: 'brightness(1.12)',
    },

    ":disabled": {
      opacity: size.opacity.lg,
      cursor: "default",
    }
  })
  
  const loading = keyframes({
    '0%': {
      WebkitTransform: "rotate(0deg)",
      transform: "rotate(0deg)",
    },
    '100%': {
      WebkitTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
    }
  })
  
  const paynowSpinner = style({
    borderRadius: "50%",
    color: "#ffffff",
    fontSize: size.fontSizes.md,
    textIndent: "-99999px",
    margin: "0px auto",
    position: "relative",
    width: size.space.xl,
    height: size.space.xl,
    boxShadow: "inset 0 0 0 2px",
    WebkitTransform: "translateZ(0)",
    msTransform: "translateZ(0)",
    transform: "translateZ(0)",
  
    ":before": { 
      height: "20.4px",
      background: themeSys.state.primary1,
      borderRadius: "20.4px 0 0 20.4px",
      top: "-0.2px",
      left: "-0.2px",
      WebkitTransformOrigin: "10.4px 10.2px",
      transformOrigin: "10.4px 10.2px",
      WebkitAnimation: `${loading} 2s infinite ease 1.5s`,
      animation: `${loading} 2s infinite ease 1.5s`,
    },
    ":after": {
      height: "10.2px",
      background: themeSys.state.primary1,
      borderRadius: "0 10.2px 10.2px 0",
      top: "-0.1px",
      left: "10.2px",
      WebkitTransformOrigin: "0px 10.2px",
      transformOrigin: "0px 10.2px",
      WebkitAnimation: `${loading} 2s infinite ease`,
      animation: `${loading} 2s infinite ease`,
    },
    selectors: {
      '&:before, &:after': {
        borderRadius: "50%",
        position: "absolute",
        content: '',
        width: "10.4px",
      }
    }
  })

const PaynowButton: Component = () => {
    return (
        <button disabled={paymentSys.isLoading() || !stripeSys.stripe() || !elementSys.elements()} class={paynowButton}>
            <span id="button-text">
                {paymentSys.isLoading() ? <div class={paynowSpinner} id="spinner"></div> : "Pay now"}
            </span>
        </button>
    )
}

export default PaynowButton;