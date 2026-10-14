"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import HtmlEmbed from "./webflow_modules/Embed/components/HtmlEmbed";
import Icon from "./webflow_modules/Icon/components/Icon";
import Image from "./webflow_modules/Basic/components/Image";
import Section from "./webflow_modules/Layout/components/Section";
import SliderArrow from "./webflow_modules/Slider/components/SliderArrow";
import SliderMask from "./webflow_modules/Slider/components/SliderMask";
import SliderNav from "./webflow_modules/Slider/components/SliderNav";
import SliderSlide from "./webflow_modules/Slider/components/SliderSlide";
import SliderWrapper from "./webflow_modules/Slider/components/SliderWrapper";

export function ImageSlider({ image1 = "", variant = "Base" }) {
  const _styleVariantMap = {
    Base: "",
    "Radius None": "w-variant-45970bec-263f-0947-cc1f-3a3b16135df6",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={`g-component is-max-height is-overflow-none is-full-width ${_activeStyleVariant}`}
        id={"Components-Slider"}
        tag={"section"}
      >
        <Block
          className={`slider-wrapper is-max-height ${_activeStyleVariant}`}
          tag={"div"}
        >
          <SliderWrapper
            animation={"slide"}
            autoMax={0}
            autoplay={false}
            className={`  cowboy-slider ${_activeStyleVariant}`}
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
              className={`cowboy-slider_mask is-max-height ${_activeStyleVariant}`}
              id={"w-node-a510e5cd-bf6c-e8d2-a50b-47a53800d2ec-3800d2cc"}
            >
              <SliderSlide
                className={`image-cover ${_activeStyleVariant}`}
                tag={"div"}
              >
                <Image
                  alt={""}
                  className={`image ${_activeStyleVariant}`}
                  height={"auto"}
                  loading={"lazy"}
                  src={image1}
                  width={"auto"}
                />
              </SliderSlide>
            </SliderMask>
            <SliderArrow
              className={`slider_arrow is-previous-icon ${_activeStyleVariant}`}
              dir={"left"}
              id={"w-node-a510e5cd-bf6c-e8d2-a50b-47a53800d2f3-3800d2cc"}
            >
              <HtmlEmbed
                className={`icon-circle-left ${_activeStyleVariant}`}
                content={
                  '<svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n  <path transform="translate(512, 0) scale(-1, 1)" d="M464 256c0-114.87-93.13-208-208-208C141.13 48 48 141.13 48 256c0 114.87 93.13 208 208 208s208-93.13 208-208Zm-252 74.14V181.86v0c0-8.84 7.17-16 16.01-15.99 3.73 0 7.34 1.31 10.21 3.69l89.09 74.13v0c6.79 5.65 7.71 15.73 2.06 22.53 -.63.75-1.32 1.44-2.07 2.06l-89.09 74.13v0c-6.8 5.64-16.89 4.72-22.54-2.08 -2.39-2.88-3.7-6.49-3.7-10.22Z"/>\n</svg>'
                }
              />
            </SliderArrow>
            <SliderArrow
              className={`slider_arrow is-next-icon ${_activeStyleVariant}`}
              dir={"right"}
              id={"w-node-a510e5cd-bf6c-e8d2-a50b-47a53800d2f5-3800d2cc"}
            >
              <HtmlEmbed
                className={`icon-circle-right ${_activeStyleVariant}`}
                content={
                  '<svg viewBox="0 0 512 512" fill="currentColor "xmlns="http://www.w3.org/2000/svg"><path d="M464 256c0-114.87-93.13-208-208-208C141.13 48 48 141.13 48 256c0 114.87 93.13 208 208 208s208-93.13 208-208Zm-252 74.14V181.86v0c0-8.84 7.17-16 16.01-15.99 3.73 0 7.34 1.31 10.21 3.69l89.09 74.13v0c6.79 5.65 7.71 15.73 2.06 22.53 -.63.75-1.32 1.44-2.07 2.06l-89.09 74.13v0c-6.8 5.64-16.89 4.72-22.54-2.08 -2.39-2.88-3.7-6.49-3.7-10.22Z"/></svg>'
                }
              />
            </SliderArrow>
            <SliderNav
              className={`cowboy-slider_nav ${_activeStyleVariant}`}
              id={"w-node-a510e5cd-bf6c-e8d2-a50b-47a53800d2f7-3800d2cc"}
            />
          </SliderWrapper>
        </Block>
      </Section>
    </div>
  );
}
