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

export function DropdownSection3({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"container-7"} tag={"div"}>
        <Block className={"sg_section-heading-wrapper-7"} tag={"div"}>
          <Block className={"sg_heading-row-7"} tag={"div"}>
            <DropDown />
            <Link
              block={"inline"}
              button={false}
              className={"text-button-12 is-small"}
              options={{
                href: "#",
              }}
            >
              <Block className={"button_icon-5"} tag={"div"} />
            </Link>
          </Block>
        </Block>
        <Block
          className={"flex_horizontal-6 flex_vertical-7 gap-large-5"}
          tag={"div"}
        >
          <Block className={"sg_card-wrapper-8"} tag={"div"}>
            <Block className={"sg_table-row-4 sg_table-head-4"} tag={"div"}>
              <Block className={"sg_table-cell-title-5"} tag={"div"}>
                <Block className={"sg_table-header-heading-6"} tag={"div"}>
                  {"Title"}
                </Block>
              </Block>
              <Block className={"sg_table-cell-8"} tag={"div"}>
                <Block className={"sg_table-header-heading-6"} tag={"div"}>
                  {"Preview"}
                </Block>
              </Block>
            </Block>
            <Block className={"sg_table-row-4 sg_border-bottom"} tag={"div"}>
              <Block className={"sg_table-cell-title-5"} tag={"div"}>
                <Block className={"sg_text-block_fix-4"} tag={"div"}>
                  {"Dropdown"}
                </Block>
              </Block>
              <Block className={"sg_table-cell-8"} tag={"div"}>
                <DropdownWrapper
                  className={"dropdown-3"}
                  delay={250}
                  hover={false}
                  tag={"div"}
                >
                  <DropdownToggle className={"dropdown_toggle-3"} tag={"div"}>
                    <Icon
                      className={"accordion_icon-4"}
                      widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                      }}
                    />
                    <Block className={"text-block-41"} tag={"div"}>
                      {"Dropdown"}
                    </Block>
                  </DropdownToggle>
                  <DropdownList className={"dropdown_list-3"} tag={"nav"}>
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
            <Block className={"sg_table-row-4"} tag={"div"}>
              <Block className={"sg_table-cell-title-5"} tag={"div"}>
                <Block className={"sg_text-block_fix-4"} tag={"div"}>
                  {"Dropdown opened"}
                </Block>
              </Block>
              <Block className={"sg_table-cell-8 sg_preview-lg"} tag={"div"}>
                <DropdownWrapper
                  className={"dropdown-3"}
                  delay={250}
                  hover={false}
                  id={"w-node-e1440db6-aaf7-4b99-3e1d-ac5ea51a39f4-a51a39cf"}
                  tag={"div"}
                >
                  <DropdownToggle
                    className={"dropdown_toggle-3 w--open"}
                    tag={"div"}
                  >
                    <Icon
                      className={"accordion_icon-4"}
                      widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                      }}
                    />
                    <Block className={"text-block-42"} tag={"div"}>
                      {"Dropdown"}
                    </Block>
                  </DropdownToggle>
                  <DropdownList
                    className={"dropdown_list-3 w--open"}
                    tag={"nav"}
                  >
                    <DropdownLink
                      className={"dropdown-link-4"}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Long dropdown link, longer than toggle"}
                    </DropdownLink>
                    <DropdownLink
                      className={"dropdown-link-5"}
                      options={{
                        href: "#",
                      }}
                    >
                      {"Link 2"}
                    </DropdownLink>
                    <DropdownLink
                      className={"dropdown-link-6"}
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
