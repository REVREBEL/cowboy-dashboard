"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Heading from "../webflow_modules/Basic/components/Heading";
import Image from "../webflow_modules/Basic/components/Image";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function HeroLayout02({
  button1Visibility = true,
  button2Visibility = true,
  button3Visibility = true,
  headline = "THE RIVER IS THE DINING ROOM.",
  headlineTag = "h2",
  paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed\ndo eiusmod tempor incididunt ut labore et dolore magna\naliqua. Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat.",
  paragraphVisibility = true,
  slotButton,
  slotButton2,
  slotButton3,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"hero-layout_02"}
        data-figma-id={"876:11494"}
        tag={"div"}
      >
        <Block
          className={"content-group is-hero-layout_02"}
          data-figma-id={"876:11496"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper is-layout-02"}
            data-figma-id={"876:11497"}
            data-figma-image-hash={"dec7ffcb630e81319e1faf5a96bd49cb"}
            data-figma-image-id={"6abbba901d6fa901e5c03966"}
            tag={"div"}
          >
            <Image
              alt={""}
              className={"image is-height_550px"}
              data-figma-id={"876:11572"}
              data-figma-image-hash={"27ddaea066114be99dfeac970181b2aa"}
              data-figma-image-id={"6abbba926ca88b125c608c21"}
              height={"auto"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbba926ca88b125c608c21_image.png"
              }
              width={"auto"}
            />
          </Block>
          <Block
            className={"right-column"}
            data-figma-id={"876:11498"}
            tag={"div"}
          >
            <Block
              className={"title-block"}
              data-figma-id={"876:11499"}
              tag={"div"}
            >
              <Heading
                className={"headline-medium"}
                data-figma-id={"876:11500"}
                tag={headlineTag}
              >
                {headline}
              </Heading>
            </Block>
            <Block className={"bottom"} data-figma-id={"876:11504"} tag={"div"}>
              {paragraphVisibility ? (
                <Paragraph
                  className={"paragraph-medium"}
                  data-figma-id={"876:11505"}
                >
                  {paragraph}
                </Paragraph>
              ) : null}
              <Block
                className={"action-group gap-xs"}
                data-figma-id={"876:11487"}
                tag={"div"}
              >
                {slotButton}
                {slotButton2}
                {slotButton3}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
