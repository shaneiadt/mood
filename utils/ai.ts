import { BaseLanguageModelInput } from '@langchain/core/language_models/base'
import { OpenAI } from '@langchain/openai'

export const analyze = async (prompt: BaseLanguageModelInput) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  })
  const result = await model.invoke(prompt)
  console.log({ result })
}
