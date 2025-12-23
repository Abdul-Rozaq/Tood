import axios from 'axios';
import { extractTasks } from '../utils';
import { OPENAI_API_KEY, OPENAI_API_URL } from '@env';

export interface ParsedTask {
  title: string;
  description?: string;
  dueDate?: Date;
}

export const parseVoiceInput = async (
  transcription: string,
): Promise<ParsedTask[]> => {
  try {
    const prompt = `
You are a task parser. Parse the following voice input into individual tasks.
Return ONLY a JSON array of tasks, no additional text.

Each task should have:
- title (required): A concise task title
- description (optional): Additional details if provided
- dueDate (optional): Parse any mentioned dates/times into ISO 8601 format

Rules:
1. Split compound tasks (e.g., "buy milk and call mom" → two tasks)
2. Use "and", "also", "then" as separators
3. Extract time/date information if mentioned
4. Keep titles concise and actionable
5. If no clear tasks, create one task with the full input

Voice input: "${transcription}"

Example output format:
[
  {
    "title": "Buy milk",
    "description": "Get whole milk from the store",
    "dueDate": "2024-01-15T10:00:00.000Z"
  },
  {
    "title": "Call mom",
    "description": null,
    "dueDate": null
  }
]
`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that parses voice inputs into structured task data. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const content = response.data.choices[0].message.content.trim();

    // Extract JSON from markdown code blocks if present
    const jsonMatch =
      content.match(/```json\n?([\s\S]*?)\n?```/) ||
      content.match(/\[[\s\S]*\]/);
    const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;

    const tasks: ParsedTask[] = JSON.parse(jsonString);

    // Convert date strings to Date objects
    return tasks.map(task => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }));
  } catch (error) {
    console.error('Error parsing voice input:', error);

    // Fallback: split task manually if API fails
    const tasks = extractTasks(transcription);
    return tasks;
  }
};
