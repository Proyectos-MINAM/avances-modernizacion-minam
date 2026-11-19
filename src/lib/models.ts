export type Mesa={id:number;eje:string;nombre:string;organo:string;lider:string;productos:number};
export type Producto={id:string;mesa:number;nombre:string;tipo:string;instrumento:string;fecha:string;peso:number};
export type Avance={producto:string;mesa:number;avance:number;estado:string;semaforo:string;comentario:string;fecha:string};
export type Acuerdo={id:string;mesa:number;texto:string;responsable:string;organo:string;estado:string;plazo:string;fecha:string;evidencia:string};
export type Propuesta={id:string;mesa:number;titulo:string;estado:string;consenso:number;enlace:string};
export type Sesion={id:string;mesa:number;tema:string;fecha:string;acta:boolean;asistentes:string};
export type Cambio={id:string;producto:string;mesa:number;avance:number;estado:string;comentario:string;responsable:string;fecha:string};
