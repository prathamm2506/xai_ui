import React from 'react'
import Hero from '../components/hero/Hero'
import Features from '../components/features/Features'
import Faq from '../components/faq/Faq'
import Footer from '../components/footer/Footer'
import Pricing from '../components/pricing/Pricing'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Features/>
      <Pricing/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default Home
