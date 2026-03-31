export class EntregasService {
  constructor(repository, motoristasRepository) {
    this.repository = repository;
    this.motoristasRepository = this.motoristasRepository
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

  filtrar({status, motoristaId}) {

    let entregas = this.repository.listarTodos();

    if(motoristaId){
      const motorista = this.motoristasRepository.buscarPorId(motoristaId)
      if(!motorista) throw new Error("Motorista não encontrado")

        entregas = entregas.filter(e=>e.motorista?.id === motoristaId)
    }

    if(status){
      entregas = entregas.filter(e=>e.status.id === motoristaId)
    }

    return entregas
    // return this.repository
    //   .listarTodos()
    //   .filter(e => e.status === status);
  }

  historico(id) {
    const entrega = this.buscarPorId(id);
    return entrega.historico;
  }

  atribuirMotorista(entregaId,motoristaId){
    const entrega = this.buscarPorId(entregaId)

    if(entrega.status !== "CRIADA"){
      throw new Error("Motorista só pode ser atribuído a entregas com status 'CRIADA'")
    }

    const motorista = this.motoristasRepository.buscarPorId(motoristaId)
    if(!motorista){
      throw new Error("Motorista não encontrado")
    }

    if(motorista.status === "INATIVO"){
      throw new Error("Não é permitido atirbuir um motorista com status de 'INATIVO'");;      
    }

    const motoristaAnterior = entrega.motorista

    entrega.motorista = {
      id: motorista.id,
      nome: motorista.nome,
      placaVeiculo: motorista.placaVeiculo
    }

    const descricaoHistorico = motoristaAnterior ? `Motorista substituido: ${motoristaAnterior.nome} -> ${motorista.nome}` : `Motorista atribuído: ${motorista.nome}`

    entrega.historico.push({
      data: new Date().toISOString(),
      descricao: descricaoHistorico
    })
    return this.repository.atualizarEntrega(entregaId, entrega)
  }
}