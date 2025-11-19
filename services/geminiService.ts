import { GoogleGenAI } from "@google/genai";
import { ProposalItem } from '../types';

// FIX: Initialized GoogleGenAI client directly with process.env.API_KEY and removed unnecessary checks, per coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProposalDescription = async (items: ProposalItem[]): Promise<string> => {
  const itemsDescription = items.map(item => {
    let details = `${item.quantity}x ${item.product.name}`;
    if (item.width && item.height) {
      details += ` (medidas: ${item.width}m x ${item.height}m)`;
    }
    return details;
  }).join(', ');

  const prompt = `
    Aja como um especialista em vendas e design de interiores para uma loja de cortinas e artigos de cama, mesa e banho.
    Crie um texto de proposta comercial curto, elegante e persuasivo para os seguintes itens: ${itemsDescription}.
    Destaque os benefícios como conforto, sofisticação, e qualidade. O texto deve ser amigável e profissional, incentivando o cliente a aprovar a proposta.
    Não inclua saudações ou despedidas, apenas o corpo do texto descritivo da proposta.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Não foi possível gerar a descrição. Tente novamente.";
  }
};
