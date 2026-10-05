"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Heading from "../webflow_modules/Basic/components/Heading";
import Image from "../webflow_modules/Basic/components/Image";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function HeroLayout01({
  button1Visibility = true,
  button2Visibility = true,
  button3Visibility = true,
  eyebrow = "EXPLORE",
  eyebrowVisibility = true,
  headline = "THE RIVER IS THE DINING ROOM.",
  headlineTag = "h2",
  icon = "",
  iconVisibility = true,
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbbaad41f61fca02beb069_image.png",
  paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
        className={"hero-layout_01"}
        data-figma-id={"876:11474"}
        tag={"div"}
      >
        <Block
          className={"image-wrapper is-hero-layout_01"}
          data-figma-id={"880:57"}
          tag={"div"}
        >
          <Image
            alt={""}
            className={"image is-hero-layout-01"}
            data-figma-id={"880:58"}
            data-figma-image-hash={"4711dc0e31c61500fb3bb9328c829865"}
            data-figma-image-id={"6abbbaad41f61fca02beb069"}
            height={"auto"}
            loading={"lazy"}
            src={image}
            width={"auto"}
          />
        </Block>
        <Block
          className={"hero-content is-hero-layout-01"}
          data-figma-id={"876:11475"}
          tag={"div"}
        >
          {eyebrowVisibility ? (
            <Block
              className={"eyebrow"}
              data-figma-id={"876:11478"}
              tag={"div"}
            >
              <Block
                className={"eyebrow-icon"}
                data-figma-id={"876:11479"}
                tag={"div"}
              >
                {iconVisibility ? (
                  <Image
                    alt={""}
                    className={"icon"}
                    height={"auto"}
                    loading={"lazy"}
                    src={icon}
                    width={"auto"}
                  />
                ) : null}
              </Block>
              <Paragraph className={"label"} data-figma-id={"876:11480"}>
                {eyebrow}
              </Paragraph>
            </Block>
          ) : null}
          <Block
            className={"headline-wrapper"}
            data-figma-id={"876:11481"}
            tag={"div"}
          >
            <Heading
              className={"headline-medium"}
              data-figma-id={"876:11482"}
              tag={headlineTag}
            >
              {headline}
            </Heading>
          </Block>
          {paragraphVisibility ? (
            <Paragraph
              className={"paragraph-medium"}
              data-figma-id={"876:11530"}
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
    </div>
  );
}
