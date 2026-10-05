"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function HeroLayout01({
  button1SlotButton,
  button1Visibility = true,
  button2SlotButton,
  button2Visibility = true,
  button3SlotButton,
  button3Visibility = true,
  imageImage = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbbaad41f61fca02beb069_image.png",
  imageVisibility = true,
  layout = "Left",
  slotHeadlineContent,
}) {
  const _styleVariantMap = {
    Left: "",
    Right: "w-variant-dfd68641-3db5-0d65-6ba2-9e5b791646aa",
  };

  const _activeStyleVariant = _styleVariantMap[layout];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`hero-layout_01 ${_activeStyleVariant}`}
        data-figma-id={"876:11474"}
        tag={"div"}
      >
        {imageVisibility ? (
          <Block
            className={`image-wrapper is-hero-layout_01 ${_activeStyleVariant}`}
            data-figma-id={"880:57"}
            tag={"div"}
          >
            <Image
              alt={""}
              className={`image is-hero-layout-01 ${_activeStyleVariant}`}
              data-figma-id={"880:58"}
              data-figma-image-hash={"4711dc0e31c61500fb3bb9328c829865"}
              data-figma-image-id={"6abbbaad41f61fca02beb069"}
              height={"auto"}
              loading={"lazy"}
              src={imageImage}
              width={"auto"}
            />
          </Block>
        ) : null}
        <Block
          className={`hero-content is-hero-layout-01 ${_activeStyleVariant}`}
          data-figma-id={"876:11475"}
          tag={"div"}
        >
          <Block
            className={`headline-wrapper ${_activeStyleVariant}`}
            data-figma-id={"876:11481"}
            tag={"div"}
          >
            {slotHeadlineContent}
          </Block>
          <Block
            className={`action-group gap-xs ${_activeStyleVariant}`}
            data-figma-id={"876:11487"}
            tag={"div"}
          >
            {button1SlotButton}
            {button2SlotButton}
            {button3SlotButton}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
