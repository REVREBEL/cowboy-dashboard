"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function FeatureListCardGrid({
  button1Visibility = true,
  card1Button1,
  card2Visibility = true,
  card3Visibility = true,
  card4Visibility = true,
  card5Button2,
  card6Visibility = false,
  card7HeadlineContent2,
  card8Visibility = false,
  headlineContent1,
  slot1Card1,
  slot1Slot1Visibility = true,
  slot2Card2,
  slot2Slot2Visibility = true,
  slot3Card6,
  slot3Slot3Visibility = true,
  slot4Card4,
  slot4Slot4Visibility = true,
  slot5Card5,
  slot6Card3,
  slot7Card7,
  slot8Card8,
  variant = "3 Columns",
}) {
  const _styleVariantMap = {
    "3 Columns": "",
    "2 Columns": "w-variant-2ef88fc6-4505-8c6e-3bfb-e54de3b71602",
    "1 Column": "w-variant-4a0e7556-3b11-df5f-5950-92074021b492",
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
        className={`g-component ${_activeStyleVariant}`}
        data-figma-id={"4174:15571"}
        tag={"div"}
      >
        <Block
          className={`feature-list_layout ${_activeStyleVariant}`}
          tag={"div"}
        >
          <Block
            className={`container-large ${_activeStyleVariant}`}
            data-figma-id={"6772:8763"}
            tag={"div"}
          >
            <Block
              className={`feature-list_intro ${_activeStyleVariant}`}
              data-figma-id={"4174:15572"}
              tag={"div"}
            >
              <Block
                className={`headline-wrapper ${_activeStyleVariant}`}
                data-figma-id={"4174:15573"}
                tag={"div"}
              >
                {headlineContent1}
              </Block>
              <Block
                className={`content-group ${_activeStyleVariant}`}
                id={"w-node-fea7a29b-2805-e0a0-c24f-f72ddc3b1ad4-7c57ac56"}
                tag={"div"}
              >
                {card7HeadlineContent2}
              </Block>
            </Block>
            <Block
              className={`feature-list_card-zone ${_activeStyleVariant}`}
              data-figma-id={"4174:15578"}
              tag={"div"}
            >
              <Block
                className={`feature-list_card-grid ${_activeStyleVariant}`}
                tag={"div"}
              >
                {slot1Card1}
                {slot2Card2}
                {slot6Card3}
                {slot4Card4}
                {slot5Card5}
                {slot3Card6}
                {slot7Card7}
                {slot8Card8}
              </Block>
            </Block>
            <Block
              className={`feature-list_actions ${_activeStyleVariant}`}
              data-figma-id={"4174:15594"}
              tag={"div"}
            >
              {card1Button1}
              {card5Button2}
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
