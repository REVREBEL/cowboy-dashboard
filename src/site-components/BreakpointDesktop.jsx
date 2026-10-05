"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import BackgroundVideoPlayPauseButton from "./webflow_modules/BackgroundVideo/components/BackgroundVideoPlayPauseButton";
import BackgroundVideoPlayPauseButtonPaused from "./webflow_modules/BackgroundVideo/components/BackgroundVideoPlayPauseButtonPaused";
import BackgroundVideoPlayPauseButtonPlaying from "./webflow_modules/BackgroundVideo/components/BackgroundVideoPlayPauseButtonPlaying";
import BackgroundVideoWrapper from "./webflow_modules/BackgroundVideo/components/BackgroundVideoWrapper";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";

export function BreakpointDesktop({
  playButtonIcon = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabef4923fc10af5ab70642_Play%20Button.svg",
  playButtonVisibility = true,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} data-figma-id={"4174:2083"} tag={"div"}>
        <Block
          className={"container-full-width is-relative"}
          data-figma-id={"4174:2084"}
          data-figma-image-hash={"090f5639fce51cce241c4f56a6fbbb31"}
          data-figma-image-id={"6aac231d0755cf181dfd28df"}
          tag={"div"}
        >
          {playButtonVisibility ? (
            <Image
              alt={""}
              className={"play-button"}
              data-figma-id={"4174:2087"}
              data-figma-image-hash={"88ae0b85d10ae715c2bbd86947d4711f"}
              data-figma-image-id={"6aabef4923fc10af5ab70642"}
              height={"auto"}
              loading={"lazy"}
              src={playButtonIcon}
              width={"auto"}
            />
          ) : null}
          <BackgroundVideoWrapper
            autoPlay={true}
            className={"video"}
            loop={true}
            posterImage={""}
            sources={""}
            tag={"div"}
          >
            {playButtonVisibility ? (
              <BackgroundVideoPlayPauseButton>
                <BackgroundVideoPlayPauseButtonPlaying>
                  <Image
                    alt={"Pause video"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628299f8aa233b83918e24fd_Pause.svg"
                    }
                    width={"auto"}
                  />
                </BackgroundVideoPlayPauseButtonPlaying>
                <BackgroundVideoPlayPauseButtonPaused>
                  <Image
                    alt={"Play video"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628298b20ae0236682d4b87f_Play-24.svg"
                    }
                    width={"auto"}
                  />
                </BackgroundVideoPlayPauseButtonPaused>
              </BackgroundVideoPlayPauseButton>
            ) : null}
          </BackgroundVideoWrapper>
        </Block>
      </Block>
    </div>
  );
}
