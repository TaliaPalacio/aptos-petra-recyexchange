import React from "react";
import Modal from "./modal";
import { useState } from "react";
import { useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network, Account, convertNumber } from "@aptos-labs/ts-sdk";

export const aptos= new Aptos(new AptosConfig({network: Network.TESTNET}));

interface FormRegisterProps {
  selectedType: string | undefined;
}

const FormRegister: React.FC<FormRegisterProps> = ({ selectedType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Type, setType] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [pricePound, setPricePound] = useState<number>(0);
  const [ubication, setUbication] = useState<string>("");
  const [observations, setObservations] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(false);
  const [chats, setChats] = useState([]);
  const [feedback, setFeedback] = useState<string>(""); // Estado para mostrar mensajes de éxito o error
  const [isAccountInitialized, setIsAccountInitialized] = useState(false);

  const {signAndSubmitTransaction, account} = useWallet();

  const CONTRACT_ADDRESS = "0xfed39611e5ac476394ec5799b1e0ed2a577a47dcfa522ab92df24d5667bc4720";

  useEffect(() => {
    if (selectedType) {
      setType(selectedType); // Actualizar el campo con el tipo seleccionado
    }
  }, [selectedType]);

  const initializeAccount = async () => {

    console.log(account?.address);
    console.log("entro a la funcion");

      const response = await signAndSubmitTransaction({
        sender: account?.address, // Tu wallet que firma la transacción
        data: {
          function: `${CONTRACT_ADDRESS}::recicly::inicializar`,
          typeArguments: [],
          functionArguments: [],
        },
      });
      try {
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setFeedback("Cuenta inicializada con éxito.");
      setIsAccountInitialized(true); // Actualizar el estado para habilitar el registro de reciclaje
    } catch (error) {
      setFeedback("Error al inicializar la cuenta.");
    }
  };

  const registerRecycling = async () => {
    if (!account?.address ) {
      setFeedback("Por favor, conecta tu wallet.");
      return;
    }
    if (!Type || !weight || !pricePound || !ubication) {
      setFeedback("Por favor, completa todos los campos.");
      return;
    }
      const response = await signAndSubmitTransaction({
        sender: account?.address, // Tu wallet que firma la transacción
        data: {
          function: `${CONTRACT_ADDRESS}::recicly::set_recycling`, // Función de tu contrato inteligente
          typeArguments: [], // Si tu función usa argumentos de tipo
          functionArguments: [
            Type, // Tipo de reciclaje
            ubication, // Dirección de recolección
            weight,        // Peso
            pricePound,         // Precio por libra o lo que sea
            observations,        // Mensaje opcional del usuario
            chats,        // Mensajes de chat
            available,        // Disponibilidad
          ],
        },
      });
      try {
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setFeedback("Reciclaje registrado con éxito.");
      resetForm();
    } catch (error) {
      setFeedback("Error al registrar el reciclaje.");
    }

  }
  const resetForm = () => {
    setType("");
    setUbication("");
    setWeight(0);
    setPricePound(0);
    setObservations("");
    setAvailable(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerRecycling();
  }

    const handleClick = () => {
      setIsModalOpen(true);
    };

    const handleClose = () => {
      setIsModalOpen(false);
    };
    return (
      <div className="bg-orange-100 lg:px-28 p-10 rounded-xl">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Post Recycling
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Enter your recycling information
          </p>
        </div>

        <div className="mt-5">
        <button
          onClick={initializeAccount}
          className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-transform transform hover:scale-105 duration-300"
        >
          Inicializar cuenta
        </button>
      </div>



        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Type of recycling"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Type of recycling
              </label>
              <div className="mt-2.5">
                <input
                  readOnly
                  type="text"
                  name="Type of recycling"
                  id="Type"
                  value={Type}
                  onClick={handleClick}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-200"
                />
              </div>
              <Modal isOpen={isModalOpen} onClose={handleClose} />
            </div>
            <div>
              <label
                htmlFor="Weight"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Weight
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="Weight"
                  id="weight"
                  placeholder="Weight in pounds..."
                  value={weight > 0 ? weight : ""} // Limpia el campo si el peso es 0
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Price per pound"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Price per pound
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="Price per pound"
                  id="pricePound"
                  placeholder="Price in aptos..."
                  value={pricePound > 0 ? pricePound : ""} // Limpia el campo si el precio es 0
                  onChange={(e) => setPricePound(Number(e.target.value))}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Pickup Address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Pickup Address
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="Pickup Address"
                  id="ubication"
                  value={ubication} // Asegúrate de que este valor se limpie si es 0
                  placeholder="input first the neighborhood..."
                  onChange={(e) => setUbication(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Observations
              </label>
              <div className="mt-2.5">
                <textarea
                  name="observations"
                  id="observations"
                  rows={3}
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div>
            <label htmlFor="available" className="block text-sm font-semibold leading-6 text-gray-900">Available</label>
            <div className="mt-2.5">
            <input
                type="checkbox"
                name="available"
                id="available"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="block w-5 h-5"
            />
              </div>
              
            </div>
          </div>
          {feedback && <p className="text-center text-red-600">{feedback}</p>}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md text-center bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform transform hover:scale-105 duration-300"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  };

export default FormRegister;
