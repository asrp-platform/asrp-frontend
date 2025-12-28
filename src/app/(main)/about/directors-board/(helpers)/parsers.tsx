import type {IList} from "../../../../../entities/DirectorsBoardMember.ts";

export const headingParser = (level: number, text: string, key: number) => {
    switch (level) {
        case 1:
            return <h1 key={key}>{text}</h1>
        case 2:
            return <h2 key={key}>{text}</h2>
        case 3:
            return <h3 key={key}>{text}</h3>
        case 4:
            return <h4 key={key}>{text}</h4>
        case 5:
            return <h5 key={key}>{text}</h5>
        default:
            return <h3 key={key}>{text}</h3>;
    }
}


export const listParser = (item: IList, key: number) => {
    return (
        <ul key={key}>
            {item.items.map((text, number) => (<li key={number}>{text}</li>))}
        </ul>
)}
