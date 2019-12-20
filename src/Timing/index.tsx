import React, { useState } from 'react'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { useTransition } from 'react-native-redash'
import Screen, { ScreenNav } from '../components/Screen'
import Card from '../components/Card'

const HALF = Dimensions.get('window').width / 2 - 50
const {
  startClock,
  stopClock,
  clockRunning,
  Clock,
  Extrapolate,
  not,
  useCode,
  block,
  cond,
  set,
  Value,
  interpolate,
  timing,
  eq,
} = Animated

const bubbles = [
  { top: 200, right: HALF - 100 },
  { top: 350, right: HALF },
  { top: 200, left: HALF - 100 },
]

const runTime = (clock: Animated.Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  }
  const config = {
    toValue: 1,
    duration: 1000,
    easing: Easing.bounce,
  }
  return block([
    cond(not(clockRunning(clock)), startClock(clock)),
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.position, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
    ]),
    state.position
  ])
}

const Timing: ScreenNav = () => {
  const [isToggle, setIsToggle] = useState(false)
  const progress = new Value(0)
  const clock = new Clock()
  const x = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  })
  const y = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(() => block([
    set(progress, runTime(clock))
  ]), [])

  return (
    <Screen style={styles.screen}>
      {bubbles.map((bubble, i) => (
        <Animated.View key={i} style={[
          styles.bubble,
          bubble,
          { transform: [
            { translateX: x },
            { translateY: y },
          ] }
        ]}>
          <Card circle />
        </Animated.View>
      ))}

      <View style={styles.section}>
        <Button
          title='Toggle'
          onPress={() => setIsToggle(!isToggle)}
        />
      </View>
    </Screen>
  )
}

Timing.navigationOptions = {
  title: 'Timing'
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'flex-end' },
  bubble: {
    position: 'absolute',
  },
  section: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    width: '100%',
  }
})

export default Timing
