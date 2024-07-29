import { Route } from '@solidjs/router'

import SelectionPage from './SelectionPage'
import RedirectPage from './RedirectPage'
import PaymentPage from './PaymentPage'
import PaymentDashboardPage from './PaymentDashboardPage'
import SubscriptionDashboardPage from './SubscriptionDashboardPage'
import SubscriptionCodePage from './SubscriptionCodePage'

const Pages = () => {
  return (
    <>
      <Route path="/" component={SelectionPage} />
      <Route path="/redirection" component={RedirectPage} />
      <Route path="/paymentCode" component={PaymentPage} />
      <Route path="/paymentDashboard" component={PaymentDashboardPage} />
      <Route path="/subscribeCode" component={SubscriptionCodePage} />
      <Route path="/subscribeDashboard" component={SubscriptionDashboardPage} />
    </>
  )
}

export default Pages