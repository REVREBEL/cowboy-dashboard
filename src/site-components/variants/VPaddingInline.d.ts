import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function VPaddingInline(props: {
  /** Adjustment to base padding in REMs*/
  bottomAdjustmentAmount?: number;
  bottomPaddingAdjustment?: Types.Boolean.Boolean;
  breakpointAdjustment?: Types.Boolean.Boolean;
  padding?:
    | "XX Large"
    | "X Large"
    | "Large"
    | "Medium"
    | "Normal"
    | "Small"
    | "X Small"
    | "XX Small"
    | "None";
  slotsSlotPadding?: React.ReactNode;
  /** Adjustment to base padding in REMs*/
  topAdjustmentAmount?: number;
  topPaddingAdjustment?: Types.Boolean.Boolean;
}): React.JSX.Element;
