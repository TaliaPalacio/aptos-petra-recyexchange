import React from 'react'
import Header from '../../components/header'

const collectRecycling = () => {
  return (
    <div>
        <Header/>
       <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transformando el Reciclaje en Medellín
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Conectate con recicladores independientes y crea un impacto
              positivo en tu comunidad.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            </div>
          </div>
    </div>
  )
}

export default collectRecycling;