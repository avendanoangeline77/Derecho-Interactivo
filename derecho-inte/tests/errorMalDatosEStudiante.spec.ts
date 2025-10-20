import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'correo electrónico' }).fill('estuante@gmail.com');
  await page.getByRole('textbox', { name: 'contraseña' }).click();
  await page.getByRole('textbox', { name: 'contraseña' }).fill('estudiante');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await expect(page.locator('form')).toContainText('Email o contraseña incorrectos.');
  await expect(page.locator('form')).toContainText('La contraseña debe:');
  await expect(page.getByRole('listitem')).toContainText('- Email o contraseña incorrectos.');
});