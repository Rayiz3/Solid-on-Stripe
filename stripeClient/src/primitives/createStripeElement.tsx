import type { StripeElementType, StripeElementsOptions } from '@stripe/stripe-js'
import type { Accessor } from 'solid-js'
import { createEffect, onCleanup } from 'solid-js'
import { stripeSys } from '../system/Stripe'

type FixMe = Record<string, any>
type NormalFn = () => StripeElementsOptions & FixMe

type MaybeAccessor<T> = T | Accessor<T>
type MaybeAccessorValue<T extends MaybeAccessor<any>> = T extends () => any
  ? ReturnType<T>
  : T
function access<T extends MaybeAccessor<any>>(v: T): MaybeAccessorValue<T> {
  return typeof v === 'function' && !v.length ? v() : v
}

export function createStripeElement(
  node: MaybeAccessor<HTMLDivElement | null>,
  elementType: StripeElementType,
  elementsOptions: MaybeAccessor<StripeElementsOptions & FixMe> | NormalFn = {},
  cb?: (eventType: 'onChange' | 'onReady' | 'onFocus' | 'onBlur' | 'onEscape' | 'onConfirm', ev: any) => void,
) {
  createEffect(() => {
    const mountOn = (newElement: any) => {
      newElement.mount(access(node) as HTMLDivElement)

      // common event for all type of elements
      newElement.on('ready', (e: any) => cb?.('onReady', e))
      newElement.on('focus', (e: any) => cb?.('onFocus', e))
      newElement.on('blur', (e: any) => cb?.('onBlur', e))
      newElement.on('escape', (e: any) => cb?.('onEscape', e))

      onCleanup(() => newElement.unmount())
    }
    
    if (!stripeSys.elements()){
      return;
    }
    // if the elements is expressCheckout, onConfirm event should be activated.
    if (elementType == 'expressCheckout') {
      const newElement = stripeSys.elements()!.create(elementType, access(elementsOptions) as any)
      
      mountOn(newElement)
      newElement.on('confirm', e => cb?.('onConfirm', e))
    }
    // otherwise, onChange event should be activated.
    else {
      const newElement = stripeSys.elements()!.create(elementType as any, access(elementsOptions) as any)

      mountOn(newElement)
      newElement.on('change', e => cb?.('onChange', e))
    }

  }, { defer: true })
}