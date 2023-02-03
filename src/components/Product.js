import Image from 'next/image'
import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket } from '../slices/basketSlice'
import { selectItems } from '../slices/basketSlice'
const Product = ({id, title, price, description, category, image,rating}) => {
    const dispatch=useDispatch()
    const state=useSelector(selectItems)
    const [isPrime]=useState(Math.round(rating.rate)>3)
    const addtoCartHandler=()=>{
        dispatch(addToBasket({id, title, price, category, image}))
        
    }
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg'>
        <p className='absolute top-2 right-2 text-xs italic text-gray-500'>{category}</p>
        <Image  className='object-contain m-auto' src={image} height={200} width={200} alt=""/>
        <p className='text-green-600 text-sm font-medium mt-3'>{title} </p>
        <div className='flex items-center'>
            <p className='relative ml-3 text-xl'><span className='absolute top-0 -left-2 text-xs'>₹</span>{price-Math.round(0.1*price)}</p>
            <p className='relative ml-3 text-sm line-through text-gray-500'><span className='absolute top-0 -left-2 text-xs'>₹</span>{price}</p>
        </div>
        {/* <p className='relative ml-3 text-xs text-gray-500'><span className='absolute top-0 -left-2 text-xs'>₹</span>({price}/count)</p> */}
        <div className='flex items-center'>
            <p className='flex'>{Array(Math.round(rating.rate)).fill().map((_,i)=><StarIcon key={i} className="h-5 text-yellow-500"/>)}</p> 
            <p className='text-green-700 text-xs font-medium'>({rating.count})</p>
        </div>
       
        {isPrime && <div className='flex items-center space-x-2 my-1'>
            <Image className='object-contain' src="https://m.media-amazon.com/images/G/01/support_images/GUID-7254C67F-EA22-4E64-BB79-6F45644F83BF=2=en-IN=Normal.jpg" alt="" width={60} height={12}/>
            <p className='text-xs text-gray-600'>FREE Next-Day Delivery</p>
        </div>}
        <button onClick={addtoCartHandler} className='mt-auto button'>Add to Cart</button>
    </div>
  )
}

export default Product