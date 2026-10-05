"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Link from "../webflow_modules/Basic/components/Link";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";
import { ButtonDoNotUse } from "../buttons/ButtonDoNotUse";

export function LargeHeroImageCtaButton({
  button1Link = {
    href: "#",
  },

  button1Text = "Button",
  button1Visibility = true,

  button2Link = {
    href: "#",
  },

  button2Visibility = true,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} data-figma-id={"4174:1953"} tag={"div"}>
        <Block className={"breakpoint-desktop-5"} tag={"div"}>
          <Block
            className={"v-flex-container_xx-large"}
            data-figma-id={"6751:62497"}
            tag={"div"}
          >
            <Block
              className={
                "flex-vertical gap-normal flex-align-left is-max-width-medium"
              }
              data-figma-id={"4174:1954"}
              tag={"div"}
            >
              <Block
                className={"flex-vertical gap-xsmall"}
                data-figma-id={"4174:1955"}
                tag={"div"}
              >
                <Paragraph
                  className={"heading-large is-white"}
                  data-figma-id={"4174:1956"}
                >
                  {"Medium length hero heading goes here"}
                </Paragraph>
                <Paragraph
                  className={"paragraph-medium is-white"}
                  data-figma-id={"4174:1957"}
                >
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                  }
                </Paragraph>
              </Block>
              <Block
                className={"button-container is-actions"}
                data-figma-id={"4174:1958"}
                tag={"div"}
              >
                {button1Visibility ? (
                  <Link
                    block={"inline"}
                    button={false}
                    className={"button-visibility"}
                    options={button1Link}
                  >
                    <ButtonDoNotUse buttonText={button1Text} />
                  </Link>
                ) : null}
                {button2Visibility ? (
                  <Link
                    block={"inline"}
                    button={false}
                    className={"button-visibility"}
                    options={button2Link}
                  />
                ) : null}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
