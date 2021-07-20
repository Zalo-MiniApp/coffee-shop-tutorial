import React from 'react'
import { Text } from 'zmp-framework/react'

export const Price = ({ amount, unit, ...props }) => <Text {...props}>{amount.toLocaleString()}{unit ? unit : ' VNĐ'}</Text>

export const ExtraPrice = ({ amount, ...props }) => <Text className="text-secondary" {...props}>+{amount.toLocaleString()} đ</Text>