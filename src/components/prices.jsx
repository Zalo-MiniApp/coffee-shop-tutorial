import React from 'react'
import { Text } from 'zmp-framework/react';

export const Price = ({ amount, ...props }) => <Text {...props}>{amount.toLocaleString()} VNĐ</Text>

export const ExtraPrice = ({ amount, ...props }) => <span {...props}>+{amount.toLocaleString()} đ</span>