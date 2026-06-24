interface IHearAboutOptios {
    option: string
    count: number
    percentage: number
}

export interface IHearAboutStatistics {
    total_responses: number
    stats: IHearAboutOptios[]
}
