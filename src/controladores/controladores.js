const controladorDeAcciones = {}

controladorDeAcciones.listar = (req,res) =>{
    
    req.getConnection(function(err,conn){
        conn.query("SELECT * FROM empleados", (err,rows) =>{
            res.render("usuarios.ejs",{data: rows})
        })
    })
};
  
controladorDeAcciones.saveupdate = (req,res) =>{
    const id = req.params
    const NuevosDatos = req.body
    console.log(NuevosDatos)
    console.log(id.id)
    req.getConnection((err,conn)=>{
        conn.query('UPDATE empleados set ? WHERE id_usuario = ?',[NuevosDatos,id.id], (err,rows) =>{
            res.redirect("/")
        })
    })
}

controladorDeAcciones.update = (req,res) =>{
    let id = req.params
    req.getConnection((err,conn) =>{
        conn.query(`SELECT * FROM empleados WHERE id_usuario = ${id.id}`,(err,rows)=>{
            res.render("editusuarios.ejs",({data:rows[0]}))
        })
    })
}

controladorDeAcciones.save = (req,res) =>{
    const data = req.body
    req.getConnection((err,conn) =>{
        conn.query("INSERT INTO empleados set ?",[data])
    })
    res.redirect("/")
}

controladorDeAcciones.delete = (req,res) =>{
    let id = req.params.id
    req.getConnection((err,conn)=>{
        conn.query(`DELETE FROM empleados WHERE id_usuario = ${id}`)
        res.redirect("/")
    })
    
}

module.exports = controladorDeAcciones