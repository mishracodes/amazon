import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice:0,
  totalQuantity:0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const newItem = action.payload;
      const existingItem=state.items.find((item)=>item.id===newItem.id)
      state.totalPrice+=newItem.price;
      state.totalQuantity+=1
      if(!existingItem){
        state.items
        .push({id:newItem.id,
          title:newItem.title,
          price:newItem.price,
          category:newItem.category,
          image:newItem.image,
          quantity:1,
          totalItemPrice:newItem.price
        })
      }
      else{
        existingItem.quantity+=1;
        existingItem.totalItemPrice+=newItem.price;
      }   
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      const existingItem=state.items.find((item)=>item.id===id)
      state.totalPrice-=existingItem.price;
      state.totalQuantity-=1
      if(existingItem.quantity===1){
        state.items=state.items.filter((e)=>e.id!==id)
      }
      else{
        existingItem.quantity-=1;
        existingItem.totalItemPrice-=existingItem.price
      }
    },

  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket;

export default basketSlice.reducer;
