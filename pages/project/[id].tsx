import { Badge, Box, HStack, Image, Stack, Text, chakra, Code } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {  GetStaticPaths, GetStaticProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ZIMA } from "../../styles/theme";
import { Project } from "../../types/general";
import { getSupabase } from "../../utils/supa.";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs"

const normaltext = (props: any) => {
  const { children } = props
  return (
    <Text fontSize="1.2em" color="gray.700">{children}</Text>
  )
}

const litext = (props: any) => {
  const { children } = props
  return (
    <Text fontSize="1.2em" color="gray.700" _before={{ content: "'- '" }}>{children}</Text>
  )
}

const markTheme = {
  p: normaltext,
  li: litext,
  h1: (props: any) => {
    const { children } = props
    return (
      <Text fontSize="3xl" fontWeight="bold" color="gray.700" my="2">{children}</Text>
    )
  },
  h2: (props: any) => {
    const { children } = props
    return (
      <Text fontSize="2xl" fontWeight="bold" color="gray.700" my="2">{children}</Text>
    )
  },
  h3: (props: any) => {
    const { children } = props
    return (
      <Text fontSize="xl" fontWeight="bold" color="gray.700" my="2">{children}</Text>
    )
  },
  strong: (props: any) => {
    const { children } = props
    return (
      <chakra.span fontWeight="semibold" color="gray.700">{children}</chakra.span>
    ) 
  },
  blockquote: (props: any) => {
    const { children } = props
    return (
      <Text fontFamily="monospace" fontSize="lg" p="2" bg="blackAlpha.50" borderLeft="8px solid" borderLeftColor="gray.500" m="5">{children}</Text>
    )
  },
  code: (props: any) => {
    const { children } = props
    return (
      <chakra.span fontFamily="monospace" fontSize="lg" bg="gray.400" color="white" p="1" rounded="sm">{children}</chakra.span>
    )
  },
  pre: (props: any) => {
    const { children } = props
    console.log(children)
    return (
      <Box rounded="lg" m="5">
        <SyntaxHighlighter showLineNumbers lineNumberStyle={{ color: ZIMA, borderRight: `1px solid ${ZIMA}`, marginRight: "1em" }} language="javascript" style={dracula} children={children[0].props.children} />
      </Box>
    ) 
  }
}

const Project: NextPage<{project: Project}> = ({ project }) => {

  const niceDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
  } 

  return (
    <Stack mt="4" width={{ md: "container.lg", base: "sm" }} margin="auto">
      <Text fontSize={{ md: "4xl", base: "xl" }} fontWeight="bold" align="center" color="gray.700">{project?.title}</Text>
      <HStack alignSelf="center">
        <Badge fontSize={{ md: "md", base: "sm" }} fontWeight="medium" textAlign="center" fontStyle="italic" bg="blackAlpha.100" color={ZIMA}>{niceDate(project?.created_at || "")}</Badge>
        <Text fontSize={{ md: "xl", base: "sm" }} fontWeight="hairline" align="center">{project?.description}</Text>
      </HStack>
      <Box alignSelf="center" h={{ md: "50vh", base: "100%" }} w={{ md: "45vw", base: ""}}><Image boxSize="full" objectFit="contain" src={project?.thumbnail} /></Box>
      <Box width="container.sm" alignSelf="center">
        <ReactMarkdown skipHtml components={ChakraUIRenderer(markTheme)} remarkPlugins={[remarkGfm]}>{project?.content || ""}</ReactMarkdown> 
      </Box>
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