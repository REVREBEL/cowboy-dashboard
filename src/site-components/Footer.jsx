"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Heading from "./webflow_modules/Basic/components/Heading";
import Image from "./webflow_modules/Basic/components/Image";
import Link from "./webflow_modules/Basic/components/Link";
import List from "./webflow_modules/Basic/components/List";
import ListItem from "./webflow_modules/Basic/components/ListItem";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import Section from "./webflow_modules/Layout/components/Section";
import Span from "./webflow_modules/Basic/components/Span";
import { MainNavigation } from "./MainNavigation";

export function Footer({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={"layered-footer section-2"}
        grid={{
          type: "section",
        }}
        tag={"footer"}
      >
        <Block className={"layered-footer_container"} tag={"div"}>
          <Block className={"layered-footer_image-wrapper"} tag={"div"}>
            <Image
              alt={""}
              className={"layered-footer_image"}
              height={"Auto"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf4402eab8e3fe5c920a4c_9f683d03b8093bab7d71d4135f7772cc_Urban_Cowboy_Catskills_June_2020_Interiors-15.jpg"
              }
              width={"Auto"}
            />
          </Block>
          <Heading className={"layered-footer__headline"} tag={"h2"}>
            {"Explore, Enjoy "}
            <Span className={"font-merchant"}>{"&"}</Span>
            <br />
            {"Elevate"}
          </Heading>
          <Block className={"layered-footer_content-wrapper"} tag={"div"}>
            <MainNavigation />
          </Block>
          <Block
            className={"layered-footer_content-wrapper gap-xs"}
            tag={"div"}
          >
            <Paragraph className={"text-regular ios-margin-bottom-280"}>
              {
                "Discover scenic trails, enjoy wildlife sightings, and elevate your escape."
              }
            </Paragraph>
            <Block className={"layered-footer_contact"} tag={"address"}>
              <Paragraph className={"text-regular"}>
                {"Urban Cowboy "}
                <br />
                {"Catskills,NY"}
              </Paragraph>
            </Block>
          </Block>
          <Block className={"layered-footer_content-wrapper"} tag={"div"}>
            <Block className={"layered-footer_contact"} tag={"div"}>
              <Block
                className={"layered-footer_social-link-wrapper"}
                tag={"div"}
              >
                <Link
                  block={"inline"}
                  button={false}
                  className={"layered-footer_social-link-block"}
                  options={{
                    href: "https://greenbydefault.de",
                    target: "_blank",
                  }}
                >
                  <Image
                    alt={""}
                    className={
                      "layered-footer_social-image is-filter-color-whie"
                    }
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf36117c8f61c63147a3c6_fi-social-instagram.svg"
                    }
                    width={"auto"}
                  />
                </Link>
                <Link
                  block={"inline"}
                  button={false}
                  className={"layered-footer_social-link-block"}
                  options={{
                    href: "https://www.linkedin.com/in/oliver-mackeldanz-6972b51a6/",
                    target: "_blank",
                  }}
                >
                  <Image
                    alt={"LinkedIn Logo\n"}
                    className={"layered-footer_social-image"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf2f33d8c41f53c30cd39f_1659787b3a50dddfdf5d75615de9fd95_linkedin%20logo.svg"
                    }
                    width={"auto"}
                  />
                </Link>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block
          className={"layered-footer_content-wrapperhero-section-mobile"}
          tag={"div"}
        >
          <Block className={"hero-section-mobile-padding-2"} tag={"div"}>
            <Heading className={"h1-2"} tag={"h1"}>
              {"Explore, Enjoy "}
              <Span className={"font-merchant-2"}>{"&"}</Span>
              <br />
              {"Elevate"}
            </Heading>
            <Paragraph className={"text-regular-11 ios-margin-bottom-280"}>
              {
                "Discover scenic trails, enjoy wildlife sightings, and elevate your escape."
              }
            </Paragraph>
            <List
              className={"footer-navigation-list-2"}
              tag={"ul"}
              unstyled={false}
            >
              <ListItem className={"footer-navigation-list-2"}>
                <Link
                  button={false}
                  className={"footer-nav-link-2"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Home"}
                </Link>
                <Link
                  button={false}
                  className={"footer-nav-link-2"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Explore"}
                </Link>
                <Link
                  button={false}
                  className={"footer-nav-link-2"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Stay"}
                </Link>
                <Link
                  button={false}
                  className={"footer-nav-link-2"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Sauna"}
                </Link>
              </ListItem>
            </List>
          </Block>
          <Block className={"mobile-hero-img-wrapper-2"} tag={"div"}>
            <Image
              alt={""}
              className={"layered-footer_image"}
              height={"300"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf2f33d8c41f53c30cd39c_f00c4a60004eb84fd1d84862d1b05f16_forynge-sauna-footer.webp"
              }
              width={"280"}
            />
          </Block>
        </Block>
      </Section>
    </div>
  );
}
