import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('web.admin@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('webadmin');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('button', { name: 'Gestion de Usuarios Gestiona los usuarios' }).click();
  await page.getByRole('button', { name: 'Editar' }).nth(3).click();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await expect(page.getByText('Panel de Administración de Usuarios+ Agregar')).toBeVisible();
});