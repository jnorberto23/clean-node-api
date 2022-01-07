import jwt from 'jsonwebtoken'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (ciphertext: string): Promise<string> {
    try {
      const token = await jwt.verify(ciphertext, this.secret) as any
      if (token === null) throw new Error()
      return token
    } catch (err) {
      return null
    }
  }
}
