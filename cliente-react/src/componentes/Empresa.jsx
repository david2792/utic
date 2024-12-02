import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Empresa() {
    const [empresas,setEmpresas] =useState([])
    const [razon_social,setRazon] = useState('')
    const [direccion,setDireccion] = useState('')
    const [correo,setCorreo] = useState('')
    const [telefono,setTelefono] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [bandera, setBandera] = useState(false)
    const [idempresa,setIdempresa] = useState(null)
    
    
    //obtenemos los datos al iniciar el componente
    useEffect(()=>{
      ListaEmpresa()
    },[])
      const api = axios.create
      ({
        baseURL:'http://localhost:3000/'
      })
    
      const ListaEmpresa = async()=>
        {
          const respuesta = await api.get('empresa')
          setEmpresas(respuesta.data)
          console.log(empresas)
        }
    const eliminarEmpresa = async(id)=>{
      console.log(id)
      await api.delete(`/empresa/${id}`)
      setBandera(true)
      setMensaje("REGISTRO ELIMINADO")
      ListaEmpresa()
      
    }
    const guardarEmpresa = async(e)=>{
      e.preventDefault();  
      try {  
          if(idempresa){
            console.log(razon_social)
            await api.put(`/empresa/${idempresa}`,{
              razon_social,
              direccion,
              telefono,
              correo
            })
            setMensaje("REGISTRO ACTUALIZADO")
          }else{
            await api.post('/empresa',{
              razon_social,
              direccion,
              telefono,
              correo
            })
            setMensaje("REGISTRO EXITOSO")
          } 
          limpiar()
          setBandera(true)
          ListaEmpresa()
          } catch (error) {
            setBandera(true)
            setMensaje("ERROR AL INSERTAR LOS DATOS")
            console.log("paso")
          }
              
    
          }
    
    function limpiar(){
      setCorreo('')
      setDireccion('')
      setRazon('')
      setTelefono('')
      setBandera(false)
    }
    const editarEmpresa=(empresa)=>{
      setIdempresa(empresa.idempresa)
      setRazon(empresa.razon_social)
      setDireccion(empresa.direccion)
      setTelefono(empresa.telefono)
      setCorreo(empresa.correo)
    }
      
      return (
        <div id='contenedor'>
          <div className="card" id="principal">
            <div class="card-header">
              Formulario Empresa
            </div>
            <div class="card-body">
            <div class="container-fluid text-center ">
          <form onSubmit={guardarEmpresa}>
            <div className='row'>
              <div className="col-6">
      
              <input 
              className="form-control form-control-lg"
              placeholder='Ingrese la Razon Social'
                type='text'
                value={razon_social}
                onChange={(e)=>setRazon(e.target.value)}
              />
              </div>
              <div className="col-6">
              <input 
                className="form-control form-control-lg"
                placeholder='Ingrese la Direccion'
                type='text'
                value={direccion}
                onChange={(e)=>setDireccion(e.target.value)}
              />
              </div>
              </div>
                <div className="row">
                  <div className="col-6">
                  <input 
                    className="form-control form-control-lg"
                    placeholder='Ingrese el correo'
                    type='text'
                    value={correo}
                    onChange={(e)=>setCorreo(e.target.value)}
                  />
                  </div>
                  <div className="col-6">
                  <input
                    className="form-control form-control-lg" 
                    placeholder='Ingrese el Telefono'
                    type='text'
                    value={telefono}
                    onChange={(e)=>setTelefono(e.target.value)}
                  />
                  </div>
    
                </div>
              
               
              <button type="button" class="btn btn-warning" onClick={guardarEmpresa}>Guardar</button>
              <button type="button" class="btn btn-danger" onClick={limpiar}>Limpiar</button>
          </form>
          </div>
            </div>
          </div>
          { bandera && (
            <div class="alert alert-primary" role="alert">
                {mensaje}
            </div>
          )
    
          }
         
          
          
         <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Razon Social</th>
              <th>Direccion</th>
            </tr>
          </thead>
          <tbody>
            { empresas.map((item) =>(
              <tr key={item.id} >
                <td>{item.idempresa}</td>
                <td>{item.razon_social}</td>
                <td>{item.direccion}</td>
                <td>{item.correo}</td>
                <td>{item.telefono}</td>
                <td>
                  <button className="btn btn-danger me-2" onClick={()=>editarEmpresa(item)} >
                    Editar
                  </button>
                  <button className="btn btn-primary me-2" onClick={()=>eliminarEmpresa(item.idempresa)} >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
         </table>
        </div>
      )
}
