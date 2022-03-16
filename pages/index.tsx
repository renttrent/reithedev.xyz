import type { NextPage } from 'next'
import Head from 'next/head'
import { Background } from '../components/Background'
import { InfoGrid } from '../components/InfoGrid'
import { WelcomeGrid } from '../components/WelcomeGrid'

const Home: NextPage = () => {
  return (
    <div>
    <Background />
    <WelcomeGrid /> 
    <InfoGrid />
   </div> 
  )
}

export default Home
