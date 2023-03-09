import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native'
import Message from '../components/Message'
import messages from '../../assets/data/messages.json'
import bg from '../../assets/images/BG.png';
import InputBox from '../components/InputBox';

const ChatScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style.bg}>
    <ImageBackground source={bg} style={style.bg}>
        <FlatList
        data={messages}
        renderItem={({item}) => <Message message={item}/>}
        style={style.list}
        inverted
        />
        <InputBox/>
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