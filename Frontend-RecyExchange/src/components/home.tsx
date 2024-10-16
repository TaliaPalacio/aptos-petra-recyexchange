import React from "react";
import Image from "next/image";
import ButtonCreateWallet from "./buttonCreateWallet";
import Carousel from "./carousel";

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      <div>
        <Carousel />
      </div>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="flex flex-row justify-between w-full">
              <div className="">
              <Image
                className="rounded-xl p-10"
                src="/aptos.png"
                alt="Aptos"
                width={800}
                height={800}
              />
              </div>
              <div className="rounded-2xl">
              <Image
                className="p-10 rounded-2xl"
                src="/petra.jpeg"
                alt="Logo"
                width={400}
                height={350}
              />
              </div>
            </div>
            
          </div>
          <div className="opacity-50 pb-10 flex justify-center">
              <Image
                className="rounded-xl"
                src="/Logo_RecyExchange.jpg"
                alt="Logo"
                width={200}
                height={200}
              />
            </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transforming Recycling in Medellín
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 text-justify">
              Introducing our innovative decentralized recycling platform on the
              Aptos blockchain! Easily connect with independent recyclers to
              sell your recyclable materials. Our platform ensures secure,
              transparent transactions while fostering a sustainable
              environment. Simply upload details of your recyclables—such as
              type, cost, and location—and let recyclers reach out through our
              integrated chat feature. With blockchain technology, every
              transaction is traceable and secure. Join us in promoting a
              circular economy while earning for your contributions to a greener
              future
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonCreateWallet />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="my-12 w-full flex justify-center">
        <hr className="w-[80%] border-t-4 border-gray-500 shadow-md rounded-full opacity-50" />
      </div>

      <div className="">
        <div className="flex flex-row justify-around">
          {/* Challenge Section */}
          <section className="py-20 bg-gradient-to-b from-white to-gray-100 px-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-[150px] h-[150px]">
                  <Image
                    src="/reto.jpg"
                    alt="Challenge Icon"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                The Challenge We Face
              </h2>
              <p className="mt-4 text-lg text-gray-700 text-left">
                In Medellín, many citizens lack the habit of recycling, which
                negatively impacts both the environment and the community. Our
                app aims to change this habit and facilitate the collection of
                recyclables.
              </p>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-20 bg-gradient-to-b from-white to-gray-100">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-[150px] h-[150px]">
                  <Image
                    src="/solution.jpg"
                    alt="Solution Icon"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
              <p className="mt-4 text-lg text-gray-700 text-left">
                Our app connects independent recyclers with citizens who want to
                recycle, facilitating communication and coordination for a more
                efficient and dignified collection.
              </p>
            </div>
          </section>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-100 to-white flex justify-center">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-[150px] h-[150px]">
                <Image
                  src="/impactive.jpg"
                  alt="Impactful Features Icon"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Features that Impact
            </h2>
            <ul className="mt-4 text-lg text-gray-700 list-disc list-inside text-left">
              <li>💬 Integrated Chat: Communicate directly with recyclers.</li>
              <li>🎁 Rewards System: Earn tokens for recycling.</li>
              <li>
                📚 Educational Resources: Access tips for effective recycling.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
