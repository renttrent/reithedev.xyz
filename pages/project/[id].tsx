import { Badge, Box, Image, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ZIMA } from "../../styles/theme";
import { Project } from "../../types/general";
import { initSupabase } from "../../utils/supa.";

const markTheme = {
  p: (props: any) => {
    const { children } = props
    return (
      <Text fontSize="14px">{children}</Text>
    )
  }
}

const Project: NextPage<{supabaseKey: string}> = ({ supabaseKey }) => {
  const supabase = initSupabase(supabaseKey)
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("projects").select("*").eq("id", Router.query.id?.toString()).then((res) => { 
      setProject(res.body ? res.body[0]: "")
      setLoading(false)
    })
  }, [])

  const niceDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  } 

  if(loading) {
    return (
      <Stack mt="4" width="container.lg" height="80vh" margin="auto">
        <Skeleton width="100%" height="100%" />
      </Stack>
    )
  }

  return (
    <Stack mt="4" width="container.lg" margin="auto">
      <Text fontSize="4xl" fontWeight="bold" align="center" color="gray.700">{project?.title}</Text>
      <Text fontSize="xl" fontWeight="hairline" align="center">{project?.description}</Text>
      <Badge fontSize="md" fontWeight="medium" textAlign="center" fontStyle="italic" bg="blackAlpha.100" color={ZIMA}>{niceDate(project?.created_at || "")}</Badge>
      <Box height="50vh"><Image boxSize="full" objectFit="cover" src={project?.thumbnail} /></Box>
      <ReactMarkdown components={ChakraUIRenderer(markTheme)} children={project?.content || ""}/>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      supabaseKey: process.env.SUPABASE_KEY || ""
    }
  }
}

export default Project