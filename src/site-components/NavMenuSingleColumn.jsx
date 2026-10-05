"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Link from "./webflow_modules/Basic/components/Link";

export function NavMenuSingleColumn({
  descriptionText = "Learn how we use and protect or review the governing terms for accessing and using our services.",
  descriptionVisibility = true,

  link1Link = {
    href: "#",
  },

  link1Link2 = {
    href: "#",
  },

  link1Link3 = {
    href: "#",
  },

  link1SubLink1Text = "GDPR",
  link1SubLink2Text = "CCPA",
  link1Text = "Privacy Policy",

  link2Link = {
    href: "#",
  },

  link2Text = "Terms of Service",

  link3Link = {
    href: "#",
  },

  link3Text = "Disclaimer",

  link4Link = {
    href: "#",
  },

  link4Text = "End User License Agreement",
  menuName = "Policies",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        id={"w-node-e701b9a6-8411-71d2-b9ff-fde237d13a49-37d13a49"}
        tag={"div"}
      >
        <Block
          className={"nav-menu_column"}
          id={"w-node-e701b9a6-8411-71d2-b9ff-fde237d13a4a-37d13a49"}
          tag={"div"}
        >
          <Block className={"nav-menu_card-top"} tag={"div"}>
            <Block className={"nav-menu-wrapper"} tag={"div"}>
              <Block className={"nav-menu-it"} tag={"div"}>
                {menuName}
              </Block>
              {descriptionVisibility ? (
                <Block className={"nav-menu_paragraph"} tag={"div"}>
                  {descriptionText}
                </Block>
              ) : null}
              <Block className={"line-divider"} tag={"div"} />
            </Block>
            <Block className={"nav-menu_links-group"} tag={"div"}>
              <Block className={"nav-menu_links-container"} tag={"div"}>
                <Block className={"mav-menu_item-wrapper"} tag={"div"}>
                  <Link block={"inline"} button={false} options={link1Link}>
                    <Block className={"nav-menu_link"} tag={"div"}>
                      {link1Text}
                    </Block>
                  </Link>
                  <Block className={"nav-submenu_wrapper"} tag={"div"}>
                    <Link
                      block={"inline"}
                      button={false}
                      className={"nav-menu_link-block"}
                      options={link1Link2}
                    >
                      <Block className={"nav-submenu-link"} tag={"div"}>
                        {link1SubLink1Text}
                      </Block>
                    </Link>
                    <Link
                      block={"inline"}
                      button={false}
                      className={"nav-menu_link-block"}
                      options={link1Link3}
                    >
                      <Block className={"nav-submenu-link"} tag={"div"}>
                        {link1SubLink2Text}
                      </Block>
                    </Link>
                  </Block>
                </Block>
                <Link
                  block={"inline"}
                  button={false}
                  className={"nav-menu_link-block"}
                  options={link2Link}
                >
                  <Block className={"nav-menu_link"} tag={"div"}>
                    {link2Text}
                  </Block>
                </Link>
                <Link
                  block={"inline"}
                  button={false}
                  className={"nav-menu_link-block"}
                  options={link3Link}
                >
                  <Block className={"nav-menu_link"} tag={"div"}>
                    {link3Text}
                  </Block>
                </Link>
                <Link
                  block={"inline"}
                  button={false}
                  className={"nav-menu_link-block"}
                  options={link4Link}
                >
                  <Block className={"nav-menu_link"} tag={"div"}>
                    {link4Text}
                  </Block>
                </Link>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
