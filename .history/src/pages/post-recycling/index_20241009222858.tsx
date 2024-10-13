import React from 'react'
import Header from '@/components/header'
import Carousel from "@/components/carousel-shadcn";
import FormRegister from '@/components/formRegister';

const postRecycling = () => {
  return (
    <div>
        <Header />
        <div className="flex justify-center items-center py-10 w-full mt-4">
        <div className="w-2/5 flex justify-center pb-40">
          <Carousel />
        </div>
        </div>


        
    </div>
  )
}

export default postRecycling;