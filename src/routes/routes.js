import express from "express"
import { Database } from "../database/DataBase.js"
import { EntregasRepository } from "../repositores/EntregasRepository.js";
import { EntregasService } from "../services/EntregasServices.js";
import { EntregasController } from "../controller/EntregasController.js";

const router = express.Router();

// Dependencias
const dataBase = new Database()
const repository = new EntregasRepository(dataBase)
const service = new EntregasService(repository)
const controller = new EntregasController(service)

// Todas as rotas
router.post("/entregas",controller.criar)
router.get("/entregas",controller.listar)
router.get("/entregas/:id/historico",controller.historico)
router.get("/entregas/:id",controller.buscarPorId)
router.patch("/entregas/:id/avancar",controller.avancar)
router.patch("/entregas/:id/cancelar",controller.cancelar)

export default router