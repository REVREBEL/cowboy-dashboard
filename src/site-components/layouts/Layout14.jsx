"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import { AmenityTextFeatureItem } from "../cards/AmenityTextFeatureItem";

export function Layout14({
  button,
  buttonVisibility = true,
  feature1Description = "Soft linens, extra pillows, blackout curtains, and quiet bedrooms made for restful nights.",
  feature1Label = "Sleep Well",
  feature1Visibility = true,
  feature2Description = "A fully stocked kitchen, coffee setup, dining space, cookware, and everything you need for meals in.",
  feature2Label = "Cook & Gather",
  feature2Visibility = true,
  feature3Description = "Private hot tub, outdoor seating, mountain air, and a peaceful place to enjoy the views.",
  feature3Label = "Relax Outside",
  feature3Visibility = true,
  feature4Description = "Fast WiFi, smart TVs, and comfortable spaces for remote work or movie nights.",
  feature4Label = "Stay Connected",
  feature4Visibility = true,
  feature5Description = "Room to spread out, games, kid-friendly essentials, and space for everyone to feel at home.",
  feature5Label = "Family Friendly",
  feature5Visibility = true,
  feature6Description = "Easy access to Big Sky Resort, hiking trails, fishing spots, scenic drives, and local favorites.",
  feature6Label = "Adventure Ready",
  feature6Visibility = true,
  headlineContent,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"layout-14"} tag={"div"}>
        <Block
          className={"layout-14_heading"}
          data-figma-id={"880:35"}
          tag={"div"}
        >
          {headlineContent}
        </Block>
        <Block className={"layout-14_cluster"} tag={"div"}>
          <Block className={"layout-14_grid"} tag={"div"}>
            <AmenityTextFeatureItem
              contentDescription={feature1Description}
              contentLabel={feature1Label}
              settingsVisibility={feature1Visibility}
            />
            <AmenityTextFeatureItem
              contentDescription={feature2Description}
              contentLabel={feature2Label}
              settingsVisibility={feature2Visibility}
            />
            <AmenityTextFeatureItem
              contentDescription={feature3Description}
              contentLabel={feature3Label}
              settingsVisibility={feature3Visibility}
            />
            <AmenityTextFeatureItem
              contentDescription={feature4Description}
              contentLabel={feature4Label}
              settingsVisibility={feature4Visibility}
            />
            <AmenityTextFeatureItem
              contentDescription={feature5Description}
              contentLabel={feature5Label}
              settingsVisibility={feature5Visibility}
            />
            <AmenityTextFeatureItem
              contentDescription={feature6Description}
              contentLabel={feature6Label}
              settingsVisibility={feature6Visibility}
            />
          </Block>
          {buttonVisibility ? (
            <Block className={"layout-14_actions"} tag={"div"}>
              {button}
            </Block>
          ) : null}
        </Block>
      </Block>
    </div>
  );
}
