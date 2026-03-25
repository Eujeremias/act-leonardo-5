export class EntregasService {
  constructor(repository) {
    this.repository = repository;
  }

  criar({ descricao, origem, destino }) {
    if (origem === destino) {
      throw new Error("Origem e destino não podem ser iguais");
    }

    const entregas = this.repository.listarTodos();

    const duplicada = entregas.find(e =>
      e.descricao === descricao &&
      e.origem === origem &&
      e.destino === destino &&
      e.status !== "ENTREGUE" &&
      e.status !== "CANCELADA"
    );

    if (duplicada) {
      throw new Error("Entrega duplicada ativa");
    }

    const nova = {
      descricao,
      origem,
      destino,
      status: "CRIADA",
      historico: [
        {
          data: new Date().toISOString(),
          descricao: "Entrega criada"
        }
      ]
    };

    return this.repository.criar(nova);
  }

  listar() {
    return this.repository.listarTodos();
  }

  buscarPorId(id) {
    const entrega = this.repository.buscarPorId(id);
    if (!entrega) throw new Error("Entrega não encontrada");
    return entrega;
  }

  avancar(id) {
    const entrega = this.buscarPorId(id);

    if (entrega.status === "ENTREGUE" || entrega.status === "CANCELADA") {
      throw new Error("Entrega já finalizada");
    }

    let novoStatus;

    if (entrega.status === "CRIADA") {
      novoStatus = "EM_TRANSITO";
    } else if (entrega.status === "EM_TRANSITO") {
      novoStatus = "ENTREGUE";
    } else {
      throw new Error("Transição inválida");
    }

    entrega.status = novoStatus;

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: `Status alterado para ${novoStatus}`
    });

    return this.repository.atualizar(id, entrega);
  }

  cancelar(id) {
    const entrega = this.buscarPorId(id);

    if (entrega.status === "ENTREGUE") {
      throw new Error("Não pode cancelar entrega finalizada");
    }

    if (entrega.status === "CANCELADA") {
      throw new Error("Entrega já cancelada");
    }

    entrega.status = "CANCELADA";

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: "Entrega cancelada"
    });

    return this.repository.atualizar(id, entrega);
  }

  filtrarPorStatus(status) {
    return this.repository
      .listarTodos()
      .filter(e => e.status === status);
  }

  historico(id) {
    const entrega = this.buscarPorId(id);
    return entrega.historico;
  }
}