import { Issue } from "../models/index.js";

class IssueRepository {
    async create(issueData) {
      try {
        const newIssue = new Issue(issueData);
        const savedIssue = await newIssue.save();
        return savedIssue;
      } catch (error) {
        throw error;
      }
    }
  
    async update(id, issueData) {
      try {
        const updatedIssue = await Issue.findByIdAndUpdate(id, issueData, { new: true, runValidators: true });
        return updatedIssue;
      } catch (error) {
        throw error;
      }
    }
  
    async delete(id) {
      try {
        const deletedIssue = await Issue.findByIdAndDelete(id);
        return deletedIssue;
      } catch (error) {
        throw error;
      }
    }
  
    async getByIdRoom(roomId) {
        try {
            const issues = await Issue.find({ room: roomId })
            .populate({
              path: 'user',  // Populate the roomingHouse field
              model: 'Tenant', // Model to populate
            })
            .populate({
              path: 'room',  // Populate the roomingHouse field
              model: 'RoomingHouse', // Model to populate
            });;
            return issues;
        } catch (error) {
            throw error;
        }
    }

  }
  
  export default new IssueRepository();