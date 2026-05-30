const Razorpay = require("razorpay")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.createOrder = async (req, res) => {

  try {

    const options = {
      amount: 500 * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    }

    const order =
      await razorpay.orders.create(options)

    res.json(order)

  }

  catch (err) {

    res.status(500).json(err)

  }

}