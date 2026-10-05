import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function Socials(props: {
  facebookCode?: Types.Embed.CodeProp;
  instagramCode?: Types.Embed.CodeProp;
  linkedinCode?: Types.Embed.CodeProp;
  tripadvisorSvgCode?: Types.Embed.CodeProp;
  variant?: "Instagram" | "Facebook" | "Linkedin" | "Youtube" | "Trip Advisor";
  youtubeCode?: Types.Embed.CodeProp;
}): React.JSX.Element;
