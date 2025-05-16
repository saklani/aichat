'use client'
import { getQueryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { injectSpeedInsights } from '@vercel/speed-insights'
import type * as React from 'react'
 
injectSpeedInsights();

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools/> */}
      </QueryClientProvider>
  )
}