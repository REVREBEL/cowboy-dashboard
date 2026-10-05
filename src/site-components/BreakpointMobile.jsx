"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-9"}
        data-figma-id={"4174:2097"}
        tag={"div"}
      >
        <Block
          className={"placeholder-lightbox-4"}
          data-figma-id={"4174:2098"}
          data-figma-image-hash={"2b9b5ead027619935bea0b634418e622"}
          data-figma-image-id={"6aabef4aec27e8bdec0e1c96"}
          tag={"div"}
        >
          <Image
            alt={""}
            data-figma-id={"4174:2099"}
            data-figma-image-hash={"dab60ba662d94b8ff60959ab47afc588"}
            data-figma-image-id={"6aac231f55a2fd618c4e96f9"}
            height={"auto"}
            loading={"lazy"}
            src={
              "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aac231f55a2fd618c4e96f9_Play%20Button.svg"
            }
            width={"auto"}
          />
          <Image
            alt={""}
            className={"play-button"}
            data-figma-id={"4174:2101"}
            data-figma-image-hash={"88ae0b85d10ae715c2bbd86947d4711f"}
            data-figma-image-id={"6aabef4923fc10af5ab70642"}
            height={"auto"}
            loading={"lazy"}
            src={
              "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabef4923fc10af5ab70642_Play%20Button.svg"
            }
            width={"auto"}
          />
        </Block>
        <Block
          className={"content-style-26"}
          data-figma-id={"4174:2103"}
          tag={"div"}
        >
          <Block
            className={"container-32"}
            data-figma-id={"6751:62563"}
            tag={"div"}
          >
            <Block
              className={"component-6"}
              data-figma-id={"6751:62561"}
              tag={"div"}
            >
              <Block
                className={"column-2"}
                data-figma-id={"4174:2104"}
                tag={"div"}
              >
                <Paragraph
                  className={"medium-length-hero-headline-goes-here-2"}
                  data-figma-id={"4174:2105"}
                >
                  {"Medium length hero heading goes here"}
                </Paragraph>
              </Block>
              <Block
                className={"column-9"}
                data-figma-id={"4174:2106"}
                tag={"div"}
              >
                <Paragraph
                  className={
                    "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-suspendisse-varius-enim-in-eros-elementum-tri-8"
                  }
                  data-figma-id={"4174:2107"}
                >
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                  }
                </Paragraph>
                <Block
                  className={"actions-5"}
                  data-figma-id={"4174:2108"}
                  tag={"div"}
                >
                  <Block
                    className={"button-style-8"}
                    data-figma-id={"4174:2109"}
                    tag={"div"}
                  />
                  <Block
                    className={"button-style-23"}
                    data-figma-id={"4174:2110"}
                    tag={"div"}
                  />
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
