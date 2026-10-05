"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";

export function LayoutOffers({
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbb988011a00be03af07e6_image.png",
  slotButton,
  slotHeadlineContent,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"layout-offers"}
        data-figma-id={"876:11333"}
        tag={"div"}
      >
        <Block
          className={"image-wrapper height_800px"}
          id={"w-node-_8871d5da-1882-509e-61e3-7ff5f5f5e131-f5f5e130"}
          tag={"div"}
        >
          <Image
            alt={""}
            className={"image"}
            data-figma-id={"876:11522"}
            data-figma-image-hash={"7f41e6153d67615139e8ecf2392a5dd8"}
            data-figma-image-id={"6abbb988011a00be03af07e6"}
            height={"auto"}
            loading={"lazy"}
            src={image}
            width={"auto"}
          />
        </Block>
        <Block
          className={"content-group flex-align_center"}
          data-figma-id={"880:49"}
          id={"w-node-_8871d5da-1882-509e-61e3-7ff5f5f5e133-f5f5e130"}
          tag={"div"}
        >
          {slotHeadlineContent}
          <Block
            className={"button-wrapper"}
            id={"w-node-d4741a2b-2a9d-a055-55e1-05b3027cc380-f5f5e130"}
            tag={"div"}
          >
            {slotButton}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
