// src/database/database.js
export class Database {
  constructor() {
    this.entregas = [];
    this.nextId = 1;
}

  getEntregas() {
    return this.entregas;
  }

  generateId() {
    return this.nextId++;
  }

  criarEntrega(entrega){
    const novaEntrega = {
        id: this.nextId++,
        descricao: entrega.descricao,
        origem: entrega.origem,
        destino: entrega.destino,
        status: "CRIADA",
        historico:[
            {
                data: new Date().toISOString(),
                descricao: `testeDescricao${this.nextId}`
            }
        ]
    }
  }
  
  alterarStatus(dados, status){
      return dados.
    }
    
    
    
    
}

/*
{
  id: number,
  descricao: string,
  origem: string,
  destino: string,
  status: "CRIADA" | "EM_TRANSITO" | "ENTREGUE" | "CANCELADA",
  historico: [
    {
      data: string,
      descricao: string
    }
  ]
}
*/
