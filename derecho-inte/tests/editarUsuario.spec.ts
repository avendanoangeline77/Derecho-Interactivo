import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('web.admin@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('webadmin');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('button', { name: 'Gestion de Usuarios Gestiona los usuarios' }).click();
  await page.getByRole('button', { name: 'Editar' }).nth(2).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('docente_testono');
  await page.getByRole('textbox', { name: 'Correo' }).fill('"docente@gmail.com');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByRole('cell', { name: 'docente_testono' })).toBeVisible();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByRole('cell', { name: 'docente_testono' })).toBeVisible();
});