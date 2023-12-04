import { baivietRepository } from '../repositories/index.js'
   async function createPost(req, res, next) {
    const postData = req.body;
    try {
      const post = await baivietRepository.createPost(postData);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

   async function getAllPosts(req, res, next) {
    try {
      const posts = await baivietRepository.getAllPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

   async function getPostById(req, res, next) {
    const { postId } = req.params;
    try {
      const post = await baivietRepository.getPostById(postId);
      res.json(post);
    } catch (error) {
      next(error);
    }
  }

   async function updatePost(req, res, next) {
    const { postId } = req.params;
    const newData = req.body;
    try {
      const updatedPost = await baivietRepository.updatePost(postId, newData);
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

   async function deletePost(req, res, next) {
    const { postId } = req.params;
    try {
      await baivietRepository.deletePost(postId);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

   async function getAllPostsByUser(req, res, next) {
    const { userId } = req.params;
    try {
      const posts = await baivietRepository.getAllPostsByUser(userId);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

   async function getAllPostsByRoomingHouse(req, res, next) {
    const { roomingHouseId } = req.params;
    try {
      const posts = await baivietRepository.getAllPostsByRoomingHouse(roomingHouseId);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }


  export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getAllPostsByUser,
    getAllPostsByRoomingHouse,
  };