'use server';

import { Hint, HintField } from '@/types/base';
import fs, { readFile } from 'fs/promises';

export async function updateQuestionExplanation(
  jsonQuizFileName: string,
  id: string,
  content: string,
): Promise<boolean> {
  const data = await fs.readFile(jsonQuizFileName, 'utf8');
  const jsonData = JSON.parse(data);

  let isUpdated = false;
  for (const question of jsonData) {
    if (question.id == id) {
      question.explanation = content;
      isUpdated = true;
      break;
    }
  }

  if (isUpdated) {
    await fs.writeFile(jsonQuizFileName, JSON.stringify(jsonData, null, 2), 'utf8');
    return true;
  } else {
    console.log(`No question found with id ${id}`);
    return false;
  }
}

export async function updateQuizGrammarQuestionExplanation(
  jsonGrammarQuizFileName: string,
  id: string,
  content: string,
): Promise<boolean> {
  const data = await fs.readFile(jsonGrammarQuizFileName, 'utf8');
  const jsonData = JSON.parse(data);

  let isUpdated = false;
  for (const question of jsonData.questions) {
    if (question.id == id) {
      question.explanation = content;
      isUpdated = true;
      break;
    }
  }

  if (isUpdated) {
    await fs.writeFile(jsonGrammarQuizFileName, JSON.stringify(jsonData, null, 2), 'utf8');
    return true;
  } else {
    console.log(`No question found with id ${id}`);
    return false;
  }
}

export async function updateQuizGrammarSentenceExplanation(
  jsonGrammarQuizFileName: string,
  id: string,
  content: string,
): Promise<boolean> {
  const data = await fs.readFile(jsonGrammarQuizFileName, 'utf8');
  const jsonData = JSON.parse(data);

  let isUpdated = false;
  for (const sentence of jsonData.sentences) {
    if (sentence.id == id) {
      sentence.translation = content;
      isUpdated = true;
      break;
    }
  }

  if (isUpdated) {
    await fs.writeFile(jsonGrammarQuizFileName, JSON.stringify(jsonData, null, 2), 'utf8');
    return true;
  } else {
    console.log(`No question found with id ${id}`);
    return false;
  }
}

export async function getExplanation(
  filePath: string,
  questionId: number | 0,
): Promise<string | null> {
  if (filePath == '' || questionId == 0) {
    return null;
  }

  const fileContents = await readFile(filePath, 'utf-8');
  if (!fileContents) {
    return null;
  }

  let data = JSON.parse(fileContents);

  if (!data) {
    return null;
  }

  if (data.questions) {
    data = data.questions;
  }

  for (const question of data) {
    if (question.id == questionId) {
      return question.explanation;
    }
  }

  return null;
}

export async function updateQuizJson(formData: FormData): Promise<boolean> {
  const filePath = formData.get('file_path') as string;
  const field = formData.get('field') as string;
  const id = formData.get('id') as string;
  const text = formData.get('text') as string;

  console.log(`Updating JSON at ${filePath} for field ${field} with id ${id}`);

  if (!filePath || !field || !id) {
    console.error('Invalid form data');
    return false;
  }

  const data = await fs.readFile(filePath, 'utf8');
  const jsonData = JSON.parse(data);

  switch (field) {
    case HintField.Sentence: {
      const sentence = jsonData.sentences.find((s: { id: number }) => s.id === Number(id));
      if (!sentence) {
        console.error(`No sentence found with id ${id}`);
        return false;
      }
      sentence.translation = text;
      break;
    }
    case HintField.Question: {
      const question = jsonData.questions.find((q: { id: number }) => q.id === Number(id));
      if (!question) {
        console.error(`No question found with id ${id}`);
        return false;
      }
      question.explanation = text;
      break;
    }
    case HintField.SentenceText: {
      const sentence = jsonData.sentences.find((s: { id: number }) => s.id === Number(id));
      if (!sentence) {
        console.error(`No sentence found with id ${id}`);
        return false;
      }
      sentence.text = text;
      break;
    }
    default: {
      console.error(`Unknown field: ${field}`);
      return false;
    }
  }

  await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
  return true;
}

export async function getQuizHint(hint: Hint): Promise<string | null> {
  if (!hint.filePath || !hint.field || hint.id == 0) {
    return null;
  }

  const fileContents = await readFile(hint.filePath, 'utf-8');
  if (!fileContents) {
    return null;
  }

  const jsonData = JSON.parse(fileContents);

  if (!jsonData) {
    return null;
  }

  switch (hint.field) {
    case HintField.Sentence: {
      const sentence = jsonData.sentences.find((s: { id: number }) => s.id === hint.id);
      if (sentence) {
        return sentence.translation;
      }
      break;
    }
    case HintField.Question: {
      const question = jsonData.questions.find((q: { id: number }) => q.id === hint.id);
      if (question) {
        return question.explanation;
      }
      break;
    }
    case HintField.SentenceText: {
      const sentence = jsonData.sentences.find((s: { id: number }) => s.id === hint.id);
      if (sentence) {
        return sentence.text;
      }
      break;
    }
  }
  console.error(`No ${hint.field} found with id ${hint.id}`);
  return null;
}
