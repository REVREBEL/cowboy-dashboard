"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Heading from "./webflow_modules/Basic/components/Heading";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BasicCard({
  cardVisibility = true,
  headlineTag = "h3",
  headlineText = "Card Headline",
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabeec383814e2c614ba568_Placeholder%20Image.png",
  paragraphText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      {cardVisibility ? (
        <Block className={"g-component"} tag={"div"}>
          <Block
            className={"flex-vertical gap-xsmall min-width_300px"}
            data-figma-id={"4174:15579"}
            tag={"div"}
          >
            <Block className={"image-wrapper"} tag={"div"}>
              <Image
                alt={""}
                className={"image"}
                data-figma-id={"4174:15580"}
                data-figma-image-hash={"32c30b2a3b3b6f21d69e0df1e8c34a76"}
                data-figma-image-id={"6aabeec383814e2c614ba568"}
                height={"auto"}
                loading={"lazy"}
                src={image}
                width={"auto"}
              />
            </Block>
            <Block
              className={"flex-vertical gap-xsmall"}
              data-figma-id={"4174:15581"}
              tag={"div"}
            >
              <Heading
                className={"heading-xxxsmall"}
                data-figma-id={"4174:15582"}
                tag={headlineTag}
              >
                {headlineText}
              </Heading>
              <Paragraph className={"paragraph"} data-figma-id={"4174:15583"}>
                {paragraphText}
              </Paragraph>
            </Block>
          </Block>
        </Block>
      ) : null}
    </div>
  );
}
