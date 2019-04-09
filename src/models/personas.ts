import IPersona from "../interfaces/ipersona";

export default class Persona implements IPersona{
    constructor(public id:string,
        public nombre: string,
        public sala?:string){

    }

}