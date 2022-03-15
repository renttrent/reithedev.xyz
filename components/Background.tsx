import { Box } from "@chakra-ui/react"
import { ZIMA } from "../styles/theme"

export const Background: React.FC<{}> = () => {
  return (
    <>
    <Box
      position="absolute"
      w="15vw"
      h="20vh"
      bg={`radial-gradient(${ZIMA} 0%, #F7FAFC 70%)`}
      zIndex="-100"
      opacity="0.1"
      top="20"
      left="40"
    />
    <Box 
      position="absolute"
      w="25vw"
      h="20vh"
      zIndex="-101"
      opacity="0.1"
      top="40"
      left="60"
      bg={`radial-gradient(#F687B3 0%, #F7FAFC 70%)`}
    />
    </>
  )
}