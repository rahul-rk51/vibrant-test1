import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const Privateroutes = () => {

 
  const redux_token = localStorage.getItem("token")

  console.log("...",redux_token)

    let auth={'token':true}
  return (
    auth.token ?<Outlet/>:<Navigate to='/signin'/>
  )
}

export default Privateroutes;