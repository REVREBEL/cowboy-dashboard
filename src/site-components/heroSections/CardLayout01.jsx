"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Image from "../webflow_modules/Basic/components/Image";
import { HeadlineContentBlock } from "../HeadlineContentBlock";
import { formatNumber } from "../webflow_modules/Builtin/helpers/formatNumber";

export function CardLayout01({
  button1SlotButton,
  button1Visibility = true,
  button2SlotButton,
  button2Visibility = true,
  eyebrowDataContrast = true,
  eyebrowEyebrowText = "Eyebrow Text",
  eyebrowEyebrowVisibility = true,
  eyebrowInverseColor = true,
  headlineHeadlineText = "Urban Cowboy",
  imageImage = "",
  imageImageOverlayOpacity = 0,
  imageVisibility = true,
  paragraphHeadlineTag = "h2",
  paragraphParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. ",
  paragraphParagraphFontWeight = true,
  paragraphVisibility = true,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} data-figma-id={"4174:3642"} tag={"div"}>
        <Block
          className={"card-01"}
          data-figma-id={"4174:3643"}
          data-figma-image-hash={"3e4a862abafeecc87ecada3720a7943d"}
          data-figma-image-id={"6aabf158395fac15bf2eb337"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper is-position-absolute is-z-index_1"}
            tag={"div"}
          >
            <Block
              className={"image-overlay is-absolute"}
              data-overlay-opacity={formatNumber(-1)(imageImageOverlayOpacity)}
              tag={"div"}
            />
            {imageVisibility ? (
              <Image
                alt={""}
                className={"image event-image-bingo"}
                height={"auto"}
                loading={"lazy"}
                src={imageImage}
                width={"auto"}
              />
            ) : null}
          </Block>
          <Block
            className={"content-wrapper is-card-01"}
            data-figma-id={"4174:3645"}
            tag={"div"}
          >
            <HeadlineContentBlock
              eyebrowDataContrast={eyebrowDataContrast}
              eyebrowEyebrowText={eyebrowEyebrowText}
              eyebrowEyebrowVisibility={eyebrowEyebrowVisibility}
              eyebrowInverseColor={eyebrowInverseColor}
              headlineHeadlineTag={paragraphHeadlineTag}
              headlineHeadlineText={headlineHeadlineText}
              paragraph1Paragraph={paragraphParagraph}
              paragraph1Visibility={paragraphVisibility}
              paragraphSettingsParagraphFontWeight={
                paragraphParagraphFontWeight
              }
              subheadlineSubheadlineVisibility={false}
            />
          </Block>
          <Block
            className={"action-group"}
            data-figma-id={"4174:3648"}
            tag={"div"}
          >
            {button1SlotButton}
            {button2SlotButton}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
