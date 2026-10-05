"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function VColorStyle({ variant = "Filled", vColorStyle }) {
  const _styleVariantMap = {
    Filled: "",
    Outline: "w-variant-7159850b-83ba-6a7b-5ac7-cd7d1d4e16dc",
    "Text-Only": "w-variant-f96f31ef-193d-2654-c202-6d861601815f",
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
        className={`v-color-style ${_activeStyleVariant}`}
        data-color-style={"filled"}
        tag={"div"}
      >
        {vColorStyle}
      </Block>
    </div>
  );
}
