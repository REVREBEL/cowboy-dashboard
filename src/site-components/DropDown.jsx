"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Heading from "./webflow_modules/Basic/components/Heading";

export function DropDown({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Heading className={"heading-18"} tag={"h2"}>
        {"Dropdown"}
      </Heading>
    </div>
  );
}
