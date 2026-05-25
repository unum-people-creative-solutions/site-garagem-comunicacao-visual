export interface LeadData {
  nome: string;
  email?: string;
  telefone: string;
  origem: string;
  gclid?: string | null;
  fbclid?: string | null;
  msclkid?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  metadados?: {
    url_conversao: string;
    data_hora: string;
    [key: string]: any;
  };
}

export async function sendLeadToCRM(data: LeadData) {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "https://api.unumpeople.com.br";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const url = `${baseUrl}/ingest`;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey || "",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`CRM API responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending lead to CRM:", error);
    throw error;
  }
}
