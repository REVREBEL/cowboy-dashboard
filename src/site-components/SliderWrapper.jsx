"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Icon from "./webflow_modules/Icon/components/Icon";
import SliderArrow from "./webflow_modules/Slider/components/SliderArrow";
import SliderMask from "./webflow_modules/Slider/components/SliderMask";
import SliderNav from "./webflow_modules/Slider/components/SliderNav";
import SliderSlide from "./webflow_modules/Slider/components/SliderSlide";
import SliderWrapper2 from "./webflow_modules/Slider/components/SliderWrapper";

export function SliderWrapper({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"slider-wrapper-2"} tag={"div"}>
        <SliderWrapper2
          animation={"slide"}
          autoMax={0}
          autoplay={false}
          className={"slider-5"}
          data-animation={"slide"}
          data-duration={"500"}
          data-infinite={"1"}
          delay={4000}
          disableSwipe={false}
          duration={500}
          easing={"ease"}
          hideArrows={false}
          iconArrows={true}
          infinite={true}
          navInvert={false}
          navNumbers={false}
          navRound={true}
          navShadow={false}
          navSpacing={3}
        >
          <SliderMask>
            <SliderSlide className={"slide-1"} tag={"div"} />
            <SliderSlide className={"slide-2"} tag={"div"} />
            <SliderSlide className={"slide-3"} tag={"div"} />
          </SliderMask>
          <SliderArrow dir={"left"}>
            <Icon
              widget={{
                type: "icon",
                icon: "slider-left",
              }}
            />
          </SliderArrow>
          <SliderArrow dir={"right"}>
            <Icon
              widget={{
                type: "icon",
                icon: "slider-right",
              }}
            />
          </SliderArrow>
          <SliderNav />
        </SliderWrapper2>
      </Block>
    </div>
  );
}
