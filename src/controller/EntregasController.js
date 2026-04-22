export class EntregasController {
  constructor(service) {
    this.service = service;
  }

  criar = (req, res) => {
    try {
      const entrega = this.service.criar(req.body);
      res.status(201).json(entrega);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };

  // RF-03 — listar com filtro por status e/ou motoristaId
  listar = (req, res) => {
    try {
      const { status, motoristaId } = req.query;
      const entregas = this.service.filtrar({
        status,
        motoristaId: motoristaId ? Number(motoristaId) : undefined
      });
      res.json(entregas);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };

  buscarPorId = (req, res) => {
    try {
      const id = Number(req.params.id);
      const entrega = this.service.buscarPorId(id);
      res.json(entrega);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };

  avancar = (req, res) => {
    try {
      const entrega = this.service.avancar(Number(req.params.id));
      res.json(entrega);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };

  cancelar = (req, res) => {
    try {
      const entrega = this.service.cancelar(Number(req.params.id));
      res.json(entrega);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };

  historico = (req, res) => {
    try {
      const historico = this.service.historico(Number(req.params.id));
      res.json(historico);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  };

  // RF-02
  atribuirMotorista = (req, res) => {
    try {
      const entregaId = Number(req.params.id);
      const { motoristaId } = req.body;

      if (!motoristaId) {
        return res.status(400).json({ erro: "motoristaId é obrigatório no corpo da requisição" });
      }

      const entrega = this.service.atribuirMotorista(entregaId, Number(motoristaId));
      res.json(entrega);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  };
}