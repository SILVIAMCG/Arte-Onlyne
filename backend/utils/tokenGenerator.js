import jwt from 'jsonwebtoken';


const generateToken = (id, esVendedor, esAdmin ) => {
    return new Promise((resolve, reject) => {
        const payload = { id, esVendedor, esAdmin };
    
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
              {
                expiresIn: "1h",
              },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
               }
            }
        );
    });
};

export default generateToken;