import * as React from "react";
import * as Types from "./webflow_modules/types";

declare function EventCard(props: {
  datetimeText?: React.ReactNode;
  eventName?: React.ReactNode;
  location?: React.ReactNode;
  variant?: "Normal" | "Image Only";
}): React.JSX.Element;
