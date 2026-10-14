"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function Layout12({
  button,
  buttonVisibility = true,
  decoration,
  decorationVisibility = false,
  headlineContent,
  insetImageAltText = "__wf_reserved_inherit",
  insetImageImage = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba12d2949297ce88f1fa_image.png",
  insetImageVisibility = true,
  layout = "Image Right",
  mainImageAltText = "__wf_reserved_inherit",
  mainImageImage = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba12d2949297ce88f1fa_image.png",
  mainImageVisibility = true,
}) {
  const _styleVariantMap = {
    "Image Right": "",
    "Image Left": "w-variant-068cfc54-fd6c-6205-29be-95568bd54324",
  };

  const _activeStyleVariant = _styleVariantMap[layout];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={`layout-12 ${_activeStyleVariant}`} tag={"div"}>
        <Block
          className={`layout-12_content ${_activeStyleVariant}`}
          data-figma-id={"880:35"}
          tag={"div"}
        >
          {headlineContent}
          {buttonVisibility ? (
            <Block
              className={`layout-12_actions ${_activeStyleVariant}`}
              tag={"div"}
            >
              {button}
            </Block>
          ) : null}
        </Block>
        {mainImageVisibility ? (
          <Block
            className={`layout-12_media ${_activeStyleVariant}`}
            tag={"div"}
          >
            {mainImageVisibility ? (
              <Image
                className={`layout-12_main-image ${_activeStyleVariant}`}
                data-figma-id={"761:6805"}
                data-figma-image-hash={"df9489f459d281ad874524705713e21f"}
                data-figma-image-id={"6abbba12d2949297ce88f1fa"}
                height={"auto"}
                loading={"lazy"}
                src={mainImageImage}
                width={"auto"}
              />
            ) : null}
            {insetImageVisibility ? (
              <Block
                className={`layout-12_inset ${_activeStyleVariant}`}
                tag={"div"}
              >
                <Image
                  className={`layout-12_inset-image ${_activeStyleVariant}`}
                  height={"auto"}
                  loading={"lazy"}
                  src={insetImageImage}
                  width={"auto"}
                />
              </Block>
            ) : null}
          </Block>
        ) : null}
        {decoration}
      </Block>
    </div>
  );
}
