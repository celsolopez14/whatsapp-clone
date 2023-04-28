import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  } from 'react-native';
import Navigation from './src/components/Navigation';
import * as React from 'react';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from "aws-amplify-react-native";
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';


Amplify.configure({...awsconfig, Analytics:{disabled : true}})

function App() {

React.useEffect(() => {
  const syncUser = async () => {

    const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

    const userData = await API.graphql(graphqlOperation(getUser, {id: authUser.attributes.sub})
    );

    if(userData.data.getUser){
      console.log("User already exists in database.");
      return;
    }

    const newUser = {
      id:authUser.attributes.sub,
      name:authUser.attributes.phone_number,
      status:'Hey, I am using Whatsapp',
    };

    const newUserResponse = await API.graphql(graphqlOperation(createUser, {input: newUser})
    );

  };

  syncUser();

}, []);

  
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