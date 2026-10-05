"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";

export function EventsCardSingle({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block data-figma-id={"42:2"} tag={"div"}>
        <Block className={"link-style"} data-figma-id={"31:9248"} tag={"div"}>
          <Block
            className={"figure-style"}
            data-figma-id={"31:9249"}
            tag={"div"}
          >
            <Block
              className={"event-image-bingo"}
              data-figma-id={"42:4"}
              tag={"div"}
            />
          </Block>
        </Block>
        <Block
          className={"containertransform"}
          data-figma-id={"31:9251"}
          tag={"div"}
        >
          <Block
            className={"event-details-container"}
            data-figma-id={"31:9252"}
            tag={"div"}
          >
            <Block
              className={"heading-3"}
              data-figma-id={"31:9253"}
              tag={"div"}
            >
              <Paragraph className={"heading-text"} data-figma-id={"31:9254"}>
                {"Bingo"}
              </Paragraph>
            </Block>
            <Block
              className={"paragraphmargin"}
              data-figma-id={"31:9255"}
              tag={"div"}
            >
              <Block
                className={"paragraph-2"}
                data-figma-id={"31:9256"}
                tag={"div"}
              >
                <Block
                  className={"property-location-label"}
                  data-figma-id={"104:15643"}
                  tag={"div"}
                />
                <Block data-figma-id={"31:9259"} tag={"div"}>
                  <Paragraph
                    className={"_0900-pm-tuesdays-parlor-bar"}
                    data-figma-id={"31:9260"}
                  >
                    {"09:00 PM Tuesday's @Parlor Bar"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
            <Block
              className={"paragraphmargin-2"}
              data-figma-id={"31:9261"}
              tag={"div"}
            >
              <Block
                className={"paragraph-3"}
                data-figma-id={"31:9262"}
                tag={"div"}
              >
                <Paragraph
                  className={"description-text"}
                  data-figma-id={"31:9263"}
                >
                  {
                    "Tuesday nights at Parlor Bar, where a little luck could pay off. Grab a drink, claim a card, and play for cash prizes and bragging rights."
                  }
                </Paragraph>
              </Block>
            </Block>
            <Block
              className={"containermargin"}
              data-figma-id={"31:9264"}
              tag={"div"}
            >
              <Block
                className={"container-4"}
                data-figma-id={"31:9265"}
                tag={"div"}
              >
                <Block
                  className={"link---read-moremargin"}
                  data-figma-id={"31:9266"}
                  tag={"div"}
                >
                  <Block
                    className={"link---read-more"}
                    data-figma-id={"31:9267"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"read-more"}
                      data-figma-id={"31:9268"}
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
