
const etudiantService = require('../services/etudiant.service');

const lister = async (req, res, next) => {
  try {
    const etudiants = await etudiantService.listerEtudiants();
    res.status(200).json({
      success: true,
      count: etudiants.length,
      data: etudiants,
    });
  } catch (error) {
    next(error);
  }
};


const lireUn = async (req, res, next) => {
  try {
    const etudiant = await etudiantService.obtenirEtudiant(req.params.id);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    next(error);
  }
};

const creer = async (req, res, next) => {
  try {
    const nouvelEtudiant = await etudiantService.creerEtudiant(req.body);
    res.status(201).json({ success: true, data: nouvelEtudiant });
  } catch (error) {
    next(error);
  }
};

const remplacer = async (req, res, next) => {
  try {
    const etudiant = await etudiantService.remplacerEtudiant(req.params.id, req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    next(error);
  }
};

const modifierPartiel = async (req, res, next) => {
  try {
    const etudiant = await etudiantService.modifierEtudiantPartiel(req.params.id, req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    next(error);
  }
};

const supprimer = async (req, res, next) => {
  try {
    await etudiantService.supprimerEtudiant(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  lister,
  lireUn,
  creer,
  remplacer,
  modifierPartiel,
  supprimer,
};
