import React from 'react'
import Product from './Product'
const ProductFeed = ({products}) => {
   
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
       {products.slice(0,4).map((e)=>{
        return(
          <Product key={e.id} id={e.id} title={e.title} price={e.price} description={e.description} category={e.category} image={e.image} rating={e.rating}/>
        )
       })}

       <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/laptops/hp/victus/v1/1500x300_2.jpg" className='md:col-span-full mx-auto'/>
       <div className='md:col-span-2'>
       {products.slice(4,5).map((e)=>{
        return(
          <Product key={e.id} id={e.id} title={e.title} price={e.price} description={e.description} category={e.category} image={e.image} rating={e.rating}/>
        )
       })}
       </div>
       
       {products.slice(5).map((e)=>{
        return(
          <Product key={e.id} id={e.id} title={e.title} price={e.price} description={e.description} category={e.category} image={e.image} rating={e.rating}/>
        )
       })}
    </div>
  )
}

export default ProductFeed

