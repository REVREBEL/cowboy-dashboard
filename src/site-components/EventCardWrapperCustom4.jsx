"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import { EventImageVinyl } from "./EventImageVinyl";
import { LocationWrapperCustomUrban2 } from "./LocationWrapperCustomUrban2";

export function EventCardWrapperCustom4({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"event-card_wrapper-3"}
        data-figma-id={"175:1935"}
        tag={"div"}
      >
        <Block
          className={"link-block"}
          data-figma-id={"I175:1935;31:9248"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper-2"}
            data-figma-id={"I175:1935;31:9249"}
            tag={"div"}
          >
            <Block
              className={"event-image-vinyl"}
              data-figma-id={"I175:1935;42:4"}
              tag={"div"}
            >
              <EventImageVinyl />
            </Block>
          </Block>
        </Block>
        <Block
          className={"bottom_wrapper"}
          data-figma-id={"I175:1935;31:9251"}
          tag={"div"}
        >
          <Block
            className={"flex-vertical-2"}
            data-figma-id={"I175:1935;31:9252"}
            tag={"div"}
          >
            <Block
              className={"headline-wrapper-2"}
              data-figma-id={"I175:1935;31:9253"}
              tag={"div"}
            >
              <Paragraph
                className={"headline-small-2"}
                data-figma-id={"I175:1935;31:9254"}
              >
                {"ALL VINYL ALL NITE"}
              </Paragraph>
            </Block>
            <Block
              className={"content-wrapper"}
              data-figma-id={"I175:1935;31:9255"}
              tag={"div"}
            >
              <Block
                className={"flex-vertical-3"}
                data-figma-id={"I175:1935;31:9256"}
                tag={"div"}
              >
                <Block
                  className={"location-wrapper"}
                  data-figma-id={"I175:1935;104:15643"}
                  tag={"div"}
                >
                  <LocationWrapperCustomUrban2 />
                </Block>
                <Block data-figma-id={"I175:1935;31:9259"} tag={"div"}>
                  <Paragraph
                    className={"text-regular-4"}
                    data-figma-id={"I175:1935;31:9260"}
                  >
                    {"7:00pm April 3 @The Dining Room"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
            <Block
              className={"content-wrapper-2"}
              data-figma-id={"I175:1935;31:9261"}
              tag={"div"}
            >
              <Block
                className={"flex-horizontal-2"}
                data-figma-id={"I175:1935;31:9262"}
                tag={"div"}
              >
                <Paragraph
                  className={"paragraph-5"}
                  data-figma-id={"I175:1935;31:9263"}
                >
                  {
                    "No playlists. No skips. Just records. Join us at Urban Cowboy Lodge for an all-vinyl night of deep cuts, familiar favorites, and whatever the needle finds next."
                  }
                </Paragraph>
              </Block>
            </Block>
            <Block
              className={"flex-horizontal-3"}
              data-figma-id={"I175:1935;31:9264"}
              tag={"div"}
            >
              <Block
                className={"read-more_wrapper"}
                data-figma-id={"I175:1935;31:9265"}
                tag={"div"}
              >
                <Block
                  className={"flex-vertical-4"}
                  data-figma-id={"I175:1935;31:9266"}
                  tag={"div"}
                >
                  <Block
                    className={"link-block-3"}
                    data-figma-id={"I175:1935;31:9267"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"text-regular-5"}
                      data-figma-id={"I175:1935;31:9268"}
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
