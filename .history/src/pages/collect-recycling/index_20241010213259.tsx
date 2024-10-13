import React from 'react'
import Image from 'next/image'
import Header from '../../components/header'

const collectRecycling = () => {
  return (
    <div>
        <Header/>
       <div className="text-center mt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl">
            🌱 Help the environment
            </h1>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-xl mt-6">
            <Image src="/public/ubication" alt="Icono de ubicación" style={{ width: '24px', height: '24px' }}/>
            Here you can choose the recyclable materials closest to your location
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            </div>
          </div>
    </div>
  )
}

export default collectRecycling;