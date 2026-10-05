"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Image from "../webflow_modules/Basic/components/Image";

export function Youtube({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Image
        alt={""}
        className={"youtube"}
        data-figma-id={"4179:9455"}
        data-figma-image-hash={"aac7dd3e76457a14bc48afd2cd32893e"}
        data-figma-image-id={"6aabe6d60b2719f6773528b7"}
        height={"auto"}
        loading={"lazy"}
        src={
          "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabe6d60b2719f6773528b7_Youtube.svg"
        }
        width={"auto"}
      />
    </div>
  );
}
