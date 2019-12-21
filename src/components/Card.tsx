import React, { useMemo } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import randomcolor from 'randomcolor'

const Card: React.FC<{
  style?: ViewStyle
  circle?: boolean
}> = (props) => {
  const color = useMemo(() => randomcolor(), [])
  return (
    <View style={[
      styles.card,
      props.circle && styles.circle,
      props.style,
      { backgroundColor: color },
    ]} />
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
    borderRadius: 8,
    margin: 8
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    flex: 0,
  }
})

export default Card
