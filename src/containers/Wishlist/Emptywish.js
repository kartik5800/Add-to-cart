import React from 'react'
import wishlist from '../../image/wishlist.png'
import './Wishlist.css'

export const Emptywish = () => {

  return (
    <>

    <div className="container wishcenter">
    <img src={wishlist} alt="no_data" className='nowish' />
    </div>
    
    </>
  )
}
