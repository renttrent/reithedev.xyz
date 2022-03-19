import { Button, HStack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ZIMA } from "../styles/theme"
import { TiTick } from "react-icons/ti"

const Copied = motion(HStack)
const ContactButton = motion(Button)

export const ContactMe: React.FC<{}> = () => {

  const variants = {
    hidden: {
      borderBottom: `3px solid ${ZIMA}`,
      borderRadius: "20%"
    },
    show: {
      borderBottom: "0px",
      transition: {
        duration: 0.05,
      }
    }
  }

  const copied_variants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    show: {
      y: 40,
      opacity: 1
    }
  }

  const [hover, setHover] = useState(false)
  
  const handleHover = (e: any) => {
    e.preventDefault()
    navigator.clipboard.writeText("reithedev@protonmail.com")
    setHover(true)
    setTimeout(() => {
      setHover(false)
    }, 2000)
  }
  
  return(
    <>
      <ContactButton
        cursor="pointer"
        userSelect="none"
        padding="2"
        marginRight="1"
        onClick={handleHover}
        background="none"
        _hover={{ backgroundColor: "none" }}
        _active={{ backgroundColor: "none" }}
        _focus={{ backgroundColor: "none" }}
        whileHover={{ color: ZIMA, transition: { duration: 0.05 } }}
        whileFocus={{ color: ZIMA }}
        fontSize={{md: "xl", base: "lg"}}
        variants={variants}
        initial="hidden"
        animate={ hover ? "show": "hidden" }
      >
        Contact
      </ContactButton>
      { hover &&
      <Copied 
        position="absolute"
        width="30"
        height="10"
        backgroundColor={ZIMA}
        color="white"
        padding="2"
        rounded="2xl"
        variants={copied_variants}
        initial="hidden"
        animate={hover ? "show" : "hidden" }
        fontSize={{ md: "md", base: "sm" }}
      >
        <Text>Copied email</Text><TiTick />
      </Copied>
      }
    </>
  )
}