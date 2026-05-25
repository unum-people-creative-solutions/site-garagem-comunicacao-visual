import { test, expect } from '@playwright/test';

test.describe('Fluxo de Conversão e UI', () => {
  test.beforeEach(async ({ page }) => {
    // Em um ambiente real, o baseURL estaria configurado. Aqui usamos local.
    await page.goto('http://localhost:3000');
  });

  test('deve exibir Hero Section com Headline e CTA visível', async ({ page }) => {
    const headline = page.getByRole('heading', { name: /Sua marca em destaque/i });
    await expect(headline).toBeVisible();

    const cta = page.getByRole('button', { name: /Quero Destacar Meu Negócio/i });
    await expect(cta).toBeVisible();
  });

  test('deve abrir o modal de lead ao clicar no CTA da Hero', async ({ page }) => {
    await page.getByRole('button', { name: /Quero Destacar Meu Negócio/i }).click();
    
    const modalTitle = page.getByRole('heading', { name: /Destaque sua Marca/i });
    await expect(modalTitle).toBeVisible();
    
    await expect(page.getByPlaceholder(/COMO DEVEMOS TE CHAMAR/i)).toBeVisible();
  });

  test('deve permitir interagir com o Slider de Antes/Depois', async ({ page }) => {
    const sliderContainer = page.locator('section').filter({ hasText: /A Transformação Visual/i });
    await expect(sliderContainer).toBeVisible();
    
    // Verifica se os textos de Antes/Depois estão presentes
    await expect(page.getByText('ANTES', { exact: true })).toBeVisible();
    await expect(page.getByText('DEPOIS', { exact: true })).toBeVisible();
  });

  test('deve validar campos do formulário de lead', async ({ page }) => {
    await page.getByRole('button', { name: /Quero Destacar Meu Negócio/i }).click();
    await page.getByRole('button', { name: /Quero meu orçamento/i }).click();
    
    await expect(page.getByText(/O nome deve ter pelo menos 3 caracteres/i)).toBeVisible();
    await expect(page.getByText(/Telefone incompleto/i)).toBeVisible();
  });
});
