"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function BreakpointMobile22({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"breakpoint-mobile-3"}
        data-figma-id={"4174:22107"}
        tag={"div"}
      >
        <Block
          className={"container-21"}
          data-figma-id={"6772:9082"}
          tag={"div"}
        >
          <Block
            className={"section-title-5"}
            data-figma-id={"4174:22108"}
            tag={"div"}
          >
            <Block
              className={"tagline-wrapper"}
              data-figma-id={"5322:10292"}
              tag={"div"}
            >
              <Paragraph className={"tagline-2"} data-figma-id={"5322:10293"}>
                {"Tagline"}
              </Paragraph>
            </Block>
            <Block
              className={"content-style-11"}
              data-figma-id={"4174:22110"}
              tag={"div"}
            >
              <Paragraph className={"heading-7"} data-figma-id={"4174:22111"}>
                {"Medium length section heading goes here"}
              </Paragraph>
              <Paragraph
                className={
                  "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-2"
                }
                data-figma-id={"4174:22112"}
              >
                {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
              </Paragraph>
            </Block>
          </Block>
          <Block
            className={"content-style-22"}
            data-figma-id={"4174:22113"}
            tag={"div"}
          >
            <Block className={"row-2"} data-figma-id={"4174:22114"} tag={"div"}>
              <Block
                className={"tab-pane-1-2"}
                data-figma-id={"4174:22115"}
                tag={"div"}
              >
                <Block
                  className={"feature-tab-2"}
                  data-figma-id={"4174:22116"}
                  tag={"div"}
                >
                  <Paragraph
                    className={"feature-one"}
                    data-figma-id={"4174:22117"}
                  >
                    {"Feature one"}
                  </Paragraph>
                  <Paragraph className={"_01-2"} data-figma-id={"4174:22118"}>
                    {"01"}
                  </Paragraph>
                </Block>
                <Block
                  className={"content-style-23"}
                  data-figma-id={"4174:22119"}
                  tag={"div"}
                >
                  <Block
                    className={"header-style-4"}
                    data-figma-id={"4174:22120"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"heading-8"}
                      data-figma-id={"4174:22121"}
                    >
                      {"Short heading goes here"}
                    </Paragraph>
                    <Paragraph
                      className={"text-14"}
                      data-figma-id={"4174:22122"}
                    >
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                      }
                    </Paragraph>
                  </Block>
                  <Image
                    alt={""}
                    data-figma-id={"4174:22123"}
                    data-figma-image-hash={"e2dd3b47293400dbc287719579a1c58b"}
                    data-figma-image-id={"6aabeee0e9ac8b309506bf72"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabeee0e9ac8b309506bf72_Placeholder%20Image.png"
                    }
                    width={"auto"}
                  />
                </Block>
              </Block>
              <Block
                className={"tab-pane-2-2"}
                data-figma-id={"5068:34375"}
                tag={"div"}
              >
                <Block
                  className={"feature-tab-2"}
                  data-figma-id={"5068:34376"}
                  tag={"div"}
                >
                  <Paragraph
                    className={"feature-one"}
                    data-figma-id={"5068:34377"}
                  >
                    {"Feature two"}
                  </Paragraph>
                  <Paragraph className={"_02-2"} data-figma-id={"5068:34378"}>
                    {"02"}
                  </Paragraph>
                </Block>
              </Block>
              <Block
                className={"tab-pane-3-2"}
                data-figma-id={"5068:34384"}
                tag={"div"}
              >
                <Block
                  className={"feature-tab-2"}
                  data-figma-id={"5068:34385"}
                  tag={"div"}
                >
                  <Paragraph
                    className={"feature-one"}
                    data-figma-id={"5068:34386"}
                  >
                    {"Feature three"}
                  </Paragraph>
                  <Paragraph className={"_03-2"} data-figma-id={"5068:34387"}>
                    {"03"}
                  </Paragraph>
                </Block>
              </Block>
              <Block
                className={"tab-pane-4-2"}
                data-figma-id={"5068:34393"}
                tag={"div"}
              >
                <Block
                  className={"feature-tab-2"}
                  data-figma-id={"5068:34394"}
                  tag={"div"}
                >
                  <Paragraph
                    className={"feature-one"}
                    data-figma-id={"5068:34395"}
                  >
                    {"Feature four"}
                  </Paragraph>
                  <Paragraph className={"_04-2"} data-figma-id={"5068:34396"}>
                    {"04"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
