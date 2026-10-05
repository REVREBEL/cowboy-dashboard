"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Image from "./webflow_modules/Basic/components/Image";
import * as _interactions from "./webflow_modules/interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e-21":{"id":"e-21","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".social-post_on-hover","originalId":"6aac74c5f3c43bf774a00030|2dde24bf-a1f5-67f6-042e-1fb63d604471","appliesTo":"CLASS"},"targets":[{"selector":".social-post_on-hover","originalId":"6aac74c5f3c43bf774a00030|2dde24bf-a1f5-67f6-042e-1fb63d604471","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790856849702},"e-22":{"id":"e-22","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-29","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-57"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".social-post_on-hover","originalId":"6aac74c5f3c43bf774a00030|2dde24bf-a1f5-67f6-042e-1fb63d604471","appliesTo":"CLASS"},"targets":[{"selector":".social-post_on-hover","originalId":"6aac74c5f3c43bf774a00030|2dde24bf-a1f5-67f6-042e-1fb63d604471","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790856849702},"e-23":{"id":"e-23","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-101"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".social-gallery","originalId":"22144249-edcd-0212-0ad0-a05108858dda","appliesTo":"CLASS"},"targets":[{"selector":".social-gallery","originalId":"22144249-edcd-0212-0ad0-a05108858dda","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790857044905},"e-25":{"id":"e-25","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-79"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".social-post_overlay.social-post_on-hover","originalId":"5683a317-7fdf-5a7c-3c93-d91c6b633c17","appliesTo":"CLASS"},"targets":[{"selector":".social-post_overlay.social-post_on-hover","originalId":"5683a317-7fdf-5a7c-3c93-d91c6b633c17","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790857320421},"e-26":{"id":"e-26","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-29","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-36"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".social-post_overlay.social-post_on-hover","originalId":"5683a317-7fdf-5a7c-3c93-d91c6b633c17","appliesTo":"CLASS"},"targets":[{"selector":".social-post_overlay.social-post_on-hover","originalId":"5683a317-7fdf-5a7c-3c93-d91c6b633c17","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790857320421}},"actionLists":{"a-28":{"id":"a-28","title":"social-post-overlay [On-Hover]","actionItemGroups":[{"actionItems":[{"id":"a-28-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".social-post_caption","selectorGuids":["b74d9e46-c83e-c42d-6d58-cc4eab0d2b9e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1790856556780},"a-29":{"id":"a-29","title":"social-post-overlay [Off-Hover]","actionItemGroups":[{"actionItems":[{"id":"a-29-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":1000,"target":{"selector":".social-post_caption","selectorGuids":["b74d9e46-c83e-c42d-6d58-cc4eab0d2b9e"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1790856556780}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SocialGallery({
  post1Caption = "Social Caption",
  post1Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a624d5143923adac3313_778882520_18620919115044082_4902754839169791874_n.jpg",
  post2Caption = "Social Caption",
  post2Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a62061da4f99937381cb_710288350_18103639214513317_993502048383002053_n.jpg",
  post3Caption = "Social Caption",
  post3Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a623b563272bf3e6a440_748232319_18109953116513317_4409577495636051808_n.jpg",
  post4Caption = "Social Caption",
  post4Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a620a1ec824a65ff214c_751805012_17875544556620392_6499039459020165524_n.jpg",
  post5Caption = "Social Caption",
  post5Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a623e223a047b64b4956_790439931_18116357786513317_3261682880846359604_n.jpg",
  post6Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a623b563272bf3e6a440_748232319_18109953116513317_4409577495636051808_n.jpg",
  post6Text = "Social Caption",
  post7Caption = "Social Caption",
  post7Image = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6ac3a6208b122775edaacb4b_693453288_18580023079042978_8322375224655389289_n.jpg",
  socialHandle = "@Urbancowboylodge ",
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"social-gallery"} tag={"div"}>
        <Block className={"social-post_top-wrapper"} tag={"div"}>
          <Block className={"social-post_decoration-wrapper"} tag={"div"}>
            <Block className={"social-post_decoration"} tag={"div"} />
          </Block>
          <Block className={"instagram-handle"} tag={"div"}>
            {socialHandle}
          </Block>
          <Block className={"social-post_decoration-wrapper"} tag={"div"}>
            <Block className={" social-post_decoration"} tag={"div"} />
          </Block>
        </Block>
        <Block className={"social-post_wrapper"} tag={"div"}>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={"social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post1Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post1Caption}
            </Block>
          </Block>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={" social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post4Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post2Caption}
            </Block>
          </Block>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={" social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post3Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post3Caption}
            </Block>
          </Block>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={" social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post2Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post4Caption}
            </Block>
          </Block>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={" social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post5Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post5Caption}
            </Block>
          </Block>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={" social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post6Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post6Text}
            </Block>
          </Block>
          <Block className={" social-post_image-wrapper"} tag={"div"}>
            <Block
              className={"social-post_overlay social-post_on-hover"}
              tag={"div"}
            />
            <Image
              className={" social-post_image"}
              height={"Auto"}
              loading={"lazy"}
              src={post7Image}
              width={"Auto"}
            />
            <Block className={"social-post_caption"} tag={"div"}>
              {post7Caption}
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
