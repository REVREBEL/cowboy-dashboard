"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Icon from "./webflow_modules/Icon/components/Icon";
import NavbarButton from "./webflow_modules/Navbar/components/NavbarButton";
import NavbarLink from "./webflow_modules/Navbar/components/NavbarLink";
import NavbarMenu from "./webflow_modules/Navbar/components/NavbarMenu";
import NavbarWrapper from "./webflow_modules/Navbar/components/NavbarWrapper";

export function MainNavigation({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <NavbarWrapper
        className={"main-navigation-wrapper fadein"}
        config={{
          animation: "default",
          collapse: "tiny",
          docHeight: false,
          duration: 400,
          easing: "ease",
          easing2: "ease",
          noScroll: false,
        }}
        tag={"div"}
      >
        <NavbarMenu
          className={"main-navigation-menu"}
          role={"navigation"}
          tag={"nav"}
        >
          <NavbarLink
            className={"main-nav-link"}
            options={{
              href: "#",
            }}
          >
            {"Home"}
          </NavbarLink>
          <NavbarLink
            className={"main-nav-link"}
            options={{
              href: "#",
            }}
          >
            {"explore"}
          </NavbarLink>
          <NavbarLink
            className={"main-nav-link"}
            options={{
              href: "#",
            }}
          >
            {"Stay"}
          </NavbarLink>
          <NavbarLink
            className={"main-nav-link"}
            options={{
              href: "#",
            }}
          >
            {"Sauna"}
          </NavbarLink>
        </NavbarMenu>
        <NavbarButton tag={"div"}>
          <Icon
            widget={{
              type: "icon",
              icon: "nav-menu",
            }}
          />
        </NavbarButton>
      </NavbarWrapper>
    </div>
  );
}
