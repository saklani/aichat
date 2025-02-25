'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/lib/query-client'
import type * as React from 'react' 
import { injectSpeedInsights } from '@vercel/speed-insights';
 
injectSpeedInsights();

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools/>
      </QueryClientProvider>
  )
}