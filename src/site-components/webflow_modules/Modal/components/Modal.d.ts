import * as React from "react";
type ModalProps = React.DialogHTMLAttributes<HTMLDialogElement>;
export type { ModalProps };
declare const Modal: React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<HTMLDialogElement>
>;
export default Modal;
