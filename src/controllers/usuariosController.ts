import Persona from "../models/personas";

export default class UsuariosController{
    private personas: Persona[];
    constructor(){
        this.personas = []
    }

    agregarPersona( id: string, nombre: string,sala?: string ){
        let persona:Persona = new Persona(id,nombre,sala)
        this.personas.push(persona);
    }

    getPersonaID(id: string):Persona{
        const persona = this.personas.find((persona:Persona)=>persona.id===id);
        return <Persona>persona;
    }

    get personasAll(){
        return this.personas;
    }
    
    getpersonasSala(sala:string){
        let personas = this.personas.filter( (persona:Persona)=>persona.sala===sala)
        return personas;
    }
    
    borrarPersona(id: string){
        let personaBorrada = this.getPersonaID(id);
        this.personas = this.personas.filter(persona=>persona.id!=id);
        return personaBorrada;
    }
}