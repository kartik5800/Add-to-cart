import React from 'react'
import emptycart from '../../image/emptycart.jpg'
import './cart.css'

export const Emptycart = () => {

  return (
    <>

    <div className="container wishcenter">
    <img src={emptycart} alt="no_data" className='nowish' />
    </div>
    
    </>
  )
}
