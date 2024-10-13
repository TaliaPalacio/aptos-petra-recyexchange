import React from 'react'
import Header from '../../components/header'

const collectRecycling = () => {
  return (
    <div>
        <Header/>
       <div className="text-center mt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl">
            🌱 Ayuda al medio ambiente.
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl mt-6">
            Aquí puedes elegir los materiales reciclables que deseas recoger 
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            </div>
          </div>
    </div>
  )
}

export default collectRecycling;