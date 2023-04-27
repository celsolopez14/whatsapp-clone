import {View, Text, StyleSheet, Pressable, Image} from 'react-native';

import { useNavigation } from '@react-navigation/native';


const ContactListItem = ({ user }) => {

    const navigation = useNavigation();

    return (
        <Pressable
        onPress={() =>{}}
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