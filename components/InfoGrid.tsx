import { Box, Grid, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { HiArrowSmDown } from "react-icons/hi"
import { ZIMA } from "../styles/theme"
import { Project } from "../types/general"
import { ProjectCard } from "./ProjectCard"

const MotionGrid = motion(Grid)
const MotionText = motion(Text)


export const InfoGrid: React.FC<{projects: Array<Project>}> = ({ projects }) => {
  const gridvariants = {
    hidden: {
      opacity: 0,
      y: 5
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5
      }
    }
  }
  return (
    <Box width={{ md: "container.lg", sm: "80vw" }} margin="auto" padding="6">
    <MotionText variants={gridvariants} initial="hidden" animate="show" mb={6} display="flex" alignItems="center" color="grey.700" fontSize="xl">My Projects <HiArrowSmDown size="30"/></MotionText>
    <MotionGrid
      variants={gridvariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      gridTemplateColumns={{ md: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}
    >
      {projects.map((p) => {
        return <ProjectCard project={p} key={p.title}/>
      })}{projects.map((p) => {
        return <ProjectCard project={p} key={p.title}/>
      })}{projects.map((p) => {
        return <ProjectCard project={p} key={p.title}/>
      })}
    </MotionGrid>
    </Box>
  )
}