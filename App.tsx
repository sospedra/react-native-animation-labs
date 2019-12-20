import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { createAppContainer, FlatList } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Touchable from 'react-native-platform-touchable'
import Intro from './src/Intro'
import Timing from './src/Timing'

function Home (props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList<string>
        data={[ 'Intro' ]}
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
  Timing,
}, {
  initialRouteName: 'Timing'
});

export default createAppContainer(AppNavigator);