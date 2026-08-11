
const etudiantModel = require('../models/etudiant.model');
const ApiError = require('../utils/ApiError');
const { validerCreation, validerMiseAJourPartielle } = require('../utils/etudiant.validator');

const listerEtudiants = async () => {
  return etudiantModel.findAll();
};

const obtenirEtudiant = async (id) => {
  const etudiant = await etudiantModel.findById(id);
  if (!etudiant) {
    throw ApiError.notFound(`Aucun etudiant avec l'id ${id}`);
  }
  return etudiant;
};

const creerEtudiant = async (data) => {
  const erreurs = validerCreation(data);
  if (erreurs.length > 0) {
    throw ApiError.badRequest('Donnees invalides', erreurs);
  }

  const emailPris = await etudiantModel.emailExiste(data.email);
  if (emailPris) {
    throw ApiError.badRequest('Cet email est deja utilise.');
  }

  return etudiantModel.create(data);
};

const remplacerEtudiant = async (id, data) => {
  const erreurs = validerCreation(data);
  if (erreurs.length > 0) {
    throw ApiError.badRequest('Donnees invalides', erreurs);
  }

  const emailPris = await etudiantModel.emailExiste(data.email, id);
  if (emailPris) {
    throw ApiError.badRequest('Cet email est deja utilise.');
  }

  const etudiant = await etudiantModel.replace(id, data);
  if (!etudiant) {
    throw ApiError.notFound(`Aucun etudiant avec l'id ${id}`);
  }
  return etudiant;
};

const modifierEtudiantPartiel = async (id, data) => {
  const erreurs = validerMiseAJourPartielle(data);
  if (erreurs.length > 0) {
    throw ApiError.badRequest('Donnees invalides', erreurs);
  }

  if (data.email) {
    const emailPris = await etudiantModel.emailExiste(data.email, id);
    if (emailPris) {
      throw ApiError.badRequest('Cet email est deja utilise.');
    }
  }

  const etudiant = await etudiantModel.update(id, data);
  if (!etudiant) {
    throw ApiError.notFound(`Aucun etudiant avec l'id ${id}`);
  }
  return etudiant;
};

const supprimerEtudiant = async (id) => {
  const supprime = await etudiantModel.remove(id);
  if (!supprime) {
    throw ApiError.notFound(`Aucun etudiant avec l'id ${id}`);
  }
};

module.exports = {
  listerEtudiants,
  obtenirEtudiant,
  creerEtudiant,
  remplacerEtudiant,
  modifierEtudiantPartiel,
  supprimerEtudiant,
};
