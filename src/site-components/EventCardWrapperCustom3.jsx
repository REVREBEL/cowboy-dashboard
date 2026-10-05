"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import { EventImageMovieNight } from "./EventImageMovieNight";

export function EventCardWrapperCustom3({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"event-card_wrapper-3"}
        data-figma-id={"104:15717"}
        tag={"div"}
      >
        <Block
          className={"link-block"}
          data-figma-id={"I104:15717;31:9248"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper-2"}
            data-figma-id={"I104:15717;31:9249"}
            tag={"div"}
          >
            <Block
              className={"event-image-movie-night"}
              data-figma-id={"I104:15717;42:4"}
              tag={"div"}
            >
              <EventImageMovieNight />
            </Block>
          </Block>
        </Block>
        <Block
          className={"container-14"}
          data-figma-id={"I104:15717;31:9251"}
          tag={"div"}
        >
          <Block
            className={"flex-vertical-2"}
            data-figma-id={"I104:15717;31:9252"}
            tag={"div"}
          >
            <Block
              className={"headline-wrapper-2"}
              data-figma-id={"I104:15717;31:9253"}
              tag={"div"}
            >
              <Paragraph
                className={"headline-small"}
                data-figma-id={"I104:15717;31:9254"}
              >
                {"Movie Night"}
              </Paragraph>
            </Block>
            <Block
              className={"content-wrapper"}
              data-figma-id={"I104:15717;31:9255"}
              tag={"div"}
            >
              <Block
                className={"flex-vertical-3"}
                data-figma-id={"I104:15717;31:9256"}
                tag={"div"}
              >
                <Block data-figma-id={"I104:15717;31:9259"} tag={"div"}>
                  <Paragraph
                    className={"text-regular"}
                    data-figma-id={"I104:15717;31:9260"}
                  >
                    {"1st Wednesday Each Month"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
            <Block
              className={"content-wrapper-2"}
              data-figma-id={"I104:15717;31:9261"}
              tag={"div"}
            >
              <Block
                className={"flex-horizontal-2"}
                data-figma-id={"I104:15717;31:9262"}
                tag={"div"}
              >
                <Paragraph
                  className={"paragraph-4"}
                  data-figma-id={"I104:15717;31:9263"}
                >
                  {
                    "Meet us on the Main Lawn after dusk for movies under the Catskills sky. Bring a blanket, grab a drink, and settle in."
                  }
                </Paragraph>
              </Block>
            </Block>
            <Block
              className={"flex-horizontal-3"}
              data-figma-id={"I104:15717;31:9264"}
              tag={"div"}
            >
              <Block
                className={"read-more_wrapper"}
                data-figma-id={"I104:15717;31:9265"}
                tag={"div"}
              >
                <Block
                  className={"flex-vertical-4"}
                  data-figma-id={"I104:15717;31:9266"}
                  tag={"div"}
                >
                  <Block
                    className={"link-block-2"}
                    data-figma-id={"I104:15717;31:9267"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"text-regular-2"}
                      data-figma-id={"I104:15717;31:9268"}
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
