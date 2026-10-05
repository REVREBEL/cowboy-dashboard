"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import NotSupported from "../webflow_modules/Builtin/components/NotSupported";
import { NavCardItemImage } from "./NavCardItemImage";

export function NavDropdownMenu3({
  featureButtonColor = "Base",
  featureButtonColorMode = "Normal",
  featureButtonSize = "Normal",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} tag={"div"}>
        <Block className={"menu-wrapper text-lake-forest"} tag={"div"}>
          <NotSupported _atom={"Collection List"} />
        </Block>
      </Block>
    </div>
  );
}
