"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Icon from "../webflow_modules/Icon/components/Icon";
import Image from "../webflow_modules/Basic/components/Image";
import Link from "../webflow_modules/Basic/components/Link";
import NavbarBrand from "../webflow_modules/Navbar/components/NavbarBrand";
import NavbarButton from "../webflow_modules/Navbar/components/NavbarButton";
import NavbarContainer from "../webflow_modules/Navbar/components/NavbarContainer";
import NavbarMenu from "../webflow_modules/Navbar/components/NavbarMenu";
import NavbarWrapper from "../webflow_modules/Navbar/components/NavbarWrapper";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";
import { CompanyLogoFalse } from "../icons/CompanyLogoFalse";

export function BreakpointDesktop({
  button1Visibility = true,
  button2Visibility = true,
  slotButton,
  slotButton2,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block data-figma-id={"6950:5391"} tag={"div"}>
        <NavbarWrapper
          className={"navbar_main"}
          config={{
            animation: "default",
            collapse: "medium",
            docHeight: false,
            duration: 400,
            easing: "ease",
            easing2: "ease",
            noScroll: false,
          }}
          tag={"div"}
        >
          <NavbarBrand
            options={{
              href: "#",
            }}
          >
            <CompanyLogoFalse />
          </NavbarBrand>
          <NavbarMenu role={"navigation"} tag={"nav"}>
            <Block
              className={"container"}
              data-figma-id={"6950:5259"}
              tag={"div"}
            >
              <Block
                className={"menu-content"}
                data-figma-id={"6950:5260"}
                tag={"div"}
              >
                <Block
                  className={"nav-column"}
                  data-figma-id={"6950:5262"}
                  tag={"div"}
                >
                  <Link
                    button={false}
                    className={"main-nav-link_1"}
                    data-figma-id={"6950:5263"}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Locations"}
                  </Link>
                  <Link
                    button={false}
                    className={"main-nav-link_1"}
                    data-figma-id={"6950:5264"}
                    options={{
                      href: "#",
                    }}
                  >
                    {"About"}
                  </Link>
                  <Link
                    button={false}
                    className={"main-nav-link_1"}
                    data-figma-id={"6950:5265"}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Cowboy Creative"}
                  </Link>
                  <Block
                    className={"nav-dropdown-link"}
                    data-figma-id={"6950:5266"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"main-nav-link_1"}
                      data-figma-id={"6950:5267"}
                    >
                      {"Contact"}
                    </Paragraph>
                    <Image
                      alt={""}
                      className={"chevron-down"}
                      data-figma-id={"6950:5268"}
                      data-figma-image-hash={"cfeddf86857f7bdc091f5ec3497ee40c"}
                      data-figma-image-id={"6aabe5293be55d2c0c5eb6b0"}
                      height={"auto"}
                      loading={"lazy"}
                      src={
                        "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6aabe5293be55d2c0c5eb6b0_Chevron%20Down.svg"
                      }
                      width={"auto"}
                    />
                  </Block>
                </Block>
              </Block>
              <Block
                className={"actions"}
                data-figma-id={"6950:5270"}
                tag={"div"}
              >
                {button1Visibility ? (
                  <Block
                    className={"button-wrapper"}
                    data-figma-id={"6950:5271"}
                    tag={"div"}
                  >
                    {slotButton}
                  </Block>
                ) : null}
                {button2Visibility ? (
                  <Block
                    className={"button-wrapper"}
                    data-figma-id={"6950:5272"}
                    tag={"div"}
                  >
                    {slotButton2}
                  </Block>
                ) : null}
              </Block>
            </Block>
          </NavbarMenu>
          <Block
            className={"man-menu-01"}
            data-figma-id={"6950:5273"}
            tag={"div"}
          >
            <Block
              className={"nav-menu-wrapper"}
              data-figma-id={"6950:5274"}
              tag={"div"}
            >
              <Block
                className={"nav-menu"}
                data-figma-id={"6950:5275"}
                tag={"div"}
              >
                <Paragraph
                  className={"subheadline"}
                  data-figma-id={"6950:5276"}
                >
                  {"Urban Cowboy"}
                </Paragraph>
                <Block
                  className={"nav-menu-list"}
                  data-figma-id={"6950:5277"}
                  tag={"div"}
                >
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5278"}>
                    {"Press"}
                  </Paragraph>
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5279"}>
                    {"Awards"}
                  </Paragraph>
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5280"}>
                    {"Media"}
                  </Paragraph>
                </Block>
              </Block>
              <Block
                className={"nav-menu"}
                data-figma-id={"6950:5283"}
                tag={"div"}
              >
                <Paragraph
                  className={"subheadline"}
                  data-figma-id={"6950:5284"}
                >
                  {"Locations"}
                </Paragraph>
                <Block
                  className={"nav-menu-list"}
                  data-figma-id={"6950:5285"}
                  tag={"div"}
                >
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5286"}>
                    {"Catskills"}
                  </Paragraph>
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5287"}>
                    {"Denver"}
                  </Paragraph>
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5288"}>
                    {"Nashville Downtown"}
                  </Paragraph>
                  <Paragraph className={"nav-link"} data-figma-id={"6950:5289"}>
                    {"Nashville East"}
                  </Paragraph>
                </Block>
              </Block>
            </Block>
            <Block
              className={"nav-product-content-wrapper"}
              data-figma-id={"6950:5291"}
              tag={"div"}
            >
              <Block
                className={"nav-product-card"}
                data-figma-id={"6950:5292"}
                tag={"div"}
              >
                <Block
                  className={"nav-card is-card-1"}
                  data-figma-id={"6950:5293"}
                  data-figma-image-hash={"626a8bab527f6d4b63231cbeeac2fdb1"}
                  data-figma-image-id={"6aabe52a53475bdb5fa2f0f3"}
                  tag={"div"}
                >
                  <Block
                    className={"nav-content-top"}
                    data-figma-id={"6950:5294"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"headline-xxxs is-color-alpine"}
                      data-figma-id={"6950:5295"}
                    >
                      {"Stay with US"}
                    </Paragraph>
                    <Paragraph
                      className={"paragraph is-color-alpine"}
                      data-figma-id={"6950:5296"}
                    >
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
                      }
                    </Paragraph>
                  </Block>
                  <Block
                    className={"actions"}
                    data-figma-id={"6950:5297"}
                    tag={"div"}
                  />
                </Block>
                <Block
                  className={"nav-card is-card-2"}
                  data-figma-id={"6950:5299"}
                  data-figma-image-hash={"626a8bab527f6d4b63231cbeeac2fdb1"}
                  data-figma-image-id={"6aabe52a53475bdb5fa2f0f3"}
                  tag={"div"}
                >
                  <Block
                    className={"nav-content-top"}
                    data-figma-id={"6950:5300"}
                    tag={"div"}
                  >
                    <Paragraph
                      className={"headline-xxxs is-color-alpine"}
                      data-figma-id={"6950:5301"}
                    >
                      {"Plana Meeting"}
                    </Paragraph>
                    <Paragraph
                      className={"paragraph is-color-alpine"}
                      data-figma-id={"6950:5302"}
                    >
                      {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
                      }
                    </Paragraph>
                  </Block>
                  <Block
                    className={"actions"}
                    data-figma-id={"6950:5959"}
                    tag={"div"}
                  />
                </Block>
              </Block>
            </Block>
          </Block>
        </NavbarWrapper>
      </Block>
    </div>
  );
}
