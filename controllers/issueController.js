import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import issueRepository from '../repositories/issueRepository.js';

const createIssue = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { user, room, description, status } = req.body;
    try {
        const newIssue = await issueRepository.create({ user, room, description, status });
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Issue created successfully',
            data: newIssue,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

const updateIssue = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { user, room, description, status } = req.body;
    try {
        const updatedIssue = await issueRepository.update(id, { user, room, description, status });
        res.status(HttpStatusCode.OK).json({
            message: 'Issue updated successfully',
            data: updatedIssue,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

const deleteIssue = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIssue = await issueRepository.delete(id);
        res.status(HttpStatusCode.OK).json({
            message: 'Issue deleted successfully',
            data: deletedIssue,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

const getIssuesByRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const issues = await issueRepository.getByIdRoom(roomId);
        res.status(HttpStatusCode.OK).json({
            message: 'List of issues retrieved successfully',
            data: issues,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

export default {
    createIssue,
    updateIssue,
    deleteIssue,
    getIssuesByRoom,
};
