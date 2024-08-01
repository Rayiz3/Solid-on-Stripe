# Stripe-on-Solid
This is an unofficial implementation of Stripe payment system with SolidJS.

The basic reference is **Solid Stripe**, the 3rd-party package which implements Stripe on SolidJS.

See details on the [Solid Stripe website](https://solid-stripe.vercel.app/).

# Client side running
```bash
$ cd stripeClient
$ npm start
```

# Server side running
```bash
$ cd stripeServer
$ python server.py
```

For running webhook on your local testing, you need Stripe CLI.

If you already has installed Stripe CLI, run the following command on your Stripe directory:
```bash
$ .\stripe listen --forward-to localhost:4242/webhook
```
Then it will give you a endpoint_secret.
