import Image from 'next/image';
import React from 'react'

const ProductCart = ({item:{id, title, price, category, image, quantity, totalItemPrice}}) => {
    
  return (
    <div className='grid grid-cols-5 border-b pb-6 pl-10'>
        <Image className='object-contain' src={image} alt="" height={100} width={100}/>
        <div className='col-span-3'>
            <div className='text-lg'>{title}</div>
            <div className='text-xs text-green-600'>In stock</div>
            <p className='text-sm text-gray-500'>Eligible for FREE Shipping</p>
            <Image src="https://m.media-amazon.com/images/G/01/support_images/GUID-7254C67F-EA22-4E64-BB79-6F45644F83BF=2=en-IN=Normal.jpg" alt="" width={60} height={12}/>
            <p>Quantity: {quantity}</p>
        </div>
        <p className='flex justify-end text-xl font-bold'><span className='text-xs pt-1'>₹</span>{price}</p>
    </div>
  )
}

export default ProductCart