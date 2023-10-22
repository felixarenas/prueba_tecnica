
export const valida_null = (field:string) => {

	if(field === undefined || field === "" || field == "null" || field == "NULL"){
		return null;
	}else{
		return field;
	}

}



export const valida_field = (field:string, label:string) => {

	if ( valida_null(field) === null ) {

		return {
			state: false,
			message: "El campo " + label + " es obligatorio",
			response: null
		}

	}else{

		return {
			state: true,
			message: "",
			response: {}
		};

	}

}

export const randonString = (length:any) => {
	let chars:any = process.env.KEY_RANDON_STRING;
	var charLength = chars.length;
	var result = '';
	for ( var i = 0; i < length; i++ ) {
	   result += chars.charAt(Math.floor(Math.random() * charLength));
	}
	return result;
}
