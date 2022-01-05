import jwt from 'jsonwebtoken'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    console.log('valuee,', value)
    try {
      const payload = jwt.verify(value, this.secret) as string
      return payload
    } catch (error) {
      return null as any
    }
  }
}
