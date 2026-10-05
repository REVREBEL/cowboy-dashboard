"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function TextInputCustomDefaultFalse({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"text-input"} data-figma-id={"4174:1495"} tag={"div"}>
        <Paragraph
          className={"placeholder"}
          data-figma-id={"I4174:1495;4179:9018"}
        >
          {"Enter your email"}
        </Paragraph>
      </Block>
    </div>
  );
}
