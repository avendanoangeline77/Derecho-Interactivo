export function bienvenida(user:string, password:string):string{
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenido/a</title>
  <style>
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #004aad;
      color: #ffffff;
      padding: 25px;
      text-align: center;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .password-box {
      background-color: #f0f4ff;
      border-left: 4px solid #004aad;
      padding: 15px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      border-radius: 6px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      background-color: #004aad;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #888888;
      padding: 20px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Bienvenido/a a Derecho Interactivo!</h1>
    </div>
    <div class="content">
      <p>Hola <strong>${user}</strong>,</p>
      <p>Tu cuenta ha sido creada exitosamente. A continuación encontrarás tu contraseña temporal de acceso:</p>

      <div class="password-box">
        ${password}
      </div>

      <p>Por motivos de seguridad, te recomendamos cambiarla al iniciar sesión.</p>


      <p>¡Nos alegra tenerte con nosotros! Si tienes alguna duda, no dudes en contactarnos.</p>

      <p>Saludos,<br><strong>El equipo de soporte</strong></p>
    </div>
    <div class="footer">
      © 2025 Tu Aplicación — Todos los derechos reservados.
    </div>
  </div>
</body>
</html>
`;

}