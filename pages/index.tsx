import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Background } from '../components/Background'
import { InfoGrid } from '../components/InfoGrid'
import { WelcomeGrid } from '../components/WelcomeGrid'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabaseUrl = 'https://vuoszjbifkmjeadyrrdl.supabase.co'

const getProjects = async (supabase: SupabaseClient) => {
  let { data: projects, error } = await supabase.from('projects').select('*')
  return projects
}

const Home: NextPage<{supabaseKey: string}> = ({ supabaseKey }) => {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const [projects, setProjects] = useState([])
  useEffect(() => {
    //@ts-ignore
    getProjects(supabase).then((res) => setProjects(res))
  }, [])
  return (
    <div>
    <Background />
    <WelcomeGrid /> 
    <InfoGrid projects={projects}/>
   </div> 
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
}