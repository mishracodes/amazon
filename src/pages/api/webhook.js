import { buffer } from 'micro';
import * as admin from 'firebase-admin';
var serviceAccount = require("../../../permissions.json");

//secure firebase connection to backend
const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}) : admin.app()

const handleCheckoutSucceeded = async (session) => {

  
  return app.firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders").doc(session.id).set({
      amount_subtotal: session.amount_subtotal / 100,
      amount_total: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      currency: session.currency,
      customer_details:session.customer_details,
      payment_status:session.payment_status,
      shipping_details:session.shipping_details,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),

    }).then(() => {
      console.log(`SUCCESS oder having order id: ${session.id} has been added to the database`);

    }).catch((err)=>{console.log(`errr happened ${err.message}`);
    })
}

//establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET
export default async (req, res) => {
  if (req.method == 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString()
    const sig = req.headers["stripe-signature"]

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }


    if (event.type === 'checkout.session.completed') { 
      const paymentIntent = event.data.object;
    return handleCheckoutSucceeded(paymentIntent)
    .then(() => { res.status(200) })
    .catch((err)=>res.status(400).send(`webhook error ${err.message}`));
    }
    
  }



}

export const config={
  api:{
    bodyParser:false,
    externalResolver:true
  }
}