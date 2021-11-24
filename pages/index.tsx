import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MovieList from '../src/components/MovieList'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Xepelin</title>
      </Head>

      <main className={styles.main}>
        <MovieList title="Más populares" subtitle="Nullam sapien arcu tempor" endpoint="popular" />
        {/* <MovieList title="Mejor evaluadas" subtitle="Nullam sapien arcu tempor" endpoint="top_rated" /> */}
        {/* <MovieList title="Próximos estrenos" subtitle="Nullam sapien arcu tempor" endpoint="upcoming" /> */}
      </main>
    </div>
  )
}

export default Home
