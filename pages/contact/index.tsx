import { Input, Textarea, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { ZIMA } from "../../styles/theme"
import { NextPage } from "next"

const FormStack = motion(VStack)

const Contact: NextPage = () => {

  const { register, handleSubmit, formState: { errors }} = useForm()
  const onSubmit = (data: any) => console.log(data);

  const variants = {
    hidden: {
      opacity: 0,
      y: 100
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1
      }
    },
    exit: {
      opacity: 0,
      y: 100
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormStack width="container.md" margin="auto" variants={variants} initial="hidden" animate="show" exit="exit">
        <Input type="text" placeholder="Email" {...register("email")} _focus={{outlineColor: ZIMA}}/>
        <Input type="text" placeholder="Subject" {...register("subject")} _focus={{outlineColor: ZIMA}}/>
        <Textarea placeholder="Content" {...register("content")} _focus={{outlineColor: ZIMA}}/>
        <Input type="submit" cursor="pointer"/>
      </FormStack>
    </form>
  )
}

export default Contact