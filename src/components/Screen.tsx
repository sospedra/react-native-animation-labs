import React from 'react'
import { SafeAreaView, ViewStyle } from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

export type ScreenNav = React.FC<{
  navigation: NavigationScreenProp<NavigationState>
}> & {
  navigationOptions: { title: string }
}

const Screen: React.FC<{
  style?: ViewStyle
}> = (props) => (
  <SafeAreaView
    style={[
      {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        width: '100%',
      },
      props.style,
    ]}
  >
    {props.children}
  </SafeAreaView>
)

export default Screen
