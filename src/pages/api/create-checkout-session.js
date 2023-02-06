const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req,res)=>{

    const {items,email}=req.body

    const transformedItems=items.map(e=>({
        price_data: {
            currency: 'inr',
            product_data: {
              name: e.title,
              images:[e.image]
            },
            unit_amount: e.price*100,
          },
          quantity: e.quantity,
    }))

    console.log(transformedItems);
    

    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['US', 'CA','GB','IN']},
        shipping_options: [
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 0, currency: 'inr'},
                display_name: 'Free shipping',
                delivery_estimate: {
                minimum: {unit: 'business_day', value: 5},
                maximum: {unit: 'business_day', value: 7},
                },
            },
            }, {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 2500, currency: 'inr'},
                    display_name: 'Next-Day-Shipping',
                    delivery_estimate: {
                    minimum: {unit: 'business_day', value: 1},
                    maximum: {unit: 'business_day', value: 2},
                    },
                },
                },
        ],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata:{
            email,
            images: JSON.stringify(items.map(item=>item.image))
        }
    })


    res.status(200).json({id:session.id})


}