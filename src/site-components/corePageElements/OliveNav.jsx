"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import DOM from "../webflow_modules/Builtin/components/DOM";
import DropdownList from "../webflow_modules/Dropdown/components/DropdownList";
import DropdownToggle from "../webflow_modules/Dropdown/components/DropdownToggle";
import DropdownWrapper from "../webflow_modules/Dropdown/components/DropdownWrapper";
import Grid from "../webflow_modules/Layout/components/Grid";
import HtmlEmbed from "../webflow_modules/Embed/components/HtmlEmbed";
import Icon from "../webflow_modules/Icon/components/Icon";
import Link from "../webflow_modules/Basic/components/Link";
import List from "../webflow_modules/Basic/components/List";
import ListItem from "../webflow_modules/Basic/components/ListItem";
import NavbarButton from "../webflow_modules/Navbar/components/NavbarButton";
import NavbarMenu from "../webflow_modules/Navbar/components/NavbarMenu";
import NavbarWrapper from "../webflow_modules/Navbar/components/NavbarWrapper";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";
import Strong from "../webflow_modules/Basic/components/Strong";

export function OliveNav({
  navBarMenu1NavBarMenuDropdownText = "Suites",
  navBarMenu1NavBarMenuDropdownVisibility = true,

  section1NavLink1NavLink = {
    href: "#",
  },

  section1NavLink1NavLinkTeaserDescription = "Spacious, stylish, all yours.",
  section1NavLink1NavLinkText = "",

  section1NavLink2NavLink = {
    href: "#",
  },

  section1NavLink2NavLinkTeaserDescription = "Fireplaces, balconies, luxe perks.",
  section1NavLink2NavLinkText = "",

  section1NavLink3NavLink3 = {
    href: "#",
  },

  section1NavLink3NavLinkTeaserDescription = "Unlock exclusive suite deals.",
  section1NavLink3NavLinkText = "",
  section1Section1EyebrowText = (
    <>
      {"Stay "}
      {"&"}
      {" Unwind"}
    </>
  ),

  section2NavLink1NavLink = {
    href: "#",
  },

  section2NavLink1NavLinkTeaserDescription = "Sunset Strip at your door.",
  section2NavLink1NavLinkText = "",

  section2NavLink2NavLinkLink = {
    href: "#",
  },

  section2NavLink2NavLinkTeaserDescription = "See our retro-chic spaces.",
  section2NavLink2NavLinkText = "",

  section2NavLink3NavLink = {
    href: "#",
  },

  section2NavLink3NavLinkTeaserDescription = "Buzz from the inside crowd.",
  section2NavLink3NavLinkText = "",
  section2Section2EyebrowText = "Discover",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"nav-3"} tag={"div"}>
        <NavbarWrapper
          className={"nav_container-2 hide-mobile"}
          config={{
            easing: "ease",
            easing2: "ease",
            duration: 400,
            docHeight: false,
            noScroll: true,
            animation: "default",
            collapse: "medium",
          }}
          data-animation={"default"}
          data-collapse={"medium"}
          data-duration={"400"}
          data-easing={"ease"}
          data-easing2={"ease"}
          data-no-scroll={"1"}
          // @ts-ignore - User-defined custom attribute(s)
          role={"banner"}
          tag={"div"}
        >
          <Block
            className={"nav_left-2"}
            id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7910f-9cc7910d"}
            tag={"div"}
          >
            <NavbarMenu
              className={"nav_menu-2"}
              id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79114-9cc7910d"}
              role={"navigation"}
              tag={"nav"}
            >
              <List
                className={"nav_menu-list-2"}
                // @ts-ignore - User-defined custom attribute(s)
                role={"list"}
                tag={"ul"}
                unstyled={true}
              >
                <ListItem className={"nav_menu-list-item-2"}>
                  <DropdownWrapper
                    className={"nav_dropdown-menu-2"}
                    delay={0}
                    hover={false}
                    tag={"div"}
                  >
                    <DropdownToggle className={"nav_link-2"} tag={"div"}>
                      {navBarMenu1NavBarMenuDropdownVisibility ? (
                        <Block className={"nav_text-2"} tag={"div"}>
                          {navBarMenu1NavBarMenuDropdownText}
                        </Block>
                      ) : null}
                      <Icon
                        className={"nav-caret-2"}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownList
                      className={"mega-nav_dropdown-list-2"}
                      tag={"nav"}
                    >
                      <Block
                        className={"mega-nav_dropdown-list-wrapper-2"}
                        tag={"div"}
                      >
                        <List
                          className={
                            "grid_3-col-2 tablet-1-col gap-medium-2 margin-bottom_none-3"
                          }
                          // @ts-ignore - User-defined custom attribute(s)
                          role={"list"}
                          tag={"ul"}
                          unstyled={true}
                        >
                          <ListItem
                            className={
                              "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7911e-9cc7910d"
                            }
                            id={
                              "w-node-_6834ea16-81cf-d304-337c-e1249bfd0bd1-4d562d54"
                            }
                          >
                            <Grid
                              className={
                                "grid_3-col-2 tablet-1-col gap-small-2"
                              }
                            >
                              <Block tag={"div"}>
                                <Block className={"eyebrow-3"} tag={"div"}>
                                  {section1Section1EyebrowText}
                                </Block>
                                <List
                                  className={"mega-nav_list-3"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79123-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={section1NavLink1NavLink}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79128-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0bdc-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          {section1NavLink1NavLinkText}
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            section1NavLink1NavLinkTeaserDescription
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7912b-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={section1NavLink2NavLink}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79130-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0be7-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          {section1NavLink2NavLinkText}
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            section1NavLink2NavLinkTeaserDescription
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79133-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={section1NavLink3NavLink3}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79138-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0bf2-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          {section1NavLink3NavLinkText}
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            section1NavLink3NavLinkTeaserDescription
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Block>
                              <Block
                                id={
                                  "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7913b-9cc7910d"
                                }
                                tag={"div"}
                              >
                                <Block className={"eyebrow-3"} tag={"div"}>
                                  {"Experience"}
                                </Block>
                                <List
                                  className={"mega-nav_list-3"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7913f-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79144-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c01-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Rooftop Pool"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Swim, sip, soak in style."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7914a-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7914f-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c0c-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Dining"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Fresh flavors, all day."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79155-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7915a-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c17-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Events"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            "Gather, celebrate, create memories."
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Block>
                              <Block
                                id={
                                  "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79160-9cc7910d"
                                }
                                tag={"div"}
                              >
                                <Block className={"eyebrow-3"} tag={"div"}>
                                  {section2Section2EyebrowText}
                                </Block>
                                <List
                                  className={"mega-nav_list-3"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79163-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={section2NavLink1NavLink}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79168-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c26-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          {section2NavLink1NavLinkText}
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            section2NavLink1NavLinkTeaserDescription
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7916b-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={section2NavLink2NavLinkLink}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79170-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c31-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          {section2NavLink2NavLinkText}
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            section2NavLink2NavLinkTeaserDescription
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79173-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={section2NavLink3NavLink}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79178-9cc7910d"
                                        }
                                        id={
                                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c3c-4d562d54"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          {section2NavLink3NavLinkText}
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {
                                            section2NavLink3NavLinkTeaserDescription
                                          }
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Block>
                            </Grid>
                          </ListItem>
                          <ListItem
                            className={
                              "flex_horizontal-3 w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7917b-9cc7910d"
                            }
                            id={
                              "w-node-_6834ea16-81cf-d304-337c-e1249bfd0c42-4d562d54"
                            }
                          >
                            <Link
                              block={"inline"}
                              button={false}
                              className={
                                "card-link-2 is-inverse-2 flex-child_expand-2"
                              }
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"card_body-2"} tag={"div"}>
                                <Block className={"heading_h3-2"} tag={"div"}>
                                  {"Chic stays, Hollywood soul"}
                                </Block>
                                <Paragraph
                                  className={
                                    "paragraph_small-3 text-color_inverse-secondary-2"
                                  }
                                >
                                  {
                                    "All-suite comfort, rooftop views, and a splash of retro cool"
                                  }
                                  {"—"}
                                  {"your West Hollywood hideaway awaits."}
                                </Paragraph>
                                <Block
                                  className={"margin_top-auto-2"}
                                  tag={"div"}
                                >
                                  <Block
                                    className={"button-group-3"}
                                    tag={"div"}
                                  >
                                    <Block
                                      className={"text-button-2 is-secondary-2"}
                                      tag={"div"}
                                    >
                                      <Block tag={"div"}>{"Discover"}</Block>
                                      <Block
                                        className={"button_icon-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"none"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 16 16"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14"
                                            }
                                            stroke={"currentColor"}
                                            strokeLinejoin={"round"}
                                            strokeWidth={"2"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                    </Block>
                                  </Block>
                                </Block>
                              </Block>
                            </Link>
                          </ListItem>
                        </List>
                      </Block>
                    </DropdownList>
                  </DropdownWrapper>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"nav_link-2"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block className={"nav_text-2"} tag={"div"}>
                      {"curate your stay"}
                    </Block>
                  </Link>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"nav_link-2"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block className={"nav_text-2"} tag={"div"}>
                      {"About"}
                    </Block>
                  </Link>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2"}>
                  <DropdownWrapper
                    className={"nav_dropdown-menu-2"}
                    delay={0}
                    hover={false}
                    tag={"div"}
                  >
                    <DropdownToggle className={"nav_link-2"} tag={"div"}>
                      <Block className={"nav_text-2"} tag={"div"}>
                        {"Help"}
                      </Block>
                      <Icon
                        className={"nav-caret-2"}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownList className={"nav_dropdown-list-2"} tag={"div"}>
                      <Block
                        className={"nav-menu_dropdown-list-wrapper-2"}
                        tag={"div"}
                      >
                        <List
                          className={"flex_vertical-3 margin-bottom_none-3"}
                          // @ts-ignore - User-defined custom attribute(s)
                          role={"list"}
                          tag={"ul"}
                          unstyled={true}
                        >
                          <ListItem className={"margin-bottom_none-3"}>
                            <Link
                              block={"inline"}
                              button={false}
                              className={"nav_dropdown-link-2"}
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"button_label-2"} tag={"div"}>
                                {"Contact"}
                              </Block>
                            </Link>
                          </ListItem>
                          <ListItem className={"margin-bottom_none-3"}>
                            <Link
                              block={"inline"}
                              button={false}
                              className={"nav_dropdown-link-2"}
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"button_label-2"} tag={"div"}>
                                {"FAQ"}
                              </Block>
                            </Link>
                          </ListItem>
                        </List>
                      </Block>
                    </DropdownList>
                  </DropdownWrapper>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2 auth-invisible"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"masthead-meta-2 nav_link-2"}
                    id={"login-btn"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block className={"nav_text-2"} tag={"div"}>
                      {"sign-in"}
                    </Block>
                  </Link>
                </ListItem>
                <ListItem
                  className={"nav_menu-list-item-2 auth-visible"}
                  id={"l"}
                >
                  <Link
                    block={"inline"}
                    button={false}
                    className={"masthead-meta-2 nav_link-2"}
                    id={"logout-btn"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block className={"nav_text-2"} tag={"div"}>
                      {"sign-out"}
                    </Block>
                  </Link>
                </ListItem>
              </List>
            </NavbarMenu>
          </Block>
          <Block className={"nav_center"} tag={"div"}>
            <Link
              block={"inline"}
              button={false}
              className={"nav_logo-2"}
              id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79110-9cc7910d"}
              options={{
                href: "#",
              }}
            >
              <Block className={"footer_logo"} tag={"div"}>
                <HtmlEmbed
                  content={
                    '<?xml version="1.0" encoding="UTF-8"?><svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1136.5 451.75"><defs><style>.b="currentColor" </style></defs><path class="b" d="M1077.46,127.72V51.58h12.45V127.72h-12.45Zm-30.89-21.14h-29.11l-7.45,21.14h-13.12l28.49-76.46h13.54l28.49,76.46h-13.23l-7.6-21.14Zm-10.42-31.46c-.52-1.39-1.24-3.58-2.16-6.56-.92-2.99-1.55-5.17-1.9-6.56-.94,4.27-2.31,8.94-4.11,14.01l-6.88,19.84h22.19l-7.14-20.73Zm-221.66,179c-1.03,7.7-1.54,14.89-1.54,23.1,0,67.25,42.09,113.45,105.75,113.45,37.99,0,65.19-16.94,87.78-42.61l4.62,4.11c-25.15,34.39-63.65,69.81-116.53,69.81s-116.53-39.53-116.53-121.15,60.57-133.47,129.36-133.47c62.11,0,98.05,40.04,99.59,86.75h-192.5Zm77-78.03c-42.09-.51-67.76,30.29-75.46,71.87h151.43c-4.62-32.85-31.31-71.87-75.97-71.87Zm-163.75,44.15c-10.27,26.18-72.89,196.61-72.89,196.61h-17.97l-69.81-187.88c-7.7-18.48-18.48-51.85-37.99-51.85v-6.67h83.67v6.67c-17.45,0-17.45,18.48-8.73,44.66,17.45,49.79,57.49,156.05,57.49,156.05,0,0,47.74-132.95,58.52-159.13,12.83-29.77,5.13-41.58-9.24-41.58l-.51-6.67h58.01v6.67c-16.94,0-30.8,17.97-40.55,43.12Zm-292.6,190.45c15.4-4.62,19.51-15.91,19.51-56.47v-109.34c0-34.39-6.16-41.07-19.51-43.63v-7.19l51.85-23.61h6.16v183.77c0,40.55,5.13,51.85,20.02,56.47v6.16h-78.03v-6.16Zm33.37-273.1c-14.37,0-25.67-11.81-25.67-25.67,0-14.89,11.29-26.18,25.67-26.18s25.15,11.29,25.15,26.18c0,13.86-10.78,25.67-25.15,25.67Zm-146.3,273.1c15.4-4.62,19.51-15.91,19.51-56.47V108.84c0-39.53,4.11-61.09-19.51-62.11v-5.65l51.85-21.56h6.16V354.22c0,40.55,5.13,51.85,20.02,56.47v6.16h-78.03v-6.16Zm-164.27,11.29c-62.11,0-128.85-39.01-128.85-124.74,0-77,61.6-129.87,128.85-129.87,61.09,0,128.85,37.47,128.85,124.74s-70.33,129.87-128.85,129.87Zm-17.97-245.37c-50.31,2.05-72.89,43.12-72.89,92.4,0,62.63,40.55,142.19,105.75,142.19,52.87,0,76.49-42.09,76.49-89.83,0-63.65-44.66-148.35-109.34-144.76Z"/></svg>'
                  }
                />
              </Block>
            </Link>
          </Block>
          <Block
            className={"nav_right-2"}
            id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791ad-9cc7910d"}
            tag={"div"}
          >
            <Block className={"button-group-3 margin-top_none-3"} tag={"div"}>
              <Link
                block={"inline"}
                button={false}
                className={"button-3 margin-right_small"}
                options={{
                  href: "#",
                }}
              >
                <Block className={"button_label-2"} tag={"div"}>
                  {"Book"}
                </Block>
              </Link>
            </Block>
          </Block>
          <NavbarButton className={"nav_mobile-menu-button-2"} tag={"div"}>
            <Block className={"olive-card_icon-2"} tag={"div"}>
              <DOM
                height={"24"}
                tag={"svg"}
                viewBox={"0 0 24 24"}
                width={"24"}
                xmlns={"http://www.w3.org/2000/svg"}
              >
                <DOM
                  className={"nc-icon-wrapper"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeLinecap={"square"}
                  strokeLinejoin={"miter"}
                  strokeMiterlimit={"10"}
                  strokeWidth={"1.5"}
                  tag={"g"}
                >
                  <DOM
                    stroke={"currentColor"}
                    tag={"line"}
                    x1={"1"}
                    x2={"23"}
                    y1={"12"}
                    y2={"12"}
                  />
                  <DOM tag={"line"} x1={"1"} x2={"23"} y1={"5"} y2={"5"} />
                  <DOM tag={"line"} x1={"1"} x2={"23"} y1={"19"} y2={"19"} />
                </DOM>
              </DOM>
            </Block>
          </NavbarButton>
        </NavbarWrapper>
        <NavbarWrapper
          className={
            "nav_container-2 hide-desktop margin-top_large-2 margin-bottom_large-2"
          }
          config={{
            easing: "ease",
            easing2: "ease",
            duration: 400,
            docHeight: false,
            noScroll: true,
            animation: "default",
            collapse: "medium",
          }}
          data-animation={"default"}
          data-collapse={"medium"}
          data-duration={"400"}
          data-easing={"ease"}
          data-easing2={"ease"}
          data-no-scroll={"1"}
          // @ts-ignore - User-defined custom attribute(s)
          role={"banner"}
          tag={"div"}
        >
          <Block
            className={"nav_left-2"}
            id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791ba-9cc7910d"}
            tag={"div"}
          >
            <Link
              block={"inline"}
              button={false}
              className={"nav_logo-2"}
              id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791bb-9cc7910d"}
              options={{
                href: "#",
              }}
            >
              <Block className={"nav_logo-icon-2"} tag={"div"}>
                <HtmlEmbed
                  className={"code-embed-4"}
                  content={
                    '<?xml version="1.0" encoding="UTF-8"?><svg preserveAspectRatio="xMidYMid" version="1.1" viewBox="0 -.05678 791.25 296.094" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M261.95 134.07c0 37.1-.02 74.21.02 111.31 .01 9.49.11 19 2.12 28.35 1.3 6.05 4.26 10.99 10.4 13.17 2.13.76 2.11 2.11 2.02 3.77 -.12 2.36-1.93 1.51-3.09 1.51 -17.1.05-34.21.04-51.31 0 -1.09 0-2.79.63-2.85-1.37 -.04-1.24-.7-2.85 1.15-3.55 9.22-3.45 10.95-11.51 12.21-19.86 1.12-7.44 1.11-14.94 1.12-22.43 .03-62.71.04-125.43-.01-188.14 0-7.35-.07-14.73-1.83-21.97 -1.42-5.84-4.46-10.23-10.08-12.65 -1.53-.66-2.76-1.31-2.68-3.46 .08-2.09 1.49-2.33 2.82-2.92 11.05-4.91 22.09-9.85 33.16-14.71 5.29-2.32 6.85-1.19 6.85 4.77 0 42.73 0 85.45 0 128.18Z"/><path d="M474.6 265.7c4.91-12.77 9.5-24.63 14.04-36.49 9.4-24.58 18.81-49.17 28.16-73.77 2.8-7.35 5.46-14.75 6.11-22.7 .75-9.15-1.09-12.58-9.34-16.43 -2.02-.94-1.3-2.44-1.35-3.8 -.07-1.89 1.48-1.3 2.45-1.3 10.86-.04 21.72-.04 32.59 0 .85 0 2.3-.56 2.26 1.08 -.04 1.46.92 3.35-1.35 4.16 -7.77 2.77-12 9.06-15.58 15.91 -6.95 13.31-11.57 27.6-17 41.54 -15.02 38.59-29.88 77.25-44.74 115.9 -.69 1.79-1.54 2.58-3.51 2.46 -2.74-.17-5.53-.33-8.23.03 -3.68.48-5.07-1.2-6.42-4.42 -19.77-47.44-39.69-94.82-59.62-142.19 -2.96-7.02-6.34-13.85-10.76-20.1 -2.55-3.61-5.4-6.94-9.48-8.83 -2.27-1.05-1.75-2.86-1.57-4.45 .22-1.92 1.97-1.07 3.03-1.07 15.36-.06 30.71-.06 46.07 0 1.05 0 2.79-.82 2.93 1.22 .12 1.63.52 3.25-1.85 4.26 -4.34 1.84-5.47 4.27-4.71 8.98 1.04 6.46 3.67 12.43 6.19 18.4 16.71 39.53 33.48 79.03 50.24 118.54 .33.77.71 1.51 1.45 3.08Z"/><path d="M345.77 186.4c0 22.36-.04 44.72.03 67.08 .02 6.62.6 13.21 2.03 19.71 1.4 6.35 4.33 11.47 10.69 13.84 2.02.76 1.68 2.15 1.69 3.6 0 2.04-1.54 1.57-2.69 1.57 -17.35.02-34.7.02-52.06 0 -1.04 0-2.5.41-2.4-1.41 .07-1.24-.75-2.85 1.14-3.53 9.46-3.43 11.17-11.6 12.29-20.13 .93-7.08.97-14.2.96-21.32 -.04-29.98-.13-59.96-.22-89.94 -.01-4.01-.6-7.96-1.38-11.89 -1.16-5.88-4.17-10.33-9.81-12.81 -1.52-.67-3.13-1.12-3.12-3.56 .01-2.54 1.79-2.69 3.3-3.34 11.31-4.93 22.63-9.85 33.96-14.75 3.71-1.6 5.53-.38 5.54 3.78 .02 20.36.01 40.73.01 61.09 0 4 0 8 0 11.99h.04Z"/><path d="M309.5 65.94c-.1-11.07 8.76-19.95 19.94-19.96 11.39-.02 19.79 8.58 19.88 20.34 .08 10.83-8.71 19.66-19.71 19.79 -11.29.13-20-8.6-20.1-20.17Z"/><path d="M782.32 47.46c0-8.61.13-17.23-.07-25.84 -.07-2.83.71-3.88 3.51-3.44 1.1.17 2.25.1 3.36.01 1.66-.13 2.13.63 2.13 2.2 -.04 17.97-.04 35.95 0 53.92 0 1.83-.66 2.26-2.4 2.33 -6.53.27-6.53.34-6.53-6.35 0-7.61 0-15.23 0-22.84Z"/><path d="M189.12 188.72c-2.94-26.13-13.92-47.74-35.99-62.86 -16.29-11.16-34.48-16.75-54.17-17.06 -37.75-.61-66.8 15.2-86.34 47.5C.34 176.6-2.12 198.97 1.57 222.13c3.33 20.9 12.65 38.58 29.22 51.97 31.63 25.55 76.71 29.15 111.99 8.55 31.33-18.29 46.39-46.29 47.19-81.46 -.32-4.74-.44-8.62-.87-12.46Zm-34.75 70.19c-12.64 26.35-40.1 33.62-63.44 27.33 -19.72-5.31-33.3-18.64-43.54-35.56 -15.11-25-21.81-52.11-18.5-81.33 1.31-11.53 4.9-22.41 11.52-32.1 15.04-22.02 42.71-25.89 62.72-18.32 16.45 6.22 28.12 18.26 37.42 32.68 13.92 21.58 21.1 45.32 21.65 71.04 -.14 12.63-2.31 24.79-7.83 36.28Z"/><path d="M731.14 243.45c-1.92-2.44-2.93-.84-4.25.59 -17.82 19.43-39.5 30.18-66.27 29.03 -21.38-.92-40.06-8.28-54.2-24.82 -17.85-20.88-21.5-45.73-19.12-72.12 .27-2.98 1.39-3.55 4.13-3.54 22.35.11 44.7.06 67.05.06 22.47 0 44.95-.02 67.42.04 2.28 0 3.68-.02 3.39-3.09 -1.57-16.59-7.91-30.87-20.22-42.22 -14.21-13.1-31.45-18.46-50.41-18.65 -34.33-.35-61.82 13.34-81.28 41.71 -15.45 22.52-19.39 47.8-15.06 74.48 8.35 51.44 57.41 77.89 100.45 69.39 29.89-5.9 50.75-24.83 68.58-48.04 .88-1.14.61-1.77-.22-2.83Zm-142-77.77c3.68-16.24 10.26-30.92 24.2-40.91 20.69-14.82 48.54-12.65 67.04 4.85 10.18 9.63 16.32 21.53 19.38 35.17 .63 2.79.02 3.39-2.7 3.38 -17.46-.09-34.93-.05-52.39-.05s-34.93 0-52.39-.01c-1.61 0-3.84.64-3.14-2.43Z"/><path d="M772 71.07c-5.69-15.85-11.6-31.62-17.02-47.56 -1.38-4.06-3.02-6.24-7.45-5.31 -.36.08-.76.07-1.12 0 -2.85-.54-4.15.77-5.07 3.43 -3.79 10.96-7.8 21.85-11.72 32.77 -2.6 7.25-5.19 14.51-7.94 22.19 2.27 0 4.13-.19 5.94.05 2.76.37 3.99-.76 4.69-3.37 .9-3.37 2.31-6.59 3.33-9.93 .53-1.73 1.44-2.35 3.23-2.29 3.99.12 7.99.04 11.98.04q8.51 0 11.15 8.01 2.64 8.01 11.41 7.31c.24-1.96-.8-3.61-1.42-5.33Zm-32.88-17.69c2.81-8.13 5.53-15.98 8.25-23.83 .27-.07.53-.13.8-.2 2.76 7.93 5.53 15.85 8.37 24.03h-17.42Z"/></g></svg>'
                  }
                />
              </Block>
            </Link>
          </Block>
          <Block
            className={"nav_right-2 margin-top_small-2 margin-bottom_small-2"}
            id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791be-9cc7910d"}
            tag={"div"}
          >
            <NavbarMenu
              className={"nav_menu-2"}
              id={"w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791bf-9cc7910d"}
              role={"navigation"}
              tag={"nav"}
            >
              <List
                className={"nav_menu-list-2"}
                // @ts-ignore - User-defined custom attribute(s)
                role={"list"}
                tag={"ul"}
                unstyled={true}
              >
                <ListItem className={"nav_menu-list-item-2"}>
                  <DropdownWrapper
                    className={"nav_dropdown-menu-2"}
                    delay={0}
                    hover={false}
                    tag={"div"}
                  >
                    <DropdownToggle className={"nav_link-2"} tag={"div"}>
                      <Block tag={"div"}>{"curated Journeys"}</Block>
                      <Icon
                        className={"nav-caret-2"}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownList
                      className={"mega-nav_dropdown-list-2"}
                      tag={"nav"}
                    >
                      <Block
                        className={"mega-nav_dropdown-list-wrapper-2"}
                        tag={"div"}
                      >
                        <List
                          className={
                            "grid_3-col-2 tablet-1-col gap-medium-2 margin-bottom_none-3"
                          }
                          // @ts-ignore - User-defined custom attribute(s)
                          role={"list"}
                          tag={"ul"}
                          unstyled={true}
                        >
                          <ListItem
                            className={
                              "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791ca-9cc7910d"
                            }
                            id={
                              "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e6d-ad6d2e56"
                            }
                          >
                            <Grid
                              className={
                                "grid_3-col-2 tablet-1-col gap-small-2"
                              }
                            >
                              <Block tag={"div"}>
                                <Block className={"eyebrow-3"} tag={"div"}>
                                  {"Get started"}
                                </Block>
                                <List
                                  className={"mega-nav_list-3"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791d0-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791d5-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e78-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Plan your visit"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Personalized tips for your stay."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791db-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791e0-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e83-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Find activities"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"See what"}
                                          {"’"}
                                          {"s nearby."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791e8-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791ed-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e8e-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>
                                            {"Eat "}
                                            {"&"}
                                            {" drink"}
                                          </Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Local dining picks."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Block>
                              <Block
                                id={
                                  "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791f5-9cc7910d"
                                }
                                tag={"div"}
                              >
                                <Block className={"eyebrow-3"} tag={"div"}>
                                  {"Your info"}
                                </Block>
                                <List
                                  className={"mega-nav_list-3"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791f9-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc791fe-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e9d-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Add confirmation"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Start with your booking number."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79204-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79209-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ea8-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Contact details"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Add your email and phone."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7920f-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79214-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2eb3-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Preferences"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Share what you enjoy."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Block>
                              <Block
                                id={
                                  "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7921a-9cc7910d"
                                }
                                tag={"div"}
                              >
                                <Block className={"eyebrow-3"} tag={"div"}>
                                  {"Explore more"}
                                </Block>
                                <List
                                  className={"mega-nav_list-3"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7921e-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79223-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ec2-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Events"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"What"}
                                          {"’"}
                                          {"s on during your stay."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7922b-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79230-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ecd-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Getting around"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Best ways to travel."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-3"}
                                    id={
                                      "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79236-9cc7910d"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"mega-nav_link-item-2"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"currentColor"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 32 32"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
                                            }
                                            strokeLinejoin={"round"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                      <Block
                                        className={
                                          "w-node-_5b64cb0d-e086-1ba9-fd34-15019cc7923b-9cc7910d"
                                        }
                                        id={
                                          "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ed8-ad6d2e56"
                                        }
                                        tag={"div"}
                                      >
                                        <Block tag={"div"}>
                                          <Strong>{"Wellness"}</Strong>
                                        </Block>
                                        <Block
                                          className={
                                            "paragraph_small-3 text-color_secondary-2"
                                          }
                                          tag={"div"}
                                        >
                                          {"Spa and fitness options."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Block>
                            </Grid>
                          </ListItem>
                          <ListItem
                            className={
                              "flex_horizontal-3 w-node-_5b64cb0d-e086-1ba9-fd34-15019cc79241-9cc7910d"
                            }
                            id={
                              "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ede-ad6d2e56"
                            }
                          >
                            <Link
                              block={"inline"}
                              button={false}
                              className={
                                "card-link-2 is-inverse-2 flex-child_expand-2"
                              }
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"card_body-2"} tag={"div"}>
                                <Block className={"heading_h3-2"} tag={"div"}>
                                  {"Start your journey now"}
                                </Block>
                                <Paragraph
                                  className={
                                    "paragraph_small-3 text-color_inverse-secondary-2"
                                  }
                                >
                                  {"Enter your info for custom tips."}
                                </Paragraph>
                                <Block
                                  className={"margin_top-auto-2"}
                                  tag={"div"}
                                >
                                  <Block
                                    className={"button-group-3"}
                                    tag={"div"}
                                  >
                                    <Block
                                      className={"text-button-2 is-secondary-2"}
                                      tag={"div"}
                                    >
                                      <Block tag={"div"}>{"Start"}</Block>
                                      <Block
                                        className={"button_icon-2"}
                                        tag={"div"}
                                      >
                                        <DOM
                                          fill={"none"}
                                          height={"100%"}
                                          tag={"svg"}
                                          viewBox={"0 0 16 16"}
                                          width={"100%"}
                                          xmlns={"http://www.w3.org/2000/svg"}
                                        >
                                          <DOM
                                            d={
                                              "M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14"
                                            }
                                            stroke={"currentColor"}
                                            strokeLinejoin={"round"}
                                            strokeWidth={"2"}
                                            tag={"path"}
                                          />
                                        </DOM>
                                      </Block>
                                    </Block>
                                  </Block>
                                </Block>
                              </Block>
                            </Link>
                          </ListItem>
                        </List>
                      </Block>
                    </DropdownList>
                  </DropdownWrapper>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"nav_link-2"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block tag={"div"}>{"About"}</Block>
                  </Link>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"nav_link-2"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block tag={"div"}>{"Blog"}</Block>
                  </Link>
                </ListItem>
                <ListItem className={"nav_menu-list-item-2"}>
                  <DropdownWrapper
                    className={"nav_dropdown-menu-2"}
                    delay={0}
                    hover={false}
                    tag={"div"}
                  >
                    <DropdownToggle className={"nav_link-2"} tag={"div"}>
                      <Block tag={"div"}>{"Support"}</Block>
                      <Icon
                        className={"nav-caret-2"}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownList className={"nav_dropdown-list-2"} tag={"div"}>
                      <Block
                        className={"nav-menu_dropdown-list-wrapper-2"}
                        tag={"div"}
                      >
                        <List
                          className={"flex_vertical-3 margin-bottom_none-3"}
                          // @ts-ignore - User-defined custom attribute(s)
                          role={"list"}
                          tag={"ul"}
                          unstyled={true}
                        >
                          <ListItem className={"margin-bottom_none-3"}>
                            <Link
                              block={"inline"}
                              button={false}
                              className={"nav_dropdown-link-2"}
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"button_label-2"} tag={"div"}>
                                {"Help"}
                              </Block>
                            </Link>
                          </ListItem>
                          <ListItem className={"margin-bottom_none-3"}>
                            <Link
                              block={"inline"}
                              button={false}
                              className={"nav_dropdown-link-2"}
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"button_label-2"} tag={"div"}>
                                {"Contact"}
                              </Block>
                            </Link>
                          </ListItem>
                        </List>
                      </Block>
                    </DropdownList>
                  </DropdownWrapper>
                </ListItem>
              </List>
            </NavbarMenu>
            <Block className={"button-group-3 margin-top_none-3"} tag={"div"}>
              <Link
                block={"inline"}
                button={false}
                className={"button-3"}
                options={{
                  href: "#",
                }}
              >
                <Block className={"button_label-2"} tag={"div"}>
                  {"Get started"}
                </Block>
              </Link>
            </Block>
          </Block>
          <NavbarButton className={"nav_mobile-menu-button-2"} tag={"div"}>
            <Block className={"olive-card_icon-2"} tag={"div"}>
              <DOM
                height={"24"}
                tag={"svg"}
                viewBox={"0 0 24 24"}
                width={"24"}
                xmlns={"http://www.w3.org/2000/svg"}
              >
                <DOM
                  className={"nc-icon-wrapper"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeLinecap={"square"}
                  strokeLinejoin={"miter"}
                  strokeMiterlimit={"10"}
                  strokeWidth={"1.5"}
                  tag={"g"}
                >
                  <DOM
                    stroke={"currentColor"}
                    tag={"line"}
                    x1={"1"}
                    x2={"23"}
                    y1={"12"}
                    y2={"12"}
                  />
                  <DOM tag={"line"} x1={"1"} x2={"23"} y1={"5"} y2={"5"} />
                  <DOM tag={"line"} x1={"1"} x2={"23"} y1={"19"} y2={"19"} />
                </DOM>
              </DOM>
            </Block>
          </NavbarButton>
        </NavbarWrapper>
      </Block>
    </div>
  );
}
