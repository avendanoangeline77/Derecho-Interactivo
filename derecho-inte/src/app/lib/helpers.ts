import crypto from "crypto"

// Configuración
const ALGORITHM = "aes-256-cbc" // Algoritmo de cifrado
const IV_LENGTH = 16 // Tamaño del vector de inicialización (16 bytes)

// 🔐 Encriptar
export function encrypt(text: string, masterPassword: string) {
  const iv = crypto.randomBytes(IV_LENGTH) // vector aleatorio
  const key = crypto.createHash("sha256").update(masterPassword).digest() // clave de 32 bytes
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(text, "utf8", "base64")
  encrypted += cipher.final("base64")

  // Retornamos IV + texto cifrado en base64
  return iv.toString("base64") + ":" + encrypted
}

// 🔓 Desencriptar
export function decrypt(encryptedText: string, masterPassword: string) {
  const [ivBase64, encryptedData] = encryptedText.split(":")
  const iv = Buffer.from(ivBase64, "base64")
  const key = crypto.createHash("sha256").update(masterPassword).digest()
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

  let decrypted = decipher.update(encryptedData, "base64", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}