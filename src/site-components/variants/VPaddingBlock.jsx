"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import { VPaddingInline } from "./VPaddingInline";
import { formatNumber } from "../webflow_modules/Builtin/helpers/formatNumber";

export function VPaddingBlock({
  blockBreakpointAdjustment = true,
  blockPadding = "Normal",
  bottomAdjustmentAmount = 0,
  bottomPaddingAdjustment = false,
  inlineBreakpointAdjustment = true,
  inlinePadding = "Normal",
  leftAdjustmentAmount = 0,
  leftPaddingAdjustment = false,
  rightAdjustmentAmount = 0,
  rightPaddingAdjustment = false,
  slotsSlotPadding,
  topAdjustmentAmount = 0,
  topPaddingAdjustment = false,
}) {
  const _styleVariantMap = {
    "XX Large": "w-variant-8fe858c3-d4e9-efd6-0e80-39a17fd21b28",
    "X Large": "w-variant-d148cdd4-6c9e-e6f7-b209-2aa486c06831",
    Large: "w-variant-e5e0edc3-17a6-5a64-e14c-a706fdedd608",
    Medium: "w-variant-4b47caee-e254-0e70-929d-27ae2eb9e9e7",
    Normal: "",
    Small: "w-variant-696a9d4d-98a2-4f2b-b3b6-d57dd2eb2fe9",
    "X Small": "w-variant-02b8f9de-dd26-89b0-fe44-c121faaa8496",
    "XX Small": "w-variant-af6db602-0ecd-296c-36e0-9bd89c861ea4",
    None: "w-variant-958e3533-0b69-d6db-f357-3125030e67f7",
  };

  const _activeStyleVariant = _styleVariantMap[blockPadding];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`v-padding-block ${_activeStyleVariant}`}
        data-breakpoint-adjustment={
          blockBreakpointAdjustment
            ? "enable"
            : !blockBreakpointAdjustment
            ? "disable"
            : "enable"
        }
        data-component={"padding"}
        data-padding-block={
          blockPadding === "XX Large"
            ? "xxl"
            : blockPadding === "X Large"
            ? "xl"
            : blockPadding === "Large"
            ? "lg"
            : blockPadding === "Medium"
            ? "md"
            : blockPadding === "None"
            ? "base"
            : blockPadding === "Small"
            ? "sm"
            : blockPadding === "X Small"
            ? "xs"
            : blockPadding === "XX Small"
            ? "xxs"
            : blockPadding === "None"
            ? "none"
            : "base"
        }
        data-padding-left-adj={null}
        data-padding-left-amt={formatNumber(-1)(leftAdjustmentAmount)}
        data-padding-right-adj={null}
        data-padding-right-amt={formatNumber(-1)(rightAdjustmentAmount)}
        tag={"div"}
      >
        <VPaddingInline
          bottomAdjustmentAmount={bottomAdjustmentAmount}
          bottomPaddingAdjustment={bottomPaddingAdjustment}
          breakpointAdjustment={inlineBreakpointAdjustment}
          padding={inlinePadding}
          slotsSlotPadding={slotsSlotPadding}
          topAdjustmentAmount={topAdjustmentAmount}
          topPaddingAdjustment={topPaddingAdjustment}
        />
      </Block>
    </div>
  );
}
