import prompts
from typing import Optional
import google.generativeai as genai


class Gemini:
    def __init__(self, api_key: str, model_name: str = "gemini-2.5-flash"):
        """
        Initialize Gemini AI client

        Args:
            api_key: Google AI API key
            model_name: Model name (default: gemini-pro)
        """
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def generate_response(self, prompt: str) -> Optional[str]:
        """
        Generate response from Gemini AI

        Args:
            prompt: Input prompt content

        Returns:
            Response text from Gemini AI or None if error
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error generating response: {e}")
            return None

    def translate_jlpt_question(self, content: str) -> Optional[str]:
        """
        Translate JLPT question using the predefined prompt template

        Args:
            content: JSON string containing JLPT question data

        Returns:
            Translated JLPT question in Vietnamese or None if error
        """
        try:
            formatted_prompt = prompts.JLPT_QUESTION_TRANSLATION_PROMPT.format(
                content=content)
            response = self.model.generate_content(formatted_prompt)
            return response.text
        except Exception as e:
            print(f"Error translating JLPT question: {e}")
            return None

    def translate_jlpt_mondai(self, mondai_number: int, content: str) -> Optional[str]:
        """
        Translate JLPT Mondai (1, 2, or 3) using the corresponding prompt template.

        Args:
            mondai_number: Mondai number (1, 2, or 3)
            content: JSON string containing JLPT mondai data

        Returns:
            Translated JLPT mondai in Vietnamese or None if error
        """
        prompt_map = {
            1: prompts.JLPT_MONDAI_1_PROMPT,
            2: prompts.JLPT_MONDAI_2_PROMPT,
            3: prompts.JLPT_MONDAI_3_PROMPT,
            4: prompts.JLPT_MONDAI_4_PROMPT,
            5: prompts.JLPT_MONDAI_5_PROMPT,
            6: prompts.JLPT_MONDAI_6_PROMPT,
            7: prompts.JLPT_MONDAI_7_PROMPT,
            8: prompts.JLPT_QUESTION_TRANSLATION_PROMPT,
            9: prompts.JLPT_QUESTION_TRANSLATION_PROMPT,
            10: prompts.JLPT_QUESTION_TRANSLATION_PROMPT,
            11: prompts.JLPT_QUESTION_TRANSLATION_PROMPT,
            12: prompts.JLPT_QUESTION_TRANSLATION_PROMPT,
            13: prompts.JLPT_QUESTION_TRANSLATION_PROMPT,
            70: prompts.JLPT_MONDAI_7_SENTENCE_PROMPT,
        }
        prompt_template = prompt_map.get(mondai_number)
        if not prompt_template:
            print(f"Invalid mondai number: {mondai_number}")
            return None
        try:
            formatted_prompt = prompt_template.format(content=content)
            response = self.model.generate_content(formatted_prompt)
            return response.text
        except Exception as e:
            print(f"Error translating JLPT mondai {mondai_number}: {e}")
            return None
