import CommentReview from '../models/CommentReview.js';


class CommentReviewRepository {
  async addCommentReview(commentReviewData) {
    try {
      const newCommentReview = new CommentReview(commentReviewData);
      const savedCommentReview = await newCommentReview.save();
      return savedCommentReview;
    } catch (error) {
      throw error;
    }
  }

  async updateCommentReview(id, commentReviewData) {
    try {
      const updatedCommentReview = await CommentReview.findByIdAndUpdate(
        id,
        commentReviewData,
        { new: true, runValidators: true }
      );
      return updatedCommentReview;
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentReview(id) {
    try {
      const deletedCommentReview = await CommentReview.findByIdAndDelete(id);
      return deletedCommentReview;
    } catch (error) {
      throw error;
    }
  }

  async getCommentsByRoomingHouseId(roomingHouseId) {
    try {
      const comments = await CommentReview.find({ roomingHouse: roomingHouseId })
        .populate({
          path: 'tenant',
          model: 'Tenant',
        })
        .populate({
            path: 'roomingHouse',
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
      return comments;
    } catch (error) {
      throw error;
    }
  }


  async getCommentsByRoomingtenant(roomingHouseId) {
    try {
      const comments = await CommentReview.find({ tenant: roomingHouseId })
        .populate({
          path: 'tenant',
          model: 'Tenant',
        })
        .populate({
            path: 'roomingHouse',
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
      return comments;
    } catch (error) {
      throw error;
    }
  }

}

export default new CommentReviewRepository();
