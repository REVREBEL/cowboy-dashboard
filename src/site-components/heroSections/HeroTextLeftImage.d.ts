import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function HeroTextLeftImage(props: {
  button1ButtonLink?: Types.Basic.Link;
  button1ButtonVisibility?: Types.Boolean.Boolean;
  button1Text?: React.ReactNode;
  button2ButtonLink?: Types.Basic.Link;
  button2ButtonVisibility?: Types.Boolean.Boolean;
  button2Icon?: Types.Asset.Image;
  button2Text?: React.ReactNode;
  headlineTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headlineText?: React.ReactNode;
  image?: Types.Asset.Image;
  layout?: Types.Boolean.Boolean;
  paragraphText?: React.ReactNode;
}): React.JSX.Element;
