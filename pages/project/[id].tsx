import { Badge, Box, Image, Stack, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {  GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { ZIMA } from "../../styles/theme";
import { Project } from "../../types/general";
import { getSupabase } from "../../utils/supa.";

const markTheme = {
  p: (props: any) => {
    const { children } = props
    return (
      <Text fontSize="14px">{children}</Text>
    )
  }
}

const Project: NextPage<{project: Project}> = ({ project }) => {

  const niceDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  } 

  return (
    <Stack mt="4" width="container.lg" margin="auto">
      <Text fontSize="4xl" fontWeight="bold" align="center" color="gray.700">{project?.title}</Text>
      <Text fontSize="xl" fontWeight="hairline" align="center">{project?.description}</Text>
      <Badge fontSize="md" fontWeight="medium" textAlign="center" fontStyle="italic" bg="blackAlpha.100" color={ZIMA}>{niceDate(project?.created_at || "")}</Badge>
      <Box height="50vh"><Image boxSize="full" objectFit="cover" src={project?.thumbnail} /></Box>
      <ReactMarkdown components={ChakraUIRenderer(markTheme)}>{project?.content || ""}</ReactMarkdown> 
    </Stack>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const supabase = getSupabase()
  const projects = await (await supabase.from("projects").select("*")).data
  
  //@ts-ignore
  const paths = projects.map((p) => ({ params: { id: p.id.toString() } }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const supabase = getSupabase()
  const project = await (await supabase.from("projects").select("*").eq("id", params?.id)).data

  if(!project) {
    return {
      props: {
        project: {}
      }
    }
  }

  return {
    props: {
      project: project[0]
    },
    revalidate: 60
  }
}

export default Project