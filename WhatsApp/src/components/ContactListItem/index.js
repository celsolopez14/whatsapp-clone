import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createChatRoom, createUserChatRoom } from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import {getCommonChatRoom} from '../../services/chatRoomService';


const ContactListItem = ({ user }) => {

    const navigation = useNavigation();

    const onPress = async () =>{

        const existingChatRoom = await getCommonChatRoom(user.id);

        if(existingChatRoom){
            navigation.navigate('Chat', {id: existingChatRoom.id});
            return
        }

        const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {}})
        );

        if (!newChatRoomData.data?.createChatRoom){
            console.log('Error creating the chat.');
        }

        const newChatRoom = newChatRoomData.data?.createChatRoom;

        await API.graphql(graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: user.id }})
        );

        const authUser = await Auth.currentAuthenticatedUser();
        await API.graphql(graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: authUser.attributes.sub }})
        );

        navigation.navigate('Chat', {id: newChatRoom.id});

    };

    return (
        <Pressable
        onPress={onPress}
        style={style.container}> 
            <Image
            source={{uri:user.image}}
            style={style.image}
            />
            <View style={style.content}>
                <View style={style.row}>
                    <Text numberOfLines={1} style={style.name}>{user.name}</Text>
                </View>
                <Text numberOfLines={2} style={style.subTitle}>
                    {user.status}
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


export default ContactListItem;