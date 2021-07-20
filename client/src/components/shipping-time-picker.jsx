import React, { useMemo } from 'react'
import { Picker } from 'zmp-framework/react'

const datePickerData = [
  {
    // Ngày
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => {
      const date = new Date()
      date.setDate(date.getDate() + day)
      return date
    }),
    displayValues: ['Hôm nay', 'Ngày mai'].concat([2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => {
      const date = new Date()
      date.setDate(date.getDate() + day)
      return date.toLocaleDateString()
    }))
  },
  // Giờ
  {
    values: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    displayValues: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(h => `${h} giờ`)
  },
  // Phút
  {
    values: [...Array(60)].map((v, i) => i),
    displayValues: [...Array(60)].map((v, i) => `${i} phút`)
  },
]

const ShippingTimePicker = ({ onChange, ...props }) => {
  const handleChangeDate = (picker, values) => {
    if (onChange) {
      onChange(values)
    }
  }

  const defaultValue = useMemo(() => {
    const now = datePickerData[0].values[0]
    return [now, now.getHours(), now.getMinutes()]
  })

  return (
    <Picker
      {...props}
      data={datePickerData}
      inputId="shipping-time-picker"
      onChange={handleChangeDate}
      defaultSelect={defaultValue}
      formatValue={(values, displayValues) => {
        return `${displayValues[0]}, ${displayValues[1]} ${displayValues[2]}`
      }}
    />
  )
}

ShippingTimePicker.displayName = 'zmp-shipping-time-picker'

export default ShippingTimePicker