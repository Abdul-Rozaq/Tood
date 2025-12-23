import { ParsedTask } from '../services/openaiService';

const dateRegex = /\b(today|tomorrow|\d{4}-\d{2}-\d{2}|\d{1,2}(am|pm))\b/i;

export function extractTasks(input: string): ParsedTask[] {
  if (!input || typeof input !== 'string') {
    return [];
  }

  const text = input.trim();

  // Split tasks using connectors
  const separators = /\b(and|also|then)\b/i;
  const parts = text.split(separators).filter(Boolean);

  // If no real split happened, keep as single task
  const taskParts =
    parts.length > 1 ? parts.filter((_, i) => i % 2 === 0) : [text];

  // Build task objects
  return taskParts.map(task => {
    const cleaned = task.trim();

    const dueDate = parseDateFromText(cleaned);

    const title = cleaned
      .replace(dateRegex, '')
      .replace(/^\b(to|please)\b/i, '')
      .trim()
      .replace(/^[a-z]/, c => c.toUpperCase());

    return {
      title: title.length > 50 ? title.slice(0, 47) + '...' : title,
      description: title !== cleaned ? cleaned : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };
  });
}

export function parseDateFromText(taskText: string) {
  const match = taskText.match(dateRegex);
  if (!match) return null;

  const now = new Date();

  if (match[0].toLowerCase() === 'today') {
    return now.toISOString();
  }

  if (match[0].toLowerCase() === 'tomorrow') {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    return tomorrow.toISOString();
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(match[0])) {
    return new Date(match[0]).toISOString();
  }

  if (/\d{1,2}(am|pm)/i.test(match[0])) {
    const hour = parseInt(match[0], 10);
    const isPM = match[0].toLowerCase().includes('pm');
    const date = new Date(now);
    date.setHours(isPM ? hour + 12 : hour, 0, 0, 0);
    return date.toISOString();
  }

  return undefined;
}
