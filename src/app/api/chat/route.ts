import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// Create API client
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
 
// Set runtime to edge
export const runtime = 'edge'
 
export async function POST(req: Request) {
  // Extract `messages` from the body
  const { messages } = await req.json()
 
  // streaming chat completion 
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  })

  const stream = OpenAIStream(response)
  
  return new StreamingTextResponse(stream)
}