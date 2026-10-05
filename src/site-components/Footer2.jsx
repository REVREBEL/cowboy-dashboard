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

export function Footer2({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Section
        className={"footer-4"}
        grid={{
          type: "section",
        }}
        tag={"footer"}
      >
        <Block className={"footer-content-container"} tag={"div"}>
          <Block className={"hero-section-image-wrapper"} tag={"div"}>
            <Block className={"logo-3"} tag={"div"}>
              {"FORYNGE"}
            </Block>
            <Image
              alt={""}
              className={"footer-img-2"}
              height={"1149"}
              loading={"lazy"}
              src={
                "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf2f33d8c41f53c30cd39c_f00c4a60004eb84fd1d84862d1b05f16_forynge-sauna-footer.webp"
              }
              width={"640"}
            />
          </Block>
          <Heading className={"footer-headline"} tag={"h1"}>
            {"Explore, Enjoy "}
            <Span className={"font-merchant-3"}>{"&"}</Span>
            <br />
            {"Elevate"}
          </Heading>
          <Block className={"footer-content-wrapper"} tag={"div"} />
          <Block className={"footer-content-wrapper"} tag={"div"}>
            <Paragraph className={"text-regular-12 ios-margin-bottom-280"}>
              {
                "Discover scenic trails, enjoy wildlife sightings, and elevate your escape."
              }
            </Paragraph>
            <Block className={"footer-contact"} tag={"address"}>
              <Paragraph className={"text-regular-12"}>
                {"Forynge Retreats"}
                <br />
                <br />
                {"Skogsvägen 12"}
                <br />
                {"123 45 Naturstad"}
                <br />
                {"Sweden"}
              </Paragraph>
            </Block>
          </Block>
          <Block className={"footer-content-wrapper"} tag={"div"}>
            <Block className={"footer-contact"} tag={"div"}>
              <Paragraph className={"text-regular-12"}>
                {"Created with joy for the"}
                <br />
                {"Webflow Community."}
                <br />
                <br />
              </Paragraph>
              <Block className={"footer-social-link-wrapper"} tag={"div"}>
                <Link
                  block={"inline"}
                  button={false}
                  className={"footer-social-wrapper"}
                  options={{
                    href: "https://greenbydefault.de",
                    target: "_blank",
                  }}
                >
                  <Image
                    alt={"Greenbydefault Logo"}
                    className={"footer-social-logo"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf2f33d8c41f53c30cd3a2_db6cabb2f624feacf4bc2ea3fc88c672_gbd-logo.svg"
                    }
                    width={"auto"}
                  />
                </Link>
                <Link
                  block={"inline"}
                  button={false}
                  className={"footer-social-wrapper"}
                  options={{
                    href: "https://dribbble.com/greenbydefault",
                    target: "_blank",
                  }}
                >
                  <Image
                    alt={"Dribbble Logo"}
                    className={"footer-social-logo"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf2f33d8c41f53c30cd3a1_7e8136825f3404fd3b7fc4a06fbbe247_dribbble%20logo.svg"
                    }
                    width={"auto"}
                  />
                </Link>
                <Link
                  block={"inline"}
                  button={false}
                  className={"footer-social-wrapper"}
                  options={{
                    href: "https://webflow.com/@greenbydefault",
                    target: "_blank",
                  }}
                >
                  <Image
                    alt={"Webflow Logo"}
                    className={"footer-social-logo"}
                    height={"auto"}
                    loading={"lazy"}
                    src={
                      "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abf2f33d8c41f53c30cd3a0_9a8ef2d7e202f13807d6c73452d2abd5_webflow%20logo.svg"
                    }
                    width={"auto"}
                  />
                </Link>
                <Link
                  block={"inline"}
                  button={false}
                  className={"footer-social-wrapper"}
                  options={{
                    href: "https://www.linkedin.com/in/oliver-mackeldanz-6972b51a6/",
                    target: "_blank",
                  }}
                >
                  <Image
                    alt={"LinkedIn Logo\n"}
                    className={"footer-social-logo"}
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
        <Block className={"hero-section-mobile"} tag={"div"}>
          <Block className={"hero-section-mobile-padding"} tag={"div"}>
            <Heading className={"h1"} tag={"h1"}>
              {"Explore, Enjoy "}
              <Span className={"font-merchant-3"}>{"&"}</Span>
              <br />
              {"Elevate"}
            </Heading>
            <Paragraph className={"text-regular-12 ios-margin-bottom-280"}>
              {
                "Discover scenic trails, enjoy wildlife sightings, and elevate your escape."
              }
            </Paragraph>
            <List
              className={"footer-navigation-list"}
              tag={"ul"}
              unstyled={false}
            >
              <ListItem className={"footer-navigation-list"}>
                <Link
                  button={false}
                  className={"footer-nav-link"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Home"}
                </Link>
                <Link
                  button={false}
                  className={"footer-nav-link"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Explore"}
                </Link>
                <Link
                  button={false}
                  className={"footer-nav-link"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Stay"}
                </Link>
                <Link
                  button={false}
                  className={"footer-nav-link"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Sauna"}
                </Link>
              </ListItem>
            </List>
          </Block>
          <Block className={"mobile-hero-img-wrapper"} tag={"div"}>
            <Image
              alt={""}
              className={"footer-img-2"}
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
