import express from "express";
import cors from "cors";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DashboardCard } from "./types";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

// Salud
app.get("/health", (_req, res) => res.json({ ok: true }));

// ÚNICO endpoint
app.get("/api/dashboard", (_req, res) => {
  const filePath = join(process.cwd(), "src", "data", "dashboard.json");
  const raw = readFileSync(filePath, "utf8");
  const data: DashboardCard[] = JSON.parse(raw);

  res.set("Cache-Control", "public, max-age=60");
  res.json(data);
});

// 404 prolijo (opcional)
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
