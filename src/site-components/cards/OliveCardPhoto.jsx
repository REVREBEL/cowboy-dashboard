"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Heading from "../webflow_modules/Basic/components/Heading";
import Image from "../webflow_modules/Basic/components/Image";
import Link from "../webflow_modules/Basic/components/Link";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";

export function OliveCardPhoto({
  cardStyleCardColor = "Primary",
  headingHeadingTag = "h4",
  headingHeadingText = "A different heading, so it doesn't look repetitive.",
  headingSubheadingText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. ",
  headingSubheadingVisible = true,
  imageImage = "",
  imageImageAltText = "__wf_reserved_inherit",
  imageImageVisible = true,

  primaryLinkPrimaryLink = {
    href: "#",
  },

  primaryLinkPrimaryLinkIcon = "",
  primaryLinkPrimaryLinkIconAltText = "__wf_reserved_inherit",
  primaryLinkPrimaryLinkIconVisible = true,
  primaryLinkPrimaryLinkId = "",
  primaryLinkPrimaryLinkText = "Read post",
  primaryLinkPrimaryLinkVisible = true,

  secondaryLinkSecondaryLink = {
    href: "#",
  },

  secondaryLinkSecondaryLinkIcon = "",
  secondaryLinkSecondaryLinkIconAltText = "__wf_reserved_inherit",
  secondaryLinkSecondaryLinkIconVisible = true,
  secondaryLinkSecondaryLinkId = "",
  secondaryLinkSecondaryLinkText = "Read post",
  secondaryLinkSecondaryLinkVisible = true,
  tagSlot,
  tagTagSlot = "",
  tagTagSlotVisible = true,
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-ea9d2dc6-c3e7-96e2-6f1d-633456a761e8",
    "Is-Inverse": "w-variant-ea9d2dc6-c3e7-96e2-6f1d-633456a761e9",
    "On-Inverse": "w-variant-ea9d2dc6-c3e7-96e2-6f1d-633456a761ea",
  };

  const _activeStyleVariant = _styleVariantMap[cardStyleCardColor];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`olive-card is-photo remove-radius_top ${_activeStyleVariant}`}
        tag={"div"}
      >
        <Block
          className={`olive-card_body olive-card_no-margin olive-card_no-gap ${_activeStyleVariant}`}
          tag={"div"}
        >
          <Block
            className={`olive-card_inner-wrapper olive-card_flex ${_activeStyleVariant}`}
            tag={"div"}
          >
            <>
              {tagSlot}
              {tagTagSlot}
            </>
            <Heading
              className={`olive-card_heading ${_activeStyleVariant}`}
              tag={headingHeadingTag}
            >
              {headingHeadingText}
            </Heading>
            {headingSubheadingVisible ? (
              <Paragraph
                className={`olive-card_subheading ${_activeStyleVariant}`}
              >
                {headingSubheadingText}
              </Paragraph>
            ) : null}
            <Block
              className={`olive-card_button-group ${_activeStyleVariant}`}
              tag={"div"}
            >
              {primaryLinkPrimaryLinkVisible ? (
                <Block
                  className={`olive-card_text-button ${_activeStyleVariant}`}
                  id={primaryLinkPrimaryLinkId}
                  tag={"div"}
                >
                  <Link
                    block={"inline"}
                    button={false}
                    className={`link-block-6 ${_activeStyleVariant}`}
                    options={primaryLinkPrimaryLink}
                  >
                    {primaryLinkPrimaryLinkIconVisible ? (
                      <Image
                        className={`olive-card_icon-3 ${_activeStyleVariant}`}
                        height={"auto"}
                        loading={"lazy"}
                        src={primaryLinkPrimaryLinkIcon}
                        width={"auto"}
                      />
                    ) : null}
                    <Block
                      className={`olive-card_link ${_activeStyleVariant}`}
                      tag={"div"}
                    >
                      {primaryLinkPrimaryLinkText}
                    </Block>
                  </Link>
                </Block>
              ) : null}
              {secondaryLinkSecondaryLinkVisible ? (
                <Block
                  className={`olive-card_text-button ${_activeStyleVariant}`}
                  id={secondaryLinkSecondaryLinkId}
                  tag={"div"}
                >
                  <Link
                    block={"inline"}
                    button={false}
                    className={`link-block-5 ${_activeStyleVariant}`}
                    options={secondaryLinkSecondaryLink}
                  >
                    {secondaryLinkSecondaryLinkIconVisible ? (
                      <Image
                        className={`olive-card_icon-3 ${_activeStyleVariant}`}
                        height={"auto"}
                        loading={"lazy"}
                        src={secondaryLinkSecondaryLinkIcon}
                        width={"auto"}
                      />
                    ) : null}
                    <Block
                      className={`olive-card_link ${_activeStyleVariant}`}
                      tag={"div"}
                    >
                      {secondaryLinkSecondaryLinkText}
                    </Block>
                  </Link>
                </Block>
              ) : null}
            </Block>
          </Block>
          <Block
            className={`olive-card_inner-wrapper is-photo-card ${_activeStyleVariant}`}
            tag={"div"}
          >
            {imageImageVisible ? (
              <Image
                className={`olive-card_image olive-card_image-cover ${_activeStyleVariant}`}
                height={"auto"}
                loading={"lazy"}
                src={imageImage}
                width={"auto"}
              />
            ) : null}
          </Block>
        </Block>
      </Block>
    </div>
  );
}
