"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Image from "../webflow_modules/Basic/components/Image";

export function LinkedIn({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Image
        alt={""}
        className={"linkedin"}
        data-figma-id={"4179:9451"}
        data-figma-image-hash={"3e14adbdfdeaffb0bf2eb90708b7e722"}
        data-figma-image-id={"6aabe6d530fa505d875bbbd7"}
        height={"auto"}
        loading={"lazy"}
        src={
          "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabe6d530fa505d875bbbd7_LinkedIn.svg"
        }
        width={"auto"}
      />
    </div>
  );
}
