
import React from 'react'
import { Hero } from './components/Hero'
import Section1 from "../app/components/Section1"
import Section2 from "../app/components/Section2"
import Section3 from "../app/components/Section3"
const page = () => {
  return (
    <div><Hero/>
    <Section1/>
    <Section2/>
    <Section3/>
    </div>
  )
}

export default page