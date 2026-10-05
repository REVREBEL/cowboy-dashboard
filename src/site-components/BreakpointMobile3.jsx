"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile3({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-7"}
        data-figma-id={"4174:7550"}
        tag={"div"}
      >
        <Block className={"breakpoint-mobile-7"} tag={"div"}>
          <Block
            className={"container-29"}
            data-figma-id={"6751:65410"}
            tag={"div"}
          >
            <Block
              className={"component-4"}
              data-figma-id={"4174:7551"}
              tag={"div"}
            >
              <Block
                className={"content-style-11"}
                data-figma-id={"4174:7552"}
                tag={"div"}
              >
                <Block
                  className={"content-style-11"}
                  data-figma-id={"4174:7554"}
                  tag={"div"}
                >
                  <Paragraph
                    className={"heading-10"}
                    data-figma-id={"4174:7555"}
                  >
                    {
                      "Long heading is what you see here in this feature section"
                    }
                  </Paragraph>
                  <Paragraph
                    className={"paragraph-regular"}
                    data-figma-id={"4174:7556"}
                  >
                    {
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                    }
                  </Paragraph>
                </Block>
              </Block>
              <Image
                alt={""}
                data-figma-id={"4174:7557"}
                data-figma-image-hash={"6ad744420f74af1822fe1b4f4b751112"}
                data-figma-image-id={"6aabf1a04bfb7d06f4dd7247"}
                height={"auto"}
                loading={"lazy"}
                src={
                  "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabf1a04bfb7d06f4dd7247_Placeholder%20Image.png"
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
