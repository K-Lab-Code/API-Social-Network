import { Request, Response } from 'express';
import { User } from '../models/index.js';

// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const result = await User.find({});
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

// POST /Users
export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};//done

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const user = await User.findOneAndUpdate({ _id: id }, { username, email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};//done

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (user && user.username) {
            res.json({ message: (user.username + ' deleted') });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOne({ _id: userId });
        if (user && user.username) {
            let friends: number[] = [];
            if (user.friends === null) {
                friends = [Number(friendId)];
            } else {
                friends = user.friends as number[];
                friends.push(Number(friendId));
            }
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { friends: friends });
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

export const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOne({ _id: userId });
        if (user && user.username) {
            let friends : number[] = [];
            if (user.friends === null) {
                res.status(404).json({ message: 'Friend not found' });
            } else {
                friends = user.friends as number[];
                const index = friends.indexOf(Number(friendId));
                if (index === -1) {
                    res.status(404).json({ message: 'Friend not found' });
                } else {
                    friends.splice(index, 1);
                    const updatedUser = await User.findOneAndUpdate({_id: userId}, {friends: friends});
                    res.json(updatedUser);
        }
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};//done

