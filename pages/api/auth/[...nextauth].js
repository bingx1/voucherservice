import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import bcrypt from 'bcryptjs'
import User from '../../../db/user'
import '../../../db/connection'

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
    database: process.env.DB_URL,
    session: {
        jwt: true
    },
    pages: {
        signIn: 'login'
    },
    debug: false
})