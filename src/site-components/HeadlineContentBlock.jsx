"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Heading from "./webflow_modules/Basic/components/Heading";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import RichText from "./webflow_modules/Basic/components/RichText";
import { applyPredicate } from "./webflow_modules/Conditions/helpers/applyPredicate";
import { conditional } from "./webflow_modules/Conditionals/helpers/conditional";
import { equals } from "./webflow_modules/Boolean/helpers/equals";
import { every } from "./webflow_modules/Boolean/helpers/every";
import { formatNumber } from "./webflow_modules/Builtin/helpers/formatNumber";

export function HeadlineContentBlock({
  eyebrowDataContrast = true,
  eyebrowEyebrowText = "Eyebrow Text",
  eyebrowEyebrowVisibility = true,
  eyebrowInverseColor = true,
  headlineFontWeight = true,
  headlineHeadlineTag = "h2",
  headlineHeadlineText = "Urban Cowboy",
  headlineHeadlineTextSize = "Normal",
  headlineHeadlineVisibility = true,
  headlineHeadlineWrapping = true,
  paragraph1Paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  paragraph1Visibility = true,
  paragraph2Paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  paragraph2Visibility = false,
  paragraph3Paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  paragraph3Visibility = false,
  paragraphSettingsFontSizeAdjustment = true,
  paragraphSettingsFontSizeAdjustmentValue = 0,
  paragraphSettingsParagraphFontWeight = true,
  richTextContent = "",
  richTextVisibility = false,
  settingsTextWrap = "None",
  subheadlineFontSizeAdjustment = true,
  subheadlineFontSizeAdjustmentValue = 0,
  subheadlineSubheadlineText = "Subheadline Text",
  subheadlineSubheadlineVisibility = true,
  subheadlineTextTransform = true,
}) {
  const _styleVariantMap = {
    Jumbo: "w-variant-05e6c039-4675-48ef-d70e-aa902bc41612",
    XXXL: "w-variant-fba18e41-3211-2fa0-923a-f63546fcbc60",
    XXL: "w-variant-d3797235-702b-1361-7aa6-7f34b35bb4a7",
    XL: "w-variant-989bc189-426e-aaca-b26f-bf87e6ab327d",
    Large: "w-variant-b114c705-b9a6-8382-78d8-2512c0727f1c",
    Medium: "w-variant-bb813a84-fc25-93d3-7274-4433fd9a3c13",
    Normal: "",
    Small: "w-variant-ab9acb76-dd49-1abb-12dd-fece58b90a77",
    XS: "w-variant-dd5ec297-d73f-60e9-dc7f-f5d2e16b27e5",
    XXS: "w-variant-e2d30799-7355-db76-83f1-d5518b8670c1",
    XXXS: "w-variant-519faefd-b6bf-80b4-9f3c-d731c855c21e",
    Tiny: "w-variant-b608165f-8090-4942-0122-d3a20e47b21b",
  };

  const _activeStyleVariant = _styleVariantMap[headlineHeadlineTextSize];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        className={`g-component is-full-width ${_activeStyleVariant}`}
        tag={"div"}
      >
        <Block
          className={`c-responsive-headline ${_activeStyleVariant}`}
          data-component={"responsive-headline"}
          tag={"div"}
        >
          <Block
            className={`v-headline-container ${_activeStyleVariant}`}
            data-font-size={
              headlineHeadlineTextSize === "Jumbo"
                ? "jumbo"
                : headlineHeadlineTextSize === "XXXL"
                ? "xxxl"
                : headlineHeadlineTextSize === "XXL"
                ? "xxl"
                : headlineHeadlineTextSize === "XL"
                ? "xl"
                : headlineHeadlineTextSize === "Large"
                ? "large"
                : headlineHeadlineTextSize === "Medium"
                ? ""
                : headlineHeadlineTextSize === "None"
                ? "base"
                : headlineHeadlineTextSize === "Small"
                ? "small"
                : headlineHeadlineTextSize === "XS"
                ? "xs"
                : headlineHeadlineTextSize === "XXS"
                ? "xxs"
                : headlineHeadlineTextSize === "XXXS"
                ? "xxxs"
                : headlineHeadlineTextSize === "Tiny"
                ? "tiny"
                : "Normal"
            }
            tag={"div"}
          >
            <Block
              className={`fit-heading-boundary ${_activeStyleVariant}`}
              tag={"div"}
            >
              {conditional({
                rules: [
                  {
                    condition: every([
                      applyPredicate(headlineHeadlineWrapping)(equals(false)),
                    ]),
                    output: true,
                  },
                  {
                    condition: every([
                      applyPredicate(headlineHeadlineWrapping)(equals(true)),
                    ]),
                    output: false,
                  },
                ],

                fallback: false,
              }) ? (
                <Block
                  className={`v-headline-wrapper is-responsive is-no-wrapping ${_activeStyleVariant}`}
                  data-flex-align={""}
                  data-font-size={""}
                  data-text-align={""}
                  data-wrap-headline={"is-no-wrapping"}
                  tag={"div"}
                >
                  {eyebrowEyebrowVisibility ? (
                    <Block
                      className={`v-eyebrow ${_activeStyleVariant}`}
                      data-color={
                        eyebrowInverseColor
                          ? "normal"
                          : eyebrowInverseColor
                          ? "inverse"
                          : "normal"
                      }
                      data-component={"eyebrow"}
                      data-contrast={
                        eyebrowDataContrast
                          ? "light"
                          : !eyebrowDataContrast
                          ? "dark"
                          : "light"
                      }
                      tag={"div"}
                    >
                      {eyebrowEyebrowText}
                    </Block>
                  ) : null}
                  {headlineHeadlineVisibility ? (
                    <Heading
                      className={`v-headline is-fit-heading ${_activeStyleVariant}`}
                      data-fit-max={
                        headlineHeadlineTextSize === "Jumbo"
                          ? "148"
                          : headlineHeadlineTextSize === "XXXL"
                          ? "139"
                          : headlineHeadlineTextSize === "XXL"
                          ? "128"
                          : headlineHeadlineTextSize === "XL"
                          ? "118"
                          : headlineHeadlineTextSize === "Large"
                          ? "95"
                          : headlineHeadlineTextSize === "Medium"
                          ? "76"
                          : headlineHeadlineTextSize === "None"
                          ? "60"
                          : headlineHeadlineTextSize === "Small"
                          ? "48"
                          : headlineHeadlineTextSize === "XS"
                          ? "39"
                          : headlineHeadlineTextSize === "XXS"
                          ? "31"
                          : headlineHeadlineTextSize === "Tiny"
                          ? "24"
                          : "60"
                      }
                      data-fit-min={
                        headlineHeadlineTextSize === "Jumbo"
                          ? "52"
                          : headlineHeadlineTextSize === "XXXL"
                          ? "48"
                          : headlineHeadlineTextSize === "XXL"
                          ? "44"
                          : headlineHeadlineTextSize === "XL"
                          ? "40"
                          : headlineHeadlineTextSize === "Large"
                          ? "36"
                          : headlineHeadlineTextSize === "Medium"
                          ? "32"
                          : headlineHeadlineTextSize === "None"
                          ? "28"
                          : headlineHeadlineTextSize === "Small"
                          ? "24"
                          : headlineHeadlineTextSize === "Small"
                          ? "20"
                          : headlineHeadlineTextSize === "XXS"
                          ? "18"
                          : headlineHeadlineTextSize === "Tiny"
                          ? "16"
                          : "28"
                      }
                      data-font-weight={
                        headlineFontWeight
                          ? "bold"
                          : headlineFontWeight
                          ? "semibold"
                          : "bold"
                      }
                      data-text-wrap={
                        headlineHeadlineWrapping
                          ? "wrap-headline"
                          : !headlineHeadlineWrapping
                          ? "no-wrapping"
                          : "wrap-headline"
                      }
                      tag={headlineHeadlineTag}
                    >
                      {headlineHeadlineText}
                    </Heading>
                  ) : null}
                  <Block
                    className={`v-subheadline ${_activeStyleVariant}`}
                    data-component={"subheadline"}
                    data-font-size={
                      subheadlineFontSizeAdjustment
                        ? "normal"
                        : !subheadlineFontSizeAdjustment
                        ? "adjustment"
                        : "normal"
                    }
                    data-size-adjustment={formatNumber(-1)(
                      subheadlineFontSizeAdjustmentValue
                    )}
                    data-text-transform={
                      subheadlineTextTransform
                        ? "uppercase"
                        : subheadlineTextTransform
                        ? "none"
                        : "none"
                    }
                    data-text-wrap={
                      settingsTextWrap === "None"
                        ? "none"
                        : settingsTextWrap === "Text Wrap Balance"
                        ? "balance"
                        : settingsTextWrap === "Text Wrap Pretty"
                        ? "pretty"
                        : "balance"
                    }
                    tag={"div"}
                  >
                    {"Subheadline Text"}
                  </Block>
                  <Paragraph
                    className={`v-paragraph ${_activeStyleVariant}`}
                    data-component={"paragraph"}
                    data-font-size={""}
                    data-font-weight={""}
                    data-size-adjustment={""}
                  >
                    {
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
                    }
                  </Paragraph>
                </Block>
              ) : null}
              {conditional({
                rules: [
                  {
                    condition: every([
                      applyPredicate(headlineHeadlineWrapping)(equals(false)),
                    ]),
                    output: false,
                  },
                  {
                    condition: every([
                      applyPredicate(headlineHeadlineWrapping)(equals(true)),
                    ]),
                    output: true,
                  },
                ],

                fallback: false,
              }) ? (
                <Block
                  className={`v-headline-wrapper is-responsive is-wrapping ${_activeStyleVariant}`}
                  data-flex-align={""}
                  data-font-size={""}
                  data-text-align={""}
                  data-wrap-headline={"is-wrapping"}
                  tag={"div"}
                >
                  {eyebrowEyebrowVisibility ? (
                    <Block
                      className={`v-eyebrow ${_activeStyleVariant}`}
                      data-color={
                        eyebrowInverseColor
                          ? "normal"
                          : eyebrowInverseColor
                          ? "inverse"
                          : "normal"
                      }
                      data-component={"eyebrow"}
                      data-contrast={eyebrowDataContrast ? "light" : "dark"}
                      tag={"div"}
                    >
                      {eyebrowEyebrowText}
                    </Block>
                  ) : null}
                  {headlineHeadlineVisibility ? (
                    <Heading
                      className={`v-headline fit-heading ${_activeStyleVariant}`}
                      data-fit-max={
                        headlineHeadlineTextSize === "Jumbo"
                          ? "148"
                          : headlineHeadlineTextSize === "XXXL"
                          ? "139"
                          : headlineHeadlineTextSize === "XXL"
                          ? "128"
                          : headlineHeadlineTextSize === "XL"
                          ? "118"
                          : headlineHeadlineTextSize === "Large"
                          ? "95"
                          : headlineHeadlineTextSize === "Medium"
                          ? "76"
                          : headlineHeadlineTextSize === "None"
                          ? "60"
                          : headlineHeadlineTextSize === "Small"
                          ? "48"
                          : headlineHeadlineTextSize === "XS"
                          ? "39"
                          : headlineHeadlineTextSize === "XXS"
                          ? "31"
                          : headlineHeadlineTextSize === "Tiny"
                          ? "24"
                          : "60"
                      }
                      data-fit-min={
                        headlineHeadlineTextSize === "Jumbo"
                          ? "52"
                          : headlineHeadlineTextSize === "XXXL"
                          ? "48"
                          : headlineHeadlineTextSize === "XXL"
                          ? "44"
                          : headlineHeadlineTextSize === "XL"
                          ? "40"
                          : headlineHeadlineTextSize === "Large"
                          ? "36"
                          : headlineHeadlineTextSize === "Medium"
                          ? "32"
                          : headlineHeadlineTextSize === "None"
                          ? "28"
                          : headlineHeadlineTextSize === "Small"
                          ? "24"
                          : headlineHeadlineTextSize === "Small"
                          ? "20"
                          : headlineHeadlineTextSize === "XXS"
                          ? "18"
                          : headlineHeadlineTextSize === "Tiny"
                          ? "16"
                          : "28"
                      }
                      data-font-weight={
                        headlineFontWeight
                          ? "bold"
                          : headlineFontWeight
                          ? "semibold"
                          : "bold"
                      }
                      data-text-wrap={
                        headlineHeadlineWrapping
                          ? "wrap-headline"
                          : !headlineHeadlineWrapping
                          ? "no-wrapping"
                          : "wrap-headline"
                      }
                      tag={headlineHeadlineTag}
                    >
                      {headlineHeadlineText}
                    </Heading>
                  ) : null}
                  {subheadlineSubheadlineVisibility ? (
                    <Block
                      className={`v-subheadline ${_activeStyleVariant}`}
                      data-component={"subheadline"}
                      data-font-size={
                        subheadlineFontSizeAdjustment
                          ? "normal"
                          : !subheadlineFontSizeAdjustment
                          ? "adjustment"
                          : "normal"
                      }
                      data-size-adjustment={formatNumber(-1)(
                        subheadlineFontSizeAdjustmentValue
                      )}
                      data-text-transform={
                        subheadlineTextTransform
                          ? "uppercase"
                          : !subheadlineTextTransform
                          ? "none"
                          : "none"
                      }
                      data-text-wrap={
                        settingsTextWrap === "None"
                          ? "none"
                          : settingsTextWrap === "Text Wrap Balance"
                          ? "balance"
                          : settingsTextWrap === "Text Wrap Pretty"
                          ? "pretty"
                          : "balance"
                      }
                      tag={"div"}
                    >
                      {subheadlineSubheadlineText}
                    </Block>
                  ) : null}
                  <Block
                    className={`flex-vertical gap-xsmall ${_activeStyleVariant}`}
                    tag={"div"}
                  >
                    {paragraph1Visibility ? (
                      <Paragraph
                        className={`v-paragraph ${_activeStyleVariant}`}
                        data-component={"paragraph"}
                        data-font-size={
                          paragraphSettingsFontSizeAdjustment
                            ? "normal"
                            : !paragraphSettingsFontSizeAdjustment
                            ? "adjustment"
                            : "normal"
                        }
                        data-font-weight={
                          paragraphSettingsParagraphFontWeight
                            ? "regular"
                            : paragraphSettingsParagraphFontWeight
                            ? "light"
                            : "regular"
                        }
                        data-size-adjustment={formatNumber(-1)(
                          paragraphSettingsFontSizeAdjustmentValue
                        )}
                      >
                        {paragraph1Paragraph}
                      </Paragraph>
                    ) : null}
                    {paragraph2Visibility ? (
                      <Paragraph
                        className={`v-paragraph ${_activeStyleVariant}`}
                        data-component={"paragraph"}
                        data-font-size={
                          paragraphSettingsFontSizeAdjustment
                            ? "normal"
                            : !paragraphSettingsFontSizeAdjustment
                            ? "adjustment"
                            : "normal"
                        }
                        data-font-weight={
                          paragraphSettingsParagraphFontWeight
                            ? "regular"
                            : paragraphSettingsParagraphFontWeight
                            ? "light"
                            : "regular"
                        }
                        data-size-adjustment={formatNumber(-1)(
                          paragraphSettingsFontSizeAdjustmentValue
                        )}
                      >
                        {paragraph2Paragraph}
                      </Paragraph>
                    ) : null}
                    {paragraph3Visibility ? (
                      <Paragraph
                        className={`v-paragraph ${_activeStyleVariant}`}
                        data-component={"paragraph"}
                        data-font-size={
                          paragraphSettingsFontSizeAdjustment
                            ? "normal"
                            : !paragraphSettingsFontSizeAdjustment
                            ? "adjustment"
                            : "normal"
                        }
                        data-font-weight={
                          paragraphSettingsParagraphFontWeight
                            ? "regular"
                            : paragraphSettingsParagraphFontWeight
                            ? "light"
                            : "regular"
                        }
                        data-size-adjustment={formatNumber(-1)(
                          paragraphSettingsFontSizeAdjustmentValue
                        )}
                      >
                        {paragraph3Paragraph}
                      </Paragraph>
                    ) : null}
                    {richTextVisibility ? (
                      <RichText
                        className={`v-paragraph ${_activeStyleVariant}`}
                        tag={"div"}
                      >
                        {richTextContent}
                      </RichText>
                    ) : null}
                  </Block>
                </Block>
              ) : null}
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
