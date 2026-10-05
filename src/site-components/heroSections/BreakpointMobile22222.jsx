"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile22222({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-6"}
        data-figma-id={"4174:3642"}
        tag={"div"}
      >
        <Block
          className={"container-27"}
          data-figma-id={"6751:62907"}
          tag={"div"}
        >
          <Block
            className={"card-8"}
            data-figma-id={"4174:3643"}
            data-figma-image-hash={"3e4a862abafeecc87ecada3720a7943d"}
            data-figma-image-id={"6aabf158395fac15bf2eb337"}
            tag={"div"}
          >
            <Block
              className={"column-19"}
              data-figma-id={"4174:3644"}
              tag={"div"}
            >
              <Block
                className={"content-style-8"}
                data-figma-id={"4174:3645"}
                tag={"div"}
              >
                <Paragraph
                  className={"medium-length-hero-headline-goes-here-3"}
                  data-figma-id={"4174:3646"}
                >
                  {"Medium length hero heading goes here"}
                </Paragraph>
                <Paragraph
                  className={
                    "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-suspendisse-varius-enim-in-eros-elementum-tri-6"
                  }
                  data-figma-id={"4174:3647"}
                >
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                  }
                </Paragraph>
              </Block>
              <Block
                className={"actions-9"}
                data-figma-id={"4174:3648"}
                tag={"div"}
              >
                <Block
                  className={"button-style-40"}
                  data-figma-id={"4174:3649"}
                  tag={"div"}
                />
                <Block
                  className={"button-style-42"}
                  data-figma-id={"4174:3650"}
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
