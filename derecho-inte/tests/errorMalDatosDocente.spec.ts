import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('docente@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('docente');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page.locator('form')).toContainText('La contraseña debe:');
  await expect(page.getByRole('listitem')).toContainText('- debe de tener 8 caracteres como minimo');
});