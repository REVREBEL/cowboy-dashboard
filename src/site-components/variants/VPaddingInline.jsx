"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import { formatNumber } from "../webflow_modules/Builtin/helpers/formatNumber";

export function VPaddingInline({
  bottomAdjustmentAmount = 0,
  bottomPaddingAdjustment = true,
  breakpointAdjustment = true,
  padding = "Normal",
  slotsSlotPadding,
  topAdjustmentAmount = 0,
  topPaddingAdjustment = true,
}) {
  const _styleVariantMap = {
    "XX Large": "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c2d",
    "X Large": "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c2e",
    Large: "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c2f",
    Medium: "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c30",
    Normal: "",
    Small: "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c31",
    "X Small": "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c32",
    "XX Small": "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c33",
    None: "w-variant-acad69d1-10c4-7c9f-2e5b-4cc4c1384c34",
  };

  const _activeStyleVariant = _styleVariantMap[padding];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`v-padding-inline ${_activeStyleVariant}`}
        data-breakpoint-adjustment={
          breakpointAdjustment
            ? "enable"
            : !breakpointAdjustment
            ? "disable"
            : "enable"
        }
        data-component={"padding-inline"}
        data-padding-bottom-adj={null}
        data-padding-bottom-amt={formatNumber(-1)(bottomAdjustmentAmount)}
        data-padding-inline={
          padding === "XX Large"
            ? "xxl"
            : padding === "X Large"
            ? "xl"
            : padding === "Large"
            ? "lg"
            : padding === "Medium"
            ? "md"
            : padding === "Normal"
            ? "base"
            : padding === "Small"
            ? "sm"
            : padding === "X Small"
            ? "xs"
            : padding === "XX Small"
            ? "xxs"
            : padding === "None"
            ? "none"
            : "base"
        }
        data-padding-top-adj={null}
        data-padding-top-amt={formatNumber(-1)(topAdjustmentAmount)}
        tag={"div"}
      >
        {slotsSlotPadding}
      </Block>
    </div>
  );
}
