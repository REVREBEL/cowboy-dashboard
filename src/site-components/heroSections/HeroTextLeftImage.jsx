"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Heading from "../webflow_modules/Basic/components/Heading";
import Image from "../webflow_modules/Basic/components/Image";
import Link from "../webflow_modules/Basic/components/Link";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";
import Section from "../webflow_modules/Layout/components/Section";
import { Button } from "../buttons/Button";
import { ButtonLinkWithIcon } from "../buttons/ButtonLinkWithIcon";

export function HeroTextLeftImage({
  button1ButtonLink = {
    href: "#",
  },

  button1ButtonVisibility = true,
  button1Text = "Button",

  button2ButtonLink = {
    href: "#",
  },

  button2ButtonVisibility = true,
  button2Icon = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabebe09d4dc4727686318c_chevron_right.svg",
  button2Text = "Button Link",
  headlineTag = "h2",
  headlineText = "Long heading is what you see here in this feature section",
  image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabebe19ec575712ec89e4e_Placeholder%20Image.png",
  layout = true,
  paragraphText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={"g-component"}
        data-figma-id={"4174:13713"}
        tag={"section"}
      >
        <Block className={"desktop_vertical-container"} tag={"div"}>
          <Block
            className={"v-flex-container_xx-large"}
            data-figma-id={"6751:65180"}
            tag={"div"}
          >
            <Block
              className={"v-layout"}
              data-layout={!layout ? "left" : layout ? "right" : "left"}
              tag={"div"}
            >
              <Block
                className={"grid_2-col"}
                data-figma-id={"4174:7485"}
                tag={"div"}
              >
                <Block
                  className={"flex-vertical gap-small"}
                  data-figma-id={"4174:7486"}
                  id={"w-node-f45dc470-c606-8314-fd3d-eda005f3b64e-b6ae27ca"}
                  tag={"div"}
                >
                  <Block
                    className={"flex-vertical gap-xsmall"}
                    data-figma-id={"4174:7489"}
                    tag={"div"}
                  >
                    <Heading
                      className={"heading-medium"}
                      data-figma-id={"4174:7490"}
                      tag={headlineTag}
                    >
                      {headlineText}
                    </Heading>
                    <Paragraph
                      className={"paragraph-medium"}
                      data-figma-id={"4174:7491"}
                    >
                      {paragraphText}
                    </Paragraph>
                  </Block>
                  <Block
                    className={"flex-horizontal is-actions"}
                    data-figma-id={"4174:7492"}
                    tag={"div"}
                  >
                    {button1ButtonVisibility ? (
                      <Link
                        block={"inline"}
                        button={false}
                        className={"button-visibility"}
                        options={button1ButtonLink}
                      >
                        <Button />
                      </Link>
                    ) : null}
                    {button2ButtonVisibility ? (
                      <Link
                        block={"inline"}
                        button={false}
                        className={"button-visibility is-align-center"}
                        options={button2ButtonLink}
                      >
                        <ButtonLinkWithIcon />
                      </Link>
                    ) : null}
                  </Block>
                </Block>
                <Block className={"image-wrapper"} tag={"div"}>
                  <Image
                    alt={""}
                    className={"image"}
                    data-figma-id={"4174:7495"}
                    data-figma-image-hash={"7b8ecd937d5d15ae392ced7b776ffb5d"}
                    data-figma-image-id={"6aabeb1c1ef5b5071b60031c"}
                    height={"auto"}
                    loading={"lazy"}
                    src={image}
                    width={"auto"}
                  />
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block
          // @ts-ignore - User-defined custom attribute(s)
          breakpoint={"mobile"}
          className={"mobile_vertical-padding-large"}
          tag={"div"}
        >
          <Block
            className={"vertical-container-large is-mobile"}
            data-figma-id={"6751:65410"}
            tag={"div"}
          >
            <Block
              className={"flex-vertical gap-xsmall"}
              data-figma-id={"4174:7554"}
              tag={"div"}
            >
              <Heading
                className={"headline-medium"}
                data-figma-id={"4174:7555"}
                tag={headlineTag}
              >
                {headlineText}
              </Heading>
              <Paragraph
                className={"paragraph-regular"}
                data-figma-id={"4174:7556"}
              >
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                }
                <br />
              </Paragraph>
            </Block>
            <Block className={"image-wrapper"} tag={"div"}>
              <Image
                alt={""}
                className={"image is-widescreen"}
                data-figma-id={"4174:7557"}
                data-figma-image-hash={"6ad744420f74af1822fe1b4f4b751112"}
                data-figma-image-id={"6aabf1a04bfb7d06f4dd7247"}
                height={"auto"}
                loading={"lazy"}
                src={image}
                width={"auto"}
              />
            </Block>
            <Block
              className={"flex-horizontal is-actions"}
              data-figma-id={"4174:7492"}
              tag={"div"}
            >
              {button1ButtonVisibility ? (
                <Link
                  block={"inline"}
                  button={false}
                  className={"button-visibility"}
                  options={button1ButtonLink}
                >
                  <Button buttonText={button1Text} />
                </Link>
              ) : null}
              {button2ButtonVisibility ? (
                <Link
                  block={"inline"}
                  button={false}
                  className={"button-visibility"}
                  options={button2ButtonLink}
                >
                  <ButtonLinkWithIcon icon={button2Icon} text={button2Text} />
                </Link>
              ) : null}
            </Block>
          </Block>
        </Block>
      </Section>
    </div>
  );
}
