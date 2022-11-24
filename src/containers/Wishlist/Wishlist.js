import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD } from '../../Redux/Action/cart.action';
import users from "../../db.json";
import { Emptywish } from './Emptywish';
import './Wishlist.css'

export const Wishlist = () => {
  const [product1] = useState(users.users);
  const cart = useSelector((state) => state.cart);
  console.log("cart",cart);
  const dispatch = useDispatch();
  const [product, setproduct] = useState();
  // console.log("product",product.carts);
  const [Like, Setlike] = useState([]);




  const handleWatchdelete = (id) => {
    let localData = JSON.parse(localStorage.getItem("like"));
    let FilterData = localData.filter((d, index) => d.id !== id);
    localStorage.setItem("like", JSON.stringify(FilterData));
    getdata();
  };

  useEffect(() => {
    getdata();
  }, []);

useEffect(() => {

  handleWatchdelete()
}, [])




  const getdata = () => {
    let localData = JSON.parse(localStorage.getItem("like"));
    if (localData !== null) {
      Setlike(localData);
    }
  }

  useEffect(() => {
    setproduct(cart);
  }, [cart]);

  useEffect(() => {
    getdata();
  }, []);


  const send = (id, size) => {
    console.log(id, size);
    let getProduct = product1.find((item) => item.id == id);
    const newId = getProduct.id + size;
    const dataObject = {
      ...getProduct,
      id: newId,
    };
    dispatch(ADD(dataObject, size));
  }


  return (
    <>
      <div className="container">
        <div className="row">
          {
            Like?.length > 0 ? 
            Like?.map((l, index) => {
              return (
                <div className="col-3 wish" key={index}>
                  <div className="card">
                    <Link to={`/details/${l.id}`}><img src={l.image} className="card-img-top" alt="..." /></Link>
                    <div className="text-center">
                      <h6 className="card-title truncateLongTexts">{l.Name}</h6>
                      <h5 className="card-title">${l.Price}</h5>
                    </div>
                    <div className='cartbutton'>

                    {
                        l.status === "In stock" ?
                        <button onClick={() => send(l.id , l?.Size[0])} >add to card</button>
                          :
                          <button type="button" disabled>add to card</button>

                      }
                      {/* <button onClick={() => send(l , l?.Size[0])} >add to card</button> */}
                      {/* <button onClick={() => handleWatchdelete(l.id)} ><i className="fa-solid fa-heart-circle-minus text-red"></i></button> */}
                      <i className="fa-solid fa-heart heart2"
                                  onClick={() => handleWatchdelete(l.id)}></i>
                    </div>
                  </div>
                </div>
              )
            })
            : <Emptywish/>
          }
        </div>
      </div>

    </>
  )
}




