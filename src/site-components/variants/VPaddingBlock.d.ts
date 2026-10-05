import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function VPaddingBlock(props: {
  blockBreakpointAdjustment?: Types.Boolean.Boolean;
  blockPadding?:
    | "XX Large"
    | "X Large"
    | "Large"
    | "Medium"
    | "Normal"
    | "Small"
    | "X Small"
    | "XX Small"
    | "None";
  /** Adjustment to base padding in REMs*/
  bottomAdjustmentAmount?: number;
  bottomPaddingAdjustment?: Types.Boolean.Boolean;
  inlineBreakpointAdjustment?: Types.Boolean.Boolean;
  inlinePadding?:
    | "XX Large"
    | "X Large"
    | "Large"
    | "Medium"
    | "Normal"
    | "Small"
    | "X Small"
    | "XX Small"
    | "None";
  /** Adjustment to base padding in REMs*/
  leftAdjustmentAmount?: number;
  leftPaddingAdjustment?: Types.Boolean.Boolean;
  /** Adjustment to base padding in REMs*/
  rightAdjustmentAmount?: number;
  rightPaddingAdjustment?: Types.Boolean.Boolean;
  slotsSlotPadding?: React.ReactNode;
  /** Adjustment to base padding in REMs*/
  topAdjustmentAmount?: number;
  topPaddingAdjustment?: Types.Boolean.Boolean;
}): React.JSX.Element;
