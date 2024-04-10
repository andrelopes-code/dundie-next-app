import React from 'react'

const LoginField = ({type, pholder, name}) => {
  return (
    <input
        className="transition-all ease duration-300 border outline-gray-300 border-gray-300 p-2 rounded-md focus:outline-primary-light"
        type={type} placeholder={pholder} name={name} id={name}
    />
  )
}

export default LoginField