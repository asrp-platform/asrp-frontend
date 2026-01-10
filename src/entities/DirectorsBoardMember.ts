export interface IDirectorsBoardMember {
    id: number | string;
    created_at: string;
    updated_at: string;
    role: string;
    name: string;
    photo_url: string;
    order: number;
    is_visible: boolean;
    content: object;
}