import { CSSProperties } from "react";
import { verticalStackTypes } from "../flex.type";

const VerticalStack = ({
  children,
  alignItems,
  className = "",
  flexWrap,
  gap,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  justifyContent,
  padding,
}: verticalStackTypes) => {
  const verticalStackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
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
    <div style={verticalStackStyle} className={className}>
      {children}
    </div>
  );
};

export default VerticalStack;
