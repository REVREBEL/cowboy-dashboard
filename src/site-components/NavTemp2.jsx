"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import List from "./webflow_modules/Basic/components/List";
import ListItem from "./webflow_modules/Basic/components/ListItem";

export function NavTemp2({
  text1 = "EXPLORE",
  text2 = "",
  text3 = "",
  text4 = "",
}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block
        id={"w-node-_1a23571b-e422-dd78-01b7-4c4512178650-12178650"}
        tag={"div"}
      >
        <Block className={"nav-menu_label"} tag={"div"}>
          {text1}
        </Block>
        <List
          className={"mega-nav_list"}
          // @ts-ignore - User-defined custom attribute(s)
          role={"list"}
          tag={"ul"}
          unstyled={true}
        >
          <ListItem
            className={"margin-bottom_none"}
            id={"w-node-_1a23571b-e422-dd78-01b7-4c4512178654-12178650"}
          >
            {text2}
          </ListItem>
          <ListItem
            className={"margin-bottom_none"}
            id={"w-node-_1a23571b-e422-dd78-01b7-4c451217865a-12178650"}
          >
            {text3}
          </ListItem>
          <ListItem
            className={"margin-bottom_none"}
            id={"w-node-_1a23571b-e422-dd78-01b7-4c4512178660-12178650"}
          >
            {text4}
          </ListItem>
        </List>
      </Block>
    </div>
  );
}
