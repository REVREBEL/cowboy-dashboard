"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Link from "../webflow_modules/Basic/components/Link";

export function VButtonWrapper({
  link = {
    href: "#",
  },

  text = "[ Icon Button ]",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"v-button-wrapper"}
        data-icon-placement={""}
        tag={"div"}
      >
        <Link button={true} className={"v-button"} options={link}>
          {text}
        </Link>
      </Block>
    </div>
  );
}
