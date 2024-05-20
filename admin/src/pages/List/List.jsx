import React, { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const List = () => {
  const { data } = useSelector(state => state.categoriesReducer);
  const [list,setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{data && data.find(category => category._id === item.category)?.name}</p>
                <p>${item.price}</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
                <Link to={`/product/${item._id}`}><button className="edit">Edit</button></Link>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
