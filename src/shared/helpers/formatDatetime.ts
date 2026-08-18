export const formatDatetime = (
    value: string | null | undefined,
    omit: Array<keyof Intl.DateTimeFormatOptions> = [],
    timeZone?: string | null,
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

    if (timeZone) {
        options.timeZone = timeZone

        if (options.hour || options.minute) {
            options.timeZoneName = "short"
        }
    }

    try {
        return new Date(value).toLocaleString("en-US", options)
    } catch {
        delete options.timeZone
        delete options.timeZoneName
        return new Date(value).toLocaleString("en-US", options)
    }
}

export const formatTimezone = (value: string, timeZone: string) => {
    try {
        const timezoneName = new Intl.DateTimeFormat("en-US", {
            timeZone,
            timeZoneName: "long",
        })
            .formatToParts(new Date(value))
            .find(({ type }) => type === "timeZoneName")?.value

        return timezoneName ? `${timezoneName} (${timeZone})` : timeZone
    } catch {
        return timeZone
    }
}
