import {View, Text, FlatList} from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import chats from '../../../assets/data/chats.json';
import {API, graphqlOperation, Auth, DataStore} from 'aws-amplify';
import {listChatRooms} from './queries';
import * as React from 'react';


const ChatScreen = () => {
    const [chatRoom, setChatRooms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const fetchChatRooms = async () => {
        setLoading(true);
        const authUser = await Auth.currentAuthenticatedUser();
        const response = await API.graphql(graphqlOperation(listChatRooms, {id: authUser.attributes.sub }));

        const rooms = response?.data?.getUser?.ChatRooms?.items || [];
        const sortedRooms = rooms.sort((room1, room2)=> new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt));

        setChatRooms(sortedRooms);
        console.log("sorted", sortedRooms);
        setLoading(false);

    };



    React.useEffect(() => {
        fetchChatRooms();
    }, []);

    return (
       <FlatList
       data={chatRoom}
       renderItem={({item}) => <ChatListItem chat={item.chatRoom}
       style={{backgroundColor:'white'}}
        />}
        refreshing={loading}
        onRefresh={fetchChatRooms}
       />
    );
};


export default ChatScreen;