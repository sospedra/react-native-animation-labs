import React, { useState } from 'react'
import { Button } from 'react-native'
import Animated from 'react-native-reanimated'
import { useMemoOne } from 'use-memo-one'
import Card from '../components/Card'
import Screen from '../components/Screen'

const duration = 2000
const {
  cond,
  useCode,
  not,
  clockRunning,
  eq,
  startClock,
  stopClock,
  set,
  add,
  interpolate,
  Clock,
  Value,
  block,
  Extrapolate,
} = Animated

export default function App() {
  const [isVisible, setIsVisible] = useState(true)
  const { time, clock, progress } = useMemoOne(
    () => ({
      clock: new Clock(),
      progress: new Value(0),
      time: new Value(0),
    }),
    [],
  )
  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: isVisible ? [0, 1] : [1, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, duration)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          }),
        ),
        cond(eq(progress, 1), stopClock(clock)),
      ]),
    [isVisible],
  )

  return (
    <Screen>
      <Animated.View style={{ opacity }}>
        <Card />
      </Animated.View>
      <Button title='Toggle' onPress={() => setIsVisible((prev) => !prev)} />
    </Screen>
  )
}
