"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointDesktop2222({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-desktop-6"}
        data-figma-id={"4174:3633"}
        tag={"div"}
      >
        <Block
          className={"container-26"}
          data-figma-id={"6751:62906"}
          tag={"div"}
        >
          <Block
            className={"card-7"}
            data-figma-id={"4174:3634"}
            data-figma-image-hash={"3e4a862abafeecc87ecada3720a7943d"}
            data-figma-image-id={"6aabf158395fac15bf2eb337"}
            tag={"div"}
          >
            <Block
              className={"column-18"}
              data-figma-id={"4174:3635"}
              tag={"div"}
            >
              <Block
                className={"content-style-7"}
                data-figma-id={"4174:3636"}
                tag={"div"}
              >
                <Paragraph
                  className={"medium-length-hero-headline-goes-here-3"}
                  data-figma-id={"4174:3637"}
                >
                  {"Medium length hero heading goes here"}
                </Paragraph>
                <Paragraph
                  className={
                    "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-suspendisse-varius-enim-in-eros-elementum-tri-5"
                  }
                  data-figma-id={"4174:3638"}
                >
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                  }
                </Paragraph>
              </Block>
              <Block
                className={"actions-9"}
                data-figma-id={"4174:3639"}
                tag={"div"}
              >
                <Block
                  className={"button-style-40"}
                  data-figma-id={"4174:3640"}
                  tag={"div"}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
