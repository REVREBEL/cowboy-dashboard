import * as React from "react";
import * as Types from "./webflow_modules/types";

declare function HeadlineContentBlock(props: {
  eyebrowDataContrast?: Types.Boolean.Boolean;
  eyebrowEyebrowText?: React.ReactNode;
  eyebrowEyebrowVisibility?: Types.Boolean.Boolean;
  eyebrowInverseColor?: Types.Boolean.Boolean;
  headlineFontWeight?: Types.Boolean.Boolean;
  headlineHeadlineTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headlineHeadlineText?: React.ReactNode;
  headlineHeadlineTextSize?:
    | "Jumbo"
    | "XXXL"
    | "XXL"
    | "XL"
    | "Large"
    | "Medium"
    | "Normal"
    | "Small"
    | "XS"
    | "XXS"
    | "XXXS"
    | "Tiny";
  headlineHeadlineVisibility?: Types.Boolean.Boolean;
  headlineHeadlineWrapping?: Types.Boolean.Boolean;
  paragraph1Paragraph?: React.ReactNode;
  paragraph1Visibility?: Types.Boolean.Boolean;
  paragraph2Paragraph?: React.ReactNode;
  paragraph2Visibility?: Types.Boolean.Boolean;
  paragraph3Paragraph?: React.ReactNode;
  paragraph3Visibility?: Types.Boolean.Boolean;
  paragraphSettingsFontSizeAdjustment?: Types.Boolean.Boolean;
  paragraphSettingsFontSizeAdjustmentValue?: number;
  paragraphSettingsParagraphFontWeight?: Types.Boolean.Boolean;
  richTextContent?: Types.Basic.RichTextChildren;
  richTextVisibility?: Types.Boolean.Boolean;
  settingsTextWrap?: "None" | "Text Wrap Balance" | "Text Wrap Pretty";
  subheadlineFontSizeAdjustment?: Types.Boolean.Boolean;
  subheadlineFontSizeAdjustmentValue?: number;
  subheadlineSubheadlineText?: React.ReactNode;
  subheadlineSubheadlineVisibility?: Types.Boolean.Boolean;
  subheadlineTextTransform?: Types.Boolean.Boolean;
}): React.JSX.Element;
