import moment from 'moment/moment'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import db from '../../firebase'
import Header from '../components/Header'
import Order from '../components/Order'

const orders = ({orders}) => {
  const { data: session } = useSession()

  return (
    <div>
        <Header/>
        <main className='max-w-screen-lg p-10 mx-auto'>
            <h1 className='text-3xl border-b mb-3 pb-1 border-yellow-400'>Your Orders</h1>
            {session?(
                <h2>Orders</h2>
            ):(
                <h2>Please login to see your orders</h2>
            )}
            <div className='mt-5 space-y-4'>
              {orders.map(e=><Order key={e.id} id={e.id} amount={e.amount} amountShipping={e.amountShipping} items={e.items} timestamp={e.timestamp} images={e.images} />)}
            </div>
        </main>
    </div>
  )
}

export default orders

export async function getServerSideProps(context){
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context)
   
    if(!session){
      return {
        props:{},
      };
    }

    const stripeOrders=await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp','desc').get();

    const orders = await Promise.all(
      stripeOrders.docs.map(async (order)=>({
        id:order.id,
        amount:order.data().amount_total,
        amountShipping:order.data().amount_shipping,
        images:order.data().images,
        timestamp:moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id,{limit:100})
        ).data,


      }))
    )

    return {
      props:{orders},
    };
    
  }
  