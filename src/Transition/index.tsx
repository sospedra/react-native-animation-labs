import React, { useState, useRef } from 'react'
import { View, Dimensions, Button, ViewStyle, StyleSheet } from 'react-native'
import { Transitioning, Transition, TransitioningView } from 'react-native-reanimated'
import Screen, { ScreenNav } from '../components/Screen'
import Card from '../components/Card'

type Layout = {
  id: string
  name: string
  layout: {
    container: ViewStyle,
    child?: ViewStyle
  }
}

const column: Layout = {
  id: 'col',
  name: 'col',
  layout: {
    container: {}
  }
}

const row: Layout = {
  id: 'row',
  name: 'row',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }
}

const wrap: Layout = {
  id: 'wrap',
  name: 'wrap',
  layout: {
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    child: {
      flex: 0,
      width: Dimensions.get('window').width / 2 - 16
    }
  }
}

const TransitionLab: ScreenNav = () => {
  const [{ layout }, setLayout] = useState(column)
  const ref = useRef<TransitioningView>(null)
  
  return (
    <Screen>
      <Transitioning.View
        transition={<Transition.Change
          durationMs={400}
          interpolation='easeInOut'
        />}
        ref={ref}
        style={[styles.expand, layout.container]}
      >
        {[0, 1, 2].map((i) => (
          <Card key={i} style={layout.child} />
        ))}
      </Transitioning.View>

      <View style={styles.section}>
        {[column, row, wrap].map((layout) => (
          <Button
            key={layout.id}
            title={layout.name}
            onPress={() => {
              if (ref.current) {
                ref.current.animateNextTransition()
              }
              setLayout(layout)
            }}
          />
        ))}
      </View>
    </Screen>
  )
}

TransitionLab.navigationOptions = {
  title: 'Transition'
}

const styles = StyleSheet.create({
  expand: { flex: 1 },
  section: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    width: '100%',
  }
})

export default TransitionLab
