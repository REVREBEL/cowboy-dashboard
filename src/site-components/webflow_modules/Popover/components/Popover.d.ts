import * as React from "react";
import type { Props } from "../../types";
type PopoverTag =
  | "div"
  | "header"
  | "footer"
  | "nav"
  | "main"
  | "section"
  | "article"
  | "aside"
  | "address"
  | "figure";
type PopoverProps = Omit<
  Props<
    "div",
    {
      tag?: PopoverTag;
    }
  >,
  "popover"
> & {
  mode?: "auto" | "manual";
};
export type { PopoverProps };
declare const Popover: React.ForwardRefExoticComponent<
  Omit<
    Props<
      "div",
      {
        tag?: PopoverTag;
      }
    >,
    "popover"
  > & {
    mode?: "auto" | "manual";
  } & React.RefAttributes<HTMLElement>
>;
export default Popover;
