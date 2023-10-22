import { CustomError, Validators } from "../../../config";
import { DataDnaDto } from "../dtos";
import { ValidateAnomalyRepository } from "../repositories";

interface ResponseValidate {
    resp:CustomError
}

interface ValidateAnomalyUseCase {
    execute ( dataDnaDto: DataDnaDto): Promise <ResponseValidate>
}

export class ValidateAnomaly implements ValidateAnomalyUseCase {


    constructor (
        private readonly validateAnomalyRepository:ValidateAnomalyRepository,
    ) {}


    async execute(dataDnaDto: DataDnaDto): Promise<ResponseValidate> {

        const respValidation = await this.validateAnomalyRepository.validate(dataDnaDto);

        if(!respValidation) throw CustomError.bandRequest('Error al procesar los datos frente a la base de datos')

        const {dna} = respValidation;

        // Se valida las dimenciones de la matriz, no puede ser nemor a 3x3 ni tampoco mayor a 2000x2000
        let x = dna.length;
        
        if (x < 3 || x > 2000) {
            return {
                resp:CustomError.bandRequest("La matriz del ADN no tiene las dimenciones adecuadas, es menor que 3 y mayor a 2000 en su eje Y")
            }
        }

        for (let i=0; i<x; i++) {
            
            if (!Array.isArray(dna[i])) {
                return {
                    resp:CustomError.bandRequest("La matriz del ADN no es una matriz valida")
                }
            }
            
            if (dna[i].length !== x) {
                return {
                    resp:CustomError.bandRequest("La matriz del ADN en sus ejes X, Y no tiene la misma dimención")
                }
            }

            if (dna[i].length < 3 || dna[i].length > 2000) {
                return {
                    resp:CustomError.bandRequest("La matriz del ADN no tiene las dimenciones adecuadas, es menor que 3 y mayor a 2000 en su eje X")
                }
            }
        }

        //Valida que solo sean letras.
        x = dna.length;
        let y = x;

        for (let i=0; i<x; i++) {
            for (let j=0; j<y; j++) {
                if(!Validators.validate_string.test(dna[i][j])) {
                    return {
                        resp:CustomError.bandRequest(`El valor ingresado en el ADN en la posicion X:${j+1} Y:${i+1} no es valido, valor encontrado (${dna[i][j]})`)
                    }
                }
            }
        }

        //Validamos la regla del negocio, si existe una anomalia o no
        // 1) Validamos el Eje X
        let a:number = 0;
        let b:number = 0;
        let j:number = 0;
        let count:number = 0;
        let anomalias:boolean = false;
        for (a=0; a<x; a++) {
            let fila = dna[a];
            for (j=0; j<fila.length; j++) {
                let letraBase = fila[j];
                count = 0;
                for (b=j; b<x; b++) {
                    let letraPibote = fila[b];
                    if (letraBase === letraPibote) {
                        count ++;
                    } else {
                        if (count >= 3) {
                            break;
                            
                        }
                        count = 0;          
                    }       
                }

                if (count >= 3) {
                    anomalias = true;
                    break;
                }
            }

            if (anomalias) {
                break;
            }
        }

        if (anomalias == false) {
            //Validamos Eje Y
            count = 0;
            for (a=0; a<y; a++) {
                for (j=0; j<y; j++) {
                    let letraBase = dna[j][a];
                    count = 0;
                    for (b=j; b<y; b++) {
                        let letraPibote = dna[b][a];
                        if (letraBase === letraPibote) {
                            count ++;
                        } else {
                            if (count >= 3) {
                                break;
                            }
                            count = 0;          
                        }
                    }

                    if (count >= 3) {
                        anomalias = true;
                        break;
                    }
                }

                if (anomalias) {
                    break;
                }
            }
        }

        if (anomalias == false) {
            //Buscamos en diagonal de Derecha a izquierda y de izquierda a derecha, (X)
            count = 0;
            for (a=0; a<x; a++) {
                let letraBase = dna[a][a];
                count = 0;
                for (b=a; b<x; b++) {
                    let letraPibote = dna[b][b];
                    if (letraBase === letraPibote) {
                        count ++;
                    } else {
                        if (count >= 3) {
                            
                            break;
                        }
                        count = 0;          
                    }
                }

                if (count >= 3) {
                    anomalias = true;
                    break;
                }
            }

            if (anomalias == false){
                b=x-1;
                for (a=0; a<x; a++) {
                    let letraBase = dna[a][b];
                    let z:number = a;
                    count = 0;
                    for (j=b; j>=0; j--) {
                        let letraPibote = dna[z][j];
                        if (letraBase === letraPibote) {
                            count ++;
                        } else {
                            if (count >= 3) {
                                
                                break;
                            }
                            count = 0;          
                        }

                        z++;

                        if (z >= x) {
                            break;
                        }
                    }
                    b--;
                    if (count >= 3) {
                        anomalias = true;
                        break;
                    }       
                }
            }
        }

        if (anomalias == false) {
            //Valida diagonal de arriba hacia abajo, derecha a izquierda
            count = 0;
            for (a=0; a<x; a++) {

            }
        } 

        if (anomalias) {
            return {
                resp:CustomError.success("Anomalia encontrada")
            }
        }

        return {
            resp:CustomError.forbidden("Anomalia no encontrada")
        }
    }
}