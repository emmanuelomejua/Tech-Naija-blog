import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const url = 'http://localhost:4003/blog/post'
  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  console.log(search)

  useEffect(()=> {
    const fetchposts = async () => {
      const res = await axios.get(url + search)
      setPosts(res.data)
    }
    fetchposts()
  }, [search])
  return (
    <>
       <Header/>
      <div className='home'>
      <Posts posts={posts}/>
      <Sidebar/>
      </div>
    </>

  )
}

export default Home
