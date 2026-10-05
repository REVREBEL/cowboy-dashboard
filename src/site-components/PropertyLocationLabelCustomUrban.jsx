"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function PropertyLocationLabelCustomUrban({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"property-location-label"}
        data-figma-id={"104:15643"}
        tag={"div"}
      >
        <Paragraph
          className={"location-text"}
          data-figma-id={"I104:15643;86:3"}
        >
          {"Catskills"}
        </Paragraph>
      </Block>
    </div>
  );
}
