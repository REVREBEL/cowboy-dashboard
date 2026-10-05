"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";
import Link from "../webflow_modules/Basic/components/Link";

export function FullHeroImageWithButtons({
  button1Link = {
    href: "#",
  },

  button1Visibility = true,
  button2Visibility = true,
  buttonWrapper,
  buttonWrapper2,
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabebad98496880cfcc8736_Placeholder%20Image.png",
  slotHeadlineContent,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"g-component is-realative"}
        data-figma-id={"4174:7509"}
        tag={"div"}
      >
        <Block
          className={"vertical-container--full"}
          data-figma-id={"6751:65181"}
          tag={"div"}
        >
          <Block data-figma-id={"4174:7510"} tag={"div"}>
            <Block
              className={
                "flex-vertical is-absolute absolute-padding-left-xlarge padding-responsive-md"
              }
              data-figma-id={"4174:7511"}
              tag={"div"}
            >
              <Block
                className={"headline-content padding-resonsive-md"}
                tag={"div"}
              >
                {slotHeadlineContent}
              </Block>
              <Block className={"button-wrapper is-action"} tag={"div"}>
                {button1Visibility ? (
                  <Link
                    block={"inline"}
                    button={false}
                    className={"button-visibility"}
                    options={button1Link}
                  >
                    {buttonWrapper2}
                  </Link>
                ) : null}
                {button2Visibility ? (
                  <Link
                    block={"inline"}
                    button={false}
                    className={"button-visibility"}
                    options={{
                      href: "#",
                    }}
                  >
                    {buttonWrapper}
                  </Link>
                ) : null}
              </Block>
            </Block>
            <Block
              className={"image-wrapper is-ratio-widescreen"}
              data-figma-id={"4174:7520"}
              data-figma-image-hash={"ba0cdd14bf415ba80085a3ecf52f0386"}
              data-figma-image-id={"6aabef48daf9576ab16c0dd8"}
              tag={"div"}
            >
              <Image
                alt={""}
                className={"image"}
                data-figma-id={"4174:7523"}
                data-figma-image-hash={"88ae0b85d10ae715c2bbd86947d4711f"}
                data-figma-image-id={"6aabef4923fc10af5ab70642"}
                height={"auto"}
                loading={"lazy"}
                src={image}
                width={"auto"}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
