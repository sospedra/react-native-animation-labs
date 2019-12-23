import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent, snapPoint } from 'react-native-redash'
import Weave from './Weave'
import {
  initialSideWidth,
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiusBack,
  waveVertRadius,
} from './WeaveHelpers'
import Content, { ContentProps } from './Content'
import Button from './Button'
import { ScreenNav } from '../components/Screen'

export const assets = [
  require('./assets/firstPageImage.png'),
  require('./assets/secondPageImage.png'),
]

const front: ContentProps = {
  backgroundColor: '#4d1168',
  source: assets[1],
  title1: 'Animated',
  title2: 'Attatop',
  color: '#fd5587',
}

const back: ContentProps = {
  backgroundColor: 'white',
  source: assets[0],
  title1: 'Animated',
  title2: 'Background',
  color: 'black',
}

const { width } = Dimensions.get('window')
const maxWidth = width - initialSideWidth
const {
  Value,
  SpringUtils,
  Clock,
  block,
  spring,
  startClock,
  clockRunning,
  stopClock,
  set,
  cond,
  multiply,
  divide,
  interpolate,
} = Animated

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const followPointer = (value: Animated.Node<number>) => {
  const clock = new Clock()
  const config = SpringUtils.makeDefaultConfig()
  const state = {
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
    finished: new Value(0),
  }

  return block([
    startClock(clock),
    set(config.toValue, value),
    spring(clock, state, config),
    state.position,
  ])
}

const LiquidBeacon: ScreenNav = () => {
  const isBack = new Value(0)
  const y = new Value(initialWaveCenter)
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const velocityX = new Value(0)
  const gestureHandler = onGestureEvent({ y, state, translationX, velocityX })
  const centerY = followPointer(y)
  const progress = interpolate(translationX, {
    inputRange: [-maxWidth, 0],
    outputRange: [0.4, 0],
  })
  const horRadius = waveHorRadius(progress)
  const vertRadius = waveVertRadius(progress)
  const sWidth = sideWidth(progress)
  return (
    <View style={styles.container}>
      <Content {...back} />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

LiquidBeacon.navigationOptions = {
  title: 'Liquid Beacon',
}

export default LiquidBeacon
