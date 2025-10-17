import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/users');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('web.admin@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('webadmin');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('button', { name: 'Gestion de Usuarios Gestiona los usuarios' }).click();
  await page.getByRole('button', { name: 'Editar' }).first().click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByRole('paragraph')).toContainText('El correo electrónico no es válido');
});
