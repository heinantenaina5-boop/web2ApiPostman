

let etudiants = [
  { id: 1, nom: 'Jack', prenom: 'Daniel', email: 'jack.rakoto@example.com', filiere: 'Informatique' },
  { id: 2, nom: 'John', prenom: 'Petters', email: 'john.rabe@example.com', filiere: 'Gestion' },
];

let nextId = 3;

const findAll = () => Promise.resolve(etudiants);

const findById = (id) =>
  Promise.resolve(etudiants.find((e) => e.id === Number(id)) || null);

const create = (data) => {
  const nouvelEtudiant = {
    id: nextId++,
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    filiere: data.filiere || null,
  };
  etudiants.push(nouvelEtudiant);
  return Promise.resolve(nouvelEtudiant);
};

const replace = (id, data) => {
  const index = etudiants.findIndex((e) => e.id === Number(id));
  if (index === -1) return Promise.resolve(null);

  etudiants[index] = {
    id: Number(id),
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    filiere: data.filiere || null,
  };
  return Promise.resolve(etudiants[index]);
};

const update = (id, data) => {
  const index = etudiants.findIndex((e) => e.id === Number(id));
  if (index === -1) return Promise.resolve(null);

  etudiants[index] = { ...etudiants[index], ...data };
  return Promise.resolve(etudiants[index]);
};

const remove = (id) => {
  const index = etudiants.findIndex((e) => e.id === Number(id));
  if (index === -1) return Promise.resolve(false);

  etudiants.splice(index, 1);
  return Promise.resolve(true);
};

const emailExiste = (email, ignoreId = null) =>
  Promise.resolve(
    etudiants.some((e) => e.email === email && e.id !== Number(ignoreId))
  );

module.exports = {
  findAll,
  findById,
  create,
  replace,
  update,
  remove,
  emailExiste,
};
