import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middlewares/ApiError";
import { etudiantRepository } from "../repositories/etudiant.repository";

export function getAllEtudiants(req: Request, res: Response) {
  const etudiants = etudiantRepository.findAll();
  res.status(200).json({ success: true, data: etudiants });
}

export function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const etudiant = etudiantRepository.findById(id);

  if (!etudiant) {
    return next(new ApiError(404, `Étudiant avec l'id ${id} introuvable`));
  }

  res.status(200).json({ success: true, data: etudiant });
}

export function createEtudiant(req: Request, res: Response, next: NextFunction) {
  const { nom, prenom, email, age } = req.body;

  if (!nom || !prenom || !email || age === undefined) {
    return next(
      new ApiError(400, "Champs requis manquants : nom, prenom, email, age")
    );
