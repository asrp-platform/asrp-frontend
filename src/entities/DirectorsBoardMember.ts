

export interface IHeading {
    type: "heading";
    level: 1 | 2 | 3 | 4 | 5;
    text: string;
}


export interface IParagraph {
    type: "paragraph";
    text: string;
}


export interface IList {
    type: "list";
    items: string[];
}


export interface IContent {
    blocks: Array<IHeading | IParagraph | IList>
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