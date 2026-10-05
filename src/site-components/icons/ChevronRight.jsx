"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Image from "../webflow_modules/Basic/components/Image";

export function ChevronRight({
  icon = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabebe09d4dc4727686318c_chevron_right.svg",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Image
        alt={""}
        className={"chevron_right"}
        data-figma-id={"4179:9360"}
        data-figma-image-hash={"fdaa46d9d406f4d9ef1824a24640e2ae"}
        data-figma-image-id={"6aabebe09d4dc4727686318c"}
        height={"auto"}
        loading={"lazy"}
        src={icon}
        width={"auto"}
      />
    </div>
  );
}
