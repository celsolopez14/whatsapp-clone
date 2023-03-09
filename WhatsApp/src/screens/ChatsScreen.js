import {View, Text, FlatList} from 'react-native';
import ChatListItem from '../components/ChatListItem';
import chats from '../../assets/data/chats.json';


const ChatScreen = () => {
    return (
       <FlatList
       data={chats}
       renderItem={({item}) => <ChatListItem chat={item}
       style={{backgroundColor:'white'}}
        />}
       />
    );
};


export default ChatScreen;