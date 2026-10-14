"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function VTextWrap({ variant = "None" }) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block tag={"div"}>
        <Block tag={"div"} />
      </Block>
    </div>
  );
}
