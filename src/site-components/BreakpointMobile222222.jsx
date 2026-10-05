"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import Section from "./webflow_modules/Layout/components/Section";

export function BreakpointMobile222222({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={"breakpoint-mobile-8"}
        data-figma-id={"4174:13721"}
        tag={"section"}
      >
        <Block
          className={"container-31"}
          data-figma-id={"6772:8048"}
          tag={"div"}
        >
          <Block
            className={"component-4"}
            data-figma-id={"4174:13722"}
            tag={"div"}
          >
            <Block
              className={"content-style-11"}
              data-figma-id={"4174:13723"}
              tag={"div"}
            >
              <Block
                className={"content-style-11"}
                data-figma-id={"4174:13725"}
                tag={"div"}
              >
                <Paragraph
                  className={"heading-12"}
                  data-figma-id={"4174:13726"}
                >
                  {"Long heading is what you see here in this feature section"}
                </Paragraph>
                <Paragraph className={"text-20"} data-figma-id={"4174:13727"}>
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                  }
                </Paragraph>
              </Block>
            </Block>
            <Image
              alt={""}
              data-figma-id={"4174:13728"}
              data-figma-image-hash={"7b8ecd937d5d15ae392ced7b776ffb5d"}
              data-figma-image-id={"6aabebe19ec575712ec89e4e"}
              height={"auto"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabebe19ec575712ec89e4e_Placeholder%20Image.png"
              }
              width={"auto"}
            />
          </Block>
        </Block>
      </Section>
    </div>
  );
}
