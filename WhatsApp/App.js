import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  } from 'react-native';
import Navigation from './src/components/Navigation';

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from "aws-amplify-react-native";


Amplify.configure(awsconfig)

function App() {

  
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


export default withAuthenticator(App);