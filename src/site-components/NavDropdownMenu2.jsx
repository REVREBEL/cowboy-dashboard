"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Grid from "./webflow_modules/Layout/components/Grid";

export function NavDropdownMenu2({
  featureButtonColor = "Base",
  featureButtonColorMode = "Normal",
  featureButtonSize = "Normal",
  navcard2Visibility = true,
  navcard3Visibility = true,
  navcard3Visibility2 = true,
  navcard4Visibility = true,
  slotNavcard,
  slotNavcard2,
  slotNavcard3,
  slotNavcard4,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} tag={"div"}>
        <Block className={"menu-wrapper"} tag={"div"}>
          <Grid className={"grid_2-col is-grid-responsive"}>
            {slotNavcard}
            {slotNavcard2}
            {slotNavcard3}
            {slotNavcard4}
          </Grid>
        </Block>
      </Block>
    </div>
  );
}
