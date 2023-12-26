import { CSSProperties } from "react";
import "./horizentalStack.comp.scss";
import { horizentalStackTypes } from "../flex.type";

const HorizentalStack = ({
  justifyContent,
  alignItems = "center",
  children,
  className = "",
  flexWrap,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  gap = "5",
  onClick,
}: horizentalStackTypes) => {
  const styleStack: CSSProperties = {
    display: "flex",
    ...(justifyContent && { justifyContent }),
    ...(alignItems && { alignItems }),
    ...(padding && { padding: `${padding}px` }),
    ...(paddingLeft && { paddingLeft: `${paddingLeft}px` }),
    ...(paddingRight && { paddingRight: `${paddingRight}px` }),
    ...(paddingTop && { paddingTop: `${paddingTop}px` }),
    ...(paddingBottom && { paddingBottom: `${paddingBottom}px` }),

    gap: `${gap}px`,
  };
  return (
    <div className={className} style={styleStack} onClick={onClick}>
      {children}
    </div>
  );
};

export default HorizentalStack;
