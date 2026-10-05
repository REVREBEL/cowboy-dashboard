import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function VColor(props: {
  /** Controls whether interactive hover effects are enabled. Set to Enable to allow hover behavior or Disable to keep the icon static.*/
  clickable?: Types.Boolean.Boolean;
  /** Sets the icon’s color theme, including its corresponding normal and inverse color values.*/
  color?:
    | "Base"
    | "Alpine Linen"
    | "Smoke"
    | "Cowboy Umber"
    | "Paper"
    | "Bandana Red";
  colorMode?: "Normal" | "Inverse" | "Inherit";
  colorStyle?: "Filled" | "Outline" | "Text-Only";
  /** Sets the visual change applied when the icon is hovered. Use Fade to reduce the icon’s opacity or Inverse to swap between its normal and inverse color.*/
  hoverEffect?: Types.Boolean.Boolean;
  slotsSlotColor?: React.ReactNode;
}): React.JSX.Element;
