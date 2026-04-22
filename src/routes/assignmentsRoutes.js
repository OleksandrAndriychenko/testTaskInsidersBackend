import { Router } from 'express';
import { celebrate } from "celebrate";
import {
  createAssignments,
  deleteAssignments,
  getAssignments,
  getAssignmentsById,
  updateAssignments
} from '../controllers/assignmentsController.js';
import {
  assignmentsIdParamSchema,
  createAssignmentsSchema,
  getAssignmentsSchema,
  updateAssignmentsSchema
} from '../validations/assignmentsValidation.js';
// import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// router.use("/assignments", authenticate);

router.get('/assignments',celebrate(getAssignmentsSchema), getAssignments);
router.get('/assignments/:assignmentsId',celebrate(assignmentsIdParamSchema), getAssignmentsById);
router.post('/assignments',celebrate(createAssignmentsSchema), createAssignments);
router.delete('/assignments/:assignmentsId',celebrate(assignmentsIdParamSchema), deleteAssignments);
router.patch('/assignments/:assignmentsId',celebrate(updateAssignmentsSchema), updateAssignments);

export default router;
