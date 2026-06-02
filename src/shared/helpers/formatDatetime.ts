export const formatDatetime = (
    value: string | null | undefined,
    omit: Array<keyof Intl.DateTimeFormatOptions> = [],
) => {
    if (!value) {
        return ""
    }

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }

    omit.forEach((key) => {
        delete options[key]
    })

    return new Date(value).toLocaleString("en-US", options)
}
