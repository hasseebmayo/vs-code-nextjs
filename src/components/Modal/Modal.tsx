import React, { MouseEventHandler, ReactNode } from "react";
import "./modal.scss";
import Cross from "../../assets/images/Cross.svg";
import { motion } from "framer-motion";

type ModalProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<SVGAElement>;
  ref: any;
};

const Modal = ({ children, className = "", onClick, ref }: ModalProps) => {
  return (
    <motion.div
      initial={{
        y: 400,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: 400,
        opacity: 0,
      }}
      className={`modal ${className}`}
    >
      <div className="modal-layer"></div>
      <div className="modal-content" ref={ref}>
        <div className="cross-icon">
          <Cross onClick={onClick} />
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
