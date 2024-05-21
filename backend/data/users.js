import bcrypt from 'bcryptjs';

const users = [
    {
        nombre: 'Admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        esAdmin: true,
        esVendedor: false
    },

    {
        nombre: 'Antonio',
        email: 'antonio@antonio.com',
        password: bcrypt.hashSync('123456', 10),
        esAdmin: false,
        esVendedor: true
    },

    {
        nombre: 'Beatriz',
        email: 'beatriz@beatriz.com',
        password: bcrypt.hashSync('123456', 10),
        esAdmin: false,
        esVendedor: false
    },

    {
        nombre: 'Daniela',
        email: 'daniela@daniela.com',
        password: bcrypt.hashSync('123456', 10),
        esAdmin: false,
        esVendedor: true
    }
];

export default users;