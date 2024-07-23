import type { Component } from 'solid-js';
import { paymentSys } from '../system/Payment';
import { keyframes, style } from '@macaron-css/core';
import { stripeSys } from '../system/Stripe';
import { elementSys } from '../system/Element';

const paynowButton = style({
    background: "#5469d4",
    fontFamily: "Arial, sans-serif",
    color: "#ffffff",
    borderRadius: "4px",
    border: "0",
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "block",
    transition: "all 0.2s ease",
    boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
    width: "100%",
    ":hover": {
      filter: "contrast(115%)",
    },
    ":disabled": {
      opacity: "0.5",
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
    fontSize: "22px",
    textIndent: "-99999px",
    margin: "0px auto",
    position: "relative",
    width: "20px",
    height: "20px",
    boxShadow: "inset 0 0 0 2px",
    WebkitTransform: "translateZ(0)",
    msTransform: "translateZ(0)",
    transform: "translateZ(0)",
  
    ":before": { 
      height: "20.4px",
      background: "#5469d4",
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
      background: "#5469d4",
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