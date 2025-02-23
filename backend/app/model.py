import ollama
from app.config import MODEL_NAME
import re

def split_text_to_json(text: str, max_char: int) -> str:
    """
    Splits the input text into multiple lines with a maximum character limit per line
    and returns it as a JSON string.

    :param text: The input string to be split.
    :param max_char: The maximum number of characters per line.
    :return: A JSON-formatted string with split text.
    """
    if max_char <= 0:
        raise ValueError("max_char must be greater than 0")

    lines = []
    while text:
        # Find the best place to split: at max_char or the last space before it
        split_at = max_char
        if len(text) > max_char:
            split_at = text.rfind(" ", 0, max_char)  # Find the last space before max_char
            if split_at == -1:  # If no space found, force split at max_char
                split_at = max_char

        lines.append(text[:split_at].strip())  # Add the split line, stripping extra spaces
        text = text[split_at:].lstrip()  # Remove leading spaces from the remaining text

    return "\n".join(lines)

def query_model(prompt):
    """Query the Ollama model with the given prompt."""
    response = ollama.chat(model=MODEL_NAME, messages=[{"role": "user", "content": prompt}])
    response_str = response.get('message', {}).get('content', 'Error: No response from model')

    cleaned_content = re.sub(r"<think>.*?</think>\n?", "", response_str, flags=re.DOTALL)
    return split_text_to_json(cleaned_content, 80)
