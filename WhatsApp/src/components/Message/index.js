import { View, Text, StyleSheet } from 'react-native'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import {Auth} from 'aws-amplify';
import * as React from 'react';

const Message = ({ message }) => {
    const [myMessage, setMyMessage] = React.useState(false);

    React.useEffect(() =>{
      const isMyMessage = async () =>{
        const authUser = await Auth.currentAuthenticatedUser();
        setMyMessage(message?.userID === authUser.attributes.sub);

    };
      isMyMessage();
    }, []);


  return (
    <View style={[style.container,
        {
            backgroundColor: myMessage ? '#DCF8C5' : 'white',
            alignSelf: myMessage? 'flex-end' : 'flex-start'
        }
    ]}>
      <Text>{message.text}</Text>
      <Text 
      style={style.time}>
        {dayjs(message.createdAt).fromNow(true)}
        </Text>
    </View>
  )
}

const style = StyleSheet.create({
container:{
    margin:5,
    padding:10,
    borderRadius:10,
    maxWidth:'80%',

    //Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
},
time:{
    color:'gray',
    alignSelf:'flex-end',
},
});

export default Message