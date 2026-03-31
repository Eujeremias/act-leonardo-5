export class MotoristasController{
    constructor(service){
        this.service = service
    }

    criar = (req,res) =>{
        try{
            const motorista = this.service.criar(req.body)
            res.status(201).json(motorista)
        }catch(error){
            const status = error.statusCode || 400
            res.status(status).json({erro: error.message})
        }
    }

    listar = (req,res)=>{
        res.json(this.service.listar())
    }

    buscarPorId = (req,res) => {
        try{
            const motorista = this.service.buscarPorId(Number(req.params.id));
            res.json(motorista)
        }catch(error){
            res.status(404).json({erro: error.message});
        }
    }
}