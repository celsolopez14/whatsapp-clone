import {View, Text, StyleSheet, Image} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {

    return (
        <View style={style.container}>
            <Image
            source={{uri:chat.user.image}}
            style={style.image}
            />
            <View style={style.content}>
                <View style={style.row}>
                    <Text numberOfLines={1} style={style.name}>{chat.user.name}</Text>
                    <Text style={style.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
                </View>
                <Text numberOfLines={2} style={style.subTitle}>
                    {chat.lastMessage.text}
                    </Text>
            </View>
        </View>
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