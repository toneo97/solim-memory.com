import { GoogleGenAI } from "@google/genai";

// This file is prepared for future integration when the user clicks 'Get Started'
// and wants to generate memory descriptions or images.

// Ensure API key is present in environment variables in a real implementation
const apiKey = process.env.API_KEY || 'PLACEHOLDER_KEY';

export const ai = new GoogleGenAI({ apiKey });

export const generateMemoryDescription = async (prompt: string) => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing. Mocking response.");
    return "This is a mocked memory description because no API key was provided.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Help me describe this memory more vividly for an image generator: ${prompt}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating memory description:", error);
    throw error;
  }
};
