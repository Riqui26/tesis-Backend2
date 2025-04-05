// routes/user.routes.js

import { Router } from "express";
import { create, getAll, getById, update, deleteOne } from "../controllers/user.controller.js";
const router = Router();

router.get("/", getAll); // GET /api/users
router.get("/:id", getById); // GET /api/users/:id
router.post("/", create); // POST /api/users

router.put("/:id", update); // PUT /api/users/:id
router.delete("/:id", deleteOne); // DELETE /api/users/:id

export default router; 