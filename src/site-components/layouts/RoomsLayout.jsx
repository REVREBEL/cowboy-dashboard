"use client";
import React from "react";
import { DEVLINK_SCOPE_CLASS } from "../devlinkScope";
import Block from "../webflow_modules/Basic/components/Block";
import HtmlEmbed from "../webflow_modules/Embed/components/HtmlEmbed";
import NotSupported from "../webflow_modules/Builtin/components/NotSupported";
import { RoomCard } from "../RoomCard";

export function RoomsLayout({}) {
  return (
    <div
      className={DEVLINK_SCOPE_CLASS}
      style={{
        display: "contents",
      }}
    >
      <Block className={"rooms-layout"} tag={"div"}>
        <HtmlEmbed
          className={"code-embed"}
          content={
            "<script>\ndocument.addEventListener('DOMContentLoaded', () => {\n  const breakBefore = [\n    'Bathing Suite with Den',\n    '2 Bedroom Suite',\n    '3 Bedroom Suite',\n    '4 Bedroom Suite',\n    'Double Queen',\n    'Bathing Suite',\n    'Entire House',\n    'King',\n    'Queen',\n    'Suite'\n  ];\n\n  // Longest phrases first so \"Bathing Suite with Den\"\n  // wins before \"Bathing Suite\" or \"Suite\"\n  breakBefore.sort((a, b) => b.length - a.length);\n\n  document.querySelectorAll('.room-name').forEach(el => {\n    const text = el.textContent.trim();\n\n    for (const keyword of breakBefore) {\n      if (\n        text.toLowerCase().endsWith(keyword.toLowerCase()) &&\n        text.toLowerCase() !== keyword.toLowerCase()\n      ) {\n        const firstLine = text.slice(0, -keyword.length).trim();\n\n        el.textContent = '';\n\n        el.append(document.createTextNode(firstLine));\n        el.append(document.createElement('br'));\n        el.append(document.createTextNode(keyword));\n\n        break;\n      }\n    }\n  });\n});\n</script>\n\n\n<script>\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const lists = document.querySelectorAll(\"[data-random-list]\");\n\n  lists.forEach(function (list) {\n    const count = parseInt(list.getAttribute(\"data-random-count\") || \"3\", 10);\n    const items = Array.from(list.children);\n\n    // Fisher-Yates shuffle\n    for (let i = items.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [items[i], items[j]] = [items[j], items[i]];\n    }\n\n    // Reorder the DOM and show only the requested number\n    items.forEach(function (item, index) {\n      list.appendChild(item);\n      item.style.display = index < count ? \"\" : \"none\";\n    });\n  });\n});\n</script>"
          }
        />
        <NotSupported _atom={"Collection List"} />
      </Block>
    </div>
  );
}
