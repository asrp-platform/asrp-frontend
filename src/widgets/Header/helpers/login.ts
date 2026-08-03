import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { getLoginUrl } from "@shared/helpers/authRedirect.ts"

export const onUserLoginClick = (router: AppRouterInstance, returnTo: string) => {
    router.push(getLoginUrl(returnTo))
}
