"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function HeroLayout02({
  button1Visibility = true,
  button2Visibility = true,
  button3Visibility = true,
  slotButton,
  slotButton2,
  slotButton3,
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
      <Block
        className={"hero-layout_02"}
        data-figma-id={"876:11494"}
        tag={"div"}
      >
        <Block
          className={"content-group is-hero-layout_02"}
          data-figma-id={"876:11496"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper is-layout-02"}
            data-figma-id={"876:11497"}
            data-figma-image-hash={"dec7ffcb630e81319e1faf5a96bd49cb"}
            data-figma-image-id={"6abbba901d6fa901e5c03966"}
            tag={"div"}
          >
            <Image
              alt={""}
              className={"image is-height_550px"}
              data-figma-id={"876:11572"}
              data-figma-image-hash={"27ddaea066114be99dfeac970181b2aa"}
              data-figma-image-id={"6abbba926ca88b125c608c21"}
              height={"auto"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba926ca88b125c608c21_image.png"
              }
              width={"auto"}
            />
          </Block>
          <Block className={"grid_2-col gap-small"} tag={"div"}>
            <Block
              className={"flex-vertical flex-align-top"}
              id={"w-node-_0a4c77f8-0905-6ee0-fde8-d3465c1da844-57fc7748"}
              tag={"div"}
            >
              {slotHeadlineContent}
            </Block>
            <Block
              className={"flex_vertical gap-small is-full-width"}
              id={"w-node-_0747c513-0a30-cfdf-d190-e15c0a31dd74-57fc7748"}
              tag={"div"}
            >
              {slotHeadlineContent2}
              <Block
                className={"action-group gap-xs flex-align_left"}
                data-figma-id={"876:11487"}
                tag={"div"}
              >
                {slotButton}
                {slotButton2}
                {slotButton3}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
