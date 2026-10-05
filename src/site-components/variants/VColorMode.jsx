"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";

export function VColorMode({ slotColorMode, variant = "Normal" }) {
  const _styleVariantMap = {
    Normal: "",
    Inverse: "w-variant-2ed06f8b-d207-494e-3139-2c5fb8883b91",
    Inherit: "w-variant-7f81b339-01d0-46cf-f60e-76d17638ba62",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={`v-color-mode ${_activeStyleVariant}`} tag={"div"}>
        <Block className={`slot_color-mode ${_activeStyleVariant}`} tag={"div"}>
          {slotColorMode}
        </Block>
      </Block>
    </div>
  );
}
