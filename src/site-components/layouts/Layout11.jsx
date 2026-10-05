"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function Layout11({
  altText = "__wf_reserved_inherit",
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba12d2949297ce88f1fa_image.png",
  imageVisibility = true,
  layout = "Left Layout",
  slotHeadlineContent,
}) {
  const _styleVariantMap = {
    "Left Layout": "",
    "RIght Layout": "w-variant-6435251c-5a86-2fa3-76c6-6e782f434dd4",
  };

  const _activeStyleVariant = _styleVariantMap[layout];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={`layout-11 ${_activeStyleVariant}`} tag={"div"}>
        <Block
          className={`content-group is-layout-11 ${_activeStyleVariant}`}
          data-figma-id={"880:35"}
          tag={"div"}
        >
          {slotHeadlineContent}
        </Block>
        {imageVisibility ? (
          <Block
            className={`image-wrapper is-layout-11 ${_activeStyleVariant}`}
            tag={"div"}
          >
            <Image
              className={`image ${_activeStyleVariant}`}
              data-figma-id={"761:6805"}
              data-figma-image-hash={"df9489f459d281ad874524705713e21f"}
              data-figma-image-id={"6abbba12d2949297ce88f1fa"}
              height={"auto"}
              loading={"lazy"}
              src={image}
              width={"auto"}
            />
          </Block>
        ) : null}
      </Block>
    </div>
  );
}
