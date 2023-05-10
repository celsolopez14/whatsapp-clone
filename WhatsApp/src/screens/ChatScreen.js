import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import Message from '../components/Message'
import messages from '../../assets/data/messages.json'
import bg from '../../assets/images/BG.png';
import InputBox from '../components/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import * as React from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {getChatRoom, listMessagesByChatRoom} from '../graphql/queries';


const ChatScreen = () => {
  const [chatRoom, setChatRoom] = React.useState(null);
  const [messages, setMessages] = React.useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const headerHeight = useHeaderHeight();

  const chatroomID = route.params.id;

  React.useEffect(() =>{

    API.graphql(graphqlOperation(getChatRoom, {id: chatroomID})).then(result => {
      setChatRoom(result.data?.getChatRoom);
    });

  }, [chatroomID]);

  React.useEffect(() =>{

    API.graphql(graphqlOperation(listMessagesByChatRoom, {chatroomID, sortDirection: "DESC"})).then(result => {
      setMessages(result.data?.listMessagesByChatRoom?.items);
    });
  }, [chatroomID]);

  React.useEffect(() => {

    navigation.setOptions({title: route.params.name});
  }, [route.params.name]);

  if(!chatRoom){
    return <ActivityIndicator/>
  }


  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    keyboardVerticalOffset={headerHeight}
    style={style.bg}>
      <ImageBackground source={bg} style={style.bg}>
          <FlatList
          data={messages}
          renderItem={({item}) => <Message message={item}/>}
          style={style.list}
          inverted
          />
         <InputBox chatRoom={chatRoom}/>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create({
    bg:{
        flex:1,
    },
    list:{
        padding:10,
    },

})

export default ChatScreen