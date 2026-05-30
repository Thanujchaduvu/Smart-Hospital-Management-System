import { useState } from "react"
import axios from "axios"

function SymptomChecker() {

  const [symptoms, setSymptoms] =
    useState("")

  const [prediction, setPrediction] =
    useState("")

  const handlePredict = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8000/predict",
        { symptoms }
      )

      setPrediction(
        res.data.prediction
      )

    }

    catch (err) {

      console.log(err)

      alert("Prediction Failed")

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold mb-3">
          AI Symptom Checker
        </h1>

        <p className="text-slate-400 mb-10">
          AI-powered disease prediction
        </p>

        <textarea
          placeholder="Enter symptoms..."
          value={symptoms}
          onChange={(e) =>
            setSymptoms(e.target.value)
          }
          className="w-full h-40 p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
        />

        <button
          onClick={handlePredict}
          className="mt-6 w-full p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold hover:scale-105 transition"
        >
          Predict Disease
        </button>

        {
          prediction && (

            <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-3">
                Prediction Result
              </h2>

              <p className="text-cyan-400 text-xl">
                {prediction}
              </p>

            </div>

          )
        }

      </div>

    </div>

  )

}

export default SymptomChecker