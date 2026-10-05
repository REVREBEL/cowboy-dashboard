"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Icon from "./webflow_modules/Icon/components/Icon";
import NavbarButton from "./webflow_modules/Navbar/components/NavbarButton";
import NavbarLink from "./webflow_modules/Navbar/components/NavbarLink";
import NavbarMenu from "./webflow_modules/Navbar/components/NavbarMenu";
import NavbarWrapper from "./webflow_modules/Navbar/components/NavbarWrapper";

export function MainNavigation2({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <NavbarWrapper
        className={"main-navigation-wrapper-2 fadein-2"}
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
          className={"main-navigation-menu-2"}
          role={"navigation"}
          tag={"nav"}
        >
          <NavbarLink
            className={"main-nav-link-2"}
            options={{
              href: "#",
            }}
          >
            {"Home"}
          </NavbarLink>
          <NavbarLink
            className={"main-nav-link-2"}
            options={{
              href: "#",
            }}
          >
            {"explore"}
          </NavbarLink>
          <NavbarLink
            className={"main-nav-link-2"}
            options={{
              href: "#",
            }}
          >
            {"Stay"}
          </NavbarLink>
          <NavbarLink
            className={"main-nav-link-2"}
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
