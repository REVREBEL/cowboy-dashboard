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
import { Button } from "./buttons/Button";

const _interactionsData = JSON.parse(
  '{"events":{},"actionLists":{},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NavDropdownMenu1({
  buttonDataAttributesButtonName = "Feature Item Button",
  buttonDataAttributesContentName = "Blog",
  column1EyebrowText = (
    <>
      {"Stay "}
      {"&"}
      {" Unwind"}
    </>
  ),
  column2EyebrowText = "Discover",
  featureButtonColor = "Base",
  featureButtonColorMode = "Normal",
  featureButtonSize = "Normal",
  featureSectionDescriptionText = "Stories, guides and a deeper look at life in the Catskills.",
  featureSectionEyebrow = "Read Our Blog",
  featureSectionHeadlineText = "The Pony Express",
  featureSectionImage = "https://cdn.prod.website-files.com/6aaa2497c8ea366207beba30/6abdb1a54ff7d0d1e562e6ef_Alpine%20Outdoor%20Patio.jpg",
  featureSectionLinkText = "Read More",
  section1LinkDescription = "Rooms, cabins, soaking tubs, fires, and all the ways to settle in.",
  section1LinkText = "The Resort",
  section1Visibility = true,
  section2LinkDescription = "Trails, swimming holes, small towns, skiing, and what’s worth leaving the Lodge for.",
  section2LinkText = "Explore Catskills",
  section2Visibility = true,
  section3LinkDescription = "Dinners, gatherings, music, seasonal rituals, and whatever’s going on around Cowboy.",
  section3LinkText = "Happenings",
  section3Visibility = true,
  section4LinkDescription = "Everything you need to know about bringing your four-legged travel partner.",
  section4LinkText = "Dogs Welcome",
  section4Visibility = true,
  section5LinkDescription = "The practical stuff to know before you arrive.",
  section5LinkText = "Resort Policies",
  section5Visibility = true,
  section6LinkDescription = "Quick answers to the questions guests ask us most.",
  section6LinkText = "FAQ",
  section6Visibility = true,
  section7LinkDescription = (
    <>
      {"Stories, features, and nice things written about Cowboy."}
      <br />
    </>
  ),
  section7LinkText = "Press",
  section7Visibility = true,
  section8LinkDescription = "A little recognition from the people who noticed.",
  section8LinkText = "Awards",
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
      <Block tag={"div"}>
        <Block className={"menu-wrapper"} tag={"div"}>
          <Grid className={"grid_3-col tablet-1-col gap-small-3"}>
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
                    data-w-id={"fbcf671a-00cd-ce54-4090-a79ef2bd6288"}
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd6288-f2bd6280"}
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
                          "w-node-_27739fb6-0dc6-4327-2e5e-88a84d5c817b-f2bd6280"
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd628d-f2bd6280"}
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
                          "w-node-_5300ac81-0755-7499-246a-90f15eea2135-f2bd6280"
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd6292-f2bd6280"}
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
                          "w-node-_4b2e1339-3300-4d53-6d8b-8b1139dfdec8-f2bd6280"
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd6297-f2bd6280"}
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
                          "w-node-_6c4a27ac-efcb-228f-b8be-8c76884a8dfe-f2bd6280"
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
              id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd629c-f2bd6280"}
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd629f-f2bd6280"}
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
                          "w-node-_08c14276-7236-0338-d93f-35ab2561a6c7-f2bd6280"
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62a4-f2bd6280"}
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
                          "w-node-_40be0f88-e0ea-89fa-4f8b-7e2bcade9fdc-f2bd6280"
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62a9-f2bd6280"}
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
                          "w-node-d20bb846-5abe-de5d-f184-4544aa0b4e1f-f2bd6280"
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
                    id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62ae-f2bd6280"}
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
                          "w-node-ab5596fd-f85c-7671-9360-5c5209f238ef-f2bd6280"
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
                <ListItem
                  className={"nav-link-item"}
                  id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62b3-f2bd6280"}
                >
                  {section9Visibility ? (
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
                          "w-node-_51492ab0-c886-98a8-95f7-d26d92522354-f2bd6280"
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
                  ) : null}
                </ListItem>
                <ListItem
                  className={"margin-bottom_none"}
                  id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62b8-f2bd6280"}
                />
                <ListItem
                  className={"margin-bottom_none"}
                  id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62b9-f2bd6280"}
                />
                <ListItem
                  className={"margin-bottom_none"}
                  id={"w-node-fbcf671a-00cd-ce54-4090-a79ef2bd62ba-f2bd6280"}
                />
              </List>
            </Block>
            <Block
              className={"feature-item"}
              id={"w-node-_80b8a614-c127-5cbf-c0a6-30b268acdd91-f2bd6280"}
              tag={"div"}
            >
              <Block className={"feature-image_wrapper"} tag={"div"}>
                <Block className={"div-block-11"} tag={"div"} />
                <Image
                  alt={""}
                  className={"feature-item_image"}
                  height={"auto"}
                  loading={"lazy"}
                  src={featureSectionImage}
                  width={"auto"}
                />
              </Block>
              <Block className={"feature-content_wrapper"} tag={"div"}>
                <Block
                  className={"feature-item_eyebrow text-alpine-linen"}
                  tag={"div"}
                >
                  {featureSectionEyebrow}
                </Block>
                <Block
                  className={"feature-item_headline text-alpine-linen"}
                  tag={"div"}
                >
                  {featureSectionHeadlineText}
                </Block>
                <Paragraph
                  className={
                    "feature-item_description text-alpine-linen padding-bottom-xxs"
                  }
                >
                  {featureSectionDescriptionText}
                </Paragraph>
                <Button
                  buttonColor={featureButtonColor}
                  buttonColorMode={featureButtonColorMode}
                  buttonColorStyle={"Text-Only"}
                  buttonSize={featureButtonSize}
                  buttonText={featureSectionLinkText}
                  dataAttributesButtonName={buttonDataAttributesButtonName}
                  dataAttributesContentName={buttonDataAttributesContentName}
                />
              </Block>
            </Block>
          </Grid>
        </Block>
      </Block>
    </div>
  );
}
