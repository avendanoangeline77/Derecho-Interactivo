// tests/global.setup.ts
import { clearCollection, createTestUser, CREDENTIALS } from "./pocketbase";

// Lista de usuarios a crear para las pruebas
const testUsers = [
    CREDENTIALS.WEB_ADMIN,
    CREDENTIALS.DOCENTE,
    CREDENTIALS.ESTUDIANTE,
    CREDENTIALS.DUPLICATE, 
];

// ✅ Función simple sin FullConfig
async function globalSetup() { 
    console.log("\n=======================================================");
    console.log("         🔹 Ejecutando globalSetup: preparando DB");
    console.log("=======================================================");

    // 1. Limpia usuarios anteriores
    // ¡IMPORTANTE! Asegúrate de que las credenciales de Admin estén cargadas en .env
    await clearCollection("users");

    // 2. Crea usuarios de prueba
    for (const u of testUsers) {
        await createTestUser(u);
    }
    
    // Si necesitas que los tests de UI usen un Admin, crea un usuario con el rol 'admin' aquí,
    // o usa la técnica de "guardar estado" que te mostré inicialmente para el Admin real.

    console.log("✅ globalSetup completado. Usuarios listos para el login UI.");
}

export default globalSetup;