"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointDesktop2({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-desktop-9"}
        data-figma-id={"4174:2518"}
        data-figma-image-hash={"3e4a862abafeecc87ecada3720a7943d"}
        data-figma-image-id={"6aabf158395fac15bf2eb337"}
        tag={"div"}
      >
        <Block
          className={"container-33"}
          data-figma-id={"6751:62796"}
          tag={"div"}
        >
          <Block
            className={"column-20"}
            data-figma-id={"4174:2519"}
            tag={"div"}
          >
            <Block
              className={"content-style-7"}
              data-figma-id={"4174:2520"}
              tag={"div"}
            >
              <Paragraph
                className={"medium-length-hero-headline-goes-here-4"}
                data-figma-id={"4174:2521"}
              >
                {"Medium length hero heading goes here"}
              </Paragraph>
              <Paragraph
                className={
                  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-suspendisse-varius-enim-in-eros-elementum-tri-9"
                }
                data-figma-id={"4174:2522"}
              >
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                }
              </Paragraph>
            </Block>
            <Block
              className={"actions-5"}
              data-figma-id={"4174:2523"}
              tag={"div"}
            >
              <Block
                className={"button-style-38"}
                data-figma-id={"4174:2524"}
                tag={"div"}
              />
              <Block
                className={"button-style-46"}
                data-figma-id={"4174:2525"}
                tag={"div"}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
