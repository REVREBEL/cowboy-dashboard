"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import HtmlEmbed from "../webflow_modules/Embed/components/HtmlEmbed";
import { applyPredicate } from "../webflow_modules/Conditions/helpers/applyPredicate";
import { conditional } from "../webflow_modules/Conditionals/helpers/conditional";
import { every } from "../webflow_modules/Boolean/helpers/every";
import { styleVariantIsAny } from "../webflow_modules/Basic/helpers/styleVariantIsAny";

export function Socials({
  facebookCode = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M82.02 14H17.96c-2.2 0-3.98 1.77-3.98 3.97v64.05c0 2.19 1.77 3.97 3.97 3.97h34.48V58.1h-9.39V47.23h9.38v-8.02c0-9.3 5.68-14.37 13.97-14.37 3.97 0 7.38.29 8.38.42v9.71l-5.76 0c-4.52 0-5.39 2.14-5.39 5.29v6.93h10.76l-1.41 10.86h-9.36v27.88h18.34c2.19 0 3.97-1.78 3.97-3.98V17.89c0-2.2-1.78-3.98-3.98-3.98Z"/></svg>',
  instagramCode = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M67.96 45.28c0 9.91-8.05 17.96-17.96 17.96 -9.92 0-17.96-8.05-17.96-17.96 0-2.8.65-5.43 1.79-7.79H13.99v42c0 3.85 3.15 7 7 7h58c3.85 0 7-3.15 7-7v-42H66.15c1.13 2.35 1.79 4.99 1.79 7.78Z"/><path d="M79 13.5H21c-3.85 0-7 3.15-7 7v14h21.66c3.27-4.35 8.47-7.18 14.33-7.18 5.86 0 11.05 2.82 14.33 7.17h21.66v-14c0-3.85-3.15-7-7-7ZM19.75 31.21h-2.61v-10.1c0-1.77 1.07-3.28 2.6-3.93v14.01Zm4.27 0h-2.47V16.86h2.46V31.2Zm4.26 0h-2.47V16.86h2.46V31.2Zm4.26-10.1v5.84 4.25h-2.47V16.85h2.46v4.25Zm49.79 5.84c0 2.35-1.91 4.25-4.26 4.25h-6.91c-2.35 0-4.26-1.91-4.26-4.26v-5.85c0-2.35 1.9-4.26 4.25-4.26h6.9c2.34 0 4.25 1.9 4.25 4.25v5.84Z"/><path d="M50 61.14c8.73 0 15.81-7.09 15.81-15.82 0-8.74-7.09-15.82-15.82-15.82 -8.74 0-15.82 7.08-15.82 15.82 -.01 8.73 7.08 15.81 15.82 15.81Zm-.01-28.43c6.96 0 12.6 5.64 12.6 12.6s-5.65 12.6-12.61 12.6c-6.97 0-12.61-5.65-12.61-12.61 0-6.97 5.64-12.61 12.6-12.61Z"/></g></svg>',
  linkedinCode = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M80.66 14H19.3c-2.94 0-5.32 2.32-5.32 5.18v61.61c0 2.86 2.38 5.19 5.31 5.19h61.35c2.93 0 5.33-2.33 5.33-5.2V19.16c0-2.87-2.4-5.19-5.34-5.19ZM35.34 75.35H24.65V40.99h10.68v34.35Zm-5.35-39.06c-3.43 0-6.19-2.78-6.19-6.2 0-3.42 2.76-6.19 6.19-6.19 3.41 0 6.18 2.77 6.18 6.18 0 3.42-2.78 6.19-6.19 6.19Zm45.33 39.05H64.65V58.63c0-3.99-.08-9.12-5.56-9.12 -5.56 0-6.41 4.34-6.41 8.82v16.99H42V40.96h10.24v4.69h.14c1.42-2.7 4.91-5.55 10.1-5.55 10.8 0 12.8 7.11 12.8 16.36V75.3Z"/></svg>',
  tripadvisorSvgCode = '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.31 10.28v-.01c-1.39 0-2.5 1.11-2.5 2.5 0 1.38 1.11 2.49 2.5 2.49 1.38-.01 2.49-1.12 2.49-2.51 -.01-.01-.01-.01-.01-.01v0c-.01-1.38-1.13-2.5-2.5-2.49Zm0 3.8v0c-.73.06-1.36-.47-1.42-1.2 -.07-.73.46-1.36 1.19-1.42 .07-.01.15-.01.22 0v0c.72-.07 1.35.46 1.41 1.19 .06.72-.47 1.35-1.2 1.41 -.08 0-.16 0-.23 0Zm7.38-3.8v0c-1.39 0-2.5 1.11-2.5 2.5 0 1.38 1.11 2.49 2.5 2.49 1.38-.01 2.49-1.12 2.49-2.51 -.01-.01-.01-.01-.01-.01v0c-.01-1.38-1.13-2.5-2.5-2.49ZM17 12.77v0c0 .72-.58 1.31-1.3 1.31 -.73 0-1.32-.58-1.32-1.3 -.01-.73.57-1.32 1.29-1.32 0-.01 0-.01 0-.01v0c.71-.01 1.3.58 1.31 1.3Z"/><path d="M12 2v0C6.47 2 2 6.47 2 12c0 5.52 4.47 10 10 10 5.52 0 10-4.48 10-10v0c0-5.53-4.48-10-10-10Zm7.38 10.77v-.01c0 2.03-1.65 3.69-3.69 3.69 -.94 0-1.84-.36-2.52-.99l-1.18 1.29 -1.18-1.29v0c-1.51 1.38-3.84 1.28-5.22-.22 -1.39-1.51-1.29-3.84.22-5.22l-1.2-1.3h2.68 0c2.83-1.95 6.57-1.95 9.41 0h2.67l-1.2 1.31v0c.76.69 1.19 1.68 1.2 2.72Z"/><path d="M14.77 9.05v0c-1.78-.75-3.77-.75-5.54 0l0-.01c1.58.52 2.68 1.97 2.77 3.65v-.01c.08-1.67 1.18-3.12 2.77-3.65Z"/></g></svg>',
  variant = "Instagram",
  youtubeCode = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M45.19 70.39c-.7.98-1.36 1.46-1.99 1.46 -.42 0-.66-.25-.74-.74 -.03-.11-.03-.49-.03-1.22V57.13h-3.14v13.7c0 1.22.1 2.05.27 2.57 .31.87 1.01 1.28 2.02 1.28 1.15 0 2.34-.7 3.58-2.13v1.89h3.14V57.11h-3.15v13.24Z"/><path d="M27.89 54.49l3.69 0 0 19.98 3.49 0 0-19.99 3.76 0 0-3.28 -10.95 0Z"/><path d="M49.28 39.34c1.02 0 1.51-.81 1.51-2.44v-7.37c0-1.62-.49-2.43-1.52-2.43s-1.52.8-1.52 2.42v7.36c0 1.62.49 2.43 1.51 2.43Z"/><path d="M57.43 56.93c-1.16 0-2.23.63-3.25 1.88v-7.6h-3.15v23.25h3.14v-1.69c1.04 1.29 2.12 1.92 3.24 1.92 1.25 0 2.09-.66 2.51-1.95 .2-.74.31-1.89.31-3.5v-6.91c0-1.64-.11-2.79-.32-3.49 -.43-1.3-1.26-1.96-2.52-1.96Zm-.32 12.58c0 1.56-.47 2.33-1.37 2.33 -.52 0-1.04-.25-1.57-.78V60.49c.52-.52 1.04-.77 1.56-.77 .9 0 1.36.8 1.36 2.36v7.39Z"/><path d="M67.43 56.93c-1.61 0-2.86.59-3.76 1.77 -.67.87-.98 2.22-.98 4.08v6.07c0 1.84.34 3.2 1 4.07 .9 1.18 2.15 1.77 3.8 1.77 1.64 0 2.92-.63 3.79-1.88 .38-.56.62-1.19.73-1.89 .02-.32.06-1.02.06-2.03v-.46h-3.21c0 1.26-.04 1.95-.07 2.12 -.18.83-.64 1.25-1.41 1.25 -1.08 0-1.61-.8-1.61-2.41v-3.08h6.27v-3.59c0-1.86-.32-3.21-.98-4.08 -.88-1.19-2.13-1.78-3.71-1.78Zm1.53 6.83h-3.14v-1.61c0-1.61.52-2.41 1.57-2.41 1.03 0 1.56.8 1.56 2.4v1.6Z"/><path d="M79 14H21c-3.85 0-7 3.15-7 7v58c0 3.85 3.15 7 7 7h58c3.85 0 7-3.15 7-7V21c0-3.85-3.15-7-7-7ZM56.58 24.47h3.16v12.89c0 .74 0 1.13.03 1.23 .07.49.31.74.74.74 .63 0 1.3-.5 2-1.49V24.45h3.17v17.51H62.5v-1.91c-1.27 1.44-2.47 2.15-3.63 2.15 -1.03 0-1.73-.42-2.05-1.31 -.18-.53-.29-1.37-.29-2.61V24.43Zm-11.99 5.7c0-1.88.31-3.24.99-4.13 .87-1.2 2.11-1.8 3.69-1.8 1.59 0 2.82.59 3.7 1.79 .66.88.98 2.25.98 4.12v6.13c0 1.86-.32 3.24-.99 4.11 -.88 1.19-2.12 1.79-3.71 1.79 -1.59 0-2.82-.6-3.7-1.8 -.68-.88-1-2.26-1-4.12v-6.14Zm-8.49-11.7l2.49 9.22 2.39-9.23h3.55l-4.24 13.98v9.51h-3.52v-9.52c-.32-1.69-1.03-4.16-2.15-7.44 -.75-2.18-1.52-4.37-2.26-6.55h3.7ZM75.06 75.5c-.64 2.76-2.9 4.8-5.62 5.1 -6.45.72-12.97.72-19.46.72 -6.5 0-13.02 0-19.46-.72 -2.73-.31-4.98-2.35-5.62-5.11 -.91-3.94-.91-8.24-.91-12.29 0-4.06.01-8.35.91-12.29 .63-2.77 2.89-4.8 5.61-5.11 6.44-.73 12.96-.73 19.45-.73 6.49-.01 13.01 0 19.45.72 2.71.3 4.98 2.34 5.61 5.1 .9 3.93.9 8.23.9 12.28 0 4.05-.01 8.34-.91 12.28Z"/></g></svg>',
}) {
  const _styleVariantMap = {
    Instagram: "",
    Facebook: "w-variant-f9130a32-d3ca-b62e-590b-0d66bce4a6ac",
    Linkedin: "w-variant-3ad09860-3d3e-d7d5-9ec9-9144e9e6fb47",
    Youtube: "w-variant-e9dcf51d-2c59-e7e4-1954-caf01d518a07",
    "Trip Advisor": "w-variant-ccbdfe7e-e91a-5424-b419-b6a642c7d5cc",
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
        className={`g-component is-socials ${_activeStyleVariant}`}
        tag={"div"}
      >
        {conditional({
          rules: [
            {
              condition: every([
                applyPredicate(variant)(styleVariantIsAny(["None"])),
              ]),
              output: true,
            },
            {
              condition: every([
                applyPredicate(variant)(
                  styleVariantIsAny([
                    "Facebook",
                    "Linkedin",
                    "Youtube",
                    "Trip Advisor",
                  ])
                ),
              ]),

              output: false,
            },
          ],

          fallback: false,
        }) ? (
          <HtmlEmbed className={`social-icon ${_activeStyleVariant}`} />
        ) : null}
        {conditional({
          rules: [
            {
              condition: every([
                applyPredicate(variant)(styleVariantIsAny(["Facebook"])),
              ]),
              output: true,
            },
            {
              condition: every([
                applyPredicate(variant)(
                  styleVariantIsAny([
                    "None",
                    "Linkedin",
                    "Youtube",
                    "Trip Advisor",
                  ])
                ),
              ]),

              output: false,
            },
          ],

          fallback: false,
        }) ? (
          <HtmlEmbed className={`social-icon ${_activeStyleVariant}`} />
        ) : null}
        {conditional({
          rules: [
            {
              condition: every([
                applyPredicate(variant)(styleVariantIsAny(["Linkedin"])),
              ]),
              output: true,
            },
            {
              condition: every([
                applyPredicate(variant)(
                  styleVariantIsAny([
                    "None",
                    "Facebook",
                    "Youtube",
                    "Trip Advisor",
                  ])
                ),
              ]),

              output: false,
            },
          ],

          fallback: false,
        }) ? (
          <HtmlEmbed className={`social-icon ${_activeStyleVariant}`} />
        ) : null}
        {conditional({
          rules: [
            {
              condition: every([
                applyPredicate(variant)(styleVariantIsAny(["Youtube"])),
              ]),
              output: true,
            },
            {
              condition: every([
                applyPredicate(variant)(
                  styleVariantIsAny([
                    "None",
                    "Facebook",
                    "Linkedin",
                    "Trip Advisor",
                  ])
                ),
              ]),

              output: false,
            },
          ],

          fallback: false,
        }) ? (
          <HtmlEmbed className={`social-icon ${_activeStyleVariant}`} />
        ) : null}
        {conditional({
          rules: [
            {
              condition: every([
                applyPredicate(variant)(styleVariantIsAny(["Trip Advisor"])),
              ]),
              output: true,
            },
            {
              condition: every([
                applyPredicate(variant)(
                  styleVariantIsAny(["None", "Facebook", "Linkedin", "Youtube"])
                ),
              ]),

              output: false,
            },
          ],

          fallback: false,
        }) ? (
          <HtmlEmbed className={`social-icon ${_activeStyleVariant}`} />
        ) : null}
      </Block>
    </div>
  );
}
