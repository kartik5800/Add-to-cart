import React, { useEffect, useState } from "react";
import "./home.css";
import users from "../../db.json";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../../Redux/Action/cart.action";
import toast from "react-hot-toast";

export const Home = () => {
  const [favUserData, setFavUserData] = useState([]);
  const [product] = useState(users.users);

  const dispatch = useDispatch();

  const send = (id, size) => {
    try {
      let getProduct = product.find((item) => item.id == id);
      const newId = getProduct.id + size;
      const dataObject = {
        ...getProduct,
        id: newId,
      };
      dispatch(ADD(dataObject, size));
      toast.success("Your Product added successfully!");
    } catch (error) {
      toast.error(error);
    }
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
    <div className="my-5">
      <div className="container">
        <div className="row">
          {product.map((product, index) => {
            return (
              <div className="col-sm-6 col-md-6 col-lg-3 mb-4" key={index}>
                <div className="card border-0">
                  <Link to={`/details/${product.id}`}>
                    <img
                      src={product.image}
                      className="product-img"
                      alt="..."
                    />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title truncateLongTexts">
                      {product.Name}
                    </h6>
                    <h6 className="card-title fw-bold">${product.Price}</h6>
                    <div className="">
                      <p className={`card-title`}>
                        Availability:
                        <span
                          className={`ms-1 ${
                            product.status == "Out Of Stock"
                              ? " text-danger"
                              : product.status == "In stock"
                              ? " text-success"
                              : ""
                          }`}
                        >
                          {product.status}
                        </span>
                      </p>
                      <p className="card-title">Color: {product.eyeColor}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between ">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          send(product.id, product?.Size[0]);
                        }}
                        disabled={product.status != "In stock"}
                      >
                        add to card
                      </button>
                      <i
                        className={
                          favUserData.findIndex((x) => x.id === product.id) >= 0
                            ? "fa-solid fa-heart heart2 abs"
                            : "fa-regular fa-heart heart1 abs"
                        }
                        onClick={() => favDataHandler(product)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};




