"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Image from "./webflow_modules/Basic/components/Image";

export function EventImageBingo({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Image
        alt={""}
        className={"event-image-bingo"}
        data-figma-id={"105:203"}
        data-figma-image-hash={"762f8ca1c3079f70daac333bbd654970"}
        data-figma-image-id={"6abc7648b9d3967b9178f65c"}
        height={"auto"}
        loading={"lazy"}
        src={
          "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abc7648b9d3967b9178f65c_Event%20Image%20%20Bingo.png"
        }
        width={"auto"}
      />
    </div>
  );
}
