import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import {
  createAppContainer,
  FlatList,
  NavigationScreenProp,
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Touchable from 'react-native-platform-touchable'
import Bullets from './src/Bullets'
import Intro from './src/Intro'
import Liquid from './src/Liquid'
import LiquidBeacon from './src/Liquid-Beacon'
import Pan from './src/Pan'
import Timing from './src/Timing'
import Transition from './src/Transition'
import UseTransition from './src/UseTransition'

const routes = {
  Home,
  Bullets,
  Intro,
  Liquid,
  LiquidBeacon,
  Pan,
  Timing,
  Transition,
  UseTransition,
}
function Home(props: { navigation: NavigationScreenProp<{}> }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<string>
        data={Object.keys(routes)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Touchable
            style={styles.button}
            onPress={() => props.navigation.navigate(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </Touchable>
        )}
      />
    </SafeAreaView>
  )
}

Home.navigationOptions = {
  title: 'Animation Labs',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#cddddd',
    marginBottom: 8,
  },
  buttonText: { fontSize: 16 },
})

const AppNavigator = createStackNavigator(routes, {
  initialRouteName: 'Bullets',
})

export default createAppContainer(AppNavigator)
