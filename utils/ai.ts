import { BaseLanguageModelInput } from '@langchain/core/language_models/base'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { OpenAI } from '@langchain/openai'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    summary: z
      .string()
      .describe('a quick summary of the entire journal entry.'),
    negtaive: z
      .boolean()
      .describe(
        'whether the journal entry is negative? (i.e. dos it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the journal entry. Example; #0101fe for blue representing happiness.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const formattedInstructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {formattedInstructions} \n {entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  })

  const input = await prompt.format({ entry: content })

  console.log(input)
  return input
}

export const analyze = async (content: string) => {
  const prompt = await getPrompt(content)
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  })
  const result = await model.invoke(prompt)
  console.log({ result })
}
