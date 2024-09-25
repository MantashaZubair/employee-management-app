import React from 'react'

const UserDetais = () => {
 const username=localStorage.getItem("username")
  return (
   <>
    <h1>Welcome {username}</h1>
   </>
  )
}

export default UserDetais