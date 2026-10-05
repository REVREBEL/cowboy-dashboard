"use client";
import * as React from "react";
import { cj } from "../../utils";
const Popover = React.forwardRef(function Popover(
  { tag = "div", mode = "auto", className = "", ...props },
  ref
) {
  return React.createElement(tag, {
    ...props,
    className: cj(className, "w-popover"),
    popover: mode,
    ref,
  });
});
export default Popover;
