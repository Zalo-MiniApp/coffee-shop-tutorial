import React from 'react'
import { Text } from 'zmp-framework/react';

export const Price = ({ amount, ...props }) => <Text {...props}>{amount.toLocaleString()} VNĐ</Text>

export const ExtraPrice = ({ amount, ...props }) => <Text className="text-secondary" {...props}>+{amount.toLocaleString()} đ</Text>