"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Heading from "./webflow_modules/Basic/components/Heading";
import Icon from "./webflow_modules/Icon/components/Icon";
import Image from "./webflow_modules/Basic/components/Image";
import Link from "./webflow_modules/Basic/components/Link";
import Section from "./webflow_modules/Layout/components/Section";
import SliderArrow from "./webflow_modules/Slider/components/SliderArrow";
import SliderMask from "./webflow_modules/Slider/components/SliderMask";
import SliderNav from "./webflow_modules/Slider/components/SliderNav";
import SliderSlide from "./webflow_modules/Slider/components/SliderSlide";
import SliderWrapper from "./webflow_modules/Slider/components/SliderWrapper";

export function SliderSectiokn2({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={"section-8 is-secondary-11"}
        id={"Components-Slider"}
        tag={"section"}
      >
        <Block className={"container-88"} tag={"div"}>
          <Block className={"sg_section-heading-wrapper-11"} tag={"div"}>
            <Block className={"sg_heading-row-11"} tag={"div"}>
              <Heading className={"heading-19"} tag={"h2"}>
                {"Slider"}
              </Heading>
              <Link
                block={"inline"}
                button={false}
                className={"text-button-17 is-small"}
                options={{
                  href: "#",
                }}
              >
                <Block className={"button_icon-10"} tag={"div"} />
              </Link>
            </Block>
          </Block>
          <Block className={"flex_vertical-12 gap-large-9"} tag={"div"}>
            <Block
              className={"flex_horizontal-11 gap-small-7 mobile-l-vertical"}
              tag={"div"}
            >
              <Block className={"sg_table-col-6"} tag={"div"}>
                <Block className={"sg_table-cell-title-9"} tag={"div"}>
                  {"Default"}
                </Block>
                <Block className={"sg_preview-solid-4"} tag={"div"}>
                  <SliderWrapper
                    animation={"slide"}
                    autoMax={0}
                    autoplay={false}
                    className={"slider-4  "}
                    delay={4000}
                    disableSwipe={false}
                    duration={500}
                    easing={"ease"}
                    hideArrows={false}
                    iconArrows={true}
                    infinite={true}
                    navInvert={true}
                    navNumbers={false}
                    navRound={true}
                    navShadow={false}
                    navSpacing={3}
                  >
                    <SliderMask
                      className={"slider_mask-3"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c459c-741c458d"
                      }
                    >
                      <SliderSlide tag={"div"}>
                        <Image
                          alt={""}
                          className={"image_cover_fix2-3"}
                          height={"auto"}
                          loading={"lazy"}
                          src={
                            "https://uploads-ssl.webflow.com/663ae41a035a5092ac55e30d/663ae41a035a5092ac55e325_image_placeholder.svg"
                          }
                          width={"auto"}
                        />
                      </SliderSlide>
                      <SliderSlide tag={"div"}>
                        <Image
                          alt={""}
                          className={"image_cover_fix2-3"}
                          height={"auto"}
                          loading={"lazy"}
                          src={
                            "https://uploads-ssl.webflow.com/663ae41a035a5092ac55e30d/663ae41a035a5092ac55e325_image_placeholder.svg"
                          }
                          width={"auto"}
                        />
                      </SliderSlide>
                      <SliderSlide tag={"div"}>
                        <Image
                          alt={""}
                          className={"image_cover_fix2-3"}
                          height={"auto"}
                          loading={"lazy"}
                          src={
                            "https://uploads-ssl.webflow.com/663ae41a035a5092ac55e30d/663ae41a035a5092ac55e325_image_placeholder.svg"
                          }
                          width={"auto"}
                        />
                      </SliderSlide>
                    </SliderMask>
                    <SliderArrow
                      className={"slider_arrow-4 is-prev-bottom"}
                      dir={"left"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45a3-741c458d"
                      }
                    >
                      <Icon
                        widget={{
                          type: "icon",
                          icon: "slider-left",
                        }}
                      />
                    </SliderArrow>
                    <SliderArrow
                      className={"slider_arrow-4 is-next-bottom"}
                      dir={"right"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45a5-741c458d"
                      }
                    >
                      <Icon
                        widget={{
                          type: "icon",
                          icon: "slider-right",
                        }}
                      />
                    </SliderArrow>
                    <SliderNav
                      className={"slider_nav-3"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45a7-741c458d"
                      }
                    />
                  </SliderWrapper>
                </Block>
              </Block>
              <Block className={"sg_table-col-6"} tag={"div"}>
                <Block className={"sg_table-cell-title-9"} tag={"div"}>
                  {"Inverse"}
                </Block>
                <Block className={"sg_preview-solid-inverse-3"} tag={"div"}>
                  <SliderWrapper
                    animation={"slide"}
                    autoMax={0}
                    autoplay={false}
                    className={"slider-4  "}
                    delay={4000}
                    disableSwipe={false}
                    duration={500}
                    easing={"ease"}
                    hideArrows={false}
                    iconArrows={true}
                    infinite={true}
                    navInvert={true}
                    navNumbers={false}
                    navRound={true}
                    navShadow={false}
                    navSpacing={3}
                  >
                    <SliderMask
                      className={"slider_mask-3"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45ad-741c458d"
                      }
                    >
                      <SliderSlide tag={"div"}>
                        <Image
                          alt={""}
                          className={"image_cover_fix2-3"}
                          height={"auto"}
                          loading={"lazy"}
                          src={
                            "https://uploads-ssl.webflow.com/663ae41a035a5092ac55e30d/663ae41a035a5092ac55e325_image_placeholder.svg"
                          }
                          width={"auto"}
                        />
                      </SliderSlide>
                      <SliderSlide tag={"div"}>
                        <Image
                          alt={""}
                          className={"image_cover_fix2-3"}
                          height={"auto"}
                          loading={"lazy"}
                          src={
                            "https://uploads-ssl.webflow.com/663ae41a035a5092ac55e30d/663ae41a035a5092ac55e325_image_placeholder.svg"
                          }
                          width={"auto"}
                        />
                      </SliderSlide>
                      <SliderSlide tag={"div"}>
                        <Image
                          alt={""}
                          className={"image_cover_fix2-3"}
                          height={"auto"}
                          loading={"lazy"}
                          src={
                            "https://uploads-ssl.webflow.com/663ae41a035a5092ac55e30d/663ae41a035a5092ac55e325_image_placeholder.svg"
                          }
                          width={"auto"}
                        />
                      </SliderSlide>
                    </SliderMask>
                    <SliderArrow
                      className={"slider_arrow-4 is-inverse-9 is-prev-bottom"}
                      dir={"left"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45b4-741c458d"
                      }
                    >
                      <Icon
                        widget={{
                          type: "icon",
                          icon: "slider-left",
                        }}
                      />
                    </SliderArrow>
                    <SliderArrow
                      className={"slider_arrow-4 is-inverse-9 is-next-bottom"}
                      dir={"right"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45b6-741c458d"
                      }
                    >
                      <Icon
                        widget={{
                          type: "icon",
                          icon: "slider-right",
                        }}
                      />
                    </SliderArrow>
                    <SliderNav
                      className={"slider_nav-3"}
                      id={
                        "w-node-_0270594a-a4e6-f975-3d4b-834a741c45b8-741c458d"
                      }
                    />
                  </SliderWrapper>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Section>
    </div>
  );
}
