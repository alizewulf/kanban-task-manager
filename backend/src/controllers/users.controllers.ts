import type { Request, Response } from "express";
import { getUsersById, getUsers as getUsersService, createUser as createUserService } from "../services/users.service.js";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await getUsersService();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const user = await getUsersById(id)
  res.json(user)
};

export const createUser = async (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  console.log("HEADERS:", req.headers);

  const { name, email } = req.body;

  const user = await createUserService(name, email);

  res.status(201).json(user);
};