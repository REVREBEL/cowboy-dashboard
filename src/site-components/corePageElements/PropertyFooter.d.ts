import * as React from "react";
import * as Types from "../webflow_modules/types";

declare function PropertyFooter(props: {
  logoImageFooterLogoLink?: Types.Basic.Link;
  privacyPrivacyLink?: Types.Basic.Link;
  privacyPrivacyLinkVisible?: Types.Visibility.VisibilityConditions;
  privacyPrivacyText?: React.ReactNode;
  referralReferralLink?: Types.Basic.Link;
  referralReferralLinkVisible?: Types.Visibility.VisibilityConditions;
  referralReferralText?: React.ReactNode;
  signUpEmailId?: string;
  signUpSignUpErrorMessageText?: React.ReactNode;
  signUpSignUpSuccessText?: React.ReactNode;
  signUpSIgnUpText?: React.ReactNode;
  termsTermsLink?: Types.Basic.Link;
  termsTermsLinkVisible?: Types.Visibility.VisibilityConditions;
  termsTermsText?: React.ReactNode;
}): React.JSX.Element;
