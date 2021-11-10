import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma'
import { useEffect } from 'react'
import * as Plot from '@observablehq/plot'

import { Sample } from '../interfaces'

type Props = {
  data: Sample[]
}

export const getStaticProps: GetStaticProps = async () => {
  const data : Sample[] = await prisma.test.findMany()
  return { props: { data } }
}

const Home = ( { data } : Props ) => {
  useEffect(() => {
    var element = document.getElementById('chart')
    element?.append(
      Plot.plot({
        marginLeft: 45,
        marginTop: 30,
        marginBottom: 40,
        y: {
          grid: true
        },
        marks: [
          Plot.barY(data, {x: 'letter', y: 'frequency', fill: 'red'}),
          Plot.ruleY([0], {stroke: 'blue'})
        ]
      })
    )
  }, [])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Bexar Dash</title>
        <meta name="description" content="Created by Alejandro Zapien" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to Bexar-Dash!
        </h1>

        <p className={styles.description}>
          Bexar county polling data. Visualized. 
        </p>

        <div id="chart"></div>

        

     
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/bf-1.png" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
