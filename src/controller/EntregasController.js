export class EntregasController{
    constructor(service){
        this.service = service
    }


    criar = (req,res)=>{
        try{
            const entrega = this.service.criar(req.body)
            res.status(201).json(entrega)
        }catch(error){
            res.status(400).json({erro: error.message})
        }
    }

    listar = (req,res) =>{
        const {status} = req.query

        if(status) return res.json(this.service.filtrarPorStatus(status))

        res.json(this.service.listar())
    }

    buscarPorId = (req,res) =>{
        try{
            const id = Number(req.params.id)
            const entrega = this.service.buscarPorId(id)
            res.status(201).json(entrega)
        }catch(error){
            res.status(400).json({erro: error.message}) 
        }
    }

    avancar = (req,res) =>{
        try{
            const entrega = this.service.avancar(Number(req.params.id))
            res.json(entrega)
        }catch(error){
            res.status(400).json({erro: error.message})
        }
    }

    cancelar = (req,res)=>{
        try{
            const entrega = this.service.cancelar(Number(req.params.id))
            res.json(entrega)
        }catch(error){
            res.status(400).json({erro: error.message})
        }
    }

    historico = (req,res)=>{
        try{
            const historico = this.service.historico(Number(req.params.id))
            res.json(historico)
        }catch(error){
            res.status(404).json({erro: error.message})
        }
    }
}
