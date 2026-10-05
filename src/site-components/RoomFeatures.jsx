"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";

export function RoomFeatures({
  label = "The Bed",
  paragraph = "A Catskill night's rest is paramount. We've sourced plush California Aireloom mattresses paired with crisp Bellino fine linens, layered against rustic hand-hewn cedar walls and heavy custom Pendleton blankets.",
  variant = "Left Layout",
}) {
  const _styleVariantMap = {
    "Left Layout": "",
    "Right Layout": "w-variant-b89d8f3c-d4b2-4557-a8bf-e2e85ac8a8b9",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`rooms_feature-content ${_activeStyleVariant}`}
        tag={"div"}
      >
        <Block
          className={`rooms_feature-block ${_activeStyleVariant}`}
          tag={"div"}
        >
          <Block
            className={`content_padding ${_activeStyleVariant}`}
            id={"w-node-_51d61da1-d649-17cc-bd9f-29e71bcfb48e-1bcfb48c"}
            tag={"div"}
          >
            <Block
              className={`content-wrapper ${_activeStyleVariant}`}
              tag={"div"}
            >
              <Block
                className={`label is-md margin-bottom_5px ${_activeStyleVariant}`}
                tag={"div"}
              >
                {label}
              </Block>
              <Block className={`paragraph ${_activeStyleVariant}`} tag={"div"}>
                {paragraph}
              </Block>
            </Block>
          </Block>
          <Block
            className={`image-wrapper ${_activeStyleVariant}`}
            id={"w-node-_144d50ac-297a-7e65-2f16-fb477d455ac9-1bcfb48c"}
            tag={"div"}
          >
            <Image
              alt={""}
              className={`image ${_activeStyleVariant}`}
              height={"auto"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abdb1a786d6addbe9431104_Alpine%20Penthouse%20Bathing%20Suite_002.jpg"
              }
              width={"auto"}
            />
          </Block>
        </Block>
      </Block>
    </div>
  );
}
