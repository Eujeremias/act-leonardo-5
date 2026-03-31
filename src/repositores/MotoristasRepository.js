export class MotoristasRepository{
    constructor(database){
        this.database = database
    }

    listarTodos(){
        return this.database.getMotoristas()
    }

    buscarPorId(id){
        return this.database.getMotoristas().find(m=>m.id === id)
    }

    buscarPorCpf(cpf){
        return this.database.getMotoristas().find(m=>m.cpf === cpf)
    }

    criar(motorista){
        const novo = {
            ...motorista,
            id: this.database.generateId()
        };
        this.database.getMotoristas().push(novo)
        return novo;
    }

    atualizar(id,dados){
        const motoristas = this.database.getMotoristas();
        const index = motoristas.findIndex(m => m.id === id)

        if(index === -1) return null
        motoristas[index] = {...motoristas[index], ...dados}

        return motoristas[index]
    }
}