import { Router } from "express";
import pool from "../config/db.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/shkolla
 * Shkollat + nxenesit (grouped)
 */
router.get("/shkolla", auth, requireRole("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        s.ID as shkollaId,
        s.EmriShkolles,
        s.Qyteti,
        n.ID as nxenesiId,
        n.EmriNxenesit,
        n.Klasa,
        n.ID_Shkolla
      FROM Shkolla s
      LEFT JOIN Nxenesi n ON n.ID_Shkolla = s.ID
      ORDER BY s.ID DESC, n.ID DESC
    `);

    const map = new Map();
    for (const r of rows) {
      if (!map.has(r.shkollaId)) {
        map.set(r.shkollaId, {
          ID: r.shkollaId,
          EmriShkolles: r.EmriShkolles,
          Qyteti: r.Qyteti,
          Nxenesit: [],
        });
      }

      if (r.nxenesiId) {
        map.get(r.shkollaId).Nxenesit.push({
          ID: r.nxenesiId,
          EmriNxenesit: r.EmriNxenesit,
          Klasa: r.Klasa,
          ID_Shkolla: r.ID_Shkolla,
        });
      }
    }

    res.json(Array.from(map.values()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në marrjen e shkollave" });
  }
});
/**
 * GET /api/shkolla/options
 */
router.get("/shkolla/options", auth, requireRole("admin"), async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ID, EmriShkolles FROM Shkolla ORDER BY EmriShkolles`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në marrjen e shkollave (options)" });
  }
});

/**
 * POST /api/shkolla
 */
router.post("/shkolla", auth, requireRole("admin"), async (req, res) => {
  try {
    const { EmriShkolles, Qyteti } = req.body;

    if (!EmriShkolles || !Qyteti) {
      return res.status(400).json({ message: "Plotëso EmriShkolles dhe Qyteti" });
    }

    const [result] = await pool.query(
      `INSERT INTO Shkolla (EmriShkolles, Qyteti) VALUES (?, ?)`,
      [EmriShkolles.trim(), Qyteti.trim()]
    );

    res.status(201).json({ ID: result.insertId, EmriShkolles, Qyteti });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në shtimin e shkollës" });
  }
});

/**
 * PUT /api/shkolla/:id
 */
router.put("/shkolla/:id", auth, requireRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { EmriShkolles, Qyteti } = req.body;

    const [result] = await pool.query(
      `UPDATE Shkolla SET EmriShkolles = ?, Qyteti = ? WHERE ID = ?`,
      [EmriShkolles?.trim(), Qyteti?.trim(), id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Shkolla nuk u gjet" });
    }

    res.json({ message: "Shkolla u përditësua" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në përditësim" });
  }
});

export default router;
