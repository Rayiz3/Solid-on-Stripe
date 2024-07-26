import { Route } from '@solidjs/router'

import SelectionPage from './SelectionPage'
import PaymentPage from './PaymentPage'
import RedirectPage from './RedirectPage'
import SubscriptionDashboardPage from './SubscriptionDashboardPage'
import SubscriptionCodePage from './SubscriptionCodePage'

const Pages = () => {
  return (
    <>
      <Route path="/" component={SelectionPage} />
      <Route path="/redirection" component={RedirectPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/subscribe" component={SubscriptionDashboardPage} />
      <Route path="/subscribeCode" component={SubscriptionCodePage} />
    </>
  )
}

export default Pages