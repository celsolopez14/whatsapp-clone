import {View, Text, FlatList} from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import chats from '../../../assets/data/chats.json';
import {API, graphqlOperation, Auth, DataStore} from 'aws-amplify';
import {listChatRooms} from './queries';
import * as React from 'react';


const ChatScreen = () => {
    const [chatRoom, setChatRooms] = React.useState([]);



    React.useEffect(() => {
        const fetchChatRooms = async () => {
            const authUser = await Auth.currentAuthenticatedUser();
            const response = await API.graphql(graphqlOperation(listChatRooms, {id: authUser.attributes.sub }));
            setChatRooms(response.data.getUser.ChatRooms.items);
        };

        fetchChatRooms();
    }, []);
    return (
       <FlatList
       data={chatRoom}
       renderItem={({item}) => <ChatListItem chat={item.chatRoom}
       style={{backgroundColor:'white'}}
        />}
       />
    );
};


export default ChatScreen;