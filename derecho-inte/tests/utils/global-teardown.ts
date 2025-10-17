// tests/global.teardown.ts
import { clearCollection } from "./pocketbase";

// ✅ Función simple sin FullConfig
async function globalTeardown() { 
    console.log("\n=======================================================");
    console.log("         🔹 Ejecutando globalTeardown: limpiando DB");
    console.log("=======================================================");

    try {
        // Limpia la colección de usuarios
        await clearCollection("users");
        console.log("✅ Usuarios eliminados correctamente.");
    } catch (err) {
        console.error("❌ Error en globalTeardown:", err);
    }
}

export default globalTeardown;