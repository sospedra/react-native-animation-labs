import React from 'react'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent } from 'react-native-redash'
import Card from '../components/Card'
import Screen, { ScreenNav } from '../components/Screen'

const { Value } = Animated

const Pan: ScreenNav = () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
  })

  return (
    <Screen>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              { translateX: translationX },
              { translateY: translationY },
            ],
          }}
        >
          <Card style={{ width: 200 }} />
        </Animated.View>
      </PanGestureHandler>
    </Screen>
  )
}

Pan.navigationOptions = {
  title: 'Pan',
}

export default Pan
