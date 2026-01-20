
import { GoogleGenAI } from "@google/genai";
import { Tournament } from "../types";

export const getBattleStrategy = async (tournament: Tournament) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Act as an elite Free Fire Pro Coach. Analyze this tournament and give 3 short, punchy tactical tips:
  Tournament: ${tournament.title}
  Mode: ${tournament.type}
  Map: ${tournament.map}
  Entry Fee: ${tournament.entryFee}
  
  Format your response as a JSON array of strings. Only return the JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error fetching AI strategy:", error);
    return [
      "Drop in high-loot zones for early advantage.",
      "Conserve gloo walls for the final circle.",
      "Communicate constantly with your squad."
    ];
  }
};
