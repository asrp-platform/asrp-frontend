import type {IContent} from "../../../../../entities/DirectorsBoardMember.ts";
import {headingParser, listParser} from "./parsers.tsx";

export const renderer = (content: IContent) => {


    return content.blocks.map((item, index) => {
        switch (item.type) {
            case "heading":
                return headingParser(item.level, item.text, index);
            case "paragraph":
                return <p key={index}>{item.text}</p>;
            case "list":
                return listParser(item, index);
        }
    })

}