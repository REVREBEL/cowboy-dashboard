"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Link from "../webflow_modules/Basic/components/Link";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function FeatureSection3Cards({
  button1Link = {
    href: "#",
  },

  button1SlotButton,
  button1Visibility = true,

  button2Link = {
    href: "#",
  },

  button2SlotButton,
  button2Visibility = true,
  paragraphText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
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
  slotHeadlineContentBlock,
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
                {slotHeadlineContentBlock}
              </Block>
              <Paragraph
                className={"paragraph padding-bottom_1pct"}
                data-figma-id={"4174:15576"}
                id={"w-node-bb182dca-350d-55f4-a6ae-3c8613eff2f8-7c57ac56"}
              >
                {paragraphText}
              </Paragraph>
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
              {button1Visibility ? (
                <Link
                  block={"inline"}
                  button={false}
                  className={"button-visibility"}
                  options={button1Link}
                >
                  {button1SlotButton}
                </Link>
              ) : null}
              {button2Visibility ? (
                <Link
                  block={"inline"}
                  button={false}
                  className={"button-visibility"}
                  options={button2Link}
                >
                  {button2SlotButton}
                </Link>
              ) : null}
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
