import { Grid, GridItem } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { HiArrowSmDown } from "react-icons/hi"
import { ZIMA } from "../styles/theme"
import { ProjectCard } from "./ProjectCard"

const MotionGrid = motion(Grid)
const MotionItem = motion(GridItem)

const projects = [
  {
    title: "Firefox New Tab",
    github: "github.com/renttrent/firefoxnewtab",
    content: "This bitch was annoying please give me money i dont have any and give me brains"
  },
  {
    title: "My webste",
    github: "github.com/renttrent/reithedev-xyz",
    content: "this is my website i made this is it cool or nah?"
  }
]

export const InfoGrid: React.FC<{}> = () => {
  const gridvariants = {
    hidden: {
      opacity: 0,
      y: 5
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1
      }
    }
  }
  return (
    <MotionGrid
      variants={gridvariants}
      initial="hidden"
      animate="show"
      width={{ md: "container.lg", sm: "80vw" }}
      margin="auto"
      padding="6"
    >
      <MotionItem mb={6} display="flex" alignItems="center" color="grey.700" fontSize="xl">My Projects <HiArrowSmDown size="30"/></MotionItem>
      {projects.map((p, i) => {
        return <ProjectCard project={p} key={i}/>
      })}
      {projects.map((p, i) => {
        return <ProjectCard project={p} key={i}/>
      })}
      {projects.map((p, i) => {
        return <ProjectCard project={p} key={i}/>
      })} 
    </MotionGrid>
  )
}