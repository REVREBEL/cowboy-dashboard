"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function FeatureSection3Cards({
  button1SlotButton,
  button1Visibility = true,
  button2SlotButton,
  button2Visibility = true,
  slot1Slot,
  slot1Slot1Visibility = true,
  slot2Slot2,
  slot2Slot2Visibility = true,
  slot3Slot3,
  slot3Slot3Visibility = true,
  slot4Slot,
  slot4Slot4Visibility = true,
  slot5Slot2,
  slot5Slot5Visibility = true,
  slot6Slot2,
  slot6Slot6Visibility = true,
  slot7Slot,
  slot7Slot7Visibility = false,
  slot8Slot,
  slot8Visibility = false,
  slotHeadlineContent,
  slotHeadlineContent2,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} data-figma-id={"4174:15571"} tag={"div"}>
        <Block className={"vertical-container"} tag={"div"}>
          <Block
            className={"container-large"}
            data-figma-id={"6772:8763"}
            tag={"div"}
          >
            <Block
              className={"grid_2-col"}
              data-figma-id={"4174:15572"}
              tag={"div"}
            >
              <Block
                className={"headline-wrapper"}
                data-figma-id={"4174:15573"}
                tag={"div"}
              >
                {slotHeadlineContent}
              </Block>
              <Block
                className={"content-group"}
                id={"w-node-fea7a29b-2805-e0a0-c24f-f72ddc3b1ad4-7c57ac56"}
                tag={"div"}
              >
                {slotHeadlineContent2}
              </Block>
            </Block>
            <Block
              className={"flex-horizontal gap-small padding-block_medium"}
              data-figma-id={"4174:15578"}
              tag={"div"}
            >
              <Block className={"grid_4-col gap-medium"} tag={"div"}>
                {slot1Slot}
                {slot2Slot2}
                {slot6Slot2}
                {slot4Slot}
                {slot5Slot2}
                {slot3Slot3}
                {slot7Slot}
                {slot8Slot}
              </Block>
            </Block>
            <Block
              className={"button-wrapper"}
              data-figma-id={"4174:15594"}
              tag={"div"}
            >
              {button1SlotButton}
              {button2SlotButton}
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
