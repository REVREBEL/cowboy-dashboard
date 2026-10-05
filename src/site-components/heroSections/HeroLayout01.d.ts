import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function HeroLayout01(props: {
  button1SlotButton?: React.ReactNode;
  button1Visibility?: Types.Boolean.Boolean;
  button2SlotButton?: React.ReactNode;
  button2Visibility?: Types.Boolean.Boolean;
  button3SlotButton?: React.ReactNode;
  button3Visibility?: Types.Boolean.Boolean;
  imageImage?: Types.Asset.Image;
  imageVisibility?: Types.Boolean.Boolean;
  layout?: "Left" | "Right";
  slotHeadlineContent?: React.ReactNode;
}): React.JSX.Element;
