from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    symptoms = data.get("symptoms")

    symptoms = symptoms.lower()

    if "fever" in symptoms and "cough" in symptoms:
        prediction = "Possible Flu"

    elif "headache" in symptoms:
        prediction = "Stress or Migraine"

    elif "chest pain" in symptoms:
        prediction = "Heart Risk"

    else:
        prediction = "General Infection"

    return jsonify({
        "prediction": prediction
    })

if __name__ == "__main__":
    app.run(port=8000)