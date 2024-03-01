import React from 'react'
import UserDetails from './UserDetails'
import ChartContainer from './ChartContainer'

export default function MessageCard() {
  return (
   <div className='grid grid-cols-3 h-full'>
   <UserDetails/>
   <ChartContainer/>
   </div>
  )
}
