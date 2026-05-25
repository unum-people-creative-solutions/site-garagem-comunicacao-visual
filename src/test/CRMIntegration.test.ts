import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendLeadToCRM, LeadData } from '../lib/crm';

describe('CRM Integration Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_API_GATEWAY_URL = 'https://api.test.com';
    process.env.NEXT_PUBLIC_API_KEY = 'test_api_key';
  });

  it('deve enviar dados do lead com os headers corretos', async () => {
    const mockResponse = { success: true };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const leadData: LeadData = {
      nome: 'João Silva',
      telefone: '(41) 99999-9999',
      origem: 'Google Ads',
      gclid: 'test_gclid'
    };

    const result = await sendLeadToCRM(leadData);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ingest'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'test_api_key',
        },
        body: JSON.stringify(leadData),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('deve lançar erro se a API responder com falha', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const leadData: LeadData = {
      nome: 'Erro Teste',
      telefone: '0000',
      origem: 'Teste'
    };

    await expect(sendLeadToCRM(leadData)).rejects.toThrow('CRM API responded with 500');
  });
});
