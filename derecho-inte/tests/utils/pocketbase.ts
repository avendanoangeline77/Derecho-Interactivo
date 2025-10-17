// tests/utils/pocketbase.ts
import PocketBase from "pocketbase";

// --- Configuración y Constantes ---
const PB_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090"; 
const COLLECTION_USERS = "users";

// ✅ 1. Credenciales de los Usuarios de PRUEBA (para la web/UI)
// NOTA: Estas credenciales se usan para crear registros que Playwright luego usará para iniciar sesión.
export const CREDENTIALS = {
    // Usuario Administrador de la WEB (se usa para iniciar sesión en los tests de UI)
    WEB_ADMIN: { email: "web.admin@gmail.com", password: "webadmin", role: "admin" },
    
    // Otros usuarios de prueba para la web
    DOCENTE: { email: "docente@gmail.com", password: "docente", role: "docente" },
    ESTUDIANTE: { email: "estudiante@gmail.com", password: "estudiante", role: "estudiante" },
    DUPLICATE: { email: "duplicado@gmail.com", password: "duplicado", role: "docente" }
};


const pb = new PocketBase(PB_URL);


/**
 * Limpia la colección de usuarios (requiere autenticación del Admin de PocketBase).
 * @param collection El nombre de la colección a limpiar.
 */
export async function clearCollection(collection: string) {
    
    // ✅ 2. Uso de las variables de entorno para el Admin de PocketBase
    const pbAdminEmail = process.env.POCKETBASE_USERNAME;
    const pbAdminPassword = process.env.POCKETBASE_PASSWORD;

    if (!pbAdminEmail || !pbAdminPassword) {
        throw new Error("❌ Error de configuración: POCKETBASE_USERNAME o POCKETBASE_PASSWORD no están definidos. Asegúrate de que el archivo .env esté cargado y contenga las credenciales del Admin de PocketBase.");
    }

    try {
        // AUTENTICACIÓN DEL ADMIN DE POCKETBASE (Superuser)
        await pb.admins.authWithPassword(pbAdminEmail, pbAdminPassword);
        
        // Obtener y eliminar todos los registros
        const records = await pb.collection(collection).getFullList({
            skipAuth: true // Ignora reglas de colección, ya que somos Admin
        });
        
        for (const record of records) {
            await pb.collection(collection).delete(record.id);
        }
        
        console.log(`Colección "${collection}" limpiada (${records.length} registros).`);
    } catch (err) {
        console.error(`❌ Error limpiando colección ${collection}:`, err);
        throw new Error(`Fallo de conexión o autenticación de Admin en PocketBase: ${err}`);
    }
}


/**
 * Crea un usuario de prueba con un rol específico en la colección 'users'.
 */
export async function createTestUser({ email, password, role }: (typeof CREDENTIALS)['WEB_ADMIN']) {
    try {
        // En PocketBase, al crear un usuario con password, se crea directamente.
        // Si tu aplicación no pide password, puedes omitir los campos password/passwordConfirm
        // y solo pasar email y rol, pero deberás ajustar tus tests de UI para que
        // usen el flujo de "email de activación" o añadir una contraseña después.
        const user = await pb.collection(COLLECTION_USERS).create({
            email,
            password,
            passwordConfirm: password,
            username: email.split("@")[0] + "_test",
            role: role,
        });
        console.log(`✅ Usuario de prueba creado: ${role} (${email})`);
        return user;
    } catch (err) {
        // Esto puede ocurrir si intentas crear el usuario duplicado en el setup, lo cual es normal.
        console.error(`❌ Error creando usuario de prueba ${role} (${email}):`, err);
        return null;
    }
}