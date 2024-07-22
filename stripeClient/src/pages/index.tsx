import { Route } from '@solidjs/router'

import PaymentPage from './PaymentPage'
import RedirectPage from './RedirectPage'

const Pages = () => {
  return (
    <>
      <Route path="/" component={PaymentPage} />
      <Route path="/redirection" component={RedirectPage} />
    </>
  )
}

export default Pages