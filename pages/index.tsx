import type { NextPage } from 'next'
import Head from 'next/head'
import { Background } from '../components/Background'
import { InfoGrid } from '../components/InfoGrid'
import { Logo } from '../components/Logo'
import { WelcomeGrid } from '../components/WelcomeGrid'

const Home: NextPage = () => {
  return (
    <div>
    <Background />
    <Logo />
    <WelcomeGrid /> 
    <InfoGrid />
   </div> 
  )
}

export default Home
