import * as React from "react";
import * as Types from "./webflow_modules/types";

declare function NavDropdownMenu2(props: {
  /** Sets the icon’s color theme, including its corresponding normal and inverse color values.*/
  featureButtonColor?:
    | "Base"
    | "Alpine Linen"
    | "Smoke"
    | "Cowboy Umber"
    | "Paper"
    | "Bandana Red";
  featureButtonColorMode?: "Normal" | "Inverse" | "Inherit";
  featureButtonSize?:
    | "X Large"
    | "Large"
    | "Medium"
    | "Normal"
    | "Small"
    | "X Small";
  navcard2Visibility?: Types.Boolean.Boolean;
  navcard3Visibility?: Types.Boolean.Boolean;
  navcard3Visibility2?: Types.Boolean.Boolean;
  navcard4Visibility?: Types.Boolean.Boolean;
  slotNavcard?: React.ReactNode;
  slotNavcard2?: React.ReactNode;
  slotNavcard3?: React.ReactNode;
  slotNavcard4?: React.ReactNode;
}): React.JSX.Element;
