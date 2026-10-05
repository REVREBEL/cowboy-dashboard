"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile222({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-4"}
        data-figma-id={"4174:7525"}
        tag={"div"}
      >
        <Block
          className={"container-23"}
          data-figma-id={"6751:65409"}
          tag={"div"}
        >
          <Block
            className={"component-4"}
            data-figma-id={"4174:7526"}
            tag={"div"}
          >
            <Block
              className={"content-style-10"}
              data-figma-id={"4174:7527"}
              tag={"div"}
            >
              <Block
                className={"section-title-2"}
                data-figma-id={"4174:7528"}
                tag={"div"}
              >
                <Block
                  className={"relume"}
                  data-figma-id={"4174:7529"}
                  tag={"div"}
                />
                <Block
                  className={"content-style-11"}
                  data-figma-id={"4174:7530"}
                  tag={"div"}
                >
                  <Paragraph
                    className={"heading-9"}
                    data-figma-id={"4174:7531"}
                  >
                    {"Medium length section heading goes here"}
                  </Paragraph>
                  <Paragraph className={"text-16"} data-figma-id={"4174:7532"}>
                    {
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                    }
                  </Paragraph>
                </Block>
              </Block>
              <Block
                className={"button-wrapper"}
                data-figma-id={"4174:7533"}
                tag={"div"}
              >
                <Block
                  className={"button-style-35"}
                  data-figma-id={"4174:7534"}
                  tag={"div"}
                />
                <Block
                  className={"c-button-text"}
                  data-figma-id={"4174:7535"}
                  tag={"div"}
                />
              </Block>
            </Block>
            <Block
              className={"placeholder-lightbox-2"}
              data-figma-id={"4174:7536"}
              data-figma-image-hash={"2b9b5ead027619935bea0b634418e622"}
              data-figma-image-id={"6aabef4aec27e8bdec0e1c96"}
              tag={"div"}
            >
              <Image
                alt={""}
                className={"play-button"}
                data-figma-id={"4174:7539"}
                data-figma-image-hash={"9993d9e18662b9398b2e462c74c077b5"}
                data-figma-image-id={"6aabef4b1c7a037382de4146"}
                height={"auto"}
                loading={"lazy"}
                src={
                  "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabef4b1c7a037382de4146_Play%20Button.svg"
                }
                width={"auto"}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
