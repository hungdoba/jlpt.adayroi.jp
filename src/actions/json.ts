'use server';

import { Mondai } from '@/types/question';
import fs from 'fs/promises';

export async function updateJson(formData: FormData): Promise<boolean> {
  const jsonFileName = formData.get('json_file_name') as string;
  const questionId = formData.get('question_id') as string;
  const mondaiId = formData.get('mondai_id') as string;
  const content = formData.get('content') as string;

  const filePath = `data/questions/${jsonFileName}`;

  try {
    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    let updated = false;

    if (mondaiId) {
      // Update mondai_title by mondai_id
      updated = updateMondaiTranslation(jsonData, Number(mondaiId), content);
    } else if (questionId) {
      // Update explanation by question_id
      updated = updateQuestionExplanation(
        jsonData,
        Number(questionId),
        content
      );
    }

    if (updated) {
      // Write the updated JSON back to the file
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log(`File ${filePath} updated successfully`);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error processing file:', error);
    return false;
  }
}

function updateMondaiTranslation(
  jsonData: Mondai[],
  mondaiId: number,
  content: string
): boolean {
  // Try to find in top-level sub_mondai
  const mondai = jsonData.find((m) => m.mondai_id === mondaiId);
  if (mondai && mondai.passage) {
    mondai.passage.translation = content;
    return true;
  }

  // Try to find in sub-sub_mondai
  for (const m of jsonData) {
    if (!m.sub_mondai) continue;

    const subMondai = m.sub_mondai.find((q) => q.mondai_id === mondaiId);
    if (subMondai && subMondai.passage) {
      subMondai.passage.translation = content;
      return true;
    }
  }

  console.log(`No mondai found with mondai_id ${mondaiId}`);
  return false;
}

function updateQuestionExplanation(
  jsonData: Mondai[],
  questionId: number,
  content: string
): boolean {
  for (const mondai of jsonData) {
    // Check direct questions
    if (mondai.questions) {
      const question = mondai.questions.find(
        (q) => q.question_id === questionId
      );
      if (question) {
        question.explanation = content;
        return true;
      }
    }

    // Check nested questions in sub_mondai
    if (mondai.sub_mondai) {
      for (const subMondai of mondai.sub_mondai) {
        if (!subMondai.questions) continue;

        const question = subMondai.questions.find(
          (q) => q.question_id === questionId
        );
        if (question) {
          question.explanation = content;
          return true;
        }
      }
    }
  }

  console.log(`No question found with question_id ${questionId}`);
  return false;
}
