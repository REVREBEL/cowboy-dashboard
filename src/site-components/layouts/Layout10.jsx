"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function Layout10({
  altText = "__wf_reserved_inherit",
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbb9b9a0d33159115a48ec_image.png",
  imageVisibility = true,
  inlineLayout = "Layout Left",
  slotHeadlineContent,
}) {
  const _styleVariantMap = {
    "Layout Left": "",
    "Layout Right": "w-variant-21c39f8a-7efe-6218-e258-009f473378ba",
    "Layout Stacked": "w-variant-e2e3a4f7-4722-19ef-03af-dc006be1be6b",
  };

  const _activeStyleVariant = _styleVariantMap[inlineLayout];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`layout-10 ${_activeStyleVariant}`}
        data-figma-id={"624:38380"}
        tag={"div"}
      >
        <Block
          className={`section-content is-layout-10 ${_activeStyleVariant}`}
          data-figma-id={"880:29"}
          tag={"div"}
        >
          {imageVisibility ? (
            <Block
              className={`image-wrapper is-layout-10 ${_activeStyleVariant}`}
              data-figma-id={"880:30"}
              tag={"div"}
            >
              <Image
                className={`image is-layout-10 ${_activeStyleVariant}`}
                data-figma-id={"761:6806"}
                data-figma-image-hash={"6b211ed3d5f905b588641079d4e4a88c"}
                data-figma-image-id={"6abbb9b9a0d33159115a48ec"}
                height={"auto"}
                loading={"lazy"}
                src={image}
                width={"auto"}
              />
            </Block>
          ) : null}
          <Block
            className={`content-group is-layout-10 ${_activeStyleVariant}`}
            data-figma-id={"880:31"}
            tag={"div"}
          >
            {slotHeadlineContent}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
