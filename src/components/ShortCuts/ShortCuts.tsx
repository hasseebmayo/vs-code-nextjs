import React, { MouseEventHandler } from "react";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
import "./shortcut.scss";
import { redirect } from "next/dist/server/api-utils";
type shortcut = {
  onClick?: MouseEventHandler<SVGAElement>;
  ref?: React.RefObject<HTMLDivElement>;
};
type shortcutArray = {
  action: string;
  key: string;
};
const ShortCuts = ({ onClick, ref }: shortcut) => {
  const shortcuts: shortcutArray[] = [
    {
      action: "To open a Preview of the code.",
      key: "SHIFT + R",
    },
    {
      action: "To close Opened Preview",
      key: "Escape",
    },
    {
      action: "To Add new file",
      key: "SHIFT + N",
    },
    {
      key: "Delete",
      action: "Delete a folder by focusing on it.",
    },
  ];
  return (
    <Modal onClick={onClick} ref={ref}>
      <motion.div className="main-shortcut">
        <motion.div>
          <div className="short-cut-container">
            <h1>Action</h1>
            <h1>Shortcut</h1>
          </div>
          {shortcuts.map((d, i) => (
            <div className="short-cut-container" key={i}>
              <span>{d.action}</span>
              <span>{d.key}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Modal>
  );
};

export default ShortCuts;
