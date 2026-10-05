"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";
import { ChevronRight } from "../icons/ChevronRight";

export function ButtonLinkWithIcon({
  icon = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabebe09d4dc4727686318c_chevron_right.svg",
  iconVisibility = true,
  text = "Button Link",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"c-button-text is-radius-none"}
        data-figma-id={"10218:76564"}
        tag={"div"}
      >
        <Paragraph
          className={"button-text"}
          data-figma-id={"I10218:76564;4179:8938"}
        >
          {text}
        </Paragraph>
        {iconVisibility ? (
          <Block
            className={"chevron_right is-icon-hover-animation"}
            data-figma-id={"I10218:76564;4179:8939"}
            tag={"div"}
          >
            <ChevronRight icon={icon} />
          </Block>
        ) : null}
      </Block>
    </div>
  );
}
