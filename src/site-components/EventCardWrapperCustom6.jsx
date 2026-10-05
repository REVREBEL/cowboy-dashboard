"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import { EventImageNewYears } from "./EventImageNewYears";

export function EventCardWrapperCustom6({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"event-card_wrapper"}
        data-figma-id={"175:1981"}
        tag={"div"}
      >
        <Block
          className={"link-block"}
          data-figma-id={"I175:1981;31:9248"}
          tag={"div"}
        >
          <Block
            className={"image-wrapper-2"}
            data-figma-id={"I175:1981;31:9249"}
            tag={"div"}
          >
            <Block
              className={"event-image-new-years"}
              data-figma-id={"I175:1981;42:4"}
              tag={"div"}
            >
              <EventImageNewYears />
            </Block>
          </Block>
        </Block>
        <Block
          className={"container-16"}
          data-figma-id={"I175:1981;31:9251"}
          tag={"div"}
        >
          <Block
            className={"flex-vertical-2"}
            data-figma-id={"I175:1981;31:9252"}
            tag={"div"}
          >
            <Block
              className={"headline-wrapper-2"}
              data-figma-id={"I175:1981;31:9253"}
              tag={"div"}
            >
              <Paragraph
                className={"headline-small-4"}
                data-figma-id={"I175:1981;31:9254"}
              >
                {"RANCH 54: NEW YEAR’S EVE"}
              </Paragraph>
            </Block>
            <Block
              className={"content-wrapper"}
              data-figma-id={"I175:1981;31:9255"}
              tag={"div"}
            >
              <Block
                className={"flex-vertical-3"}
                data-figma-id={"I175:1981;31:9256"}
                tag={"div"}
              >
                <Block data-figma-id={"I175:1981;31:9259"} tag={"div"}>
                  <Paragraph
                    className={"text-regular"}
                    data-figma-id={"I175:1981;31:9260"}
                  >
                    {"6:30pm December 31 @The Dining Room"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
            <Block
              className={"content-wrapper-2"}
              data-figma-id={"I175:1981;31:9261"}
              tag={"div"}
            >
              <Block
                className={"flex-horizontal-2"}
                data-figma-id={"I175:1981;31:9262"}
                tag={"div"}
              >
                <Paragraph
                  className={"paragraph-4"}
                  data-figma-id={"I175:1981;31:9263"}
                >
                  {
                    "Cowboy goes full surreal for New Year’s Eve. Dress strange, dance late, and step into a night of disco, drinks, costumes, and beautiful nonsense inspired by Studio 54 and dreams gone slightly sideways.\n"
                  }
                </Paragraph>
              </Block>
            </Block>
            <Block
              className={"flex-horizontal-3"}
              data-figma-id={"I175:1981;31:9264"}
              tag={"div"}
            >
              <Block
                className={"read-more_wrapper"}
                data-figma-id={"I175:1981;31:9265"}
                tag={"div"}
              >
                <Block
                  className={"flex-vertical-4"}
                  data-figma-id={"I175:1981;31:9266"}
                  tag={"div"}
                >
                  <Block
                    className={"link-block-2"}
                    data-figma-id={"I175:1981;31:9267"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"text-regular-2"}
                      data-figma-id={"I175:1981;31:9268"}
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
