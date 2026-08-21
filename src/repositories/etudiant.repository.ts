import { db } from "../config/database";
import { Etudiant } from "../models/etudiant.model";

export const etudiantRepository = {
  findAll(): Etudiant[] {
    return db.prepare("SELECT * FROM etudiants").all() as Etudiant[];
  },

  findById(id: number): Etudiant | undefined {
    return db
      .prepare("SELECT * FROM etudiants WHERE id = ?")
      .get(id) as Etudiant | undefined;
  },

  create(data: Omit<Etudiant, "id">): Etudiant {
    const stmt = db.prepare(
      "INSERT INTO etudiants (nom, prenom, email, age) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(data.nom, data.prenom, data.email, data.age);
    return { id: Number(info.lastInsertRowid), ...data };
  },

  update(id: number, data: Omit<Etudiant, "id">): Etudiant | null {
    const stmt = db.prepare(
      "UPDATE etudiants SET nom = ?, prenom = ?, email = ?, age = ? WHERE id = ?"
    );
    const info = stmt.run(data.nom, data.prenom, data.email, data.age, id);
    if (info.changes === 0) return null;
    return { id, ...data };
  },

  patch(id: number, data: Partial<Omit<Etudiant, "id">>): Etudiant | null {
    const existing = this.findById(id);
    if (!existing) return null;

    const merged: Etudiant = { ...existing, ...data };
    const stmt = db.prepare(
      "UPDATE etudiants SET nom = ?, prenom = ?, email = ?, age = ? WHERE id = ?"
    );
    stmt.run(merged.nom, merged.prenom, merged.email, merged.age, id);
    return merged;
  },

  delete(id: number): boolean {
    const info = db.prepare("DELETE FROM etudiants WHERE id = ?").run(id);
    return info.changes > 0;
  },
};
