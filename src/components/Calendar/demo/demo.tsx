import { Calendar } from '@mudssky/react-components'
import dayjs from 'dayjs'
import React from 'react'

export default () => (
  <div className="App">
    <Calendar
      value={dayjs('2024-02-20')}
      onChange={(date) => {
        alert(date.format('YYYY-MM-DD'))
      }}
      // className={'aaa'}
      // style={{ background: 'yellow' }}
      locale="en-US"
      // dateInnerContent={(value) => {
      //   return (
      //     <div>
      //       <p style={{ background: 'yellowgreen', height: '30px' }}>
      //         {value.format('YYYY/MM/DD')}
      //       </p>
      //     </div>
      //   )
      // }}
      // dateRender={(value) => {
      //   return (
      //     <div>
      //       <p style={{ background: 'yellowgreen', height: '300px' }}>
      //         {value.format('YYYY/MM/DD')}
      //       </p>
      //     </div>
      //   )
      // }}
    ></Calendar>
  </div>
)
