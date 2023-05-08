import { API, Auth, graphqlOperation } from "aws-amplify";



export const getCommonChatRoom = async (userID) =>{

    const authUser = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(graphqlOperation(listChatRooms, { id: authUser.attributes.sub } ));
    const myChatRoom = response.data?.getUser?.ChatRooms?.items || [];

    const chatRoom = myChatRoom.find(chatRoomItem => {
        return chatRoomItem.chatRoom.users.items.some(userItem => userItem.user.id == userID);
    })
    return chatRoom;

};

export const listChatRooms = /* GraphQL */ `
query GetUser($id: ID!) {
    getUser(id: $id) {
        id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
  `;