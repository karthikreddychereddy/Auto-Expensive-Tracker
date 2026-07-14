import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {

  const [activeModal, setActiveModal] = useState(null);

  const [modalData, setModalData] = useState(null);

  const openModal = (name, data = null) => {

    setActiveModal(name);

    setModalData(data);

  };

  const closeModal = () => {

    setActiveModal(null);

    setModalData(null);

  };

  return (

    <ModalContext.Provider

      value={{

        activeModal,

        modalData,

        openModal,

        closeModal,

      }}

    >

      {children}

    </ModalContext.Provider>

  );

}

export const useModal = () => useContext(ModalContext);