import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('web.admin@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('webadmin');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('button', { name: 'Gestion de Usuarios Gestiona los usuarios' }).click();
  await page.getByRole('button', { name: '+ Agregar Usuario' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('tiline@gmail.co m');
  await page.getByRole('textbox', { name: 'Correo' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Correo' }).fill('tiline@gmail.com');
  await page.getByRole('combobox').selectOption('estudiante');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.locator('body')).toBeVisible();
});