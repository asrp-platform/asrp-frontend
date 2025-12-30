

export type HeadingLevel = 1 | 2 | 3 | 4 | 5

export interface IHeadingBlock {
    id: string;
    type: "heading";
    level: HeadingLevel;
    text: string;
}


export interface IParagraphBlock {
    id: string;
    type: "paragraph";
    text: string;
}


export interface IListItem {
    id: string;
    text: string;
}


export interface IListBlock {
    id: string;
    type: "list";
    items: IListItem[];
}


export type ContentBlock = IHeadingBlock | IParagraphBlock | IListBlock


export interface IContent {
    blocks: ContentBlock[];
}


export interface IDirectorsBoardMember {
    id: number | string;
    created_at: string;
    updated_at: string;
    role: string;
    name: string;
    photo_url: string;
    order: number;
    is_visible: boolean;
    content: IContent;
}