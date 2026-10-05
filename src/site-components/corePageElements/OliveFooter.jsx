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
import Section from "../webflow_modules/Layout/components/Section";
import VFlex from "../webflow_modules/Layout/components/VFlex";

export function OliveFooter({
  backgroundColorLightOrDark = "Light",

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
  const _styleVariantMap = {
    Dark: "",
    Light: "w-variant-09933438-b44f-5b72-f720-156af779fc91",
  };

  const _activeStyleVariant = _styleVariantMap[backgroundColorLightOrDark];

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={`footer-3 ${_activeStyleVariant}`}
        data-bg-color={"Dark"}
        tag={"footer"}
      >
        <Container
          className={`container-87 max-width_large-2 ${_activeStyleVariant}`}
          tag={"div"}
        >
          <Block
            className={`footer-wrapper-3 ${_activeStyleVariant}`}
            id={"w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859db-494859d9"}
            tag={"div"}
          >
            <VFlex
              className={`flex_vertical-10 gap-small is-vertical-stretch ${_activeStyleVariant}`}
              id={"w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859dc-494859d9"}
              tag={"div"}
            >
              <Block
                className={`footer-grid_2-col-2 ${_activeStyleVariant}`}
                id={"w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859dd-494859d9"}
                tag={"div"}
              >
                <Link
                  block={"inline"}
                  button={false}
                  className={`logo-2 test ${_activeStyleVariant}`}
                  id={"w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859de-494859d9"}
                  options={logoImageFooterLogoLink}
                >
                  <Block
                    className={`nav_logo-icon ${_activeStyleVariant}`}
                    tag={"div"}
                  >
                    <HtmlEmbed
                      className={`logo-2 is-light ${_activeStyleVariant}`}
                      content={
                        '<?xml version="1.0" encoding="UTF-8"?><svg preserveAspectRatio="xMidYMid" version="1.1" viewBox="0 -.05678 791.25 296.094" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M261.95 134.07c0 37.1-.02 74.21.02 111.31 .01 9.49.11 19 2.12 28.35 1.3 6.05 4.26 10.99 10.4 13.17 2.13.76 2.11 2.11 2.02 3.77 -.12 2.36-1.93 1.51-3.09 1.51 -17.1.05-34.21.04-51.31 0 -1.09 0-2.79.63-2.85-1.37 -.04-1.24-.7-2.85 1.15-3.55 9.22-3.45 10.95-11.51 12.21-19.86 1.12-7.44 1.11-14.94 1.12-22.43 .03-62.71.04-125.43-.01-188.14 0-7.35-.07-14.73-1.83-21.97 -1.42-5.84-4.46-10.23-10.08-12.65 -1.53-.66-2.76-1.31-2.68-3.46 .08-2.09 1.49-2.33 2.82-2.92 11.05-4.91 22.09-9.85 33.16-14.71 5.29-2.32 6.85-1.19 6.85 4.77 0 42.73 0 85.45 0 128.18Z"/><path d="M474.6 265.7c4.91-12.77 9.5-24.63 14.04-36.49 9.4-24.58 18.81-49.17 28.16-73.77 2.8-7.35 5.46-14.75 6.11-22.7 .75-9.15-1.09-12.58-9.34-16.43 -2.02-.94-1.3-2.44-1.35-3.8 -.07-1.89 1.48-1.3 2.45-1.3 10.86-.04 21.72-.04 32.59 0 .85 0 2.3-.56 2.26 1.08 -.04 1.46.92 3.35-1.35 4.16 -7.77 2.77-12 9.06-15.58 15.91 -6.95 13.31-11.57 27.6-17 41.54 -15.02 38.59-29.88 77.25-44.74 115.9 -.69 1.79-1.54 2.58-3.51 2.46 -2.74-.17-5.53-.33-8.23.03 -3.68.48-5.07-1.2-6.42-4.42 -19.77-47.44-39.69-94.82-59.62-142.19 -2.96-7.02-6.34-13.85-10.76-20.1 -2.55-3.61-5.4-6.94-9.48-8.83 -2.27-1.05-1.75-2.86-1.57-4.45 .22-1.92 1.97-1.07 3.03-1.07 15.36-.06 30.71-.06 46.07 0 1.05 0 2.79-.82 2.93 1.22 .12 1.63.52 3.25-1.85 4.26 -4.34 1.84-5.47 4.27-4.71 8.98 1.04 6.46 3.67 12.43 6.19 18.4 16.71 39.53 33.48 79.03 50.24 118.54 .33.77.71 1.51 1.45 3.08Z"/><path d="M345.77 186.4c0 22.36-.04 44.72.03 67.08 .02 6.62.6 13.21 2.03 19.71 1.4 6.35 4.33 11.47 10.69 13.84 2.02.76 1.68 2.15 1.69 3.6 0 2.04-1.54 1.57-2.69 1.57 -17.35.02-34.7.02-52.06 0 -1.04 0-2.5.41-2.4-1.41 .07-1.24-.75-2.85 1.14-3.53 9.46-3.43 11.17-11.6 12.29-20.13 .93-7.08.97-14.2.96-21.32 -.04-29.98-.13-59.96-.22-89.94 -.01-4.01-.6-7.96-1.38-11.89 -1.16-5.88-4.17-10.33-9.81-12.81 -1.52-.67-3.13-1.12-3.12-3.56 .01-2.54 1.79-2.69 3.3-3.34 11.31-4.93 22.63-9.85 33.96-14.75 3.71-1.6 5.53-.38 5.54 3.78 .02 20.36.01 40.73.01 61.09 0 4 0 8 0 11.99h.04Z"/><path d="M309.5 65.94c-.1-11.07 8.76-19.95 19.94-19.96 11.39-.02 19.79 8.58 19.88 20.34 .08 10.83-8.71 19.66-19.71 19.79 -11.29.13-20-8.6-20.1-20.17Z"/><path d="M782.32 47.46c0-8.61.13-17.23-.07-25.84 -.07-2.83.71-3.88 3.51-3.44 1.1.17 2.25.1 3.36.01 1.66-.13 2.13.63 2.13 2.2 -.04 17.97-.04 35.95 0 53.92 0 1.83-.66 2.26-2.4 2.33 -6.53.27-6.53.34-6.53-6.35 0-7.61 0-15.23 0-22.84Z"/><path d="M189.12 188.72c-2.94-26.13-13.92-47.74-35.99-62.86 -16.29-11.16-34.48-16.75-54.17-17.06 -37.75-.61-66.8 15.2-86.34 47.5C.34 176.6-2.12 198.97 1.57 222.13c3.33 20.9 12.65 38.58 29.22 51.97 31.63 25.55 76.71 29.15 111.99 8.55 31.33-18.29 46.39-46.29 47.19-81.46 -.32-4.74-.44-8.62-.87-12.46Zm-34.75 70.19c-12.64 26.35-40.1 33.62-63.44 27.33 -19.72-5.31-33.3-18.64-43.54-35.56 -15.11-25-21.81-52.11-18.5-81.33 1.31-11.53 4.9-22.41 11.52-32.1 15.04-22.02 42.71-25.89 62.72-18.32 16.45 6.22 28.12 18.26 37.42 32.68 13.92 21.58 21.1 45.32 21.65 71.04 -.14 12.63-2.31 24.79-7.83 36.28Z"/><path d="M731.14 243.45c-1.92-2.44-2.93-.84-4.25.59 -17.82 19.43-39.5 30.18-66.27 29.03 -21.38-.92-40.06-8.28-54.2-24.82 -17.85-20.88-21.5-45.73-19.12-72.12 .27-2.98 1.39-3.55 4.13-3.54 22.35.11 44.7.06 67.05.06 22.47 0 44.95-.02 67.42.04 2.28 0 3.68-.02 3.39-3.09 -1.57-16.59-7.91-30.87-20.22-42.22 -14.21-13.1-31.45-18.46-50.41-18.65 -34.33-.35-61.82 13.34-81.28 41.71 -15.45 22.52-19.39 47.8-15.06 74.48 8.35 51.44 57.41 77.89 100.45 69.39 29.89-5.9 50.75-24.83 68.58-48.04 .88-1.14.61-1.77-.22-2.83Zm-142-77.77c3.68-16.24 10.26-30.92 24.2-40.91 20.69-14.82 48.54-12.65 67.04 4.85 10.18 9.63 16.32 21.53 19.38 35.17 .63 2.79.02 3.39-2.7 3.38 -17.46-.09-34.93-.05-52.39-.05s-34.93 0-52.39-.01c-1.61 0-3.84.64-3.14-2.43Z"/><path d="M772 71.07c-5.69-15.85-11.6-31.62-17.02-47.56 -1.38-4.06-3.02-6.24-7.45-5.31 -.36.08-.76.07-1.12 0 -2.85-.54-4.15.77-5.07 3.43 -3.79 10.96-7.8 21.85-11.72 32.77 -2.6 7.25-5.19 14.51-7.94 22.19 2.27 0 4.13-.19 5.94.05 2.76.37 3.99-.76 4.69-3.37 .9-3.37 2.31-6.59 3.33-9.93 .53-1.73 1.44-2.35 3.23-2.29 3.99.12 7.99.04 11.98.04q8.51 0 11.15 8.01 2.64 8.01 11.41 7.31c.24-1.96-.8-3.61-1.42-5.33Zm-32.88-17.69c2.81-8.13 5.53-15.98 8.25-23.83 .27-.07.53-.13.8-.2 2.76 7.93 5.53 15.85 8.37 24.03h-17.42Z"/></g></svg>'
                      }
                    />
                  </Block>
                </Link>
                <FormWrapper
                  className={`footer_form-2 ${_activeStyleVariant}`}
                  id={"w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859e1-494859d9"}
                >
                  <FormForm
                    className={`form_item-wrapper-2 ${_activeStyleVariant}`}
                    data-name={"enter your business email"}
                    id={"wf-form-enter-your-business-email"}
                    method={"get"}
                    name={"wf-form-enter-your-business-email"}
                  >
                    <Block
                      className={`grid-flex-2 footer-3 ${_activeStyleVariant}`}
                      tag={"div"}
                    >
                      <Block
                        className={`footer_item-wrapper-2 ${_activeStyleVariant}`}
                        id={
                          "w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859e4-494859d9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={`paragraph-8 text-white-2 ${_activeStyleVariant}`}
                          tag={"div"}
                        >
                          {signUpSIgnUpText}
                        </Block>
                      </Block>
                      <FormTextInput
                        aria-label={"Enter your email"}
                        autoFocus={false}
                        className={`input_field-2 ${_activeStyleVariant}`}
                        data-name={"Home-Email-Signup_Mobile"}
                        disabled={false}
                        id={
                          "w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859e6-494859d9"
                        }
                        maxLength={256}
                        name={"Home-Email-Signup_Mobile"}
                        placeholder={"Enter your email"}
                        required={true}
                        type={"email"}
                      />
                      <Link
                        button={true}
                        className={`button-7 is-secondary footer-button-2 ${_activeStyleVariant}`}
                        id={
                          "w-node-_2b6dbe61-07c1-ee05-dc07-cd5b494859e7-494859d9"
                        }
                        options={{
                          href: "#",
                        }}
                      >
                        {"submit"}
                      </Link>
                    </Block>
                  </FormForm>
                  <FormSuccessMessage
                    className={`success-message-3 ${_activeStyleVariant}`}
                  >
                    <Block
                      className={`text-block-45 ${_activeStyleVariant}`}
                      tag={"div"}
                    >
                      {signUpSignUpSuccessText}
                    </Block>
                  </FormSuccessMessage>
                  <FormErrorMessage
                    className={`error-message-3 ${_activeStyleVariant}`}
                  >
                    <Block
                      className={`text-block-46 ${_activeStyleVariant}`}
                      tag={"div"}
                    >
                      {signUpSignUpErrorMessageText}
                    </Block>
                  </FormErrorMessage>
                </FormWrapper>
              </Block>
            </VFlex>
            <Block
              className={`footer_divider-2 ${_activeStyleVariant}`}
              tag={"div"}
            />
            <Block
              className={`footer_button_wrapper-2 ${_activeStyleVariant}`}
              tag={"div"}
            >
              <Block
                className={`footer_button-group-2 ${_activeStyleVariant}`}
                tag={"div"}
              >
                {privacyPrivacyLinkVisible ? (
                  <Link
                    button={false}
                    className={`text-link-2 ${_activeStyleVariant}`}
                    options={privacyPrivacyLink}
                  >
                    {privacyPrivacyText}
                  </Link>
                ) : null}
                {termsTermsLinkVisible ? (
                  <Link
                    button={false}
                    className={`text-link-2 ${_activeStyleVariant}`}
                    options={termsTermsLink}
                  >
                    {termsTermsText}
                  </Link>
                ) : null}
                {referralReferralLinkVisible ? (
                  <Link
                    button={false}
                    className={`text-link-2 ${_activeStyleVariant}`}
                    options={referralReferralLink}
                  >
                    {referralReferralText}
                  </Link>
                ) : null}
              </Block>
            </Block>
          </Block>
        </Container>
      </Section>
    </div>
  );
}
