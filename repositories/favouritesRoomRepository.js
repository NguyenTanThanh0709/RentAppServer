import { FavoritesRoom } from "../models/index.js";
class favouritesRoomRepository{

      async getUserFavorites(userId) {
        try {
          const userFavorites = await FavoritesRoom.findOne({ user: userId })
          .populate({
            path: 'post',
             model: 'Post',
             populate: [
              {
                  path: 'room',
                  model: 'RoomingHouse',
                  populate: [
                    {
                        path: 'amenities',
                    },
                    {
                        path: 'typehouse',
                    },
                    {
                        path: 'owner',
                    },
                    {
                        path: 'address',
                    },
                    {
                        path: 'serviceCharge.serviceChargeId',
                        model: 'ServiceCharge',
                    },
                    {
                        path: 'areaInformation.areaInformationID',
                        model: 'AreaInformation',
                    },
                ],
              },
          ],
          })
            .populate({
                path: 'user',
                model: 'Tenant',
              });
    
          return userFavorites;
        } catch (error) {
          throw error;
        }
      }
    
      async addRoomToUserFavorites(userId, roomId) {
        try {
          // Check if FavoritesRoom exists for the user
          let userFavorites = await FavoritesRoom.findOne({ user: userId });
          console.log(userFavorites)
          if (!userFavorites) {
            // If FavoritesRoom doesn't exist, create a new one
            const newFavoritesRoom = new FavoritesRoom({ user: userId, post: [roomId] });
            userFavorites = await newFavoritesRoom.save();
            return userFavorites;
          } else {
            // If FavoritesRoom exists, add the room to the array
            userFavorites = await FavoritesRoom.findOneAndUpdate(
              { user: userId },
              { $addToSet: { post: roomId } }, // Use $addToSet to add unique values to the array
              { new: true }
            );
          }
      
      
          return userFavorites;
        } catch (error) {
          throw error;
        }
      }
      
    
      async removeRoomFromUserFavorites(userId, roomId) {
        try {
          const updatedFavoritesRoom = await FavoritesRoom.findOneAndUpdate(
            { user: userId },
            { $pull: { post: roomId } },
            { new: true }
          )
    
          return updatedFavoritesRoom;
        } catch (error) {
          throw error;
        }
      }
    



}

export default new favouritesRoomRepository();