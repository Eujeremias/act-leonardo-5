export class EntregasRepository{
    constructor(database){
        this.database = database
    }

    listarTodos(){
        return this.database.getEntregas()
    }

    buscarPorId(id){
        return this.database.getEntregas().find(e=>e.id == id)
    }

    criar(entrega){
        const nova = {
            ...entrega,
            id: this.database.generateId()
        }

        this.database.getEntregas().push(nova)
        return nova
    }

    atualizarEntrega(id,dados){
        const entregas = this.database.getEntregas();
        const index = entregas.findIndex(e => e.id === id)

        if(index === -1) return null

        entregas[index] = {...entregas[index], ...dados}
        return entregas[index]
    }
}