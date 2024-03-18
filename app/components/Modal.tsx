import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(2px);
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  box-shadow: var(--shadow-large);
  padding: 1rem 2rem;
  border-radius: 20px;
  transition: all 0.5s;
`;

type ModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("ModalContext cannot be used outside the Modal component");
  return context;
}

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

function Open({ children }: OpenProps) {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: open });
}

type WindowProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

function Window({ children }: WindowProps) {
  const { isOpen, close } = useModalContext();

  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay />
      <StyledModal>
        <>{cloneElement(children, { onCloseModal: close })}</>
      </StyledModal>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
