import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET /Thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const result = await Thought.find({});
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

// GET /Thoughts/:id
export const getThoughtById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thought = await Thought.findOne({ _id: id });
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'Thought not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

// POST /Thoughts
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { tags: thought._id } },
          { new: true }
        );
        res.status(201).json(thought);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};//done

// PUT /Thoughts/:id
export const updateThought = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'Thought not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};//done weird glitch dosent return new value.

// DELETE /Thoughts/:id
export const deleteThought = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thought = await Thought.findOneAndDelete({ _id: id });
        if (thought && thought._id) {
            res.json({ message: ('Thought deleted') });
        } else {
            res.status(404).json({ message: 'Thought not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//

export const postReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body}},
            { new: true }
        )
        if(thought){
            res.json(thought.reactions[(Number(thought.reactionCount) - 1)]);
        } else {
            res.status(400).json({message: "Something went wrong with the Thought"})
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        
        if (thought) {
            res.json({ message: 'Reaction deleted successfully' });
        } else {
            res.status(404).json({ message: 'Thought not found' });
        }
    } catch (error: any) {
        console.error('Error deleting reaction:', error);
        res.status(500).json({ message: error.message });
    }
};
