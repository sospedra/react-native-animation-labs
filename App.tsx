import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { createAppContainer, FlatList } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Touchable from 'react-native-platform-touchable'
import Intro from './src/Intro'
import Transition from './src/Transition'

function Home (props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<string>
        data={[ 'Intro', 'Transition' ]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Touchable style={styles.button} onPress={() => props.navigation.navigate(item)}>
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </Touchable>
        )}
      />
    </SafeAreaView>
  )
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
  }
})

const AppNavigator = createStackNavigator({
  Home,
  Intro,
  Transition,
}, {
  initialRouteName: 'Transition'
})

export default createAppContainer(AppNavigator)