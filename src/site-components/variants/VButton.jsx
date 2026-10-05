"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function VButton({ buttonId = "", resyVenueId = "", text = "Button" }) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"v-button-wrapper"} tag={"div"}>
        <Block
          className={"v-button"}
          data-resy-venue-id={resyVenueId}
          id={buttonId}
          tag={"div"}
        >
          {text}
        </Block>
      </Block>
    </div>
  );
}
