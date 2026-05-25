import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LeadProvider, useLead } from '../context/LeadContext';
import React from 'react';

// Componente de teste para consumir o context
const TestComponent = () => {
  const { tracking } = useLead();
  return (
    <div>
      <span data-testid="gclid">{tracking.gclid}</span>
      <span data-testid="utm_source">{tracking.utm_source}</span>
    </div>
  );
};

describe('LeadContext Tracking', () => {
  beforeEach(() => {
    sessionStorage.clear();
    // Limpa a URL antes de cada teste se necessário, mas o Vitest/jsdom lida com window.location
  });

  it('deve capturar parâmetros gclid da URL', async () => {
    // Simula URL com parâmetros
    const url = 'http://localhost/?gclid=test_gclid&utm_source=google';
    Object.defineProperty(window, 'location', {
      value: new URL(url),
      writable: true
    });

    render(
      <LeadProvider>
        <TestComponent />
      </LeadProvider>
    );

    expect(screen.getByTestId('gclid')).toHaveTextContent('test_gclid');
    expect(screen.getByTestId('utm_source')).toHaveTextContent('google');
  });

  it('deve persistir parâmetros no sessionStorage', () => {
    const url = 'http://localhost/?gclid=persistent_gclid';
    Object.defineProperty(window, 'location', {
      value: new URL(url),
      writable: true
    });

    render(
      <LeadProvider>
        <TestComponent />
      </LeadProvider>
    );

    const saved = JSON.parse(sessionStorage.getItem('garagem_tracking') || '{}');
    expect(saved.gclid).toBe('persistent_gclid');
  });

  it('deve recuperar parâmetros do sessionStorage se a URL estiver vazia', () => {
    sessionStorage.setItem('garagem_tracking', JSON.stringify({ gclid: 'recovered_gclid', utm_source: 'recovered_source' }));
    
    // Simula URL sem parâmetros
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost/'),
      writable: true
    });

    render(
      <LeadProvider>
        <TestComponent />
      </LeadProvider>
    );

    expect(screen.getByTestId('gclid')).toHaveTextContent('recovered_gclid');
  });
});
