"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import { EventImageFreshClassic } from "./EventImageFreshClassic";
import { LocationWrapperCustomUrban3 } from "./LocationWrapperCustomUrban3";

export function EventCardWrapperCustom5({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"event-card-container"}
        data-figma-id={"175:1958"}
        tag={"div"}
      >
        <Block
          className={"link-block"}
          data-figma-id={"I175:1958;31:9248"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper-2"}
            data-figma-id={"I175:1958;31:9249"}
            tag={"div"}
          >
            <Block
              className={"event-image-fresh-classic"}
              data-figma-id={"I175:1958;42:4"}
              tag={"div"}
            >
              <EventImageFreshClassic />
            </Block>
          </Block>
        </Block>
        <Block
          className={"bottom_wrapper"}
          data-figma-id={"I175:1958;31:9251"}
          tag={"div"}
        >
          <Block
            className={"flex-vertical-2"}
            data-figma-id={"I175:1958;31:9252"}
            tag={"div"}
          >
            <Block
              className={"headline-wrapper-2"}
              data-figma-id={"I175:1958;31:9253"}
              tag={"div"}
            >
              <Paragraph
                className={"headline-small-3"}
                data-figma-id={"I175:1958;31:9254"}
              >
                {"FRESH CLASSICS"}
              </Paragraph>
            </Block>
            <Block
              className={"content-wrapper"}
              data-figma-id={"I175:1958;31:9255"}
              tag={"div"}
            >
              <Block
                className={"flex-vertical-3"}
                data-figma-id={"I175:1958;31:9256"}
                tag={"div"}
              >
                <Block
                  className={"location-wrapper"}
                  data-figma-id={"I175:1958;104:15643"}
                  tag={"div"}
                >
                  <LocationWrapperCustomUrban3 />
                </Block>
                <Block data-figma-id={"I175:1958;31:9259"} tag={"div"}>
                  <Paragraph
                    className={"text-regular-7"}
                    data-figma-id={"I175:1958;31:9260"}
                  >
                    {"4:00pm October 18 @ Ralph's"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
            <Block
              className={"content-wrapper-2"}
              data-figma-id={"I175:1958;31:9261"}
              tag={"div"}
            >
              <Block
                className={"flex-horizontal-2"}
                data-figma-id={"I175:1958;31:9262"}
                tag={"div"}
              >
                <Paragraph
                  className={"paragraph-6"}
                  data-figma-id={"I175:1958;31:9263"}
                >
                  {
                    "Old cars, live music, and a proper afternoon hang at Ralph’s. Pull up with something worth looking at, grab a drink, and stay for acoustic sets as the sun starts to drop."
                  }
                </Paragraph>
              </Block>
            </Block>
            <Block
              className={"flex-horizontal-3"}
              data-figma-id={"I175:1958;31:9264"}
              tag={"div"}
            >
              <Block
                className={"read-more_wrapper"}
                data-figma-id={"I175:1958;31:9265"}
                tag={"div"}
              >
                <Block
                  className={"flex-vertical-4"}
                  data-figma-id={"I175:1958;31:9266"}
                  tag={"div"}
                >
                  <Block
                    className={"link-block-4"}
                    data-figma-id={"I175:1958;31:9267"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"text-regular-8"}
                      data-figma-id={"I175:1958;31:9268"}
                    >
                      {"Read More"}
                    </Paragraph>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
