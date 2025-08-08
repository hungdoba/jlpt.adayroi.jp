import fs from 'fs';
import path from 'path';
import { Section, JlptInfo, JlptList } from '../types/jlpt';
import { JlptLevel, JlptMonth, Mondai, Question, Sentence } from '@/types/base';

export async function getJlptListFromDir(dirPath: string): Promise<JlptList> {
  const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
  const folders = items.filter((item) => item.isDirectory()).map((item) => item.name);

  const jlptList: JlptList = {
    level: [...folders] as JlptLevel[],
    year: [],
    month: [],
  };

  const years = new Set<number>();
  const months = new Set<number>();

  for (const folder of folders) {
    const folderPath = path.join(dirPath, folder);
    const files = await fs.promises.readdir(folderPath);
    const jsonFiles = files.filter((file) => path.extname(file) === '.json');

    for (const file of jsonFiles) {
      const [year, month] = path.parse(file).name.split('-').map(Number);
      years.add(year);
      months.add(month);
    }
  }

  jlptList.year = Array.from(years).sort((a, b) => b - a);
  jlptList.month = Array.from(months).sort((a, b) => a - b) as JlptMonth[];

  return jlptList;
}

export async function getJlptInfo(dirPath: string): Promise<JlptInfo[]> {
  const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
  const folders = items.filter((item) => item.isDirectory()).map((item) => item.name);

  let id = 1;
  const jlptInfos: JlptInfo[] = [];

  for (const folder of folders) {
    const folderPath = path.join(dirPath, folder);
    const files = await fs.promises.readdir(folderPath);
    const jsonFiles = files.filter((file) => path.extname(file) === '.json');

    for (const file of jsonFiles) {
      const filePath = path.join(folderPath, file);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(data);

      const [year, month] = path.parse(file).name.split('-').map(Number);

      jlptInfos.push({
        id: id++,
        level: folder as JlptLevel,
        year,
        month: month as JlptMonth,
        totalQuestions: jsonData.totalQuestions || 0,
      });
    }
  }

  jlptInfos.sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  return jlptInfos;
}

export async function readJlptJson(filePath: string): Promise<Section[]> {
  const fileContents = await fs.promises.readFile(filePath, 'utf-8');
  if (!fileContents) return [];

  const data = JSON.parse(fileContents);

  const sections: Section[] = data.sections || [];
  const sentences: Sentence[] = data.sentences || [];
  const questions: Question[] = data.questions || [];

  for (const section of sections) {
    const mondais: Mondai[] = [];

    // Mondais without sentences (sentenceId === 0)
    const sectionQuestions = questions.filter(
      (q) => q.mondaiId === section.id && q.sentenceId === 0,
    );
    for (const q of sectionQuestions) {
      mondais.push({
        id: q.id || 0,
        sentence: undefined,
        questions: [q],
      });
    }

    // Mondais with sentences
    const sectionSentences = sentences.filter((s) => s.mondaiId === section.id);
    for (const sentence of sectionSentences) {
      const sentenceQuestions = questions.filter(
        (q) => q.sentenceId === sentence.id && q.mondaiId === section.id,
      );
      mondais.push({
        id: sentence.id,
        sentence,
        questions: sentenceQuestions,
      });
    }

    section.mondais = mondais;
  }

  return sections;
}
