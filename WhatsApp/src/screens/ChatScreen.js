import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import Message from '../components/Message'
import messages from '../../assets/data/messages.json'
import bg from '../../assets/images/BG.png';
import InputBox from '../components/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import * as React from 'react';


const ChatScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const headerHeight = useHeaderHeight();

  React.useEffect(() => {

    navigation.setOptions({title: route.params.name});
  }, [route.params.name]);

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