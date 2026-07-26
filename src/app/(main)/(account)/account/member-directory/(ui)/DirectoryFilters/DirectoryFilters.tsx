import { Input, Select } from "antd"
import { Search, SlidersHorizontal, X } from "lucide-react"

import type { MembershipTypeEnum } from "@/entities/Membership.ts"
import type { ICountry } from "@/app/(auth)/registration/(ui)/types.ts"
import CustomButton from "@/shared/ui/Buttons/CustomButton.tsx"
import styles from "./DirectoryFilters.module.scss"

interface DirectoryFiltersProps {
    search: string
    country?: string
    membershipType?: MembershipTypeEnum
    countries: ICountry[]
    isCountriesLoading: boolean
    onSearchChange: (value: string) => void
    onCountryChange: (value?: string) => void
    onMembershipTypeChange: (value?: MembershipTypeEnum) => void
    onReset: () => void
}

const membershipOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "TRAINEE", label: "Trainee" },
    { value: "AFFILIATE", label: "Affiliate" },
    { value: "HONORARY", label: "Honorary" },
    { value: "PATHWAY", label: "Pathway" },
]

const DirectoryFilters = ({
    search,
    country,
    membershipType,
    countries,
    isCountriesLoading,
    onSearchChange,
    onCountryChange,
    onMembershipTypeChange,
    onReset,
}: DirectoryFiltersProps) => {
    const hasFilters = Boolean(search || country || membershipType)

    return (
        <section className={styles.filters} aria-label="Member directory filters">
            <div className={styles.heading}>
                <div>
                    <SlidersHorizontal size={18} aria-hidden />
                    <h2>Find a member</h2>
                </div>
                {hasFilters && (
                    <CustomButton variant="secondary" onClick={onReset} className={styles.reset}>
                        <X size={14} aria-hidden />
                        Clear filters
                    </CustomButton>
                )}
            </div>

            <div className={styles.fields}>
                <label className={styles.searchField}>
                    <span>Name</span>
                    <Input
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        prefix={<Search size={16} aria-hidden />}
                        placeholder="Search by member name"
                        maxLength={100}
                        allowClear
                    />
                </label>

                <label>
                    <span>Country</span>
                    <Select
                        value={country}
                        onChange={onCountryChange}
                        options={countries.map(({ code, name }) => ({ value: code, label: name }))}
                        placeholder="All countries"
                        loading={isCountriesLoading}
                        showSearch
                        allowClear
                        optionFilterProp="label"
                    />
                </label>

                <label>
                    <span>Membership</span>
                    <Select
                        value={membershipType}
                        onChange={onMembershipTypeChange}
                        options={membershipOptions}
                        placeholder="All membership types"
                        allowClear
                    />
                </label>
            </div>
        </section>
    )
}

export default DirectoryFilters
