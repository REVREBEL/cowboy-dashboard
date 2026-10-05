"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import { VButton } from "../variants/VButton";
import { VButtonSize } from "../variants/VButtonSize";
import { VColor } from "../variants/VColor";
import { listOfElementsToText } from "../webflow_modules/Basic/helpers/listOfElementsToText";

export function ButtonDoNotUse({
  buttonButtonId = "",
  buttonClickable = true,
  buttonColor = "Base",
  buttonColorMode = "Normal",
  buttonColorStyle = "Filled",
  buttonHoverEffect = true,
  buttonSize = "Normal",
  buttonText = "Button",
  dataAttributesButtonName = "",
  dataAttributesContentName = "",
  dataAttributesResyVenueId = "49476",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"c-button"}
        data-button-content={dataAttributesContentName}
        data-button-name={dataAttributesButtonName}
        data-button-page={listOfElementsToText("Home")}
        data-component={"button"}
        tag={"div"}
      >
        <VButtonSize
          size={buttonSize}
          vButtonSize={
            <VColor
              clickable={buttonClickable}
              color={buttonColor}
              colorMode={buttonColorMode}
              colorStyle={buttonColorStyle}
              hoverEffect={buttonHoverEffect}
              slotsSlotColor={
                <VButton
                  buttonId={buttonButtonId}
                  resyVenueId={dataAttributesResyVenueId}
                  text={buttonText}
                />
              }
            />
          }
        />
      </Block>
    </div>
  );
}
