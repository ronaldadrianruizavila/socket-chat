import { Socket  } from 'socket.io';
import UsuariosController from '../controllers/usuariosController';
import Persona from '../models/personas';
import { crearMensaje } from '../helpers/utilidades';

export class SocketMethod {
    static userController = new UsuariosController();
    static desconectar(cliente: Socket){
        cliente.on('disconnect',()=>{
            let user:Persona = this.userController.getPersonaID(cliente.id)
            let users: Persona[];
            
            this.userController.borrarPersona(cliente.id)
            cliente.broadcast.to(user.sala||'').emit('crear-mensaje', crearMensaje('administrador',`${user.nombre} Salio`))
            users = this.userController.getpersonasSala(user.sala||'');

            cliente.broadcast.to(user.sala||'').emit('lista-conectados',{users})
        })
    }

    static crearMensaje(cliente:Socket){
        cliente.on('crear-mensaje',(data)=>{
            let persona = this.userController.getPersonaID(cliente.id)
            let mensaje = crearMensaje(persona.nombre,data.mensaje);
            cliente.broadcast.to(persona.sala||'').emit('crear-mensaje',mensaje);
        })
    }
    static crearMensajePrivado(cliente:Socket){
        cliente.on('mensaje-privado',(data)=>{
            let persona = this.userController.getPersonaID(cliente.id)

            let mensaje = crearMensaje(persona.nombre,data.mensaje);
            cliente.broadcast.to(data.id).emit('crear-mensaje',mensaje);
        })
    }

    static configurarUser(cliente:Socket){
        cliente.on('configurar-user',(data,callback)=>{

            let res;
            let users: Persona[];

            if(!data.user && !data.sala){
                res={
                    status:400,
                    users:null
                }
            } else{
                this.userController.agregarPersona(cliente.id,data.user,data.sala);
                users = this.userController.getpersonasSala(data.sala) 
                res = {
                    status:200,
                    users
                }
            }
            cliente.join(data.sala);
            callback(res);
            users = this.userController.getpersonasSala(data.sala);

            cliente.broadcast.to(data.sala).emit('lista-conectados',{users})
        })
    }
}