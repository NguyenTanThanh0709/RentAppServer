import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import commentReviewRepository from '../repositories/commentReviewRepository.js';

const addCommentReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { tenantId, roomingHouseId, content, rating } = req.body;
  try {
    const newCommentReview = await commentReviewRepository.addCommentReview({
      tenant: tenantId,
      roomingHouse: roomingHouseId,
      content,
      rating,
      comment_date: new Date(),
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'CommentReview added successfully',
      data: newCommentReview,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const updateCommentReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { content, rating } = req.body;

  try {
    const updatedCommentReview = await commentReviewRepository.updateCommentReview(id, {
      content,
      rating,
      comment_date: new Date(),
    });

    res.status(HttpStatusCode.OK).json({
      message: 'CommentReview updated successfully',
      data: updatedCommentReview,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteCommentReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCommentReview = await commentReviewRepository.deleteCommentReview(id);
    res.status(HttpStatusCode.OK).json({
      message: 'CommentReview deleted successfully',
      data: deletedCommentReview,
    });
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getCommentsByRoomingHouseId = async (req, res) => {
  const { roomingHouseId } = req.params;

  try {
    const comments = await commentReviewRepository.getCommentsByRoomingHouseId(roomingHouseId);

    res.status(HttpStatusCode.OK).json({
      message: 'Comments retrieved successfully',
      data: comments,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  addCommentReview,
  updateCommentReview,
  deleteCommentReview,
  getCommentsByRoomingHouseId,
};
