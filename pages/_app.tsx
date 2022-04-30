import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react"
import { theme, ZIMA } from "../styles/theme"
import { AnimatePresence } from 'framer-motion'
import { Logo } from '../components/Logo'
import { useEffect, useState } from 'react'
import Router from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }

    const end = () => {
      setLoading(false)
    }

    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)

    return () => {
      Router.events.on("routeChangeStart", start)
      Router.events.on("routeChangeComplete", end)
      Router.events.on("routeChangeError", end)
    }
  }, [])

  if(loading) {
    return (
      <ChakraProvider theme={theme}>
        <AnimatePresence
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Logo key="logo" />
          <Spinner 
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.300"
            color={ZIMA}
            size="xl"
          /> 
        </AnimatePresence>
      </ChakraProvider>
    ) 
  }

  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Logo key="logo" />
        <Component {...pageProps}/>
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
