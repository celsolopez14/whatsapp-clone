import * as React from 'react'
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

const InputBox = () => {
    const [message, setMessage] = React.useState('');

    const onSend = () => {
        console.warn(`Sending a new message:${message}`);
        setMessage('');
    }

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