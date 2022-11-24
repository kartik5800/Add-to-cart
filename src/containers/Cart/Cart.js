import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD, DLT, REMOVE } from "../../Redux/Action/cart.action";
import './cart.css'
import { Emptycart } from "./Emptycart";


export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);
  const [idSize, setIdSize] = useState();


  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const send = (e) => {
    dispatch(ADD(e.item));
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item.item));
  };

  const handleSetId = (id, size) => {
    setIdSize(id.replace(size, ""));
  }

  useEffect(() => {
    let Price = 0;
    cart.carts.map((ele, index) => {
      Price = ele.item.Price * ele.qnty + Price;
    });
    setPrice(Price);
  }, [cart.carts]);



  return (
    <>

      {
        cart.carts.length > 0 ? <div className="container my-5">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-9">
              <div className="row">
                <table className="table table-striped">
                  <thead className="cart-table-head table-dark">
                    <tr className="table-head-row text-center">
                      <th />
                      <th>Product Image</th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th className="w13">Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="tabledata">


                    {



                      cart?.carts &&
                      cart?.carts.map((e, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <a href="/cart" onClick={(event) => { event.preventDefault(); dlt(e.item.id); }}>
                                <i className="fas fa-trash smalltrash " />
                              </a>
                            </td>
                            <td>
                              {/* <Link to={`/details/${e.item.id}` } onClick={() => {handleSetId(e.item.id, e.size);}}> */}
                                <img
                                  className="rounded"
                                  src={e.item.image}
                                  alt="image1"
                                  height="100px"
                                  width="100px"
                                />
                              {/* </Link> */}
                              
                            </td>
                            <td className="text-start">
                              {e.item.Name}
                            </td>
                            <td>
                              {e.size}
                            </td>
                            <td>{e.item.Price}</td>
                            <td>
                              <div>
                                {/* <input type="number" placeholder={0} /> */}
                                <button
                                  className="btn btn-secondary"
                                  onClick={
                                    e.qnty <= 1 ? () => dlt(e.item.id) : () => remove(e)
                                  }
                                >
                                  -
                                </button>
                                <span className="p-2">{e.qnty}</span>
                                <button className="btn btn-secondary" onClick={() => send(e)}>+</button>
                              </div>
                            </td>
                            <td>{e.item.Price * e.qnty}</td>
                          </tr>
                          
                        );
                      })

                    }
                  </tbody>
                </table>
              </div>

            </div>
            <div className="col-sm-12 col-md-12 col-lg-3">
              <div >

                <table className="table table-striped">
                  <thead className="table-dark">
                    <tr className="">
                      <th>Total</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td><strong>Subtotal: </strong> </td>
                      <td className="text-end">${price}</td> </tr>
                    <tr className="">
                      <td> <strong>Shipping: </strong></td>
                      <td className="text-end">1%</td> </tr>
                    <tr className=""><td>
                      <strong>Total: </strong>
                    </td>
                      <td className="text-end">${price + (price * 1) / 100}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between checkout">
                  <button><Link to={"/home"} className=" text-link">
                    Continue Shoping
                  </Link></button>
                  <button><Link to={"/thanx"} className="text-link">
                    Check Out
                  </Link></button>

                </div>

              </div>

            </div>

          </div>

        </div>
          :
          <Emptycart />
      }


    </>
  );
};
