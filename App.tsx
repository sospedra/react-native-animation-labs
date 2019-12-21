import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { createAppContainer, FlatList } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Touchable from 'react-native-platform-touchable'
import Intro from './src/Intro'
import Transition from './src/Transition'
import UseTransition from './src/UseTransition'
import Timing from './src/Timing'
import Pan from './src/Pan'

const routes = {
  Home,
  Intro,
  Transition,
  UseTransition,
  Timing,
  Pan,
}
function Home (props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<string>
        data={Object.keys(routes)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Touchable style={styles.button} onPress={() => props.navigation.navigate(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </Touchable>
        )}
      />
    </SafeAreaView>
  )
}

Home.navigationOptions = {
  title: 'Animation Labs'
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
  buttonText: { fontSize: 16 }
})

const AppNavigator = createStackNavigator(routes, {
  initialRouteName: 'Pan'
})

export default createAppContainer(AppNavigator)