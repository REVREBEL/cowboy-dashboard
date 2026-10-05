"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile2({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-10"}
        data-figma-id={"4174:2526"}
        data-figma-image-hash={"3e4a862abafeecc87ecada3720a7943d"}
        data-figma-image-id={"6aabf158395fac15bf2eb337"}
        tag={"div"}
      >
        <Block
          className={"container-34"}
          data-figma-id={"6751:62817"}
          tag={"div"}
        >
          <Block
            className={"column-21"}
            data-figma-id={"4174:2527"}
            tag={"div"}
          >
            <Block
              className={"content-style-11"}
              data-figma-id={"4174:2528"}
              tag={"div"}
            >
              <Paragraph
                className={"medium-length-hero-headline-goes-here-4"}
                data-figma-id={"4174:2529"}
              >
                {"Medium length hero heading goes here"}
              </Paragraph>
              <Paragraph
                className={
                  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-suspendisse-varius-enim-in-eros-elementum-tri-10"
                }
                data-figma-id={"4174:2530"}
              >
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                }
              </Paragraph>
            </Block>
            <Block
              className={"actions-5"}
              data-figma-id={"4174:2531"}
              tag={"div"}
            >
              <Block
                className={"button-style-38"}
                data-figma-id={"4174:2532"}
                tag={"div"}
              />
              <Block
                className={"button-style-46"}
                data-figma-id={"4174:2533"}
                tag={"div"}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
