//FUNCION PARA VALIDAR RUT CHILENO EN REGISTER SELLER
export const rutValidation = (rut) => {
    let cleanRut = rut.replace(/[^0-9kK]/g, '');
    if (!/^[0-9]+[0-9kK]$/.test(cleanRut)) {
      return false;
    }
    let rutString = cleanRut.slice(0, -1);
    let dv = cleanRut.slice(-1).toLowerCase();
    let sum = 0;
    let mul = 2;
    for (let i = rutString.length - 1; i >= 0; i--) {
      sum += parseInt(rutString[i]) * mul;
      mul = mul === 7 ? 2 : mul + 1;
    }

    let verifiedDv = 11 - (sum % 11);
    if (verifiedDv === 11) {
      verifiedDv = 0;
    }
    if (verifiedDv === 10) {
      verifiedDv = 'k';
    }
    else{
        verifiedDv = verifiedDv.toString();
    }
    return dv === verifiedDv;

};