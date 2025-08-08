import os
import json
import time
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
import utils
from gemini import Gemini

# Load environment variables from .env file
load_dotenv()

# Suppress gRPC warnings
os.environ['GRPC_VERBOSITY'] = 'ERROR'
os.environ['GLOG_minloglevel'] = '2'

GEMINI_MODEL = 'gemini-2.5-flash'
READING_FILE_PATH = os.path.join('data', 'quiz', 'n1', 'reading.json')
API_KEYS = os.getenv('GEMINI_API_KEY') or ""

gemini_client = Gemini(api_key=API_KEYS, model_name=GEMINI_MODEL)


def load_json(file_path: str) -> Optional[Dict[str, Any]]:
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Failed to load {file_path}: {e}")
        return None


def save_json(file_path: str, data: Dict[str, Any]) -> None:
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"Failed to save {file_path}: {e}")


def process_questions(
    file_path: str,
    filter_fn,
    translate_fn,
    extra_update_fn=None,
    sleep_time: int = 10
) -> None:
    data = load_json(file_path)
    if not data:
        print("No data found in the reading file.")
        return

    questions = filter_fn(data)
    total_questions = len(questions)
    translated_count = sum(1 for q in questions if q.get('explanation'))

    print(f"Starting translation process: {translated_count}/{total_questions} already translated")

    for question in questions:
        if question.get('explanation'):
            continue

        if extra_update_fn:
            extra_update_fn(question, data)

        explanation = translate_fn(question)
        if explanation:
            question['explanation'] = explanation
            translated_count += 1
            print(f"Updated explanation for question ID {question.get('id')} - Progress: {translated_count}/{total_questions}")
        else:
            print(f"Failed to update explanation for question ID {question.get('id')} - Progress: {translated_count}/{total_questions}")

        save_json(file_path, data)
        time.sleep(sleep_time)

    print(f"Translation complete: {translated_count}/{total_questions} translated")


def update_question_explanation_reading():
    def filter_fn(data):
        return data.get('questions', [])

    def translate_fn(question):
        return gemini_client.translate_jlpt_question(json.dumps(question, ensure_ascii=False))

    process_questions(READING_FILE_PATH, filter_fn, translate_fn)


def update_question_explanation_mondai_1_6(file_path: str, mondai_id: int):
    if not (1 <= mondai_id <= 6):
        print(f"Invalid mondai_id: {mondai_id}. It must be between 1 and 6.")
        return

    print(f"Processing file: {file_path}, mondai: {mondai_id}")

    def filter_fn(data):
        return [q for q in data.get('questions', []) if q.get('mondaiId') == mondai_id]

    def translate_fn(question):
        return gemini_client.translate_jlpt_mondai(mondai_id, json.dumps(question, ensure_ascii=False))

    process_questions(file_path, filter_fn, translate_fn)


def update_sentence_mondai_7(file_path: str):
    print(f"Processing file: {file_path}")

    data = load_json(file_path)
    if not data:
        print("No data found in the reading file.")
        return

    sentences = [q for q in data.get("sentences", []) if q.get('mondaiId') == 7]
    sentence_obj = sentences[0] if sentences else None
    sentence_text = sentence_obj["text"] if sentence_obj else None

    questions = [q for q in data.get('questions', []) if q.get('mondaiId') == 7]

    json_data = {
        "sentence": sentence_text,
        "questions": questions
    }

    explanation = gemini_client.translate_jlpt_mondai(70, json.dumps(json_data, ensure_ascii=False))

    if explanation and sentence_obj is not None:
        sentence_obj['translation'] = explanation
        save_json(file_path, data)
        print(f"Updated sentence translation for mondai 7 in {file_path}")


def update_question_explanation_mondai_7(file_path: str):
    print(f"Processing file: {file_path}, mondai: 7")

    def filter_fn(data):
        return [q for q in data.get('questions', []) if q.get('mondaiId') == 7]

    def translate_fn(question):
        return gemini_client.translate_jlpt_mondai(7, json.dumps(question, ensure_ascii=False))

    def extra_update_fn(question, data):
        sentences = [q for q in data.get("sentences", []) if q.get('mondaiId') == 7]
        sentence_obj = sentences[0] if sentences else None
        sentence_text = sentence_obj["text"] if sentence_obj else None
        question["sentence"] = sentence_text

    def cleanup_fn(question, data):
        question.pop("sentence", None)

    # Custom process to handle sentence injection and cleanup
    data = load_json(file_path)
    if not data:
        print("No data found in the reading file.")
        return

    questions = filter_fn(data)
    total_questions = len(questions)
    translated_count = sum(1 for q in questions if q.get('explanation'))

    print(f"Starting translation process: {translated_count}/{total_questions} already translated")

    for question in questions:
        if question.get('explanation'):
            continue

        extra_update_fn(question, data)
        explanation = translate_fn(question)
        if explanation:
            question['explanation'] = explanation
            translated_count += 1
            print(f"Updated explanation for question ID {question.get('id')} - Progress: {translated_count}/{total_questions}")
        else:
            print(f"Failed to update explanation for question ID {question.get('id')} - Progress: {translated_count}/{total_questions}")

        cleanup_fn(question, data)
        save_json(file_path, data)
        time.sleep(10)

    print(f"Translation complete: {translated_count}/{total_questions} translated")


def update_question_explanation_mondai_8_13(file_path: str, mondai_id: int = 8):
    if not (8 <= mondai_id <= 13):
        print(f"Invalid mondai_id: {mondai_id}. It must be between 8 and 13.")
        return

    print(f"Processing file: {file_path}, mondai: {mondai_id}")

    def filter_fn(data):
        return [q for q in data.get('questions', []) if q.get('mondaiId') == mondai_id]

    def translate_fn(question):
        return gemini_client.translate_jlpt_mondai(mondai_id, json.dumps(question, ensure_ascii=False))

    process_questions(file_path, filter_fn, translate_fn)


if __name__ == "__main__":
    # update_question_explanation_reading()

    file = os.path.join('data', 'jlpt', 'n1', '2024-12.json')

    # update_sentence_mondai_7(file)
    # update_question_explanation_mondai_7(file)

    for mondai_id in range(8, 14):
        update_question_explanation_mondai_8_13(file, mondai_id)

    # files = utils.get_all_json_files_in_folder(os.path.join('data', 'jlpt', 'n1'))
    # for file in files:
    #     update_question_explanation_mondai_1_6(file, 6)
