import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function HeroLayout03(props: {
  button1ButtonVisibility?: Types.Boolean.Boolean;
  button2ButtonVisibility?: Types.Boolean.Boolean;
  headlineTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headlineText?: React.ReactNode;
  image?: Types.Asset.Image;
  layout?: Types.Boolean.Boolean;
  slotButton?: React.ReactNode;
  slotButton2?: React.ReactNode;
  slotButton3?: React.ReactNode;
  slotButton4?: React.ReactNode;
  slotHeadlineContent?: React.ReactNode;
}): React.JSX.Element;
