import * as React from "react";
import * as Types from "./webflow_modules/types";

declare function CowboyNavbar(props: {
  button1Visibility?: Types.Boolean.Boolean;
  button2Visibility?: Types.Boolean.Boolean;
  slotButton?: React.ReactNode;
  slotButton2?: React.ReactNode;
  slotButton3?: React.ReactNode;
  slotButton4?: React.ReactNode;
}): React.JSX.Element;
