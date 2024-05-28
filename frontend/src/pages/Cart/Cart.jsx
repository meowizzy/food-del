import React, { useContext, useMemo, useState } from 'react'
import { baseUrl } from '../../api/constants';
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { Checkout } from "./components/Checkout";
import { Booking } from "./components/Booking";
import { ButtonUI, ButtonUITheme } from '../../components/ui/ButtonUI';
import './Cart.css'
import { Empty } from '../../components/ui/Empty';


const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const [ isCheckout, setIsCheckout ] = useState(true);
  const items = useMemo(() => {
    return food_list.map((item) => {
      if (cartItems[item._id]>0) {
        return (<div key={item._id}>
          <div className="cart-items-title cart-items-item">
            <span className="cart-items-pic">
              <img src={baseUrl + "/images/" + item.image} alt=""/>
            </span>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <div>{cartItems[item._id]}</div>
            <p>${item.price*cartItems[item._id]}</p>
            <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
          </div>
          <hr />
        </div>)
      }
    }).filter(item => item !== undefined);
  }, [cartItems]);

  if (!items.length) {
    return (
      <Empty label="Your cart is empty"></Empty>
    );
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {items}
      </div>
      <div className="cart-bottom-btns">
        <ButtonUI
          text="Checkout"
          theme={isCheckout ? ButtonUITheme.PRIMARY : ButtonUITheme.SECONDARY}
          onClick={() => setIsCheckout(true)}
        />
        <ButtonUI
          text="Booking"
          theme={!isCheckout ? ButtonUITheme.PRIMARY : ButtonUITheme.SECONDARY}
          onClick={() => setIsCheckout(false)}
        />
      </div>
      <div className="cart-bottom">
        {
          isCheckout ? <Checkout/> : <Booking />
        }
      </div>
    </div>
  )
}

export default Cart
