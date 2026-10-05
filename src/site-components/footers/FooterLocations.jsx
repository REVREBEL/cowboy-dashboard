"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Container from "../webflow_modules/Layout/components/Container";
import FormErrorMessage from "../webflow_modules/Form/components/FormErrorMessage";
import FormForm from "../webflow_modules/Form/components/FormForm";
import FormSuccessMessage from "../webflow_modules/Form/components/FormSuccessMessage";
import FormTextInput from "../webflow_modules/Form/components/FormTextInput";
import FormWrapper from "../webflow_modules/Form/components/FormWrapper";
import HtmlEmbed from "../webflow_modules/Embed/components/HtmlEmbed";
import Link from "../webflow_modules/Basic/components/Link";
import NotSupported from "../webflow_modules/Builtin/components/NotSupported";
import Section from "../webflow_modules/Layout/components/Section";
import VFlex from "../webflow_modules/Layout/components/VFlex";
import { Socials } from "../icons/Socials";

export function FooterLocations({
  logoImageFooterLogoLink = {
    href: "https://www.tryolive.com/",
  },

  privacyPrivacyLink = {
    href: "https://www.tryolive.com/privacy",
  },

  privacyPrivacyLinkVisible = true,
  privacyPrivacyText = "Privacy Policy",

  referralReferralLink = {
    href: "https://www.tryolive.com/referral-program-form",
  },

  referralReferralLinkVisible = true,
  referralReferralText = "Referral Program",
  signUpEmailId = "Home-Email-Signup_Mobile",
  signUpSignUpErrorMessageText = "We're hit a road bump. Please try again later.",
  signUpSignUpSuccessText = "Thanks for signing up, we'll be in touch shortly.",
  signUpSIgnUpText = "sign up for updates including insights, resources +more.",

  termsTermsLink = {
    href: "https://www.tryolive.com/terms-of-service",
  },

  termsTermsLinkVisible = true,
  termsTermsText = "Terms of Service",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={"footer max-width_lg"}
        data-bg-color={"Dark"}
        tag={"footer"}
      >
        <NotSupported _atom={"Collection List"} />
      </Section>
    </div>
  );
}
