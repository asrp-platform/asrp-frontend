import type {IDirectorsBoardMember} from "../../../../../entities/DirectorsBoardMember.ts";


export const reorder = (list: IDirectorsBoardMember[], fromIndex: number, toIndex: number) => {

    const result = [...list];
    const removed = result.splice(fromIndex, 1)
    result.splice(toIndex, 0, removed[0]);

    return result.map((item, index) => ({
        ...item, order: index + 1
    }))
}