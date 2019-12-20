import React, { useMemo } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import randomcolor from 'randomcolor'

const Card: React.FC<{
  style?: ViewStyle
}> = (props) => {
  const color = useMemo(() => randomcolor(), [])
  return (
    <View style={[
      styles.card,
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
  }
})

export default Card
