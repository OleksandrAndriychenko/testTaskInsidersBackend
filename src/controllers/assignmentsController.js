import createHttpError from 'http-errors';
import { Assignments } from '../models/assignments.js';

export const getAssignments = async (req, res) => {
  const { page = 1, perPage = 10, status } = req.query;
  const skip = (page - 1) * perPage;
  const assignmentsQuery = Assignments.find({ userId: req.user._id });

  if (status) {
    assignmentsQuery.where("status").equals(status);
  };
  const [totalItems, assignments] = await Promise.all([
    assignmentsQuery.clone().countDocuments(),
    assignmentsQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);
  res.status(200).json(
    {
      page,
    perPage,
    totalItems,
    totalPages,
      assignments
    });
};

export const getAssignmentsById = async (req, res) => {
  const { assignmentsId } = req.params;
  const assignments = await Assignments.findOne({
    _id: assignmentsId,
    userId: req.user._id,
  });

  if (!assignments) {
    throw createHttpError(404,'Assignments not found');
  }
  res.status(200).json(assignments);
};

export const createAssignments = async (req, res) => {
  const assignments = await Assignments.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(assignments);
};

export const deleteAssignments = async (req, res) => {
  const { assignmentsId } = req.params;
  const assignments = await Assignments.findOneAndDelete({
    _id: assignmentsId,
    userId: req.user._id,
  });

  if (!assignments) {
    throw createHttpError(404, "Assignments not found");
  }

  res.status(200).json(assignments);
};

export const updateAssignments = async (req, res) => {
  const { assignmentsId } = req.params;

  const assignments = await Assignments.findOneAndUpdate(
    { _id: assignmentsId, userId: req.user._id },
    req.body,
    { returnDocument: "after" },
  );
  if (!assignments) {
    throw createHttpError(404, 'Assignments not found');
  }
  res.status(200).json(assignments);
};
