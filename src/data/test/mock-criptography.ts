import { Hasher } from '@/data/protocols/criptography/hasher'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export const mockHasher = (): Hasher => {
  class HasherSpy implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('any_password')
    }
  }
  return new HasherSpy()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterSpy implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }
  return new DecrypterSpy()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterSpy implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new EncrypterSpy()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerSpy implements HashComparer {
    async compare (value: string, hashed: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashComparerSpy()
}
