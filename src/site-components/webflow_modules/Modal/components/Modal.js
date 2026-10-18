"use client";
import * as React from "react";
import { cj } from "../../utils";
const Modal = React.forwardRef(function Modal(
  { className = "", ...props },
  ref
) {
  return React.createElement("dialog", {
    ...props,
    className: cj(className, "w-modal"),
    ref: ref,
  });
});
export default Modal;
