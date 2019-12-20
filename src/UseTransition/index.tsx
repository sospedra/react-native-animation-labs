import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTransition } from 'react-native-redash'
import Screen, { ScreenNav } from '../components/Screen'
import Card from '../components/Card'

const { multiply, interpolate } = Animated

const UseTransition: ScreenNav = () => {
  const [isToggle, setIsToggle] = useState(false)
  const transition = useTransition(isToggle)

  return (
    <Screen style={styles.screen}>
      {[0, 1, 2].map((i) => {
        const direction = i === 0 ? -1 : i === 1 ? 0 : 1
        const rotate = multiply(direction, interpolate(transition, {
          inputRange: [0, 1],
          outputRange: [0, Math.PI / 6]
        }))
        return (
          <Animated.View key={i} style={[
            styles.overlay,
            {transform: [
              { translateX: -109 },
              { rotate: rotate },
              { translateX: 109 },
            ]}
          ]}>
            <Card style={{ width: 250, flex: 0 }} />
          </Animated.View>
        )
      })}

      <View style={styles.section}>
        <Button
          title='Toggle'
          onPress={() => setIsToggle(!isToggle)}
        />
      </View>
    </Screen>
  )
}

UseTransition.navigationOptions = {
  title: 'useTransition'
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    width: '100%',
  }
})

export default UseTransition
