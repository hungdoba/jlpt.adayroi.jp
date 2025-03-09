import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import questionData from '@/data/questions.json';

export default function Page() {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{questionData.question}</CardTitle>
        <CardDescription>{questionData.description}</CardDescription>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">
        <Textarea readOnly value={questionData.content}></Textarea>
      </CardContent>
      <CardFooter className="flex justify-between">
        {questionData.notes.map((note, index) => (
          <span key={index}>{note} </span>
        ))}
      </CardFooter>
    </Card>
  );
}
