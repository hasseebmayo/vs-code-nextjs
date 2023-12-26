import { ReactNode } from "react";

// String literal types for alignItems options
type AlignItemsOptions =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

// String literal types for justifyContent options
type JustifyContentOptions =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type flexWrapOptions = "wrap" | "nowwrap" | "wrap-reverse";
type paddingOptions =
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "12"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20";
export interface horizentalStackTypes {
  justifyContent?: JustifyContentOptions;
  alignItems?: AlignItemsOptions;
  flexWrap?: flexWrapOptions;
  children: ReactNode;
  className?: string;
  gap?: "1" | "2" | "3" | "4" | "5" | "10" | "15" | "20";
  padding?: paddingOptions;
  paddingLeft?: paddingOptions;
  paddingRight?: paddingOptions;
  paddingTop?: paddingOptions;
  paddingBottom?: paddingOptions;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export interface verticalStackTypes {
  justifyContent?: JustifyContentOptions;
  alignItems?: AlignItemsOptions;
  flexWrap?: flexWrapOptions;
  children: ReactNode;
  className?: string;
  gap?: "1" | "2" | "3" | "4" | "5" | "10" | "15" | "20";
  padding?: paddingOptions;
  paddingLeft?: paddingOptions;
  paddingRight?: paddingOptions;
  paddingTop?: paddingOptions;
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  paddingBottom?: paddingOptions;
}
