import axios from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for text content
const textContentSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

// Define the schema for image content (no need to define if not used yet)
const imageContentSchema = z.object({
  type: z.literal("image_url"),
  image_url: z.object({
    url: z.string().url(),
  }),
});

// Create a union of text and image content schemas
const contentSchema = z.union([textContentSchema, imageContentSchema]);

// Define the schema for a message
const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.array(contentSchema),
});

// Define the schema for the chat request
const chatRequestSchema = z.object({
  messages: z.array(messageSchema),
});

const OPENAI_URL = "https://api.openai.com/v1/chat/completions" as const;

export async function POST(request: Request) {
  const requestBody = await request.json();
  const parsedRequest = chatRequestSchema.safeParse(requestBody);

  if (!parsedRequest.success) {
    console.log("Invalid schema", parsedRequest.error);
    return NextResponse.json({ error: "Invalid schema", success: false });
  }

  // Clone the messages and replace image URLs with a placeholder
  const clonedMessages = parsedRequest.data.messages.map((message) => ({
    ...message,
    content: message.content.map((content) => {
      if (content.type === "image_url") {
        return {
          type: content.type,
          image_url: {
            url: content.image_url.url,
          },
        };
      }
      return content;
    }),
  }));

  const payload = {
    model: "gpt-4-vision-preview",
    messages: [
      // Add your prompt message here
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "Prompt: You are now a healthcare professional specializing in primary care and general medicine. Your goal is to provide accurate medical advice, answer health-related questions, and offer guidance to patients in a compassionate and informative manner. Your responses should be evidence-based, considerate of patient privacy, and focused on promoting overall well-being. Please ensure that your advice aligns with standard medical practices and guidelines do not answer anything outside of your specified domain just reply i am always there to help you as a healthcare bot nothing more nothing less use hindi as your primary language the text should also be in  hindi "
          },
          {
            type: "text",
            text: "What language are you using? (e.g., English, Spanish, French)"
          },
        ],
      },
      // Clone the existing messages
      ...clonedMessages,
    ],
    max_tokens: 300,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  return axios
    .post(OPENAI_URL, payload, { headers })
    .then((response) => {
      const firstMessage = response.data.choices[0].message;
      return NextResponse.json({ success: true, message: firstMessage });
    })
    .catch((error) => {
      console.log("error", error);
      return NextResponse.json(
        { success: false, message: null },
        { status: 500 }
      );
    });
}
