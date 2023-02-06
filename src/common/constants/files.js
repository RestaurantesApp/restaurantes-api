import * as fs from 'fs'

export const privateKeyFile = fs.readFileSync('./certs/private.key')

export const publicKeyFile = fs.readFileSync('./certs/public.key')
