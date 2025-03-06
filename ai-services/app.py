from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS

load_dotenv()

app = Flask(__name__)

CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    bank_statement = data.get("bank_statement")
    question = data.get("question")

    if not bank_statement or not question:
        return jsonify({"error": "Both 'bank_statement' and 'question' are required."}), 400

    prompt = f"Bank Statement:\n{bank_statement}\n\nQuestion: {question}\n\nAnswer:"

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant that answers questions about bank statements."},
                {"role": "user", "content": prompt}
            ]
        )

        answer = response.choices[0].message.content.strip()

        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)