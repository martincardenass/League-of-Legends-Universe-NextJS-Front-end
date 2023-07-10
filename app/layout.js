import '../styles/globals.css'
import { Navigation } from '@/components/Navigation'
import { ContextProvider } from '@/components/context' // * import context

export const metadata = {
  title: 'League of Legends Universe',
  description: 'Created by Martin Cardenas'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <title>League of Legends Universe</title>
      <body>
        <Navigation />
        {/* Wrapping up the app with the context provider */}
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  )
}
