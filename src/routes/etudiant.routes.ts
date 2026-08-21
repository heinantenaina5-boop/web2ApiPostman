import { Router } from "express";
import {
  getAllEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  patchEtudiant,
  deleteEtudiant,
} from "../controllers/etudiant.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

router.get("/", getAllEtudiants);
router.get("/:id", getEtudiantById);
router.post("/", createEtudiant);
router.put("/:id", updateEtudiant);
router.patch("/:id", patchEtudiant);
router.delete("/:id", deleteEtudiant);

export default router;
