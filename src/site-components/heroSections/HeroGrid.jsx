"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function HeroGrid({
  button1Visibility = true,
  button2Visibility = true,
  slot,
  slot2,
  slotHeadlineContent,
  text5 = (
    <>
      {"RELUME IMAGE"}
      <br />
    </>
  ),
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-container is-full-width is-full-height"} tag={"div"}>
        <Block
          className={"uc-hero-grid is-full-width"}
          id={"w-node-e2688edd-ac29-fd1f-d46c-b9790e410084-7a94c37a"}
          tag={"div"}
        >
          <Block
            className={"uc-content max-width-large"}
            id={"w-node-e92e5c08-5c98-0f86-5b82-abab7a94c37b-7a94c37a"}
            tag={"div"}
          >
            {slotHeadlineContent}
            <Block className={"button-group"} tag={"div"}>
              {slot}
              {slot2}
            </Block>
          </Block>
          <Block
            className={"uc-media-placeholder"}
            data-relume-media={"unresolved"}
            id={"w-node-e92e5c08-5c98-0f86-5b82-abab7a94c387-7a94c37a"}
            tag={"div"}
          >
            {text5}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
