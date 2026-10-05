"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import HtmlEmbed from "../webflow_modules/Embed/components/HtmlEmbed";
import { VButton } from "../variants/VButton";
import { VButtonSize } from "../variants/VButtonSize";
import { VColor } from "../variants/VColor";
import { listOfElementsToText } from "../webflow_modules/Basic/helpers/listOfElementsToText";

export function RezyButton({
  buttonClickable = true,
  buttonColor = "Base",
  buttonColorMode = "Normal",
  buttonColorStyle = "Filled",
  buttonHoverEffect = true,
  buttonSize = "Normal",
  buttonText = "Button",
  dataAttributesButtonName = "",
  dataAttributesContentName = "",
  dataAttributesResyVenueId = "",
  vButtonButtonId = "",
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
        data-figma-id={"4174:1496"}
        data-resy-venue-id={"52140"}
        tag={"div"}
      >
        <Block tag={"div"}>
          <HtmlEmbed
            className={"code-embed"}
            content={
              '<style>\n\nspan[role="button"] {\n    background-color: var(--is-primary) !important;\n}\n\n</style>\n'
            }
          />
        </Block>
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
                  buttonId={vButtonButtonId}
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
