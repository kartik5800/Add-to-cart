import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import users from "../../db.json";
import { ADD } from "../../Redux/Action/cart.action";
import './Details.css'

export const Details = () => {
  const [favUserData, setFavUserData] = useState([]);
  const [singleview, setsingleview] = useState()
  const [product] = useState(users.users);
  console.log("product",product);
  const dispatch = useDispatch();
  const { id } = useParams();

  const history = useHistory();

  const [actdata, setactdata] = useState([]);
  const [size, setsize] = useState(actdata?.Size && actdata?.Size[0]);


  const activdata = () => {
    let getProduct = product.find((item) => item.id == id);
    setsingleview(getProduct);
    const newId = getProduct.id + size;
    const dataObject = {
      ...getProduct,
      id: newId,
    };
    setactdata(dataObject);
  };


  useEffect(() => {
    activdata();
  }, [size]);

  const send = (actdata, size) => {
    dispatch(ADD(actdata, size));
  };

  const cartpage = (actdata, size) => {
    dispatch(ADD(actdata, size));
    history.push("/cart");
  };

  const favDataHandler = async (data) => {
    let favLocalData = await JSON.parse(localStorage.getItem("like"));
    if (favLocalData) {
      const findIdx = await favLocalData?.findIndex((x) => x.id === data.id);
      if (findIdx === -1) {
        let newList = [...favLocalData, data];
        localStorage.setItem("like", JSON.stringify(newList));
        setFavUserData(newList);
      } else {
        favLocalData.splice(findIdx, 1);
        localStorage.setItem("like", JSON.stringify(favLocalData));
        setFavUserData(favLocalData);
      }
    } else {
      let arr = [data];
      localStorage.setItem("like", JSON.stringify(arr));
    }
  };

  useEffect(() => {
    let selectedData = JSON.parse(localStorage.getItem("like"));
    if (selectedData !== null) {
      setFavUserData(selectedData);
    }
  }, []);


  return (
    <>
      <div className="container"></div>
      <div className="container">
        <div className="row">
          {/* {
                       <div className="col-3">
                       <div className="card">
                           <img src={actdata.image} className="card-img-top" alt="..." />
                           <div className="card-body">
                               <h5 className="card-title">{actdata.Name}</h5>
                               <h5 className="card-title">${actdata.Price}</h5>
                           </div>
                           <div className="d-flex">
                               <button >add to card</button>
                               <button>add to wishlist</button>
                           </div>
                       </div>
                   </div>  
                    } */}
          <div className="col-6 singleimage">
            <img src={actdata.image} className="card-img-top" alt="..." />
          </div>
          <div className="col-6 pdetails">
            <div className="card-body">
              <h2>{actdata.Name}</h2>
              <h3>Price : - ${actdata.Price}</h3>
              <h4> About : -{actdata.Description}</h4>
              <h5>Size : -</h5>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                {actdata?.Size?.map((curSize, index) => {
                  return (
                    <div key={index}>
                      {/* <button key={index} onClick={() => setsize(curSize)}>{curSize}</button> */}
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id={curSize}
                        autoComplete="off"
                        onClick={() => {
                          setsize(curSize);
                        }}
                        // disabled={curSize == "s"}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={curSize}
                      >
                        {curSize}
                      </label>
                    </div>
                  );
                })}

                {/* <p className="note">please select size first</p> */}
              </div>
              <h5>{actdata.status}</h5>
              <h5>Color : - {actdata.eyeColor}</h5>
              <div className="cartbutton">
                {/* <button onClick={()=> send(actdata)} >add to card</button> */}
                <button onClick={() => send(actdata, size)}>add to card</button>

                <button onClick={() => cartpage(actdata , size)}>buy now</button>

                <i className={
                  favUserData.findIndex(
                    (x) => x.id === singleview.id
                  ) >= 0
                    ? "fa-solid fa-heart heart2"
                    : "fa-regular fa-heart heart1"
                }
                  onClick={() => favDataHandler(singleview)}></i>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
