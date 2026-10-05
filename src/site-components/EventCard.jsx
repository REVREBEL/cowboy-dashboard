"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import { ButtonDoNotUse } from "./buttons/ButtonDoNotUse";

export function EventCard({
  datetimeText = "03 April, 7:00pm",
  eventName = "Fresh Classics",
  location = "Catskills",
  variant = "Normal",
}) {
  const _styleVariantMap = {
    Normal: "",
    "Image Only": "w-variant-59af3dc9-8396-0fa0-04d5-c99b850b9ede",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`event-card-container ${_activeStyleVariant}`}
        data-figma-id={"175:1958"}
        tag={"div"}
      >
        <Block
          className={`link-block ${_activeStyleVariant}`}
          data-figma-id={"I175:1958;31:9248"}
          tag={"div"}
        >
          <Block
            className={`image-wrapper ${_activeStyleVariant}`}
            data-figma-id={"I175:1958;31:9249"}
            tag={"div"}
          >
            <Image
              alt={""}
              className={`image ${_activeStyleVariant}`}
              data-figma-id={"177:5"}
              data-figma-image-hash={"82c12ef74d0168417fdf517e76d40bab"}
              data-figma-image-id={"6abd469c8ca91be6aee0c9ee"}
              height={"auto"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abd469c8ca91be6aee0c9ee_Event%20Image%20%20Fresh%20Classic.png"
              }
              width={"auto"}
            />
          </Block>
        </Block>
        <Block
          className={`bottom_wrapper ${_activeStyleVariant}`}
          data-figma-id={"I175:1958;31:9251"}
          tag={"div"}
        >
          <Block
            className={`flex-vertical ${_activeStyleVariant}`}
            data-figma-id={"I175:1958;31:9252"}
            tag={"div"}
          >
            <Block
              className={`content-wrapper ${_activeStyleVariant}`}
              data-figma-id={"I175:1958;31:9255"}
              tag={"div"}
            >
              <Block
                className={`flex-vertical gap-xsmall ${_activeStyleVariant}`}
                data-figma-id={"I175:1958;31:9256"}
                tag={"div"}
              >
                <Block
                  className={`headline-wrapper ${_activeStyleVariant}`}
                  data-figma-id={"I175:1958;31:9253"}
                  tag={"div"}
                >
                  <Paragraph
                    className={`headline-small ${_activeStyleVariant}`}
                    data-figma-id={"I175:1958;31:9254"}
                  >
                    {eventName}
                  </Paragraph>
                </Block>
                <Block
                  className={`location-wrapper ${_activeStyleVariant}`}
                  data-figma-id={"I175:1958;104:15643"}
                  tag={"div"}
                >
                  <Paragraph
                    className={`text-regular ${_activeStyleVariant}`}
                    data-figma-id={"I175:1958;104:15643;86:3"}
                  >
                    {location}
                  </Paragraph>
                  <Block
                    className={`venue-details ${_activeStyleVariant}`}
                    tag={"div"}
                  >
                    <Paragraph
                      className={`text-regular is-datetime-text ${_activeStyleVariant}`}
                    >
                      {datetimeText}
                    </Paragraph>
                    <Paragraph
                      className={`text-regular is-venue-text ${_activeStyleVariant}`}
                      data-figma-id={"I175:1958;31:9260"}
                    >
                      {"@ "}
                    </Paragraph>
                    <Paragraph
                      className={`text-regular is-venue-text ${_activeStyleVariant}`}
                    >
                      {"Ralph's Bowling Alley"}
                    </Paragraph>
                  </Block>
                </Block>
                <ButtonDoNotUse
                  buttonColorStyle={"Text-Only"}
                  buttonSize={"Medium"}
                  buttonText={"Read More"}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
