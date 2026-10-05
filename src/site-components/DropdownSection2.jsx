"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import DropdownLink from "./webflow_modules/Dropdown/components/DropdownLink";
import DropdownList from "./webflow_modules/Dropdown/components/DropdownList";
import DropdownToggle from "./webflow_modules/Dropdown/components/DropdownToggle";
import DropdownWrapper from "./webflow_modules/Dropdown/components/DropdownWrapper";
import Icon from "./webflow_modules/Icon/components/Icon";
import Link from "./webflow_modules/Basic/components/Link";
import { DropDown } from "./DropDown";

export function DropdownSection2({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"container-86"} tag={"div"}>
        <Block className={"sg_section-heading-wrapper-10"} tag={"div"}>
          <Block className={"sg_heading-row-10"} tag={"div"}>
            <DropDown />
            <Link
              block={"inline"}
              button={false}
              className={"text-button-16 is-small"}
              options={{
                href: "#",
              }}
            >
              <Block className={"button_icon-9"} tag={"div"} />
            </Link>
          </Block>
        </Block>
        <Block
          className={"flex_horizontal-10 flex_vertical-11 gap-large-8"}
          tag={"div"}
        >
          <Block className={"sg_card-wrapper-9"} tag={"div"}>
            <Block className={"sg_table-row-5 sg_table-head-5"} tag={"div"}>
              <Block className={"sg_table-cell-title-8"} tag={"div"}>
                <Block className={"sg_table-header-heading-7"} tag={"div"}>
                  {"Title"}
                </Block>
              </Block>
              <Block className={"sg_table-cell-9"} tag={"div"}>
                <Block className={"sg_table-header-heading-7"} tag={"div"}>
                  {"Preview"}
                </Block>
              </Block>
            </Block>
            <Block className={"sg_table-row-5 sg_border-bottom"} tag={"div"}>
              <Block className={"sg_table-cell-title-8"} tag={"div"}>
                <Block className={"sg_text-block_fix-5"} tag={"div"}>
                  {"Dropdown"}
                </Block>
              </Block>
              <Block className={"sg_table-cell-9"} tag={"div"}>
                <DropdownWrapper
                  className={"dropdown-4"}
                  delay={250}
                  hover={false}
                  tag={"div"}
                >
                  <DropdownToggle className={"dropdown_toggle-4"} tag={"div"}>
                    <Icon
                      className={"accordion_icon-5"}
                      widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                      }}
                    />
                    <Block className={"text-block-43"} tag={"div"}>
                      {"Dropdown"}
                    </Block>
                  </DropdownToggle>
                  <DropdownList className={"dropdown_list-4"} tag={"nav"}>
                    <DropdownLink
                      options={{
                        href: "#",
                      }}
                    >
                      {"Link 1"}
                    </DropdownLink>
                    <DropdownLink
                      options={{
                        href: "#",
                      }}
                    >
                      {"Link 2"}
                    </DropdownLink>
                    <DropdownLink
                      options={{
                        href: "#",
                      }}
                    >
                      {"Link 3"}
                    </DropdownLink>
                  </DropdownList>
                </DropdownWrapper>
              </Block>
            </Block>
            <Block className={"sg_table-row-5"} tag={"div"}>
              <Block className={"sg_table-cell-title-8"} tag={"div"}>
                <Block className={"sg_text-block_fix-5"} tag={"div"}>
                  {"Dropdown opened"}
                </Block>
              </Block>
              <Block className={"sg_table-cell-9 sg_preview-lg"} tag={"div"}>
                <DropdownWrapper
                  className={"dropdown-4"}
                  delay={250}
                  hover={false}
                  id={"w-node-_0569c2f8-4b91-bddc-e97b-8a8500d8df64-00d8df3f"}
                  tag={"div"}
                >
                  <DropdownToggle
                    className={"dropdown_toggle-4 w--open"}
                    tag={"div"}
                  >
                    <Icon
                      className={"accordion_icon-5"}
                      widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                      }}
                    />
                    <Block className={"text-block-44"} tag={"div"}>
                      {"Dropdown"}
                    </Block>
                  </DropdownToggle>
                  <DropdownList
                    className={"dropdown_list-4 w--open"}
                    tag={"nav"}
                  >
                    <DropdownLink
                      className={"dropdown-link-7"}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Long dropdown link, longer than toggle"}
                    </DropdownLink>
                    <DropdownLink
                      className={"dropdown-link-8"}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Link 2"}
                    </DropdownLink>
                    <DropdownLink
                      className={"dropdown-link-9"}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Link 3"}
                    </DropdownLink>
                  </DropdownList>
                </DropdownWrapper>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
