import { extendTheme } from "@chakra-ui/react"

export const ZIMA = "#16b8f3"
export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.50"
      },
      "::-moz-selection": {
        bg: "gray.200"
      },
      "::selection": {
        bg: "gray.200"
      }
    })
  }
})