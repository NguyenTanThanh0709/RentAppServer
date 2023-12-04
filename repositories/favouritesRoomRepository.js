import { FavoritesRoom } from "../models/index.js";
class favouritesRoomRepository{
    async create(favoritesRoomData) {
        try {
          const newFavoritesRoom = new FavoritesRoom(favoritesRoomData);
          console.log(newFavoritesRoom) ;

          const savedFavoritesRoom = await newFavoritesRoom.save();
          return savedFavoritesRoom;
        } catch (error) {
          throw error;
        }
      }
    
      async update(id, favoritesRoomData) {
        try {
          const updatedFavoritesRoom = await FavoritesRoom.findByIdAndUpdate(
            id,
            favoritesRoomData,
            { new: true, runValidators: true }
          );
          return updatedFavoritesRoom;
        } catch (error) {
          throw error;
        }
      }
    
      async delete(id) {
        try {
          const deletedFavoritesRoom = await FavoritesRoom.findByIdAndDelete(id);
          return deletedFavoritesRoom;
        } catch (error) {
          throw error;
        }
      }
    
      async getUserFavorites(userId) {
        try {
          const userFavorites = await FavoritesRoom.findOne({ user: userId })
            .populate({
              path: 'room',
              model: 'RoomingHouse',
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
          const updatedFavoritesRoom = await FavoritesRoom.findOneAndUpdate(
            { user: userId },
            { $addToSet: { room: roomId } }, // Use $addToSet to add unique values to the array
            { new: true }
          ).populate({
            path: 'room',
            model: 'RoomingHouse',
          })
          .populate({
              path: 'user',
              model: 'Tenant',
            });
          return updatedFavoritesRoom;
        } catch (error) {
          throw error;
        }
      }
    
      async removeRoomFromUserFavorites(userId, roomId) {
        try {
          const updatedFavoritesRoom = await FavoritesRoom.findOneAndUpdate(
            { user: userId },
            { $pull: { room: roomId } },
            { new: true }
          ).populate({
            path: 'room',
            model: 'RoomingHouse',
          })
          .populate({
              path: 'user',
              model: 'Tenant',
            });
    
          return updatedFavoritesRoom;
        } catch (error) {
          throw error;
        }
      }
    



}

export default new favouritesRoomRepository();