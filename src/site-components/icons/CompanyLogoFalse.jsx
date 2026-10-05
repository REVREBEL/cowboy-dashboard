"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function CompanyLogoFalse({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"company-logo"} data-figma-id={"4179:8846"} tag={"div"}>
        <Image
          alt={""}
          className={"logo-wide is-color-cowboy-umber"}
          data-figma-id={"4727:53042"}
          data-figma-image-hash={"7a7b78332d6b3d7724e8c45ed5ade836"}
          data-figma-image-id={"6aabe52961789f51c524c2a2"}
          height={"auto"}
          loading={"lazy"}
          src={
            "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aac77be7fac020d6e3dbf84_Cowboy.svg"
          }
          width={"auto"}
        />
      </Block>
    </div>
  );
}
