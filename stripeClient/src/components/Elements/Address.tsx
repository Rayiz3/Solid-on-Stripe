import type { Component } from 'solid-js'
import type { StripeAddressElementChangeEvent, StripeAddressElementOptions } from '@stripe/stripe-js'
import { mergeProps, splitProps } from 'solid-js'
import type { ElementProps } from '../../Types'
import { createWrapper } from '../../utility/createWrapper'
import { createStripeElement } from '../../utility/createStripeElement'

export type AddressProps = ElementProps<'address', StripeAddressElementChangeEvent & { error: any }> & StripeAddressElementOptions

// type StripeAddressElement:
//   mode: 'shipping' | 'billing' [REQUIRED]
//   allowedCountries?
//   autocomplete?
//   blockPoBox?
//   contacts?
//   ...
// for details, see node_modules/@stripe/stripe-js/dist/stripe-js/elements/address.d.ts
const Address: Component<AddressProps> = (props: AddressProps) => {
  const [wrapper, setWrapper] = createWrapper()

  const defaultValues = {
    classes: {},
    style: {},
    mode: 'billing',
    autocomplete: {
      mode: 'automatic',
    },
  }

  const merged = mergeProps(defaultValues, props)

  const [options] = splitProps(merged, Object.keys(defaultValues) as Array<keyof typeof defaultValues>)

  createStripeElement(
    wrapper,
    'address',
    options as any,
    (type, event) => props[type]?.(event),
  );

  (Address as any).__elementType = 'address'

  return <div class={props.class} ref={setWrapper} />
}

export default Address