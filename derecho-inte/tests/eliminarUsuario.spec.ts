import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('web.admin@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('webadmin');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page.getByText('Facultad de DerechoUniversidad de Buenos AiresDerecho')).toBeVisible();
  await page.getByRole('button', { name: 'Gestion de Usuarios Gestiona los usuarios' }).click();
  await expect(page.getByText('Panel de Administración de Usuarios+ Agregar')).toBeVisible();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Eliminar' }).first().click();
  await expect(page.getByText('Panel de Administración de Usuarios+ Agregar')).toBeVisible();
});

