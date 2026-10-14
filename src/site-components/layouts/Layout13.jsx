"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import Heading from "../webflow_modules/Basic/components/Heading";
import HtmlEmbed from "../webflow_modules/Embed/components/HtmlEmbed";
import Paragraph from "../webflow_modules/Basic/components/Paragraph";
import TabsContent from "../webflow_modules/Tabs/components/TabsContent";
import TabsLink from "../webflow_modules/Tabs/components/TabsLink";
import TabsMenu from "../webflow_modules/Tabs/components/TabsMenu";
import TabsPane from "../webflow_modules/Tabs/components/TabsPane";
import TabsWrapper from "../webflow_modules/Tabs/components/TabsWrapper";

export function Layout13({
  closeByContentSlot,
  guestAccessAccessHeading = "What You'll have access to:",
  guestAccessAccessItem1 = "The entire lodge",
  guestAccessAccessItem2 = "Private outdoor space",
  guestAccessAccessItem3 = "Private hot tub",
  guestAccessAccessItem4 = "Fully stocked kitchen",
  guestAccessAccessItem5 = "Washer and dryer",
  guestAccessAccessItem6 = "Driveway parking",
  guestAccessAccessItem7 = "Fast WiFi",
  guestAccessAccessItem8 = "Smart TVs",
  guestAccessAccessItem9 = "Self check-in",
  guestAccessCheckInDetails = "Guests will receive arrival instructions before their stay, including the property address, parking details, and self check-in information. Entry is simple and convenient, so you can arrive, settle in, and start enjoying your trip.",
  guestAccessCheckInHeading = "Check-In Details:",
  guestAccessHeading = "Guest Access & Arrival Details",
  guestAccessIntroduction = "Guests will have access to the full lodge during their stay, including the main living spaces, kitchen, bedrooms, bathrooms, outdoor areas, and private hot tub.",
  stayDetailsContentSlot,
  tabsTab1Label = "Guest Access",
  tabsTab2Label = "Close By",
  tabsTab3Label = "Stay Details",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"layout-13"} tag={"div"}>
        <TabsWrapper
          className={"layout-13_tabs"}
          current={"Tab 1"}
          easing={"ease"}
          fadeIn={300}
          fadeOut={100}
        >
          <TabsMenu className={"layout-13_menu"} tag={"div"}>
            <TabsLink
              block={"inline"}
              className={"layout-13_tab"}
              data-w-tab={"Tab 1"}
            >
              <Block tag={"div"}>{tabsTab1Label}</Block>
            </TabsLink>
            <TabsLink
              block={"inline"}
              className={"layout-13_tab"}
              data-w-tab={"Tab 2"}
            >
              <Block tag={"div"}>{tabsTab2Label}</Block>
            </TabsLink>
            <TabsLink
              block={"inline"}
              className={"layout-13_tab"}
              data-w-tab={"Tab 3"}
            >
              <Block tag={"div"}>{tabsTab3Label}</Block>
            </TabsLink>
          </TabsMenu>
          <TabsContent className={"layout-13_content"} tag={"div"}>
            <TabsPane
              className={"layout-13_pane"}
              data-w-tab={"Tab 1"}
              tag={"div"}
            >
              <Block className={"layout-13_guest-content"} tag={"div"}>
                <Heading
                  className={"headline-base is-layout-13-heading"}
                  tag={"h2"}
                >
                  {guestAccessHeading}
                </Heading>
                <Paragraph className={"v-paragraph is-layout-13-paragraph"}>
                  {guestAccessIntroduction}
                </Paragraph>
                <Block className={"layout-13_details-grid"} tag={"div"}>
                  <Block className={"layout-13_detail-column"} tag={"div"}>
                    <Block className={"layout-13_detail-heading"} tag={"div"}>
                      {guestAccessAccessHeading}
                    </Block>
                    <Block className={"layout-13_access-list"} tag={"div"}>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem1}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem2}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem3}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem4}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem5}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem6}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem7}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem8}
                        </Paragraph>
                      </Block>
                      <Block className={"layout-13_list-item"} tag={"div"}>
                        <Block className={"layout-13_bullet"} tag={"div"}>
                          {"•"}
                        </Block>
                        <Paragraph
                          className={"v-paragraph is-layout-13-paragraph"}
                        >
                          {guestAccessAccessItem9}
                        </Paragraph>
                      </Block>
                    </Block>
                  </Block>
                  <Block className={"layout-13_detail-column"} tag={"div"}>
                    <Block className={"layout-13_detail-heading"} tag={"div"}>
                      {guestAccessCheckInHeading}
                    </Block>
                    <Paragraph className={"v-paragraph is-layout-13-paragraph"}>
                      {guestAccessCheckInDetails}
                    </Paragraph>
                  </Block>
                </Block>
              </Block>
            </TabsPane>
            <TabsPane
              className={"layout-13_pane"}
              data-w-tab={"Tab 2"}
              tag={"div"}
            >
              {closeByContentSlot}
            </TabsPane>
            <TabsPane
              className={"layout-13_pane"}
              data-w-tab={"Tab 3"}
              tag={"div"}
            >
              {stayDetailsContentSlot}
            </TabsPane>
          </TabsContent>
        </TabsWrapper>
        <HtmlEmbed
          content={
            "<style>\n.layout-13_tab + .layout-13_tab { margin-left: -1px; }\n.layout-13_tab.w--current { background-color: #9ca08d; }\n.layout-13_tab:hover { background-color: rgba(156,160,141,0.28); }\n.layout-13_tab.w--current:hover { background-color: #9ca08d; }\n.layout-13_tab:focus-visible { outline: 2px solid currentColor; outline-offset: -2px; }\n</style>"
          }
        />
      </Block>
    </div>
  );
}
