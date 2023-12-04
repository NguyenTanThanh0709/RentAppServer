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
          return await Post_.find().populate('user room');
        } catch (error) {
          throw error;
        }
      }
    
    async getPostById(postId) {
        try {
          return await Post_.findById(postId).populate('user room');
        } catch (error) {
          throw error;
        }
      }
    
    async updatePost(postId, newData) {
        try {
          return await Post_.findByIdAndUpdate(postId, newData, { new: true }).populate('user room');
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
          return await Post_.find({ user: userId }).populate('user room');
        } catch (error) {
          throw error;
        }
      }
    
    async getAllPostsByRoomingHouse(roomingHouseId) {
        try {
          return await Post_.find({ 'room': { $in: [roomingHouseId] } }).populate('user room');
        } catch (error) {
          throw error;
        }
      }

}

export default new baivietRepository();