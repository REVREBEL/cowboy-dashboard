import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function NavCardItemImage(props: {
  imageAltText?: Types.Basic.AltText;
  imageImage?: Types.Asset.Image;
  imageVisibility?: Types.Boolean.Boolean;
  itemLabel?: React.ReactNode;
  itemParagraph?: React.ReactNode;
  link1Link?: Types.Basic.Link;
  link1Text?: React.ReactNode;
  link1Visibility?: Types.Boolean.Boolean;
  link2Link?: Types.Basic.Link;
  link2Text?: React.ReactNode;
  link2Visibility?: Types.Boolean.Boolean;
  link3Link?: React.ReactNode;
  link3Visibility?: Types.Boolean.Boolean;
}): React.JSX.Element;
