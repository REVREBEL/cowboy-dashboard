import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function Button(props: {
  buttonButtonId?: string;
  /** Controls whether interactive hover effects are enabled. Set to Enable to allow hover behavior or Disable to keep the icon static.*/
  buttonClickable?: Types.Boolean.Boolean;
  /** Sets the icon’s color theme, including its corresponding normal and inverse color values.*/
  buttonColor?:
    | "Base"
    | "Alpine Linen"
    | "Smoke"
    | "Cowboy Umber"
    | "Paper"
    | "Bandana Red";
  buttonColorMode?: "Normal" | "Inverse" | "Inherit";
  buttonColorStyle?: "Filled" | "Outline" | "Text-Only";
  /** Sets the visual change applied when the icon is hovered. Use Fade to reduce the icon’s opacity or Inverse to swap between its normal and inverse color.*/
  buttonHoverEffect?: Types.Boolean.Boolean;
  buttonSize?: "X Large" | "Large" | "Medium" | "Normal" | "Small" | "X Small";
  buttonText?: React.ReactNode;
  dataAttributesButtonName?: string;
  dataAttributesContentName?: string;
  dataAttributesResyVenueId?: string;
}): React.JSX.Element;
