import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";

export default fp(async function (app, opts) {

    const privateKey = fs.readFileSync('../../.ssl/private-key.pem', 'utf-8');

    app.register(fastifyJwt, {
        secret: {
            private: privateKey
        },
        algorithms: ['ES256'],
        sign: {
            issuer: 'info.iutparis.fr'
        },
    })

})