import { HStack, Text, Link } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { ZIMA } from "../styles/theme"

const LogoChar = motion(Text)
const Special = motion(Link)

export const Logo: React.FC<{}> = () => {

  const reithedev = "rei(thedev);".split('')
  let d = -0.1
  const step = 0.1

  return (
    <Special 
      href="/" 
      whileFocus={{ color: ZIMA, outline: "none" }} 
      whileHover={{ color: ZIMA, outline: "none" }} 
      whileTap={{ scale: 1.01, outline: "none" }}
      width={{ md: "container.md", base: "fit-content" }}
      margin={{ md: "auto", base: "0" }}
      fontSize={{ md: "2xl", base: "lg" }}
      fontFamily="monospace"
      fontWeight="bold"
      padding="6"
      display="flex"
      _hover={{ textDecoration: "none" }}
      _active={{ outline: "none" }}
      _focus={{ outline: "none" }}
      >
        {reithedev.map((char) => {
          d += step
          return <LogoChar key={Math.random()} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0, transition: { delay: d }}}>{char}</LogoChar>
        })}
    </Special>
  )
}