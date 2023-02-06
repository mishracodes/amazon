import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import { selectItems } from '../slices/basketSlice'
import { useSelector } from 'react-redux'
import ProductCart from "../components/ProductCart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
const stripePromise =loadStripe(process.env.stripe_public_key);
const Checkout = () => {
  const { data: session } = useSession()
  const state=useSelector(selectItems);
  const checkoutHandler=async ()=>{
    if(!session)return;
      const stripe =await stripePromise;
      //cal the backend to create checkout session
      try {
      const checkoutSession=await axios.post('api/create-checkout-session',{
        items:state.items,
        email:session.user.email})

      const result = await stripe.redirectToCheckout({
        sessionId:checkoutSession.data.id
      })
      
      } catch (error) {
        console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
      }



      
  }

  return (
    <div className="bg-gray-200">
      <Header />
      <Image src="https://m.media-amazon.com/images/G/38/health-personal-care/SNS.png" width={880} height={230}  alt="" className="object-contain mx-auto" />

      <main className="lg:flex max-w-screen-2xl mx-auto z-20">
        {/* Left */}
        <div className="flex-grow m-5 shadow-md">
            <div className="flex flex-col p-5 space-y-10 bg-white">
                <h1 className="text-3xl border-b pb-4 relative">Shopping Cart <span className="absolute text-sm text-gray-500 right-0 top-8">Price</span></h1>
                {/* <Product/> */}

                {state.items&&state.items.map((e)=><ProductCart key={e.id} item={e}/>)}
                <p className='text-lg ml-auto'>Subtotal ({state.totalQuantity} items):   <span className="font-bold">₹ {state.totalPrice}</span></p>

            </div>
        </div>
        <div className="m-5 shadow-md p-5 bg-white">
          <p className='text-lg'>Subtotal ({state.totalQuantity} items):   <span className="font-bold">₹ {state.totalPrice}</span></p>
          <button onClick={checkoutHandler} className={`${session?'':'cursor-not-allowed'}  button my-6`}>Proceed to buy</button>

        </div>
      </main>
    </div>
  );
};

export default Checkout;
