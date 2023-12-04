import express from 'express';
import baivietController from '../controllers/baivietController.js';
const router = express.Router();



router.post('/create', baivietController.createPost);
router.get('/all', baivietController.getAllPosts);
router.get('/:postId', baivietController.getPostById);
router.put('/update/:postId', baivietController.updatePost);
router.delete('/delete/:postId', baivietController.deletePost);
router.get('/user/:userId', baivietController.getAllPostsByUser);
router.get('/roominghouse/:roomingHouseId', baivietController.getAllPostsByRoomingHouse);

export default router;
