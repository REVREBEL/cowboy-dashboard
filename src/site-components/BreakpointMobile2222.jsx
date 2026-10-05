"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile2222({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-5"}
        data-figma-id={"4174:1961"}
        tag={"div"}
      >
        <Block
          className={"container-25"}
          data-figma-id={"6751:62498"}
          tag={"div"}
        >
          <Block
            className={"column-17"}
            data-figma-id={"4174:1962"}
            tag={"div"}
          >
            <Block
              className={"content-style-11"}
              data-figma-id={"4174:1963"}
              tag={"div"}
            >
              <Paragraph
                className={"heading-large"}
                data-figma-id={"4174:1964"}
              >
                {"Medium length hero heading goes here"}
              </Paragraph>
              <Paragraph
                className={
                  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-suspendisse-varius-enim-in-eros-elementum-tri-4"
                }
                data-figma-id={"4174:1965"}
              >
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                }
              </Paragraph>
            </Block>
            <Block
              className={"actions-5"}
              data-figma-id={"4174:1966"}
              tag={"div"}
            >
              <Block
                className={"button-style-37"}
                data-figma-id={"4174:1967"}
                tag={"div"}
              />
              <Block
                className={"button-boder_white"}
                data-figma-id={"4174:1968"}
                tag={"div"}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
