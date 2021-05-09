import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import bcrypt from 'bcryptjs'
import User from '../../../db/user'

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'credentials',
            async authorize(credentials) {
                const { email, password } = credentials
                if (email && password) {
                    var user = await User.findOne({ email })
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return user
                    }
                }
                return null
            }
        })
    ],
    secret: process.env.SECRET,
    database: process.env.DB_URL,
    session: {
        jwt: true
    },
    pages: {
        signIn: 'login'
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                token = {...token, isAdmin: user.isAdmin}
            }
            return token
        },
        async session(session, token) {
            session = {...session, isAdmin: token.isAdmin}
            return session
        }
    },
    debug: false
})