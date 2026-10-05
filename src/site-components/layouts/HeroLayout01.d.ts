import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function HeroLayout01(props: {
  button1Visibility?: Types.Boolean.Boolean;
  button2Visibility?: Types.Boolean.Boolean;
  button3Visibility?: Types.Boolean.Boolean;
  eyebrow?: React.ReactNode;
  eyebrowVisibility?: Types.Boolean.Boolean;
  headline?: React.ReactNode;
  headlineTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  icon?: Types.Asset.Image;
  iconVisibility?: Types.Boolean.Boolean;
  image?: Types.Asset.Image;
  paragraph?: React.ReactNode;
  paragraphVisibility?: Types.Boolean.Boolean;
  slotButton?: React.ReactNode;
  slotButton2?: React.ReactNode;
  slotButton3?: React.ReactNode;
}): React.JSX.Element;
