import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'
import {toast} from "react-toastify";
import {baseUrl} from "../../api/constants.js";

const ExploreMenu = ({ category, setCategory }) => {

  const { categoriesData } = useContext(StoreContext);

  if (categoriesData.error) {
      toast.error("Failed to fetch categories!");
      return null;
  }

  if (categoriesData.isLoading) {
      return <h1>Loading...</h1>
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {categoriesData.data.map((item,index)=>{
            return (
                <div
                    onClick={()=>setCategory(prev => prev === item._id ? undefined : item._id )}
                    key={index}
                    className={category === item._id ? "explore-menu-list-item active" : "explore-menu-list-item"}>
                    <span className="category-pic">
                        { item?.image && <img src={baseUrl+"/images/"+item?.image} alt=""/> }
                    </span>
                    <p>{ item.name }</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
