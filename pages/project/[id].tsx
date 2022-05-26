import { Box, HStack, Image, Stack, Text, chakra, Button, VStack, Link as ChakraLink } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ZIMA } from "../../styles/theme";
import { Project } from "../../types/general";
import { getSupabase } from "../../utils/supa.";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { createContext, useContext, useEffect, useState } from "react";
import { FaAngleLeft as LeftArrow } from "react-icons/fa"

interface contextValue {
  copied: boolean,
  setCopied: Function
}
const CopiedContext = createContext<contextValue>({ copied: false, setCopied: () => console.log("test") })

const normaltext = (props: any) => {
  const { children } = props
  return (
    <Box fontSize="1.2em" color="gray.700">{children}</Box>
  )
}

const litext = (props: any) => {
  const { children } = props
  return (
    <Box fontSize="1.2em" color="gray.700" _before={{ content: "'- '" }}>{children}</Box>
  )
}

const markTheme = {
  p: normaltext,
  li: litext,
  h1: (props: any) => {
    const { children } = props
    return (
      <Box fontSize={{ md: "3xl", base: "xl" }} fontWeight="bold" color="gray.700" my="2">{children}</Box>
    )
  },
  h2: (props: any) => {
    const { children } = props
    return (
      <Box fontSize={{ md: "2xl", base: "lg" }} fontWeight="bold" color="gray.700" my="2">{children}</Box>
    )
  },
  h3: (props: any) => {
    const { children } = props
    return (
      <Box fontSize={{ md: "xl", base: "md" }} fontWeight="bold" color="gray.700" my="2">{children}</Box>
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
      <Box fontFamily="monospace" fontSize="lg" p="2" bg="blackAlpha.50" borderLeft="8px solid" borderLeftColor="gray.500" m="5">{children}</Box>
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
    const { copied, setCopied } = useContext(CopiedContext)

    return (
      <Box rounded="lg" m="5" width="90%" position="relative">
        <SyntaxHighlighter showLineNumbers lineNumberStyle={{ color: ZIMA, borderRight: `1px solid ${ZIMA}`, marginRight: "1em" }} language="javascript" style={vscDarkPlus}>
          {children[0].props.children}
        </SyntaxHighlighter>

        {
          copied ?
            <Button position="absolute" top="2" right="2" variant="link" colorScheme="whiteAlpha" fontSize={14} disabled>Copied</Button>
            :
            <CopyToClipboard text={children[0].props.children.toString()} onCopy={() => setCopied(true)}>
              <Button position="absolute" top="2" right="2" variant="link" colorScheme="whiteAlpha" fontSize={14}>Copy</Button>
            </CopyToClipboard>
        }
      </Box>
    )
  }
}

const isCopied = (e: Event) => {
  e.preventDefault()
  return true
}

const Project: NextPage<{ project: Project }> = ({ project }) => {

  const niceDate = (date: string) => {
    const d = new Date(date)
    const nicedate = `${d.toLocaleDateString("default", { month: "short" })}, ${d.toLocaleString("default", { day: "numeric" })} ${d.getFullYear()}`
    return nicedate
  }

  const [copied, setCopied] = useState(false)

  useEffect(() => {

    window.addEventListener("copy", isCopied)

  }, [copied])

  return (
    <CopiedContext.Provider value={{ copied, setCopied }}>
      <Stack mt="4" width={{ md: "container.md", base: "container.sm" }} margin="auto">
        {/* <Text fontSize={{ md: "4xl", base: "2xl" }} fontWeight="bold" align="center" color="gray.700">{project?.title}</Text>
      <HStack alignSelf="center">
        <Badge fontSize={{ md: "md", base: "sm" }} fontWeight="medium" textAlign="center" fontStyle="italic" bg="blackAlpha.100" color={ZIMA}>{niceDate(project?.created_at || "")}</Badge>
        <Text fontSize={{ md: "xl", base: "sm" }} fontWeight="hairline" align="center">{project?.description}</Text>
      </HStack> */}
        <VStack align="flex-start" ml="4">
          <Link href="/">
            <ChakraLink _hover={{ color: ZIMA }}>
              <HStack>
                <LeftArrow />
                <Text>Go back</Text>
              </HStack>
            </ChakraLink>
          </Link>
        </VStack>
        <Box alignSelf="center" h={{ md: "50vh", base: "100%" }} w={{ md: "45vw", base: "" }}><Image boxSize="full" objectFit="contain" src={project?.thumbnail} /></Box>
        <Box width={{ md: "container.md", base: "container.sm" }} alignSelf="center" p="0" paddingLeft="4" paddingRight="4">
          <VStack align="flex-start">
            <Text fontSize={{ md: "md", base: "sm" }} color="gray.500" fontWeight="semibold">{project.description}</Text>
            <Text fontSize={{ md: "md", base: "sm" }} color="blue.700" fontWeight="semibold">{niceDate(project.created_at)}</Text>
          </VStack>
          <ReactMarkdown components={ChakraUIRenderer(markTheme)} remarkPlugins={[remarkGfm]}>{project?.content || ""}</ReactMarkdown>
        </Box>
      </Stack>
    </CopiedContext.Provider>
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

  if (!project) {
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