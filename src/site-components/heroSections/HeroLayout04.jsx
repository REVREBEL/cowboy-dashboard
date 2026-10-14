"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";

export function HeroLayout04({
  button1Button,
  buttonVisibility = true,
  headlineContent,
  layout = "Standard",
  readingScrimVisibility = true,
  scenicImageAltText = "__wf_reserved_inherit",
  scenicImageImage = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbbaad41f61fca02beb069_image.png",
  scenicImageVisibility = true,
  storyContent,
}) {
  const _styleVariantMap = {
    Standard: "",
    Mirrored: "w-variant-276ab01b-4466-93bf-16dd-fc48fd0b3ecd",
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
        className={`hero-layout_04 ${_activeStyleVariant}`}
        data-figma-id={"876:11474"}
        tag={"div"}
      >
        {scenicImageVisibility ? (
          <Block
            className={`hero-layout_04_image-wrapper ${_activeStyleVariant}`}
            data-figma-id={"880:57"}
            tag={"div"}
          >
            <Image
              className={`hero-layout_04_image ${_activeStyleVariant}`}
              data-figma-id={"880:58"}
              data-figma-image-hash={"4711dc0e31c61500fb3bb9328c829865"}
              data-figma-image-id={"6abbbaad41f61fca02beb069"}
              height={"auto"}
              loading={"lazy"}
              src={scenicImageImage}
              width={"auto"}
            />
          </Block>
        ) : null}
        <Block
          className={`hero-layout_04_intro ${_activeStyleVariant}`}
          data-figma-id={"876:11475"}
          tag={"div"}
        >
          <Block data-figma-id={"876:11481"} tag={"div"}>
            {headlineContent}
          </Block>
          <Block
            className={`hero-layout_04_actions ${_activeStyleVariant}`}
            data-figma-id={"876:11487"}
            tag={"div"}
          >
            {button1Button}
          </Block>
        </Block>
        {readingScrimVisibility ? (
          <Block
            className={`hero-layout_04_scrim ${_activeStyleVariant}`}
            tag={"div"}
          />
        ) : null}
        <Block
          className={`hero-layout_04_story ${_activeStyleVariant}`}
          tag={"div"}
        >
          {storyContent}
        </Block>
      </Block>
    </div>
  );
}
