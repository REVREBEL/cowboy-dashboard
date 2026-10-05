import * as React from "react";
import * as Types from "./webflow_modules/types";

declare function BasicCard(props: {
  cardVisibility?: Types.Boolean.Boolean;
  headlineTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headlineText?: React.ReactNode;
  image?: Types.Asset.Image;
  paragraphText?: React.ReactNode;
}): React.JSX.Element;
