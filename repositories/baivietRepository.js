import Post_ from "../models/Post_.js"

class baivietRepository {
    async createPost(postData) {
        try {
          const post = new Post_(postData);
          return await post.save();
        } catch (error) {
          throw error;
        }
      }
    
    async getAllPosts() {
        try {
          return await Post_.find()
          .populate({
            path: 'room',
             model: 'RoomingHouse',
             populate: [
              {
                path: 'amenities',
              },
              {
                path: 'typehouse',
            },{
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
          })
          
          ; 
        } catch (error) {
          throw error;
        }
      }
    
    async getPostById(postId) {
        try {
          return await Post_.findById(postId)
          .populate({
            path: 'room',
             model: 'RoomingHouse',
             populate: [
              {
                path: 'amenities',
              },
              {
                path: 'typehouse',
            },{
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
          });
        } catch (error) {
          throw error;
        }
      }
    
    async updatePost(postId, newData) {
        try {
          return await Post_.findByIdAndUpdate(postId, newData, { new: true })
          .populate({
            path: 'room',
             model: 'RoomingHouse',
             populate: [
              {
                path: 'amenities',
              },
              {
                path: 'typehouse',
            },{
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
          });
        } catch (error) {
          throw error;
        }
      }
    
    async deletePost(postId) {
        try {
          return await Post_.findByIdAndDelete(postId);
        } catch (error) {
          throw error;
        }
      }

    async getAllPostsByUser(userId) {
        try {
          return await Post_.find({ user: userId })
          .populate({
            path: 'room',
             model: 'RoomingHouse',
             populate: [
              {
                path: 'amenities',
              },
              {
                path: 'typehouse',
            },{
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
          });
        } catch (error) {
          throw error;
        }
      }
    
    async getAllPostsByRoomingHouse(roomingHouseId) {
        try {
          return await Post_.find({ 'room': { $in: [roomingHouseId] } })
          .populate({
            path: 'room',
             model: 'RoomingHouse',
             populate: [
              {
                path: 'amenities',
              },
              {
                path: 'typehouse',
            },{
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
          });
        } catch (error) {
          throw error;
        }
      }

}

export default new baivietRepository();