"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import Link from "./webflow_modules/Basic/components/Link";
import * as _interactions from "./webflow_modules/interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e-166":{"id":"e-166","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-143"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d6805a84-9260-b913-e26e-66aa150b4261","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d6805a84-9260-b913-e26e-66aa150b4261","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1791066211753},"e-167":{"id":"e-167","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d6805a84-9260-b913-e26e-66aa150b4261","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d6805a84-9260-b913-e26e-66aa150b4261","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1791066211754},"e-174":{"id":"e-174","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-44","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dcf5198a-4eff-4448-3359-7aa4ae2082aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1791220914528},"e-175":{"id":"e-175","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-174"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dcf5198a-4eff-4448-3359-7aa4ae2082aa","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1791220914528}},"actionLists":{"a-44":{"id":"a-44","title":"Link Underline [On-Hover]","actionItemGroups":[{"actionItems":[{"id":"a-44-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".nav-link-underline","selectorGuids":["41509dbc-37cd-17aa-7356-e45bc524f5d2"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1791066217289},"a-45":{"id":"a-45","title":"Link Underline [Off-Hover]","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".nav-link-underline","selectorGuids":["41509dbc-37cd-17aa-7356-e45bc524f5d2"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1791066285337}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RoomCard({
  imageAltText = "__wf_reserved_inherit",
  imageImage = "",
  imageVisibility = true,
  itemLabel = "The Dining Room",
  itemParagraph = "Seasonal fare with ingredients sourced from local makers and growers",

  link1Link = {
    href: "#",
  },

  link1Text = "Learn More",
  link1Visibility = true,

  link2Link = {
    href: "#",
  },

  link2Text = "Check Availablity",
  link2Visibility = true,
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={"rooms_column"}
        id={"w-node-d6805a84-9260-b913-e26e-66aa150b425b-150b425b"}
        tag={"div"}
      >
        <Block className={"rooms-card_top"} tag={"div"}>
          <Block className={"rooms-card_wrapper"} tag={"div"}>
            <Block className={"rooms-card_headline"} tag={"div"}>
              {itemLabel}
            </Block>
            <Block className={"rooms-card_paragraph is-color-fade"} tag={"div"}>
              {itemParagraph}
            </Block>
          </Block>
          <Block className={"rooms-card_links-group"} tag={"div"}>
            {link1Visibility ? (
              <Link
                block={"inline"}
                button={false}
                className={"rooms-card_links-block"}
                data-w-id={"d6805a84-9260-b913-e26e-66aa150b4261"}
                options={link1Link}
              >
                <Block className={"rooms-card_link"} tag={"div"}>
                  {link1Text}
                </Block>
                <Block className={"rooms-card_underline"} tag={"div"} />
              </Link>
            ) : null}
            {link2Visibility ? (
              <Link
                block={"inline"}
                button={false}
                className={"rooms-card_links-block"}
                data-w-id={"dcf5198a-4eff-4448-3359-7aa4ae2082aa"}
                options={link2Link}
              >
                <Block className={"rooms-card_link"} tag={"div"}>
                  {link2Text}
                </Block>
                <Block className={"rooms-card_underline"} tag={"div"} />
              </Link>
            ) : null}
          </Block>
        </Block>
        {imageVisibility ? (
          <Block
            className={"image-wrapper is-radius-sm"}
            id={"w-node-d6805a84-9260-b913-e26e-66aa150b426a-150b425b"}
            tag={"div"}
          >
            <Image
              className={"image"}
              height={"auto"}
              id={"w-node-d6805a84-9260-b913-e26e-66aa150b426b-150b425b"}
              loading={"lazy"}
              src={imageImage}
              width={"auto"}
            />
          </Block>
        ) : null}
      </Block>
    </div>
  );
}
