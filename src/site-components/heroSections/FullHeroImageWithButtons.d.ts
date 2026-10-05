import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function FullHeroImageWithButtons(props: {
  button1Link?: Types.Basic.Link;
  button1Visibility?: Types.Boolean.Boolean;
  button2Visibility?: Types.Boolean.Boolean;
  buttonWrapper?: React.ReactNode;
  buttonWrapper2?: React.ReactNode;
  image?: Types.Asset.Image;
  slotHeadlineContent?: React.ReactNode;
}): React.JSX.Element;
