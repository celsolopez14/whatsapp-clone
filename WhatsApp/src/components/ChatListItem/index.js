import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {onUpdateChatRoom} from '../../graphql/subscriptions';

import React from 'react';
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
    const navigation = useNavigation();
    const[user, setUser] = React.useState(null);
    const [chatRoom, setChatRoom] = React.useState(chat);

    React.useEffect(() =>{
        const fetchUser = async () =>{
            const authUser = await Auth.currentAuthenticatedUser();
            const userItem = chatRoom.users.items.find(item => item.user.id !== authUser.attributes.sub);


            setUser(userItem?.user);
        };

        fetchUser();

    }, []);


    React.useEffect(() =>{
    
        const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, {filter: {id: {eq : chat.id}},
        })).subscribe({
          next: ({value}) => {
            setChatRoom((cr) => ({
                ...(cr || {}),
                 ...value.data.onUpdateChatRoom,
                }));
          },
    
          error: (err) => console.warn(err),
      });
    
      return () => subscription.unsubscribe();
    
      
      }, [chat.id]);
    
     


    return (
        <Pressable
        onPress={() => navigation.navigate('Chat', {id: chatRoom.id, name: user?.name})}
        style={style.container}> 
            <Image
            source={{uri:user?.image}}
            style={style.image}
            />
            <View style={style.content}>
                <View style={style.row}>
                    <Text numberOfLines={1} style={style.name}>{user?.name}</Text>
                    {chatRoom.LastMessage && (<Text style={style.subTitle}>{dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}</Text>)}
                </View>
                <Text numberOfLines={2} style={style.subTitle}>
                    {chatRoom.LastMessage?.text}
                    </Text>
            </View>
        </Pressable>
       
    );
};


const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:10,
        marginVertical:5,
        height:70,
    },
    image:{
        height:60,
        width:60,
        borderRadius:30,
        marginRight:10,
    },
    content:{
        flex:1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:'lightgray',
    },
    row:{
        flexDirection:'row',
        marginBottom:5,
    },
    name:{
        flex:1,
        fontWeight:'bold',
    },
    subTitle:{
        color:'gray',
    }
});


export default ChatListItem;