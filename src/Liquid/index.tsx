import React from 'react'
import Animated from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { horizontalPanGestureHandler } from 'react-native-redash'
import Screen, { ScreenNav } from '../components/Screen'

// const { Value, interpolate, Extrapolate } = Animated

const Liquid: ScreenNav = () => {
  const { gestureHandler, translationX } = horizontalPanGestureHandler()

  return (
    <Screen>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.liquid,
            {
              transform: [{ translateX: translationX }],
            },
          ]}
        />
      </PanGestureHandler>
    </Screen>
  )
}

const styles = StyleSheet.create({
  liquid: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    height: '70%',
    backgroundColor: 'purple',
  },
})

Liquid.navigationOptions = {
  title: 'Liquid',
}

export default Liquid
