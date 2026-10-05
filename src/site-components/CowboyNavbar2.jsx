"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import DropdownList from "./webflow_modules/Dropdown/components/DropdownList";
import DropdownToggle from "./webflow_modules/Dropdown/components/DropdownToggle";
import DropdownWrapper from "./webflow_modules/Dropdown/components/DropdownWrapper";
import Heading from "./webflow_modules/Basic/components/Heading";
import HtmlEmbed from "./webflow_modules/Embed/components/HtmlEmbed";
import Image from "./webflow_modules/Basic/components/Image";
import Link from "./webflow_modules/Basic/components/Link";
import NavbarBrand from "./webflow_modules/Navbar/components/NavbarBrand";
import NavbarButton from "./webflow_modules/Navbar/components/NavbarButton";
import NavbarLink from "./webflow_modules/Navbar/components/NavbarLink";
import NavbarMenu from "./webflow_modules/Navbar/components/NavbarMenu";
import NavbarWrapper from "./webflow_modules/Navbar/components/NavbarWrapper";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import * as _interactions from "./webflow_modules/interactions";

const _interactionsData = JSON.parse(
  '{"events":{"e-11":{"id":"e-11","name":"","animationType":"preset","eventTypeId":"NAVBAR_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-68"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-12":{"id":"e-12","name":"","animationType":"preset","eventTypeId":"NAVBAR_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-102"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-13":{"id":"e-13","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-49"}},"mediaQueries":["main"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-14":{"id":"e-14","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-24","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-99"}},"mediaQueries":["main"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-15":{"id":"e-15","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-51"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-16":{"id":"e-16","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-52"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acaf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-17":{"id":"e-17","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-76"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acb0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1759900e-92c6-b0b0-1c3d-4f55c3b4acb0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790706982698},"e-27":{"id":"e-27","name":"","animationType":"preset","eventTypeId":"NAVBAR_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-68"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd223c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd223c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-28":{"id":"e-28","name":"","animationType":"preset","eventTypeId":"NAVBAR_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-102"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd223c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd223c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-29":{"id":"e-29","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-49"}},"mediaQueries":["main"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-30":{"id":"e-30","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-24","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-99"}},"mediaQueries":["main"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-31":{"id":"e-31","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-51"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-32":{"id":"e-32","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-52"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2240","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666845231881},"e-33":{"id":"e-33","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-76"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2241","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7239fc10-46fd-a031-92c2-f03c6fdd2241","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1790706982698}},"actionLists":{"a-13":{"id":"a-13","title":"Navbar 5 [Open Menu]","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"inOutQuint","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-middle","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311941"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-13-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-bottom","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311962"]},"yValue":-8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-13-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-top","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311946"]},"yValue":8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-13-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-top","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311946"]},"zValue":-45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-13-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-bottom","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311962"]},"zValue":45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168378054},"a-20":{"id":"a-20","title":"Navbar 5 [Close Menu]","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-bottom","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311962"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-20-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-top","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311946"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-20-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-bottom","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311962"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-20-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-top","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311946"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-20-n-5","actionTypeId":"STYLE_SIZE","config":{"delay":400,"easing":"inOutQuint","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".menu-icon_line-middle-inner","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-67772731195f"]},"widthValue":24,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168766736},"a-15":{"id":"a-15","title":"Navbar 5 Dropdown [Open] [Desktop]","actionItemGroups":[{"actionItems":[{"id":"a-15-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".navbar_dropdown-list","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-67772731194c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-15-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-icon","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311960"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-15-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".navbar_dropdown-list","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-67772731194c"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626161550593},"a-24":{"id":"a-24","title":"Navbar 5 Dropdown [Close] [Desktop]","actionItemGroups":[{"actionItems":[{"id":"a-24-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-icon","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311960"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-24-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".navbar_dropdown-list","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-67772731194c"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626161607847},"a-26":{"id":"a-26","title":"Navbar 3 Dropdown [Close] [Desktop] 2","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{},"value":0,"unit":""}},{"id":"a-26-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-icon","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311960"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-26-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":0,"target":{},"yValue":4,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626241970095},"a-19":{"id":"a-19","title":"Navbar 2 Dropdown [Open] [Tablet]","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{},"heightValue":0,"widthUnit":"px","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-19-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":300,"target":{},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-19-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-icon","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-677727311960"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626241970095},"a-27":{"id":"a-27","title":"New Timed Animation","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".navbar-component","selectorGuids":["eb5e7a2a-039b-8f3c-e58a-67772731196d"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1790706995783}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CowboyNavbar2({
  button1Visibility = true,
  button2Visibility = true,
  slotButton,
  slotButton2,
  slotButton3,
  slotButton4,
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <NavbarWrapper
        className={"navbar-component"}
        config={{
          easing: "ease",
          easing2: "ease",
          duration: 400,
          docHeight: false,
          noScroll: false,
          animation: "default",
          collapse: "medium",
        }}
        data-w-id={"7239fc10-46fd-a031-92c2-f03c6fdd223c"}
        fs-scrolldisable-element={"smart-nav"}
        tag={"div"}
      >
        <Block
          className={"navbar-menu_container is-color-alpine-linen"}
          tag={"div"}
        >
          <NavbarMenu className={"navbar-menu"} role={"navigation"} tag={"nav"}>
            <Block className={"navbar-menu_left"} tag={"div"}>
              <DropdownWrapper
                className={"navbar_menu-dropdown"}
                data-w-id={"7239fc10-46fd-a031-92c2-f03c6fdd2240"}
                delay={300}
                hover={true}
                tag={"div"}
              >
                <DropdownToggle
                  className={"navbar_dropdown-toggle"}
                  data-w-id={"7239fc10-46fd-a031-92c2-f03c6fdd2241"}
                  tag={"div"}
                >
                  <HtmlEmbed
                    className={"dropdown-icon"}
                    content={
                      '<svg width=" 100%" height=" 100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z" fill="currentColor"/>\n</svg>'
                    }
                  />
                  <Block className={"navbar_link-text"} tag={"div"}>
                    {"Locations"}
                  </Block>
                </DropdownToggle>
                <DropdownList className={"navbar_dropdown-list"} tag={"nav"}>
                  <Block className={"navbar-menu_container"} tag={"div"}>
                    <Block
                      className={"rl_navbar5_dropdown-content"}
                      tag={"div"}
                    >
                      <Block
                        className={
                          "navbar_dropdown-content-left is-color-alpine-linen"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"navbar_dropdown-link-list"}
                          id={
                            "w-node-_7239fc10-46fd-a031-92c2-f03c6fdd2249-6fdd223c"
                          }
                          tag={"div"}
                        >
                          <Heading
                            className={"navbar_dropdown-column-text"}
                            tag={"h4"}
                          >
                            {"Locations"}
                          </Heading>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            id={
                              "w-node-_7239fc10-46fd-a031-92c2-f03c6fdd224c-6fdd223c"
                            }
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Urban Cowboy Catskills"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {
                                  "Nestled in a valley the heart of the Catskill Mountains"
                                }
                              </Paragraph>
                            </Block>
                          </Link>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Urban Cowboy Denver"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {
                                  "Explore the George Schleier Mansion, an 1880s Capitol Hill landmark."
                                }
                              </Paragraph>
                            </Block>
                          </Link>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            id={
                              "w-node-_7239fc10-46fd-a031-92c2-f03c6fdd2258-6fdd223c"
                            }
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Urban Cowboy Nashville East"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {
                                  "Discover the historic east, set in an 1800s Queen Anne Victorian mansion."
                                }
                              </Paragraph>
                            </Block>
                          </Link>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            id={
                              "w-node-_7239fc10-46fd-a031-92c2-f03c6fdd225e-6fdd223c"
                            }
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Cowboy Bar, Nashville Downtown"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {
                                  "Experience downtown Nashville’s only Cowboy Bar"
                                }
                              </Paragraph>
                            </Block>
                          </Link>
                        </Block>
                        <Block
                          className={"navbar_dropdown-link-list"}
                          tag={"div"}
                        >
                          <Heading
                            className={"navbar_dropdown-column-text"}
                            tag={"h4"}
                          >
                            {"Urban Cowboy"}
                          </Heading>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"About"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {"Learn about the Cowboy"}
                              </Paragraph>
                            </Block>
                          </Link>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Cowboy Creative"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {"Explore the craftsmanship"}
                              </Paragraph>
                            </Block>
                          </Link>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Media"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {"Press inquiries & brand info"}
                              </Paragraph>
                            </Block>
                          </Link>
                          <Link
                            block={"inline"}
                            button={false}
                            className={"navbar_dropdown-link"}
                            options={{
                              href: "#",
                            }}
                          >
                            <Block className={"navbar_item-right"} tag={"div"}>
                              <Block
                                className={"navbar_item-title"}
                                tag={"div"}
                              >
                                {"Awards"}
                              </Block>
                              <Paragraph className={"navbar_text-small"}>
                                {"Press, praise, and stories"}
                              </Paragraph>
                            </Block>
                          </Link>
                        </Block>
                      </Block>
                      <Block
                        className={"navbar_dropdown-content-right"}
                        tag={"div"}
                      >
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
                              data-figma-image-hash={
                                "626a8bab527f6d4b63231cbeeac2fdb1"
                              }
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
                                  {"Stay "}
                                  <br />
                                  {"with US"}
                                </Paragraph>
                                <Paragraph
                                  className={"paragraph is-color-alpine"}
                                  data-figma-id={"6950:5296"}
                                >
                                  {
                                    "Explore distict properties with unique character and soul."
                                  }
                                </Paragraph>
                              </Block>
                              <Block
                                className={"actions"}
                                data-figma-id={"6950:5297"}
                                tag={"div"}
                              >
                                {slotButton4}
                              </Block>
                            </Block>
                            <Block
                              className={"nav-card is-card-2"}
                              data-figma-id={"6950:5299"}
                              data-figma-image-hash={
                                "626a8bab527f6d4b63231cbeeac2fdb1"
                              }
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
                                    "Bring your people together somewhere with a little more character."
                                  }
                                </Paragraph>
                              </Block>
                              <Block
                                className={"actions"}
                                data-figma-id={"6950:5959"}
                                tag={"div"}
                              >
                                {slotButton3}
                              </Block>
                            </Block>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </DropdownList>
              </DropdownWrapper>
              <NavbarLink
                className={"navbar-link"}
                options={{
                  href: "#",
                }}
              >
                {"About"}
              </NavbarLink>
              <NavbarLink
                className={"navbar-link"}
                options={{
                  href: "#",
                }}
              >
                {"Press"}
              </NavbarLink>
              <NavbarLink
                className={"navbar-link"}
                options={{
                  href: "#",
                }}
              >
                {"Contact"}
              </NavbarLink>
            </Block>
            <Block className={"navbar-menu_center"} tag={"div"}>
              <NavbarBrand
                className={"navbar_logo-link"}
                options={{
                  href: "#",
                }}
              >
                <Image
                  alt={""}
                  className={"navbar_logo is-alpine-linen"}
                  height={"auto"}
                  loading={"lazy"}
                  src={
                    "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abbfd6992ee95dd47a785c2_Cowboy%20copy.svg"
                  }
                  width={"63"}
                />
              </NavbarBrand>
            </Block>
            <Block className={"navbar-menu_right"} tag={"div"}>
              {slotButton}
              {slotButton2}
            </Block>
          </NavbarMenu>
          <NavbarButton className={"navbar_menu-button"} tag={"div"}>
            <Block className={"menu-icon"} tag={"div"}>
              <Block className={"menu-icon_line-top"} tag={"div"} />
              <Block className={"menu-icon_line-middle"} tag={"div"}>
                <Block className={"menu-icon_line-middle-inner"} tag={"div"} />
              </Block>
              <Block className={"menu-icon_line-bottom"} tag={"div"} />
            </Block>
          </NavbarButton>
        </Block>
      </NavbarWrapper>
    </div>
  );
}
