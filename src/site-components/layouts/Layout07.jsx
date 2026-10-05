"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function Layout07({
  altText = "__wf_reserved_inherit",
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbb985a9e568d79d372757_image.png",
  imageVisibility = true,
  layoutVisibility = true,
  slotHeadlineContent,
  slotHeadlineContent2,
  variant = "Horizontal Hero Layout",
}) {
  const _styleVariantMap = {
    "Horizontal Hero Layout": "",
    "Stacked Layout": "w-variant-a7027f03-a735-c9ff-93ac-be2c42ea37e0",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      {layoutVisibility ? (
        <Block
          className={`layout-07 ${_activeStyleVariant}`}
          data-figma-id={"876:11326"}
          tag={"div"}
        >
          <Block
            className={`flex_horizontal is-layout-07 ${_activeStyleVariant}`}
            data-figma-id={"876:11327"}
            tag={"div"}
          >
            <Block
              className={`headline-group ${_activeStyleVariant}`}
              data-figma-id={"880:47"}
              tag={"div"}
            >
              {slotHeadlineContent}
            </Block>
            <Block
              className={`content-group is-layout-07 ${_activeStyleVariant}`}
              data-figma-id={"876:11329"}
              tag={"div"}
            >
              {imageVisibility ? (
                <Block
                  className={`image-wrapper is-laytout-7 ${_activeStyleVariant}`}
                  data-figma-id={"880:48"}
                  tag={"div"}
                >
                  <Image
                    className={`image ${_activeStyleVariant}`}
                    data-figma-id={"876:11330"}
                    data-figma-image-hash={"80c267cd7d7b8c356461eadf944d7d6a"}
                    data-figma-image-id={"6abbb985a9e568d79d372757"}
                    height={"auto"}
                    loading={"lazy"}
                    src={image}
                    width={"auto"}
                  />
                </Block>
              ) : null}
              <Block
                className={`content-group ${_activeStyleVariant}`}
                tag={"div"}
              >
                {slotHeadlineContent2}
              </Block>
            </Block>
          </Block>
        </Block>
      ) : null}
    </div>
  );
}
