import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import issueRepository from '../repositories/issueRepository.js';

const createIssue = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { user,owner, room, description,date, status } = req.body;
    try {
        const newIssue = await issueRepository.create({ user,owner, room, description,date, status });
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
    const { user,owner, room, description,date, status } = req.body;
    try {
        const updatedIssue = await issueRepository.update(id, { user,owner, room, description,date, status });
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
        res.status(HttpStatusCode.OK).json(issues);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

const getIssuesByRoom_ = async (req, res) => {
    const { roomId } = req.params;
    try {
        const issues = await issueRepository.getByIdRoom_(roomId);
        res.status(HttpStatusCode.OK).json(issues);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        });
    }
};

const update = async (req, res) => {
    const { issueId, newStatus } = req.params;

    try {
        let retries = 3;
        let success = false;
        while (retries > 0 && !success) {
            try {
                const result = await issueRepository.updateStatus(issueId, newStatus);

                if (result.nModified > 0) {
                    success = true;
                    return res.status(200).send('Trạng thái được cập nhật thành công.');
                }
            } catch (error) {
                // Log or handle the error if needed
            }

            retries--;
            // Wait for a short duration before retrying
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        return res.status(500).send('Trạng thái được cập nhật không thành công.');
    } catch (error) {
        return res.status(500).send('Trạng thái được cập nhật không thành công.');
    }
};

export default {
    createIssue,
    updateIssue,
    deleteIssue,
    getIssuesByRoom,
    getIssuesByRoom_,
    update
};
