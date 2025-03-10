'use server';

import { Mondai, Question } from '@/types/question';
import fs from 'fs/promises';

export async function updateJson(formData: FormData): Promise<boolean> {
  const jsonFileName = formData.get('json_file_name');
  const questionId = formData.get('question_id');
  const mondaiId = formData.get('mondai_id');
  const content = formData.get('content');

  console.log('jsonFileName:', jsonFileName);
  console.log('questionId:', questionId);
  console.log('mondaiId:', mondaiId);
  console.log('mondaiId type:', typeof mondaiId);
  console.log('mondaiId value check:', mondaiId !== '');

  const filePath = `data/questions/${jsonFileName}`;

  // Read the JSON file
  return fs
    .readFile(filePath, 'utf8')
    .then(async (data) => {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      if (mondaiId != '') {
        console.log('mondaiId:', mondaiId);

        // Update mondai_title by mondai_id
        const mondai = jsonData.find(
          (m: Mondai) => m.mondai_id === Number(mondaiId)
        );
        if (mondai) {
          mondai.mondai_text.translation = content;
          console.log(
            `Updated mondai_title for mondai_id ${mondaiId} to: ${content}`
          );
        } else {
          console.log(`No mondai found with mondai_id ${mondaiId}`);
          return false;
        }
      } else if (questionId != '') {
        // Update explanation by question_id
        let found = false;
        for (const mondai of jsonData) {
          const question = mondai.questions.find(
            (q: Question) => q.question_id === Number(questionId)
          );
          if (question) {
            question.explanation = content;
            console.log(
              `Updated explanation for question_id ${questionId} to: ${content}`
            );
            found = true;
            break;
          }
        }
        if (!found) {
          console.log(`No question found with question_id ${questionId}`);
          return false;
        }
      }

      // Write the updated JSON back to the file
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log(`File ${filePath} updated successfully`);
      return true;

      return false;
    })
    .catch((error) => {
      console.error('Error reading file:', error);
      return false;
    });
}
