import { Router } from "express";
import pool from "../config/db.js";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/punetori
 */
router.post("/punetori", auth, requireRole("admin"), async (req, res) => {
  try {
    const { Emri, Mbiemri, Pozita, ID_Fabrika } = req.body;

    if (!Emri || !Mbiemri || !Pozita || !ID_Fabrika) {
      return res.status(400).json({ message: "Plotëso të gjitha fushat e punëtorit" });
    }

    const [result] = await pool.query(
      `INSERT INTO Punetori (Emri, Mbiemri, Pozita, ID_Fabrika) VALUES (?, ?, ?, ?)`,
      [Emri.trim(), Mbiemri.trim(), Pozita.trim(), Number(ID_Fabrika)]
    );

    res.status(201).json({ ID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në shtimin e punëtorit" });
  }
});

/**
 * DELETE /api/punetori/:id
 */
router.delete("/punetori/:id", auth, requireRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(`DELETE FROM Punetori WHERE ID = ?`, [id]);

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Punëtori nuk u gjet" });
    }

    res.json({ message: "Punëtori u fshi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në fshirje" });
  }
});

export default router;
