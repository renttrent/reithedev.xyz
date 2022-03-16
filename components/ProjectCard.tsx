import { motion } from "framer-motion"
import { Box, Text } from "@chakra-ui/react"

const MotionBox = motion(Box)

interface Project {
  title: string,
  github: string,
  content: string
}

export const ProjectCard: React.FC<{project: Project}> = ({ project }) => {

  const variants = {
    offscreen: {
      opacity: 0,
      x: Math.random() < 0.5  ? -100: 100 
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transistion: {
        duration: 1,
        type: "string",
        stiffness: 200
      }
    }
  }

  return (
    <MotionBox
      bg="grey.100"
      shadow="md"
      rounded="lg"
      p={4}
      color="grey.700"
      cursor="pointer"
      whileHover={{ rotate: '-0.2deg' }}
      whileFocus={{ rotate: '-0.2deg' }}
      variants={variants}
      initial="offscreen"
      exit="offscreen"
      whileInView="onscreen" 
      whileOffView="offscreen"
      margin={4}
      viewport={{ once: true }}
    >
      <Text fontWeight={700} fontSize="xl">{project.title}</Text>
      <Text fontSize="lg" fontStyle="italic" color="red.400">{project.github}</Text>
      <Text>{project.content}</Text>
    </MotionBox>
  )
}