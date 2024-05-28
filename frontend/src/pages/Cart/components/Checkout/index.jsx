import { useContext } from "react";
import { StoreContext } from "../../../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
                <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                <hr />
                <div className="cart-total-details"><p>Delivery Fee</p><p>${getTotalCartAmount()===0?0:5}</p></div>
                <hr />
                <div className="cart-total-details"><b>Total</b><b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b></div>
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
            <div>
                <p>If you have a promo code, Enter it here</p>
                <div className='cart-promocode-input'>
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
                </div>
            </div>
            </div>
        </>
    )
}