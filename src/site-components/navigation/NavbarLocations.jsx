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

export function NavbarLocations({
  dropdownMenu1DropdownMenu = "The Resort",
  dropdownMenu1SlotDropdownMenu,
  dropdownMenu1Visibility = true,
  dropdownMenu2DropdownMenu = "Stay",
  dropdownMenu2SlotDropdownMenu,
  dropdownMenu2Visibility = true,
  dropdownMenu3DropdownMenu = "Eat + Drink",
  dropdownMenu3SlotDropdownMenu,
  dropdownMenu3Visibility = true,
  dropdownMenu4 = true,
  dropdownMenu4DropdownMenu = "Gather",
  dropdownMenu4SlotDropdownMenu,
  dropdownMenu4Visibility = true,
  menuLink1MenuText = "Offers",
  menuLink1Visibility = true,
  menuLink2MenuText = "About",
  menuLink2Visibility = true,
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"max-width_lg margin-inline_auto"} tag={"div"}>
        <NavbarWrapper
          className={"nav_container hide-mobile"}
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
          <Block className={"nav_center"} tag={"div"}>
            <Link
              block={"inline"}
              button={false}
              className={"nav-link_logo"}
              id={"w-node-af9b74c7-9da0-b0a5-612a-c24df756536a-f7565367"}
              options={{
                href: "#",
              }}
            >
              <Block className={"nav_logo"} tag={"div"}>
                <HtmlEmbed
                  className={"text-lake-forest"}
                  content={
                    '<?xml version="1.0" encoding="UTF-8"?>\n<svg fill="currentColor"  id="Cowboy" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 52.93">\n  <path d="M.43,33.89v-3.97c1.38-.78,2.42-1.77,3.96-3.43-1.12-1.36-2.42-2.66-3.96-3.52v-4.97C4.23,9.39,13.02.48,21.35.35L43.25.02l.02,14.92-4.96-.04c.21-4.17-.89-7.86-3.54-9.93s-6.58-2.64-10.24-1.43c-4.7,1.56-6.84,7.5-6.14,12.4.63,4.42-.48,7.26-4.92,10.01,4.76,2.75,5.69,6.33,4.84,10.97-1.21,6.63,3.97,12.6,10.35,12.34,6.05-.25,10.97-5.82,9.49-12.19l5.11-.12-.03,15.91-20.88-.34c-10.49-1.37-18.09-9.74-21.94-18.64Z"/>\n  <path d="M162.4,5.6c-.1-3.65-7.78-3.46-9.34-.58-4.25,7.85-2.5,16.1-9.12,20.23.25,1.57,1.17,2.48,2.08,3.82l-4.76,17.78c-.66,2.47,4.37,3.31,6.38,5.18-6.04,1.6-11.57.44-17.37.73-1.81-13.69-10.37-24.72-.42-28.02.12,2.25.58,3.36,1.75,4.2L139.25.02l54.98.55c6.46.06,11.17,6.88,11.39,11.98.28,6.45-3.32,11.1-10.36,13.7,4.57,1.35,7.47,3.59,8.95,6.9,1.85,4.16,1.87,8.63-.61,12.81-3.2,5.4-10.47,6.98-16.74,6.89l-30.59-.45c1.47-2.53,5.69-1.88,6.26-3.82l.32-18.34-4.2-4.29,4.19-4.31-.43-16.04ZM191.85,19.56l-.03-12.51c0-2.23-1.76-3.97-3.97-3.96l-11.01.05.17,16.82c.01,1.39,2.51,3.82,3.77,3.81,1.62,0,2.73-2.02,3.64-2.93,1.31,2.2,3.01,3.48,4.68,3,1.38-.39,2.76-2.02,2.75-4.28ZM191.69,45.37l.2-12.52c.04-2.41-.9-3.79-3.04-4.55-1.46-.52-3.07.39-4.44,2.78-.9-.94-2.03-2.92-3.63-2.93-1.26,0-3.77,2.42-3.78,3.8l-.17,17.8,10.92-.14c1.56-.02,3.91-2.27,3.94-4.24Z"/>\n  <path d="M280.24,35.82c-.45,3.3,1.53,7.13,2.08,10.1.77,4.14,4.36,3.72,8.02,6.39l-29.71-.02c4.35-2.58,6.94-2.93,8.1-7.42l2.13-8.27c.76-2.94-4.69-5.65-5.8-7.83.76-3.64-1.07-4.54-3.15-7.24-4.82-6.26-1.13-18.01-11.78-20.95l19.56-.42,5.92,19.75L280.9.13l18.67.06c-1.11,2.05-3.35,1.99-4.89,3.05l-6.21,18.93c-.79,2.4-3.79,3.13-2.27,6.66-1.37,1.88-5.56,3.92-5.98,6.99Z"/>\n  <path d="M117.04,52.81c-6.06-.43-11.55.88-17.64-.81,1.97-1.83,7.13-2.68,6.48-5.32l-4.32-17.62c-.25-1.03,1.88-2.33,2.52-2.66-7.52-5.18-5.81-14.18-10.24-23.08-1.81-.87-4.1-.76-5.82-2.96l19.92-.19,8.12,29.14c1.5-1.7,1.25-3.44,2.4-4.26,2.17,1.52,4.23,3.37,3.57,5.74l-3.92,14.12c-.66,2.39-1.33,4.09-1.06,7.9Z"/>\n  <path d="M59.27,41.86c-.04,5.28,7.66,7.04,5.56,11.05-8.56-1.74-15.43-8.75-17.99-17.53-1.12-3.83-2.18-6.69-6.36-9.43,4.65-2.95,5.51-6.52,6.98-10.89,3.15-9.35,17.87-19.35,17.88-12.65-2.32,1.95-6.04,4.02-6.03,7.63l.05,11.65,4.11,4.28-4.1,4.26-.09,11.65Z"/>\n  <path d="M75.25,48.92c4.57-2.51,4.97-7.33,5.04-12.04s.24-8.1-5.19-10.93c5.03-2.75,5.26-5.64,5.21-9.98s.04-9.1-4.6-11.52c-1.44-.75-2.07-4.61-.75-4.34,10.19,2.08,16.58,11.06,18.5,20.47l4.95,5.38-5,5.32c-1.63,10.01-7.96,18.81-18.47,21.54-1,.26-1.06-3.14.31-3.89Z"/>\n  <path d="M237.38,52.59c-2.98-4.33,4.9-2.43,5.36-17.61.11-3.52-.16-5.29-3.16-7.11-1.23-.75-1.03-2.99.13-3.64,4.87-2.75,4.34-16.06-2-20.28-1.27-.85-1.35-4.1-.31-3.84,10.52,2.66,16.84,11.52,18.46,21.5l4.27,4.55c-3.58,2.18-4.28,4.64-5.27,8.1-2.43,8.46-8.38,16.4-17.47,18.34Z"/>\n  <path d="M224.01,28.15c-5.78,4.03-3.91,15.74.64,19.76l1.87,1.65c.64.57.16,3.54-.6,3.28-10.1-3.48-16.46-11.92-18.25-21.8-.37-2.06-2.96-3.4-4.43-5.07,3.06-2.58,4.56-4.61,5.43-8.15,2.05-8.28,8.32-15.54,17.22-17.72,1.1-.27.99,3.01-.27,3.84-4.56,3-5.12,8.08-5.08,13.05.06,8.98,7.76,8.18,3.48,11.16Z"/>\n  <path d="M137.09.49c-8.14,2.42-2.64,14.64-13.6,22.42-7.76-5.91-6.71-13.11-10.08-21.16-1.33-.39-2.56-.39-3.47-1.43l10.86-.09c1.46,3.28,1.73,6.26,2.64,9.96L126.24.2l10.85.28Z"/>\n  <polygon points="231.71 44.47 226.26 31.05 230.98 25.95 226.45 21.01 231.66 7.17 236.86 21.01 232.33 25.95 237.04 31.03 231.71 44.47"/>\n  <path d="M69.84,44.26l-5.73-12.91,5.11-4.87-5.02-4.88c1.42-4.63,2.83-8.99,5.33-13.83l5.52,13-5.15,5.18,5.18,5.22-5.25,13.1Z"/>\n  <polygon points="22.85 20.98 27.84 25.95 22.85 30.91 17.87 25.95 22.85 20.98"/>\n</svg>'
                  }
                />
              </Block>
            </Link>
          </Block>
          <Block
            className={"nav_left"}
            id={"w-node-af9b74c7-9da0-b0a5-612a-c24df7565369-f7565367"}
            tag={"div"}
          >
            <NavbarMenu
              className={"nav_menu text-lake-forest"}
              id={"w-node-af9b74c7-9da0-b0a5-612a-c24df756536e-f7565367"}
              role={"navigation"}
              tag={"nav"}
            >
              <List
                className={"nav_menu-list"}
                // @ts-ignore - User-defined custom attribute(s)
                role={"list"}
                tag={"ul"}
                unstyled={true}
              >
                {dropdownMenu1Visibility ? (
                  <ListItem className={"nav_menu-list-item"}>
                    <DropdownWrapper
                      className={"nav_dropdown-menu"}
                      delay={0}
                      hover={false}
                      tag={"div"}
                    >
                      <DropdownToggle className={"nav_link"} tag={"div"}>
                        {dropdownMenu1Visibility ? (
                          <Block
                            className={"nav_text is-color-inherit"}
                            tag={"div"}
                          >
                            {dropdownMenu1DropdownMenu}
                          </Block>
                        ) : null}
                        <Icon
                          className={"nav-caret"}
                          widget={{
                            type: "icon",
                            icon: "dropdown-toggle",
                          }}
                        />
                      </DropdownToggle>
                      <DropdownList className={"nav-menu_dropdown"} tag={"nav"}>
                        <Block className={"nav_dropdown-wrapper"} tag={"div"}>
                          {dropdownMenu1SlotDropdownMenu}
                        </Block>
                      </DropdownList>
                    </DropdownWrapper>
                  </ListItem>
                ) : null}
                {dropdownMenu2Visibility ? (
                  <ListItem className={"nav_menu-list-item"}>
                    <DropdownWrapper
                      className={"nav_dropdown-menu"}
                      delay={0}
                      hover={false}
                      tag={"div"}
                    >
                      <DropdownToggle className={"nav_link"} tag={"div"}>
                        {dropdownMenu2Visibility ? (
                          <Block
                            className={"nav_text is-color-inherit"}
                            tag={"div"}
                          >
                            {dropdownMenu2DropdownMenu}
                          </Block>
                        ) : null}
                        <Icon
                          className={"nav-caret"}
                          widget={{
                            type: "icon",
                            icon: "dropdown-toggle",
                          }}
                        />
                      </DropdownToggle>
                      <DropdownList className={"nav-menu_dropdown"} tag={"nav"}>
                        <Block className={"nav_dropdown-wrapper"} tag={"div"}>
                          {dropdownMenu2SlotDropdownMenu}
                        </Block>
                      </DropdownList>
                    </DropdownWrapper>
                  </ListItem>
                ) : null}
                {dropdownMenu3Visibility ? (
                  <ListItem className={"nav_menu-list-item"}>
                    <DropdownWrapper
                      className={"nav_dropdown-menu"}
                      delay={0}
                      hover={false}
                      tag={"div"}
                    >
                      {dropdownMenu4Visibility ? (
                        <DropdownToggle className={"nav_link"} tag={"div"}>
                          <Block
                            className={"nav_text is-color-inherit"}
                            tag={"div"}
                          >
                            {dropdownMenu3DropdownMenu}
                          </Block>
                          <Icon
                            className={"nav-caret"}
                            widget={{
                              type: "icon",
                              icon: "dropdown-toggle",
                            }}
                          />
                        </DropdownToggle>
                      ) : null}
                      <DropdownList className={"nav-menu_dropdown"} tag={"nav"}>
                        <Block className={"nav_dropdown-wrapper"} tag={"div"}>
                          {dropdownMenu3SlotDropdownMenu}
                        </Block>
                      </DropdownList>
                    </DropdownWrapper>
                  </ListItem>
                ) : null}
                {dropdownMenu4 ? (
                  <ListItem className={"nav_menu-list-item"}>
                    <DropdownWrapper
                      className={"nav_dropdown-menu"}
                      delay={0}
                      hover={false}
                      tag={"div"}
                    >
                      {dropdownMenu4Visibility ? (
                        <DropdownToggle className={"nav_link"} tag={"div"}>
                          <Block
                            className={"nav_text is-color-inherit"}
                            tag={"div"}
                          >
                            {dropdownMenu4DropdownMenu}
                          </Block>
                          <Icon
                            className={"nav-caret"}
                            widget={{
                              type: "icon",
                              icon: "dropdown-toggle",
                            }}
                          />
                        </DropdownToggle>
                      ) : null}
                      <DropdownList className={"nav-menu_dropdown"} tag={"nav"}>
                        <Block className={"nav_dropdown-wrapper"} tag={"div"}>
                          {dropdownMenu4SlotDropdownMenu}
                        </Block>
                      </DropdownList>
                    </DropdownWrapper>
                  </ListItem>
                ) : null}
                {menuLink1Visibility ? (
                  <ListItem className={"nav_menu-list-item"}>
                    <Link
                      block={"inline"}
                      button={false}
                      className={"nav_link"}
                      options={{
                        href: "#",
                      }}
                    >
                      <Block
                        className={"nav_text is-color-inherit"}
                        tag={"div"}
                      >
                        {menuLink1MenuText}
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {menuLink2Visibility ? (
                  <ListItem className={"nav_menu-list-item"}>
                    <Link
                      block={"inline"}
                      button={false}
                      className={"nav_link"}
                      options={{
                        href: "#",
                      }}
                    >
                      <Block
                        className={"nav_text is-color-inherit"}
                        tag={"div"}
                      >
                        {menuLink2MenuText}
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
              </List>
            </NavbarMenu>
          </Block>
          <Block
            className={"nav_right"}
            id={"w-node-af9b74c7-9da0-b0a5-612a-c24df7565407-f7565367"}
            tag={"div"}
          >
            <Block className={"nav-link_button"} tag={"div"}>
              <Block className={"nav-button-wrapper"} tag={"div"}>
                <Link
                  button={true}
                  className={"nav-button"}
                  options={{
                    href: "#",
                  }}
                >
                  {"Book Your Stay"}
                </Link>
              </Block>
            </Block>
          </Block>
          <NavbarButton className={"nav_mobile-menu-button"} tag={"div"}>
            <Block className={"olive-card_icon"} tag={"div"}>
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
            "nav_container hide-desktop margin-top_large margin-bottom_large"
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
            className={"nav_left"}
            id={"w-node-af9b74c7-9da0-b0a5-612a-c24df7565414-f7565367"}
            tag={"div"}
          >
            <Link
              block={"inline"}
              button={false}
              className={"nav_logo-3"}
              id={"w-node-af9b74c7-9da0-b0a5-612a-c24df7565415-f7565367"}
              options={{
                href: "#",
              }}
            >
              <Block className={"nav_logo"} tag={"div"}>
                <HtmlEmbed
                  className={"code-embed-5"}
                  content={
                    '<?xml version="1.0" encoding="UTF-8"?><svg preserveAspectRatio="xMidYMid" version="1.1" viewBox="0 -.05678 791.25 296.094" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M261.95 134.07c0 37.1-.02 74.21.02 111.31 .01 9.49.11 19 2.12 28.35 1.3 6.05 4.26 10.99 10.4 13.17 2.13.76 2.11 2.11 2.02 3.77 -.12 2.36-1.93 1.51-3.09 1.51 -17.1.05-34.21.04-51.31 0 -1.09 0-2.79.63-2.85-1.37 -.04-1.24-.7-2.85 1.15-3.55 9.22-3.45 10.95-11.51 12.21-19.86 1.12-7.44 1.11-14.94 1.12-22.43 .03-62.71.04-125.43-.01-188.14 0-7.35-.07-14.73-1.83-21.97 -1.42-5.84-4.46-10.23-10.08-12.65 -1.53-.66-2.76-1.31-2.68-3.46 .08-2.09 1.49-2.33 2.82-2.92 11.05-4.91 22.09-9.85 33.16-14.71 5.29-2.32 6.85-1.19 6.85 4.77 0 42.73 0 85.45 0 128.18Z"/><path d="M474.6 265.7c4.91-12.77 9.5-24.63 14.04-36.49 9.4-24.58 18.81-49.17 28.16-73.77 2.8-7.35 5.46-14.75 6.11-22.7 .75-9.15-1.09-12.58-9.34-16.43 -2.02-.94-1.3-2.44-1.35-3.8 -.07-1.89 1.48-1.3 2.45-1.3 10.86-.04 21.72-.04 32.59 0 .85 0 2.3-.56 2.26 1.08 -.04 1.46.92 3.35-1.35 4.16 -7.77 2.77-12 9.06-15.58 15.91 -6.95 13.31-11.57 27.6-17 41.54 -15.02 38.59-29.88 77.25-44.74 115.9 -.69 1.79-1.54 2.58-3.51 2.46 -2.74-.17-5.53-.33-8.23.03 -3.68.48-5.07-1.2-6.42-4.42 -19.77-47.44-39.69-94.82-59.62-142.19 -2.96-7.02-6.34-13.85-10.76-20.1 -2.55-3.61-5.4-6.94-9.48-8.83 -2.27-1.05-1.75-2.86-1.57-4.45 .22-1.92 1.97-1.07 3.03-1.07 15.36-.06 30.71-.06 46.07 0 1.05 0 2.79-.82 2.93 1.22 .12 1.63.52 3.25-1.85 4.26 -4.34 1.84-5.47 4.27-4.71 8.98 1.04 6.46 3.67 12.43 6.19 18.4 16.71 39.53 33.48 79.03 50.24 118.54 .33.77.71 1.51 1.45 3.08Z"/><path d="M345.77 186.4c0 22.36-.04 44.72.03 67.08 .02 6.62.6 13.21 2.03 19.71 1.4 6.35 4.33 11.47 10.69 13.84 2.02.76 1.68 2.15 1.69 3.6 0 2.04-1.54 1.57-2.69 1.57 -17.35.02-34.7.02-52.06 0 -1.04 0-2.5.41-2.4-1.41 .07-1.24-.75-2.85 1.14-3.53 9.46-3.43 11.17-11.6 12.29-20.13 .93-7.08.97-14.2.96-21.32 -.04-29.98-.13-59.96-.22-89.94 -.01-4.01-.6-7.96-1.38-11.89 -1.16-5.88-4.17-10.33-9.81-12.81 -1.52-.67-3.13-1.12-3.12-3.56 .01-2.54 1.79-2.69 3.3-3.34 11.31-4.93 22.63-9.85 33.96-14.75 3.71-1.6 5.53-.38 5.54 3.78 .02 20.36.01 40.73.01 61.09 0 4 0 8 0 11.99h.04Z"/><path d="M309.5 65.94c-.1-11.07 8.76-19.95 19.94-19.96 11.39-.02 19.79 8.58 19.88 20.34 .08 10.83-8.71 19.66-19.71 19.79 -11.29.13-20-8.6-20.1-20.17Z"/><path d="M782.32 47.46c0-8.61.13-17.23-.07-25.84 -.07-2.83.71-3.88 3.51-3.44 1.1.17 2.25.1 3.36.01 1.66-.13 2.13.63 2.13 2.2 -.04 17.97-.04 35.95 0 53.92 0 1.83-.66 2.26-2.4 2.33 -6.53.27-6.53.34-6.53-6.35 0-7.61 0-15.23 0-22.84Z"/><path d="M189.12 188.72c-2.94-26.13-13.92-47.74-35.99-62.86 -16.29-11.16-34.48-16.75-54.17-17.06 -37.75-.61-66.8 15.2-86.34 47.5C.34 176.6-2.12 198.97 1.57 222.13c3.33 20.9 12.65 38.58 29.22 51.97 31.63 25.55 76.71 29.15 111.99 8.55 31.33-18.29 46.39-46.29 47.19-81.46 -.32-4.74-.44-8.62-.87-12.46Zm-34.75 70.19c-12.64 26.35-40.1 33.62-63.44 27.33 -19.72-5.31-33.3-18.64-43.54-35.56 -15.11-25-21.81-52.11-18.5-81.33 1.31-11.53 4.9-22.41 11.52-32.1 15.04-22.02 42.71-25.89 62.72-18.32 16.45 6.22 28.12 18.26 37.42 32.68 13.92 21.58 21.1 45.32 21.65 71.04 -.14 12.63-2.31 24.79-7.83 36.28Z"/><path d="M731.14 243.45c-1.92-2.44-2.93-.84-4.25.59 -17.82 19.43-39.5 30.18-66.27 29.03 -21.38-.92-40.06-8.28-54.2-24.82 -17.85-20.88-21.5-45.73-19.12-72.12 .27-2.98 1.39-3.55 4.13-3.54 22.35.11 44.7.06 67.05.06 22.47 0 44.95-.02 67.42.04 2.28 0 3.68-.02 3.39-3.09 -1.57-16.59-7.91-30.87-20.22-42.22 -14.21-13.1-31.45-18.46-50.41-18.65 -34.33-.35-61.82 13.34-81.28 41.71 -15.45 22.52-19.39 47.8-15.06 74.48 8.35 51.44 57.41 77.89 100.45 69.39 29.89-5.9 50.75-24.83 68.58-48.04 .88-1.14.61-1.77-.22-2.83Zm-142-77.77c3.68-16.24 10.26-30.92 24.2-40.91 20.69-14.82 48.54-12.65 67.04 4.85 10.18 9.63 16.32 21.53 19.38 35.17 .63 2.79.02 3.39-2.7 3.38 -17.46-.09-34.93-.05-52.39-.05s-34.93 0-52.39-.01c-1.61 0-3.84.64-3.14-2.43Z"/><path d="M772 71.07c-5.69-15.85-11.6-31.62-17.02-47.56 -1.38-4.06-3.02-6.24-7.45-5.31 -.36.08-.76.07-1.12 0 -2.85-.54-4.15.77-5.07 3.43 -3.79 10.96-7.8 21.85-11.72 32.77 -2.6 7.25-5.19 14.51-7.94 22.19 2.27 0 4.13-.19 5.94.05 2.76.37 3.99-.76 4.69-3.37 .9-3.37 2.31-6.59 3.33-9.93 .53-1.73 1.44-2.35 3.23-2.29 3.99.12 7.99.04 11.98.04q8.51 0 11.15 8.01 2.64 8.01 11.41 7.31c.24-1.96-.8-3.61-1.42-5.33Zm-32.88-17.69c2.81-8.13 5.53-15.98 8.25-23.83 .27-.07.53-.13.8-.2 2.76 7.93 5.53 15.85 8.37 24.03h-17.42Z"/></g></svg>'
                  }
                />
              </Block>
            </Link>
          </Block>
          <Block
            className={"nav_right margin-top_small margin-bottom_small"}
            id={"w-node-af9b74c7-9da0-b0a5-612a-c24df7565418-f7565367"}
            tag={"div"}
          >
            <NavbarMenu
              className={"nav_menu"}
              id={"w-node-af9b74c7-9da0-b0a5-612a-c24df7565419-f7565367"}
              role={"navigation"}
              tag={"nav"}
            >
              <List
                className={"nav_menu-list"}
                // @ts-ignore - User-defined custom attribute(s)
                role={"list"}
                tag={"ul"}
                unstyled={true}
              >
                <ListItem className={"nav_menu-list-item"}>
                  <DropdownWrapper
                    className={"nav_dropdown-menu"}
                    delay={0}
                    hover={false}
                    tag={"div"}
                  >
                    <DropdownToggle className={"nav_link"} tag={"div"}>
                      <Block tag={"div"}>{"curated Journeys"}</Block>
                      <Icon
                        className={"nav-caret"}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownList className={"nav-menu_dropdown"} tag={"nav"}>
                      <Block className={"nav_dropdown-wrapper"} tag={"div"}>
                        <List
                          className={
                            "grid_3-col tablet-1-col gap-medium-3 margin-bottom_none-4"
                          }
                          // @ts-ignore - User-defined custom attribute(s)
                          role={"list"}
                          tag={"ul"}
                          unstyled={true}
                        >
                          <ListItem
                            className={
                              "w-node-af9b74c7-9da0-b0a5-612a-c24df7565424-f7565367"
                            }
                            id={
                              "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2e6d-ad6d2e56"
                            }
                          >
                            <Grid
                              className={"grid_3-col tablet-1-col gap-small-3"}
                            >
                              <Block tag={"div"}>
                                <Block className={"eyebrow-4"} tag={"div"}>
                                  {"Get started"}
                                </Block>
                                <List
                                  className={"mega-nav_list-4"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df756542a-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df756542f-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
                                          }
                                          tag={"div"}
                                        >
                                          {"Personalized tips for your stay."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565435-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df756543a-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
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
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565442-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df7565447-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
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
                                  "w-node-af9b74c7-9da0-b0a5-612a-c24df756544f-f7565367"
                                }
                                tag={"div"}
                              >
                                <Block className={"eyebrow-4"} tag={"div"}>
                                  {"Your info"}
                                </Block>
                                <List
                                  className={"mega-nav_list-4"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565453-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df7565458-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
                                          }
                                          tag={"div"}
                                        >
                                          {"Start with your booking number."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df756545e-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df7565463-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
                                          }
                                          tag={"div"}
                                        >
                                          {"Add your email and phone."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565469-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df756546e-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
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
                                  "w-node-af9b74c7-9da0-b0a5-612a-c24df7565474-f7565367"
                                }
                                tag={"div"}
                              >
                                <Block className={"eyebrow-4"} tag={"div"}>
                                  {"Explore more"}
                                </Block>
                                <List
                                  className={"mega-nav_list-4"}
                                  // @ts-ignore - User-defined custom attribute(s)
                                  role={"list"}
                                  tag={"ul"}
                                  unstyled={true}
                                >
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565478-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df756547d-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
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
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565485-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df756548a-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
                                          }
                                          tag={"div"}
                                        >
                                          {"Best ways to travel."}
                                        </Block>
                                      </Block>
                                    </Link>
                                  </ListItem>
                                  <ListItem
                                    className={"margin-bottom_none-4"}
                                    id={
                                      "w-node-af9b74c7-9da0-b0a5-612a-c24df7565490-f7565367"
                                    }
                                  >
                                    <Link
                                      block={"inline"}
                                      button={false}
                                      className={"nav-link-block"}
                                      options={{
                                        href: "#",
                                      }}
                                    >
                                      <Block
                                        className={"icon_medium"}
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
                                          "w-node-af9b74c7-9da0-b0a5-612a-c24df7565495-f7565367"
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
                                            "paragraph_small-4 text-color_secondary-3"
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
                              "flex_horizontal-4 w-node-af9b74c7-9da0-b0a5-612a-c24df756549b-f7565367"
                            }
                            id={
                              "w-node-_016f5a0a-5b63-edde-82c5-e2b2ad6d2ede-ad6d2e56"
                            }
                          >
                            <Link
                              block={"inline"}
                              button={false}
                              className={
                                "card-link is-inverse flex-child_expand"
                              }
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"card_body"} tag={"div"}>
                                <Block className={"heading_h3"} tag={"div"}>
                                  {"Start your journey now"}
                                </Block>
                                <Paragraph
                                  className={
                                    "paragraph_small-4 text-color_inverse-secondary"
                                  }
                                >
                                  {"Enter your info for custom tips."}
                                </Paragraph>
                                <Block
                                  className={"margin_top-auto"}
                                  tag={"div"}
                                >
                                  <Block
                                    className={"button-group-4"}
                                    tag={"div"}
                                  >
                                    <Block
                                      className={"text-button is-secondary"}
                                      tag={"div"}
                                    >
                                      <Block tag={"div"}>{"Start"}</Block>
                                      <Block
                                        className={"button_icon"}
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
                <ListItem className={"nav_menu-list-item"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"nav_link"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block tag={"div"}>{"About"}</Block>
                  </Link>
                </ListItem>
                <ListItem className={"nav_menu-list-item"}>
                  <Link
                    block={"inline"}
                    button={false}
                    className={"nav_link"}
                    options={{
                      href: "#",
                    }}
                  >
                    <Block tag={"div"}>{"Blog"}</Block>
                  </Link>
                </ListItem>
                <ListItem className={"nav_menu-list-item"}>
                  <DropdownWrapper
                    className={"nav_dropdown-menu"}
                    delay={0}
                    hover={false}
                    tag={"div"}
                  >
                    <DropdownToggle className={"nav_link"} tag={"div"}>
                      <Block tag={"div"}>{"Support"}</Block>
                      <Icon
                        className={"nav-caret"}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownList className={"nav_dropdown-list"} tag={"div"}>
                      <Block
                        className={"nav-menu_dropdown-list-wrapper"}
                        tag={"div"}
                      >
                        <List
                          className={"flex_vertical-4 margin-bottom_none-4"}
                          // @ts-ignore - User-defined custom attribute(s)
                          role={"list"}
                          tag={"ul"}
                          unstyled={true}
                        >
                          <ListItem className={"margin-bottom_none-4"}>
                            <Link
                              block={"inline"}
                              button={false}
                              className={"nav_dropdown-link"}
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"button_label"} tag={"div"}>
                                {"Help"}
                              </Block>
                            </Link>
                          </ListItem>
                          <ListItem className={"margin-bottom_none-4"}>
                            <Link
                              block={"inline"}
                              button={false}
                              className={"nav_dropdown-link"}
                              options={{
                                href: "#",
                              }}
                            >
                              <Block className={"button_label"} tag={"div"}>
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
            <Block className={"button-group-4 margin-top_none-4"} tag={"div"}>
              <Link
                block={"inline"}
                button={false}
                className={"button-4"}
                options={{
                  href: "#",
                }}
              >
                <Block className={"button_label"} tag={"div"}>
                  {"Get started"}
                </Block>
              </Link>
            </Block>
          </Block>
          <NavbarButton className={"nav_mobile-menu-button"} tag={"div"}>
            <Block className={"olive-card_icon"} tag={"div"}>
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
