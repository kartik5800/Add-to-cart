import React, { useEffect, useState } from 'react'
import { Badge, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './header.css'

export const Header = () => {
  const [Like, Setlike] = useState([]);
  const [modalShow1, setModalShow1] = useState(false);
  const getdata = useSelector((state) => state.cart);
  const history = useHistory();




  const gotocart = () => {
    history.push('/cart')
  }

  const gotowish = () => {
    history.push('/wishlist')
  }

  const handlelogout = () => {
    localStorage.clear();
    history.push('/')
    window.location.reload();
  }

  const getwish = () => {

  }

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("like"));
    Setlike(localData);
  }, [Like]);


  function MyVerticallyCenteredModal1(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter1"
        centered
        className='width500'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter1">
            Are You Sure to Logout ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => handlelogout()} className="bg-dark">Yes</Button>
          <Button onClick={props.onHide} className="bg-dark">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  return (

    <>
      <MyVerticallyCenteredModal1
        show={modalShow1}
        onHide={() => setModalShow1(false)} />
      <div className="container-fluid">
        <nav className="navbar bg-dark">
          <div className="container-fluid content">
            <a className="navbar-brand text-white" href='/home'>FASHION WORLD</a>
            <form className="d-flex" role="search">

            </form>
            <div className="header-icons">
              <Button variant="primary" onClick={() => gotocart()}>
                <i className="fa-solid fa-cart-plus"></i> <Badge >{getdata?.carts?.length}</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button>
              <Button variant="primary" onClick={() => gotowish()}>



                {/* <i className="fa-solid fa-heart redheart"></i> <Badge></Badge> */}
                <i className={
                  Like?.length > 0
                    ? "fa-solid fa-heart redheart"
                    : "fa-regular fa-heart "
                }
                  onClick={() => gotowish()}></i>


                <span className="visually-hidden">unread messages</span>
              </Button>

              <button className='logout-btn' onClick={() => { setModalShow1(true) }}>logout</button>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}


