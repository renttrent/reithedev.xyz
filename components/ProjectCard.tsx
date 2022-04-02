import { motion } from "framer-motion"
import { Box, Image, Text } from "@chakra-ui/react"
import { Project } from "../types/general"
import Router from "next/router"

const MotionBox = motion(Box)
const MotionImage = motion(Image)
const MotionText = motion(Text)

export const ProjectCard: React.FC<{project: Project}> = ({ project }) => {

  const variants = {
    offscreen: {
      opacity: 0,
      y: 10 
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transistion: {
        duration: 1,
        type: "string",
        stiffness: 200
      }
    },
  }

  const imagevariants = {
    hover: {
      filter: "none"
    },
  }

  const textvariants = {
    hover: {
      opacity: 0,
      scale: 1.03,
      transition: {
        duration: 0.2
      }
    },
  }
  
  const overlayvariants = {
    hover: {
      opacity: 0.05,
      transition: {
        duration: 0.2
      }
    },
  }

  return (
    <MotionBox
      position="relative"
      shadow="md"
      rounded="lg"
      color="gray.100"
      cursor="pointer"
      variants={variants}
      initial="offscreen"
      exit="offscreen"
      whileInView="onscreen" 
      margin={4}
      viewport={{ once: true }}
      whileHover="hover"
      onClick={() => Router.push(`/project/${project.id}`)}
    > 
      <MotionImage variants={imagevariants} p="1" filter="blur(2px)" position="absolute" zIndex="-2" boxSize="full" objectFit="cover" rounded="lg" src={project.thumbnail} />
      <MotionBox variants={overlayvariants} opacity="0.95" position="absolute" width="100%" height="100%" bgGradient={`linear(to-r, gray.800, gray.700)`} rounded="lg" zIndex="-1" />
      <MotionText variants={textvariants} paddingLeft="4" paddingTop="4" paddingBottom="1" fontWeight={700} fontSize="2xl">{project.title}</MotionText>
      <MotionText variants={textvariants} paddingLeft="4" fontSize="md" fontStyle="italic" color="red.300">{project.link}</MotionText>
      <MotionText variants={textvariants} padding="4">{project.description}</MotionText>
    </MotionBox>
  )
}