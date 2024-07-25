import { Component } from 'solid-js'
import { style } from '@macaron-css/core';

const redirectMessage = style({
    color: "rgb(105, 115, 134)",
    fontSize: "16px",
    lineHeight: "20px",
    paddingTop: "12px",
    textAlign: "center",
  })

const RedirectPage: Component = () => {
  return (
    <>
        <div class={redirectMessage}>Payment succeeded!</div>
    </>
  )
}

export default RedirectPage