"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Heading from "../webflow_modules/Basic/components/Heading";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function AmenityTextFeatureItem({
  contentDescription = "Soft linens, extra pillows, blackout curtains, and quiet bedrooms made for restful nights.",
  contentLabel = "Sleep Well",
  settingsVisibility = true,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      {settingsVisibility ? (
        <Block className={"amenity-text-item"} tag={"div"}>
          <Block data-figma-id={"4174:15579"} tag={"div"}>
            <Block
              className={"amenity-text-item"}
              data-figma-id={"4174:15581"}
              tag={"div"}
            >
              <Heading
                className={"amenity-text-item_title"}
                data-figma-id={"4174:15582"}
                tag={"h3"}
              >
                {contentLabel}
              </Heading>
              <Paragraph
                className={"amenity-text-item_body"}
                data-figma-id={"4174:15583"}
              >
                {contentDescription}
              </Paragraph>
            </Block>
          </Block>
        </Block>
      ) : null}
    </div>
  );
}
