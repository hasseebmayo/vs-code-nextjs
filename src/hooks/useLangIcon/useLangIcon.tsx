import { ReactNode } from "react";
import JSX from "../../assets/LangIcon/JSX.svg";
import CSSIcon from "../../assets/LangIcon/CSS.svg";
import HTMLIcon from "../../assets/LangIcon/HTML.svg";
import SassIcon from "../../assets/LangIcon/Sass.svg";
import JS from "../../assets/LangIcon/JS.svg";

type arrayIcons = {
  type: string;
  icon: ReactNode;
};
const useLangIcon = () => {
  const icons: arrayIcons[] = [
    {
      type: "jsx",
      icon: <JSX />,
    },
    {
      type: "tsx",
      icon: <JSX />,
    },
    {
      type: "ts",
      icon: <JSX />,
    },
    {
      type: "css",
      icon: <CSSIcon />,
    },
    {
      type: "html",
      icon: <HTMLIcon />,
    },
    {
      type: "sass",
      icon: <SassIcon />,
    },
    {
      type: "js",
      icon: <JS />,
    },
  ];
  function findIcon(type: string) {
    const filteredIcon = icons.find(
      (icons) => icons.type == type?.toLowerCase()
    );
    return filteredIcon?.icon;
  }
  return { findIcon };
};

export default useLangIcon;
