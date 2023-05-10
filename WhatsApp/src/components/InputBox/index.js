import * as React from 'react'
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createMessage, updateChatRoom} from '../../graphql/mutations';

const InputBox = ({chatRoom}) => {
    const [message, setMessage] = React.useState('');

    const onSend = async () => {
        console.warn(`Sending a new message:${message}`);

        const authUser = await Auth.currentAuthenticatedUser();

        console.log(chatRoom);

        const newMessage = {
          chatroomID: chatRoom.id,
          text: message,
          userID: authUser.attributes.sub
        }

        const newMessageData = await API.graphql(graphqlOperation(createMessage, {input: newMessage}));

        setMessage('');

        await API.graphql(graphqlOperation(updateChatRoom, {
          input:{
            _version: chatRoom._version,
            chatRoomLastMessageId: newMessageData.data?.createMessage?.id,
            id: chatRoom.id
          }
        }));
    };

  return (
    <SafeAreaView edges={['bottom']} style={style.container}>

      <AntDesign name='plus' size={16} color='royalblue' style={{margin:5}} />

      <TextInput 
      style={style.input}
      value={message}
      onChangeText={setMessage}
      placeholder='type your message...'
      />

      <MaterialIcons onPress={onSend} style={style.send} name='send' size={16} color='white' />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'whitesmoke',
        padding:5,
        paddingHorizontal:10,
        alignItems:'center',
    },
    input:{
        flex:1,
        backgroundColor:'white',
        padding:5,
        marginHorizontal:5,
        borderRadius:50,
        borderColor:'lightgray',
        borderWidth:StyleSheet.hairlineWidth,
        paddingHorizontal:5,
        fontSize:16,
    },
    send:{
        backgroundColor:'royalblue',
        padding:7,
        borderRadius:15,
        margin:5,
        overflow:'hidden',
    },

});

export default InputBox