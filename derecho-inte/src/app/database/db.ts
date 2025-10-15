import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

// Autenticarse como admin
//await pb.admins.authWithPassword('huaynocajazmin999@gmail.com', 'BuenosAires')


export default pb