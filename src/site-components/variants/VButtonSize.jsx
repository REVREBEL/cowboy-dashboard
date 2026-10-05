"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function VButtonSize({ size = "Normal", vButtonSize }) {
  const _styleVariantMap = {
    "X Large": "w-variant-950fb9a9-6ccb-1ef5-fbeb-609ae41dbe0d",
    Large: "w-variant-14343002-1545-43e3-0576-6cecbebb0200",
    Medium: "w-variant-ac6cd878-180f-ec01-0cb5-cdd1fceeb4d0",
    Normal: "",
    Small: "w-variant-b0df964b-84ae-f14c-8e2a-1ba2c47de4b0",
    "X Small": "w-variant-f9ac4316-2d78-3bc7-54bb-d4b4bd06ab34",
  };

  const _activeStyleVariant = _styleVariantMap[size];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`v-button-size ${_activeStyleVariant}`}
        data-button-size={
          size === "X Large"
            ? "xl"
            : size === "Large"
            ? "lg"
            : size === "Medium"
            ? "md"
            : size === "None"
            ? "base"
            : size === "Small"
            ? "sm"
            : size === "X Small"
            ? "xs"
            : "base"
        }
        tag={"div"}
      >
        {vButtonSize}
      </Block>
    </div>
  );
}
