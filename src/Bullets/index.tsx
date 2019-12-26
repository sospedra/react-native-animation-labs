import React from 'react'
import Animated from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { StyleSheet, Dimensions, View } from 'react-native'
import Screen, { ScreenNav } from '../components/Screen'

const HALF = Dimensions.get('window').width / 2
const MID = HALF / 2

const Bullets: ScreenNav = () => {
  const { translationX, state, translateMemoX } = {
    translationX: new Animated.Value(0),
    state: new Animated.Value(State.UNDETERMINED),
    translateMemoX: new Animated.Value(0),
  }
  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX,
          state,
        },
      },
    ],
    { useNativeDriver: true },
  )
  const translateX = Animated.cond(
    Animated.eq(state, State.END),
    [
      Animated.set(translateMemoX, Animated.add(translateMemoX, translationX)),
      translateMemoX,
    ],
    Animated.add(translateMemoX, translationX),
  )

  return (
    <Screen style={styles.screen}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.row}>
            <Animated.View
              style={[
                styles.bullet,
                {
                  transform: [
                    {
                      translateX: Animated.interpolate(translateX, {
                        inputRange: [0, MID - 50, MID, MID + 50, HALF],
                        outputRange: [0, MID - 8, MID - 8, MID - 8, HALF - 16],
                        extrapolate: Animated.Extrapolate.CLAMP,
                      }),
                      scale: Animated.interpolate(translateX, {
                        inputRange: [0, MID, HALF],
                        outputRange: [1, 2, 1],
                        extrapolate: Animated.Extrapolate.CLAMP,
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Screen>
  )
}

Bullets.navigationOptions = {
  title: 'Bullets',
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '50%',
    height: 400,
    backgroundColor: '#fabada70',
  },
  bullet: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000',
  },
})

export default Bullets
