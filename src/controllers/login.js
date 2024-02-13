// login.js
import {createHash} from 'node:crypto';

const users = []; // Simule BDD pour le stockage des utilisateurs
const roles = ['admin', 'utilisateur'];

export const addUser = async (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    // Vérifier si l'utilisateur existe déjà
    let user = users.find((u) => u.email === email);

    if (user) {
        res.status(401).send({
            message: 'Utilisateur déjà enregistré',
            user,
        });
    } else {
        // Ajouter un nouvel utilisateur
        const role = roles[Math.floor(Math.random() * roles.length)]; // Choisissez un rôle au hasard
        user = {email, password: hashedPassword, role};
        users.push(user);

        res.status(200).send({
            message: 'Utilisateur enregistré avec succès',
            user,
        });
    }
};

export const loginUser = async function (req, res) {
    const {email, password} = req.body;
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    // Vérifier les informations de connexion
    const user = users.find((u) => u.email === email && u.password === hashedPassword);

    if (user) {
        // Générer un jeton JWT avec le rôle et l'email dans le payload
        const token = sign({email: user.email, role: user.role}, secretKey, {algorithm: 'HS256'});

        res.status(200).send({
            message: 'Connexion réussie',
            token,
        });
    } else {
        res.status(401).send({
            message: 'Utilisateur non-identifié',
        });
    }
};
