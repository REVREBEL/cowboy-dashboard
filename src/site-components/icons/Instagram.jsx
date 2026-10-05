"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Image from "../webflow_modules/Basic/components/Image";

export function Instagram({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Image
        alt={""}
        className={"instagram"}
        data-figma-id={"4179:9449"}
        data-figma-image-hash={"1607482d4ac70542b66036c9c2781b0f"}
        data-figma-image-id={"6aabe6d43be55d2c0c5ff933"}
        height={"auto"}
        loading={"lazy"}
        src={
          "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabe6d43be55d2c0c5ff933_Instagram.svg"
        }
        width={"auto"}
      />
    </div>
  );
}
