import express from "express"
import { Database } from "../database/database.js"

import { EntregasRepository } from "../repositores/EntregasRepository.js";
import { EntregasService } from "../services/EntregasServices.js";
import { EntregasController } from "../controller/EntregasController.js";

import { MotoristasController } from "../controller/MotoristasController.js";
import { MotoristasRepository } from "../repositores/MotoristasRepository.js";
import { MotoristasService } from "../services/MotoristasService.js";

const router = express.Router();

// Dependencias
const dataBase = new Database()

//Motorista

const motoristasRepository = new MotoristasRepository(dataBase)
const motoristasService = new MotoristasService(motoristasRepository)
const motoristasController = new MotoristasController(motoristasService)


//Entregas
const entregasRepository = new EntregasRepository(dataBase)
const entregasService = new EntregasService(entregasRepository, motoristasRepository)
const entregasController = new EntregasController(entregasService)


// Rotas - Motoristas
router.post("/motoristas", motoristasController.criar)
router.get("/motoristas", motoristasController.listar)
router.get("/motoristas/:id", motoristasController.buscarPorId)

// Todas - Entregas
router.post("/entregas", entregasController.criar)
router.get("/entregas", entregasController.listar)
router.get("/entregas/:id/historico", entregasController.historico)
router.get("/entregas/:id", entregasController.buscarPorId)
router.patch("/entregas/:id/avancar", entregasController.avancar)
router.patch("/entregas/:id/cancelar", entregasController.cancelar)
router.patch("/entregas/:id/motorista", entregasController.atribuirMotorista)





export default router