"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function LocationWrapperCustomUrban3({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"location-wrapper"}
        data-figma-id={"I175:1958;104:15643"}
        tag={"div"}
      >
        <Paragraph
          className={"text-regular-6"}
          data-figma-id={"I175:1958;104:15643;86:3"}
        >
          {"Catskills"}
        </Paragraph>
      </Block>
    </div>
  );
}
