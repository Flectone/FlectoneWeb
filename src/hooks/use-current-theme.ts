'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export const useCurrentTheme = () => {
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )

    const { resolvedTheme } = useTheme()

    return isMounted && resolvedTheme ? resolvedTheme : 'dark'
}