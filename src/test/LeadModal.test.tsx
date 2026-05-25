import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LeadModal } from '../components/LeadModal';
import { LeadProvider, useLead } from '../context/LeadContext';
import * as crm from '../lib/crm';
import React from 'react';

// Wrapper para fornecer o context necessário
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LeadProvider>{children}</LeadProvider>
);

// Componente para controlar a abertura do modal nos testes
const ModalController = () => {
  const { openModal } = useLead();
  return <button onClick={() => openModal('https://wa.me/test')}>Abrir Modal</button>;
};

describe('LeadModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    vi.spyOn(crm, 'sendLeadToCRM').mockResolvedValue({ success: true });
    // Mock do window.open
    window.open = vi.fn();
  });

  it('deve submeter o formulário corretamente e mapear origem "Google Ads" se gclid existir', async () => {
    const user = userEvent.setup();
    
    // Simula gclid na URL
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost/?gclid=valid_gclid'),
      writable: true
    });

    render(
      <Wrapper>
        <ModalController />
        <LeadModal />
      </Wrapper>
    );

    // Abre o modal
    await user.click(screen.getByText('Abrir Modal'));

    // Preenche os campos
    await user.type(screen.getByPlaceholderText('COMO DEVEMOS TE CHAMAR?'), 'Cliente Teste');
    await user.type(screen.getByPlaceholderText('(00) 00000-0000'), '41999999999');
    await user.type(screen.getByPlaceholderText('SEU@EMAIL.COM'), 'teste@cliente.com');

    // Submete
    await user.click(screen.getByText('Quero meu orçamento'));

    await waitFor(() => {
      expect(crm.sendLeadToCRM).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'Cliente Teste',
          telefone: '(41) 99999-9999',
          origem: 'Google Ads',
          gclid: 'valid_gclid'
        })
      );
    });

    expect(window.open).toHaveBeenCalledWith(expect.stringContaining('wa.me'), '_blank', expect.any(String));
  });

  it('deve exibir erros de validação para campos vazios', async () => {
    const user = userEvent.setup();
    
    render(
      <Wrapper>
        <ModalController />
        <LeadModal />
      </Wrapper>
    );

    await user.click(screen.getByText('Abrir Modal'));
    await user.click(screen.getByText('Quero meu orçamento'));

    expect(await screen.findByText('O nome deve ter pelo menos 3 caracteres')).toBeInTheDocument();
    expect(await screen.findByText('Telefone incompleto')).toBeInTheDocument();
  });
});
