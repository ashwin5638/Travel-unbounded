import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OpenRoute_API;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";
const FALLBACK_MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

const SYSTEM_PROMPT = `You are a friendly, expert travel consultant for "Travel Unbounded", a travel company specializing in both Indian and international destinations.

Available Destinations:
INDIA: Kerala (backwaters, beaches), Himachal Pradesh (mountains, valleys), Ladakh (high-altitude, monasteries, adventure), Andaman (islands, crystal waters), Goa (beaches, culture, food)
INTERNATIONAL: Kenya (safari), Vietnam (culture, cuisine, beaches), Tanzania (wildlife, Zanzibar), Iceland (glaciers, volcanoes, northern lights), Sri Lanka (beaches, heritage, cuisine)

YOUR GOAL: Have a natural conversation to understand the visitor's travel preferences, then generate a custom day-wise itinerary.

CONVERSATION FLOW:
1. Greet warmly and ask about their dream trip
2. Ask about: destination preference (beach/mountain/city/wildlife), budget range, number of travelers, trip duration, interests (adventure/relaxation/culture/wildlife/food)
3. Once you have enough info (at least destination type, duration, and travelers), offer to generate a custom itinerary
4. When the user says "yes" or asks for an itinerary, generate it

WHEN GENERATING AN ITINERARY, output it in this EXACT JSON format after a brief introduction:
\`\`\`json
{
  "itinerary": {
    "title": "X-Day [Destination] [Type] Adventure",
    "days": [
      {
        "day": 1,
        "title": "Day Title",
        "activities": [
          {
            "time": "09:00 AM",
            "title": "Activity Name",
            "description": "Brief description of the activity",
            "type": "adventure|relaxation|culture|wildlife|food|sightseeing|transport"
          }
        ],
        "accommodation": "Hotel/resort name or type"
      }
    ],
    "preferences": {
      "destination": "destination name",
      "budget": "budget range mentioned",
      "travelers": number,
      "duration": number of days,
      "interests": ["list of interests"],
      "travelStyle": "budget|moderate|luxury"
    }
  }
}
\`\`\`

RULES:
- Keep responses conversational and friendly, not robotic
- Ask ONE question at a time, don't overwhelm with multiple questions
- Use emojis sparingly to add warmth
- Reference real destinations from our list when relevant
- When generating itineraries, make them practical with realistic timings
- Always end your response by asking if they'd like to modify anything
- Only output the JSON itinerary block once, at the end of the itinerary response
- Keep the text before the JSON conversational and informative`;

export async function POST(request) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { success: false, message: "AI service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, message: "Messages are required." },
        { status: 400 }
      );
    }

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content
      }))
    ];

    async function callModel(model) {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "https://travelunbounded.com",
          "X-Title": "Travel Unbounded Chatbot"
        },
        body: JSON.stringify({
          model,
          messages: apiMessages,
          stream: true,
          temperature: 0.7,
          max_tokens: 2048
        })
      });

      if (!response.ok) {
        throw new Error(`Model ${model} returned ${response.status}`);
      }

      return response;
    }

    let response;
    try {
      response = await callModel(MODEL);
    } catch (err) {
      console.warn(`Primary model failed, trying fallback: ${err.message}`);
      response = await callModel(FALLBACK_MODEL);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;

              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
                  );
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process chat request." },
      { status: 500 }
    );
  }
}
