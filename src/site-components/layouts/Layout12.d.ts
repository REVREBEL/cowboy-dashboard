import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function Layout12(props: {
  button?: React.ReactNode;
  buttonVisibility?: Types.Boolean.Boolean;
  decoration?: React.ReactNode;
  decorationVisibility?: Types.Boolean.Boolean;
  headlineContent?: React.ReactNode;
  insetImageAltText?: Types.Basic.AltText;
  insetImageImage?: Types.Asset.Image;
  insetImageVisibility?: Types.Boolean.Boolean;
  layout?: "Image Right" | "Image Left";
  mainImageAltText?: Types.Basic.AltText;
  mainImageImage?: Types.Asset.Image;
  mainImageVisibility?: Types.Boolean.Boolean;
}): React.JSX.Element;
