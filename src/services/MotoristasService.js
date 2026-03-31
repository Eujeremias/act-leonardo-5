export class MotoristasService{
    constructor(repository){
        this.repository = repository
    }

    criar({nome, cpf, placaVeiculo}){
        if(!nome || !cpf || !placaVeiculo){
            throw new Error("Nome, cpf e placa de veículo são obrigatórios")
        }

        const existente = this.repository.buscarPorCpf(cpf)
        if(existente){
            const erro = new Error(`Já existe um motorista cadastrado com o CPF ${cpf}`)
            erro.statusCode = 409
            throw erro
        }

        return this.repository.criar({
            nome,
            cpf,
            placaVeiculo,
            status: "ATIVO"
        })
    }

    listar(){
        return this.repository.listarTodos()
    }

    buscarPorId(id){
        const motorista = this.repository.buscarPorId(id);
        if(!motorista) throw new Error("Motorista não encontrado")
            return motorista
    }
}