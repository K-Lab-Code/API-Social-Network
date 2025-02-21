import express from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction
} from '../../controllers/thoughts-controller.js';

const router = express.Router();

// GET /Thoughts - Get all Thoughts
router.get('/', getAllThoughts);

// GET /Thoughts/:id - Get a Thought by id
router.get('/:id', getThoughtById);

// POST /Thoughts - Create a new Thought
router.post('/', createThought);

// PUT /Thoughts/:id - Update a Thought by id
router.put('/:id', updateThought);

// DELETE /Thoughts/:id - Delete a Thought by id
router.delete('/:id', deleteThought);

router.post('/:thoughtId/reactions', postReaction);

router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export { router as thoughtsRouter };