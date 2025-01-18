import crypto from "crypto"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'

// Get the current script's directory and calculate path at same level as src
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const certsPath = path.resolve(__dirname, '../../certs')

// Create certs directory if it doesn't exist
if (!fs.existsSync(certsPath)) {
    fs.mkdirSync(certsPath)
}

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

console.log("publicKey",publicKey)
console.log("privateKey", privateKey)


fs.writeFileSync(path.join(certsPath, "public.pem"), publicKey)
fs.writeFileSync(path.join(certsPath, "private.pem"), privateKey)
