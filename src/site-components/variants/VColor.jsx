"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import { VColorMode } from "./VColorMode";
import { VColorStyle } from "./VColorStyle";

export function VColor({
  clickable = true,
  color = "Base",
  colorMode = "Normal",
  colorStyle = "Filled",
  hoverEffect = true,
  slotsSlotColor,
}) {
  const _styleVariantMap = {
    Base: "",
    "Alpine Linen": "w-variant-7b68a76e-053d-fddf-d088-a07eff366599",
    Smoke: "w-variant-a8c51529-ce21-e413-6a9d-c8f8be34572b",
    "Cowboy Umber": "w-variant-965df235-efa7-0db6-98de-b670f1be8cdc",
    Paper: "w-variant-c0043128-6fde-88a8-522e-a90389b789b7",
    "Bandana Red": "w-variant-637e1cf2-40fa-18a0-dbf6-2d9bc3006390",
  };

  const _activeStyleVariant = _styleVariantMap[color];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`v-color ${_activeStyleVariant}`}
        data-clickable={
          clickable ? "enable" : clickable ? "disable" : "disable"
        }
        data-color={
          color === "Alpine Linen"
            ? "alpine-linen"
            : color === "Smoke"
            ? "smoke"
            : color === "Cowboy Umber"
            ? "cowboy-umber"
            : color === "Paper"
            ? "paper"
            : color === "Bandana Red"
            ? "bandana-red"
            : "alpine-linen"
        }
        data-color-mode={
          colorMode === "Base"
            ? "normal"
            : colorMode === "Inverse"
            ? "inverse"
            : colorMode === "Inherit"
            ? "inherit"
            : "normal"
        }
        data-color-style={
          colorStyle === "Base"
            ? "filled"
            : colorStyle === "Outline"
            ? "outline"
            : colorStyle === "Text-Only"
            ? "text-only"
            : "filled"
        }
        data-hover-effect={
          hoverEffect ? "fade" : hoverEffect ? "inverse" : "inverse"
        }
        tag={"div"}
      >
        <VColorMode
          slotColorMode={
            <VColorStyle variant={colorStyle} vColorStyle={slotsSlotColor} />
          }
          variant={colorMode}
        />
      </Block>
    </div>
  );
}
