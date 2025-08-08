import fs from 'fs';
import { MimikaraOboeru } from '@/types/mimikara';

export async function readJsonFile(filePath: string): Promise<MimikaraOboeru[] | null> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}
