import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  } from 'react-native';
import Navigation from './src/components/Navigation';



export default function App() {

  
  return (
    <View style={styles.container}>
      <Navigation/>
      <StatusBar style='dark' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'whitesmoke',
  },
});
