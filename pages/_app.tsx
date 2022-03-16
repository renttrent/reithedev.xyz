import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { AnimatePresence } from 'framer-motion'
import { Logo } from '../components/Logo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Logo />
        <Component {...pageProps} />
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
