import Post_ from "../models/Post_.js"

function parseDateString(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Note: Month is zero-based in JavaScript dates
}

class baivietRepository {

  

  async createPost(postData) {
    try {
      postData.day_up = parseDateString(postData.day_up);
      const post = new Post_(postData);
      const savedPost = await post.save();
  
      // Use the populated function to fetch the post with related data
      const populatedPost = await Post_.findById(savedPost._id)
        .populate({
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
        });
  
      return populatedPost;
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
          newData.day_up = parseDateString(newData.day_up);
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