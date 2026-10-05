"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function Layout03({
  image1 = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba31739e1bffa7c2857b_image-right.png",
  image2 = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba31739e1bffa7c2857b_image-right.png",
  slotHeadlineContent,
  slotHeadlineContent2,
  slotHeadlineContent3,
  slotHeadlineContent4,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"lauout-03"} data-figma-id={"876:11349"} tag={"div"}>
        <Block className={"headline-wrapper is-layout-03-headline"} tag={"div"}>
          {slotHeadlineContent}
        </Block>
        <Block
          className={"image-group"}
          data-figma-id={"876:11354"}
          tag={"div"}
        >
          <Image
            alt={""}
            className={"image-left"}
            data-figma-id={"876:11606"}
            data-figma-image-hash={"868ba29ed16f901be9ee631f8c7c9792"}
            data-figma-image-id={"6abbba31739e1bffa7c2857b"}
            height={"auto"}
            loading={"lazy"}
            src={image1}
            width={"auto"}
          />
          <Image
            alt={""}
            className={"image-right"}
            data-figma-id={"876:11609"}
            data-figma-image-hash={"868ba29ed16f901be9ee631f8c7c9792"}
            data-figma-image-id={"6abbba31739e1bffa7c2857b"}
            height={"auto"}
            loading={"lazy"}
            src={image2}
            width={"auto"}
          />
        </Block>
        <Block
          className={"grid_dynamic is-lauout-03"}
          data-figma-id={"876:11358"}
          tag={"div"}
        >
          <Block
            className={"paragraph-wrapper is-layout-03"}
            id={"w-node-_8caf9e92-059c-4539-23f5-87b03229ada0-b2a15543"}
            tag={"div"}
          >
            {slotHeadlineContent4}
          </Block>
          <Block
            className={"paragraph-wrapper is-layout-03"}
            id={"w-node-_22815286-1621-266c-2a95-f43ae007fdac-b2a15543"}
            tag={"div"}
          >
            {slotHeadlineContent3}
          </Block>
          <Block
            className={"paragraph-wrapper is-layout-03"}
            id={"w-node-_6b421411-270a-c26a-34e2-042455bdf832-b2a15543"}
            tag={"div"}
          >
            {slotHeadlineContent2}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
