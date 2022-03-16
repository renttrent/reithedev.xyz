import { Box, Flex, Grid, GridItem, HStack, Link } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { ZIMA } from "../styles/theme"
import { ContactMe } from "./ContactMe"

const MotionGrid = motion(Grid)
const LeftPanel = motion(GridItem)
const IconStack = motion(HStack)
const SpecialLink = motion(Link)

export const WelcomeGrid: React.FC<{}> = () => {
  const gridvariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: 100
    }
  }

  const leftpanelvariants = {
    hidden:{
      x: -100,
    }, 
    show: {
      x: 0,
      transition: {
        duration: 0.7
      }
    }
  }

  const special_link_props = {
    userSelect: "none",
    fontWeight: "semibold",
    fontSize: { md: "md", base: "sm" },
    whileHover: { color: ZIMA },
    whileFocus: { color: ZIMA, outline: "none" },
    _active: { color: ZIMA, outline: "none" },
    _hover: { textDecoration: "none" }
  }

  return (
    <MotionGrid
      variants={gridvariants}
      initial="hidden"
      animate="show"
      width={{ md: "container.lg", base: "100%" }}
      margin={{ md: "auto", base: "0" }}
      padding="6"
      color="gray.700"
      templateColumns={{
        md: "repeat(2, 1fr)",
        sm: "repeat(1, 1fr)"
      }}
      exit="exit"
    >
      <LeftPanel
        variants={leftpanelvariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Box fontSize={{ md: "3xl", base: "xl" }} fontWeight="bold">Hey this is Rei!</Box>
        <Box fontSize={{ md: "xl", base: "md" }} width="90%">I love making useful systems with beautiful designs. I am a fullstack engineer with a passion for frontend.</Box> 
        <Flex fontSize={{ md: "xl", base: "md" }} alignItems="center"><ContactMe /><span>me via email.</span></Flex>
      </LeftPanel>
      <GridItem>
        <Flex
          direction="column"
          justifyContent="space-between"
          height="100%"
          width={{ md: "50%", base: "100%" }}
          margin={{ md: "auto", base: "1"}}
          marginTop={{ md: "1", base: "7"}}
        >
          <SpecialLink href="https://twitter.com/reithedev" color="blue.600" {...special_link_props}><IconStack><FaTwitter size="33"/><span>@reithdev</span></IconStack></SpecialLink>
          <SpecialLink href="https://github.com/renttrent" color="grey.600" {...special_link_props}><IconStack ><FaGithub size="33"/><span>@renttrent</span></IconStack></SpecialLink>
          <SpecialLink href="https://www.linkedin.com/in/reiballa/" color="blue.500" {...special_link_props}><IconStack ><FaLinkedin size="33"/><span>@reiballa</span></IconStack></SpecialLink>
        </Flex>
      </GridItem>
    </MotionGrid>
  )
}