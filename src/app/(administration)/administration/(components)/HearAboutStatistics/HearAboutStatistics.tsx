"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/axios.ts"
import { HEAR_ABOUT_STATISTICS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import type { IHearAboutStatistics } from "@app/(administration)/administration/(components)/HearAboutStatistics/types.ts"
import { Card, Empty, Statistic, Typography } from "antd"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { Column } from "@ant-design/plots"

import styles from "@app/(administration)/administration/(components)/HearAboutStatistics/styles.module.scss"

const { Title } = Typography

const HearAboutStatistics = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["hear-about-statistics"],
        queryFn: async () => {
            const response = await api.get<IHearAboutStatistics>(HEAR_ABOUT_STATISTICS_ADMIN_URL)
            return response.data
        },
        staleTime: 1000 * 60 * 5,
    })

    const chartData =
        data?.stats.map((stat) => ({
            type: stat.option.replace(/_/g, " "),
            percentage: stat.percentage,
            count: stat.count,
            tooltipValue: `${stat.percentage}% (${stat.count})`,
        })) ?? []

    if (isLoading) {
        return <Loading />
    }

    if (!data || data.total_responses === 0) {
        return (
            <Card title="How users found us">
                <Empty description="No responses yet" />
            </Card>
        )
    }

    return (
        <Card className={styles.chartCard}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title level={3}>Hear about ASRP</Title>
                <Statistic
                    title="Total responses"
                    value={data.total_responses}
                    style={{ marginBottom: 12 }}
                />
            </div>

            <Column
                data={chartData}
                xField="type"
                yField="percentage"
                height={240}
                autoFit
                scale={{ y: { domain: [0, 100] } }}
                axis={{
                    x: {
                        labelRotate: -Math.PI / 2,
                        labelAutoRotate: false,
                    },
                    y: {
                        labelFontSize: 11,
                        labelFormatter: (value: number) => `${value}%`,
                    },
                }}
                tooltip={{
                    items: [
                        {
                            field: "tooltipValue",
                            name: "Percentage (responses)",
                        },
                    ],
                }}
                legend={false}
            />
        </Card>
    )
}

export default HearAboutStatistics
