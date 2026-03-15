const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { plan } = req.body

  const prices = {
    essential: {
      name: 'Cnect Essential Card',
      amount: 999, // $9.99
      description: '1 Smart NFC Card + Unlimited links + Custom profile',
    },
    pro: {
      name: 'Cnect Pro Card',
      amount: 1299, // $12.99
      description: '1 Premium Smart Card + Unlimited links + Tap analytics + Priority support',
    }
  }

  const selected = prices[plan] || prices.essential

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selected.name,
              description: selected.description,
              images: [],
            },
            unit_amount: selected.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      custom_fields: [
        {
          key: 'instagram',
          label: { type: 'custom', custom: 'Your Instagram handle (optional)' },
          type: 'text',
          optional: true,
        }
      ],
      metadata: {
        plan: plan,
      },
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
