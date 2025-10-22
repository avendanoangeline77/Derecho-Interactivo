import PocketBase from 'pocketbase'

const pb = new PocketBase(process.env.POCKETBASE_URL)

// Autenticarse como admin
//await pb.admins.authWithPassword('huaynocajazmin999@gmail.com', 'BuenosAires')


export default pb