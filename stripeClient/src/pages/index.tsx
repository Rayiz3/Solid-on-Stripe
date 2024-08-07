import { Route } from '@solidjs/router'

import SelectionPage from './SelectionPage'
import RedirectPage from './RedirectPage'
import CustomFlowPage from './CustomFlowPage'
import CheckoutPaymentPage from './CheckoutPaymentPage'
import LinksPaymentPage from './LinksPaymentPage'
import LinksSubscriptionPage from './LinksSubscriptionPage'
import CheckoutSubscriptionPage from './CheckoutSubscriptionPage'

const Pages = () => {
  return (
    <>
      <Route path="/" component={SelectionPage} />
      <Route path="/redirection" component={RedirectPage} />
      <Route path="/customflow" component={CustomFlowPage} />
      <Route path="/checkoutpayment" component={CheckoutPaymentPage} />
      <Route path="/linkspayment" component={LinksPaymentPage} />
      <Route path="/checkoutsubscription" component={CheckoutSubscriptionPage} />
      <Route path="/linkssubscription" component={LinksSubscriptionPage} />
    </>
  )
}

export default Pages