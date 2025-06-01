import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import BankSlider from '../components/BankSlider'
import BankFeatures from '../components/BankFeatures'
import Testimonials from '../components/Testimonials'
import './Home.css'

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <BankSlider />
      <BankFeatures />
    </>
  )
}

export default Home