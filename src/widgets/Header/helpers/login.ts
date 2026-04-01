import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const onUserLoginClick = (router: AppRouterInstance) => {
    router.push("/login")
}
