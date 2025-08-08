import fs from 'fs';
import { Mondai, Question, Sentence } from '@/types/base';

export async function readQuizJson(filePath: string): Promise<Mondai[]> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    if (!fileContents) return [];

    const data = JSON.parse(fileContents);
    const Mondaies: Mondai[] = [];
    const sentences: Sentence[] = data.sentences || [];
    const questions: Question[] = data.questions || [];

    // Questions without sentenceId
    questions
      .filter((q) => q.sentenceId == null)
      .sort((a, b) => (a.id || 0) - (b.id || 0))
      .forEach((question) => {
        Mondaies.push({
          id: 0,
          questions: [
            {
              id: question.id,
              text: question.text,
              options: question.options,
              correctAnswer: question.correctAnswer,
              points: question.points,
              explanation: question.explanation,
            },
          ],
        });
      });

    // Questions grouped by sentence
    sentences.forEach((sentence) => {
      const matchingQuestions = questions.filter((q) => q.sentenceId === sentence.id);
      Mondaies.push({
        id: sentence.id,
        sentence,
        questions: matchingQuestions,
      });
    });

    return Mondaies;
  } catch (error) {
    console.error(`Error reading quiz JSON file ${filePath}:`, error);
    return [];
  }
}
