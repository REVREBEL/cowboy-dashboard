"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Grid from "./webflow_modules/Layout/components/Grid";
import Image from "./webflow_modules/Basic/components/Image";
import Link from "./webflow_modules/Basic/components/Link";
import List from "./webflow_modules/Basic/components/List";
import ListItem from "./webflow_modules/Basic/components/ListItem";
import Paragraph from "./webflow_modules/Basic/components/Paragraph";
import * as _interactions from "./webflow_modules/interactions";

const _interactionsData = JSON.parse(
  '{"events":{},"actionLists":{},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NavDropdownMenu4({
  column1EyebrowText = (
    <>
      {"Stay "}
      {"&"}
      {" Unwind"}
    </>
  ),
  column2EyebrowText = "Come as Your Are",
  featureButtonColor = "Base",
  featureButtonColorMode = "Normal",
  featureButtonSize = "Normal",
  section1LinkDescription = "Rooms, cabins, soaking tubs, fires, and all the ways to settle in.",
  section1LinkText = "Guest Rooms & Suites",
  section1Visibility = true,
  section2LinkDescription = "Trails, swimming holes, small towns, skiing, and what’s worth leaving the Lodge for.",
  section2LinkText = "Room Features & Amenities",
  section2Visibility = true,
  section3LinkDescription = "Dinners, gatherings, music, seasonal rituals, and whatever’s going on around Cowboy.",
  section3LinkText = "Hotel Amenities",
  section3Visibility = true,
  section4LinkDescription = "Everything you need to know about bringing your four-legged travel partner.",
  section4LinkText = "Dogs Welcome",
  section4Visibility = true,
  section5LinkDescription = "The practical stuff to know before you arrive.",
  section5LinkText = "Solo Travelers",
  section5Visibility = true,
  section6LinkDescription = "Quick answers to the questions guests ask us most.",
  section6LinkText = "For Couples",
  section6Visibility = true,
  section7LinkDescription = (
    <>
      {"Stories, features, and nice things written about Cowboy."}
      <br />
    </>
  ),
  section7LinkText = "Family Getaways",
  section7Visibility = true,
  section8LinkDescription = "A little recognition from the people who noticed.",
  section8LinkText = "The Friends weekend",
  section8Visibility = true,
  section9LinkDescription = "A little recognition from the people who noticed.",
  section9LinkText = "Awards",
  section9Visibility = false,
}) {
  _interactions.useInteractions(_interactionsData);

  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"g-component"} tag={"div"}>
        <Block className={"menu-wrapper"} tag={"div"}>
          <Grid className={"grid_3-col tablet-1-col gap-small-3"}>
            <Block
              id={"w-node-f2949c5d-6cf1-f277-9923-c3c8e8578451-61c2ecf9"}
              tag={"div"}
            />
            <Block tag={"div"}>
              <Block
                className={
                  "nav-menu-column-label margin-left_1rem text-size-medium"
                }
                tag={"div"}
              >
                {column1EyebrowText}
              </Block>
              <List
                className={"mega-nav_list"}
                // @ts-ignore - User-defined custom attribute(s)
                role={"list"}
                tag={"ul"}
                unstyled={true}
              >
                {section1Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    data-w-id={"5e632ff9-e671-33b5-0e34-46a64de77a81"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77a81-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77a83-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section1LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section1LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section2Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77a88-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77a8a-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section2LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section2LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section3Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77a8f-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77a91-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section3LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section3LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section4Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77a96-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77a98-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section4LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section4LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
              </List>
            </Block>
            <Block
              id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77a9d-61c2ecf9"}
              tag={"div"}
            >
              <Block
                className={
                  "nav-menu-column-label margin-left_1rem text-size-medium"
                }
                tag={"div"}
              >
                {column2EyebrowText}
              </Block>
              <List
                className={"mega-nav_list"}
                // @ts-ignore - User-defined custom attribute(s)
                role={"list"}
                tag={"ul"}
                unstyled={true}
              >
                {section5Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77aa1-61c2ecf9"}
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
                        className={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77aa3-61c2ecf9"
                        }
                        id={
                          "w-node-_6834ea16-81cf-d304-337c-e1249bfd0be7-4d562d54"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section5LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section5LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section6Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77aa8-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77aaa-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section6LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section6LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section7Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77aaf-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77ab1-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section7LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section7LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section8Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77ab7-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77ab9-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section8LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section8LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
                {section9Visibility ? (
                  <ListItem
                    className={"nav-link-item"}
                    id={"w-node-_5e632ff9-e671-33b5-0e34-46a64de77abe-61c2ecf9"}
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
                        id={
                          "w-node-_5e632ff9-e671-33b5-0e34-46a64de77ac0-61c2ecf9"
                        }
                        tag={"div"}
                      >
                        <Block
                          className={"nav-link_text is-color-inherit"}
                          tag={"div"}
                        >
                          {section9LinkText}
                        </Block>
                        <Block
                          className={
                            "paragraph_small is-color-fade is-text-wrap-balance"
                          }
                          tag={"div"}
                        >
                          {section9LinkDescription}
                        </Block>
                      </Block>
                    </Link>
                  </ListItem>
                ) : null}
              </List>
            </Block>
          </Grid>
        </Block>
      </Block>
    </div>
  );
}
