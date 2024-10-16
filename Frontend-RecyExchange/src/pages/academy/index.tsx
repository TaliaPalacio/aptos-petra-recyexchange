import React from "react";
import Image from "next/image";

const Academy = () => {
  return (
    <div className="w-full flex flex-col bg-gradient-to-br from-blue-300 via-white to-green-300">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-16">
              {/* Adjust mb-8 to mb-16 */}
              Recycling Tips
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Learn how to recycle and protect the environment in Medellín.
            </p>
          </div>

          {/* Recycling tips */}
          <div className="mt-20 text-center">
            <div className="flex justify-around mt-10">
              {/* Card for Cardboard */}
              <div className="bg-yellow-300 p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg">Cardboard</h3>
                <p>
                  Break down boxes and make sure they are clean before recycling.
                </p>
              </div>

              {/* Card for Plastic Containers */}
              <div className="bg-blue-300 p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg">Plastic Containers</h3>
                <p>Clean them and make sure they are dry.</p>
              </div>

              {/* Card for Glass */}
              <div className="bg-green-300 p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg">Glass</h3>
                <p>Rinse jars and bottles to avoid odors.</p>
              </div>

              {/* Card for Organics */}
              <div className="bg-orange-300 p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg">Organics</h3>
                <p>Deposit food scraps and biodegradable materials.</p>
              </div>
            </div>
          </div>
          {/* Separator Line */}
          <div className="my-12 w-full flex justify-center shadow-2xl">
            <hr className="w-[100%] border-t-4 border-gray-500 rounded-full opacity-50 shadow-2xl" />
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mt-56">
              Why is recycling important?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Recycling helps reduce pollution, saves energy, and conserves natural resources. By recycling, we protect the environment and contribute to a more sustainable future.
            </p>

            <div className="flex justify-center mt-10">
              <Image
                src="/sostenible.jpg"
                alt="Importance of recycling"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <Image
                src="/naturals.jpg"
                alt="Impact of recycling"
                width={400}
                height={300}
                className="rounded-lg ml-4"
              />
            </div>
          </div>

          {/* Separator Line */}
          <div className="my-12 w-full flex justify-center">
            <hr className="w-[100%] border-t-4 border-gray-500 shadow-md rounded-full opacity-50" />
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mt-56">
              What can be recycled?
            </h2>
            <p className="mt-20 text-lg text-gray-700">
              You can recycle plastics, paper, cardboard, glass, and metals. Be sure to clean and dry containers before recycling.
            </p>

            <div className="flex justify-around mt-20">
              <div className="flex flex-col items-center">
                <Image
                  src="/plastic.jpeg"
                  alt="Plastics"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-semibold text-gray-800">Plastics</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/paper.jpg"
                  alt="Paper"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-semibold text-gray-800">Paper</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/glass.jpeg"
                  alt="Glass"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-semibold text-gray-800">Glass</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/metals.jpeg"
                  alt="Metals"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-bold text-gray-800">Metals</p>
              </div>
            </div>

            {/* Separator Line */}
          <div className="my-12 w-full flex justify-center shadow-2xl">
            <hr className="w-[100%] border-t-4 border-gray-500 rounded-full opacity-50 shadow-2xl" />
          </div>

            <h3 className="mt-56 text-2xl font-semibold text-gray-800">
              Which bin does it go in?
            </h3>
            <div className="flex justify-around mt-20">
              <div className="flex flex-col items-center mt-20">
                <Image
                  src="/yellow.jpg"
                  alt="Yellow Bin"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-semibold text-gray-800">
                  Yellow Bin
                </p>
                <p>Recyclables</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/green.jpeg"
                  alt="Green Bin"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-semibold text-gray-800">Green Bin</p>
                <p>Organics</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/black.jpeg"
                  alt="Black Bin"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 font-semibold text-gray-800">Black Bin</p>
                <p>Common Trash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;
