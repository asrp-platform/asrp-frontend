import {
    type IMembershipRequest,
    type IUserMembership,
    MembershipRequestStatusEnum,
} from "@entities/Membership.ts"

export const AccountMembershipStatus = {
    NONE: "NONE",
    REQUEST_PENDING: "REQUEST_PENDING",
    REQUEST_REJECTED: "REQUEST_REJECTED",
    ACTIVE: "ACTIVE",
    EXPIRED: "EXPIRED",
} as const

export type AccountMembershipStatus =
    (typeof AccountMembershipStatus)[keyof typeof AccountMembershipStatus]

type AccountMembershipStatusState =
    | {
          status: typeof AccountMembershipStatus.NONE
          membership: null
          membershipRequest: null
      }
    | {
          status:
              | typeof AccountMembershipStatus.REQUEST_PENDING
              | typeof AccountMembershipStatus.REQUEST_REJECTED
          membership: null
          membershipRequest: IMembershipRequest
      }
    | {
          status: typeof AccountMembershipStatus.ACTIVE | typeof AccountMembershipStatus.EXPIRED
          membership: IUserMembership
          membershipRequest: IMembershipRequest | null
      }

interface ResolveAccountMembershipStatusParams {
    membership?: IUserMembership | null
    membershipRequest?: IMembershipRequest | null
}

const isMembershipExpired = (membership: IUserMembership) => !membership.is_active

export const resolveAccountMembershipStatus = ({
    membership,
    membershipRequest,
}: ResolveAccountMembershipStatusParams): AccountMembershipStatusState => {
    if (membership) {
        return {
            status: isMembershipExpired(membership)
                ? AccountMembershipStatus.EXPIRED
                : AccountMembershipStatus.ACTIVE,
            membership,
            membershipRequest: membershipRequest ?? null,
        }
    }

    if (membershipRequest) {
        return {
            status:
                membershipRequest.status === MembershipRequestStatusEnum.REJECTED
                    ? AccountMembershipStatus.REQUEST_REJECTED
                    : AccountMembershipStatus.REQUEST_PENDING,
            membership: null,
            membershipRequest,
        }
    }

    return {
        status: AccountMembershipStatus.NONE,
        membership: null,
        membershipRequest: null,
    }
}
