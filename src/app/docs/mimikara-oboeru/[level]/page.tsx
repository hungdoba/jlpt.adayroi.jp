import { Metadata } from 'next';
import { readJsonFile } from '@/lib/mimikara';
import { MimikaraOboeru } from '@/types/mimikara';
import { MimikaraOboeruTable } from '@/components/table/MimikaraOboeruTable';

interface Props {
  params: Promise<{ level: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;

  return {
    title: `Mimikara Oboeru Từ vựng ${level.toUpperCase()} - Adayroi.jp`,
    description: `Từ vựng trong sách Mimikara Oboeru ${level.toUpperCase()}`,
  };
}

export function generateStaticParams(): { level: string }[] {
  return [{ level: 'n1' }, { level: 'n2' }, { level: 'n3' }];
}

export default async function Page({ params }: Props) {
  const { level } = await params;

  const filePath = `${process.env.DATA_PATH}/mimikara-oboeru/${level}.json`;

  try {
    const data: MimikaraOboeru[] | null = await readJsonFile(filePath);

    if (!data) {
      return (
        <div className="container">
          <p className="text-red-500">{`Data not found for level: ${level}`}</p>
        </div>
      );
    }

    return <MimikaraOboeruTable data={data} />;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return (
      <div className="container">
        <p className="text-red-500">{`An error occurred while loading data for level: ${level}`}</p>
      </div>
    );
  }
}
