'use client'

import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'
import createCache from '@emotion/cache'
import theme from './theme'

export default function ThemeRegistry({
                                        children,
                                      }: {
  children: React.ReactNode
}) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'mui', prepend: true })
    cache.compat = true
    return cache
  })

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ))

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
