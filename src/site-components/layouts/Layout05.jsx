"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function Layout05({
  altText = "__wf_reserved_inherit",
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbb988011a00be03af07e6_image.png",
  imageVisibility = true,
  layoutVisibility = true,
  slotHeadlineContent,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      {layoutVisibility ? (
        <Block className={"layout-05"} data-figma-id={"876:11333"} tag={"div"}>
          <Block
            className={"content-group flex-align_center"}
            data-figma-id={"880:49"}
            tag={"div"}
          >
            {slotHeadlineContent}
          </Block>
          {imageVisibility ? (
            <Block
              className={"image-wrapper height_800px"}
              data-figma-id={"880:50"}
              id={"w-node-_2b1668f8-f926-b317-85ab-6aa31f8a6698-1f8a6690"}
              tag={"div"}
            >
              <Image
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
          ) : null}
        </Block>
      ) : null}
    </div>
  );
}
