import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/users');
  await page.getByRole('button', { name: 'Editar' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('');
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Correo' }).fill('');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByText('El nombre de usuario debe')).toBeVisible();
  await expect(page.getByText('El correo electrónico no es v')).toBeVisible();
});