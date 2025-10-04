import json
import sys
from sklearn.ensemble import GradientBoostingClassifier
import numpy as np
import shap

# Placeholder for the ML model (replace with a trained model)
model = GradientBoostingClassifier()

# Function to simulate prediction with explanation
def predict_with_explanation(data):
    # Example: Combine features into a numpy array
    features = np.array([
        data['populationDensity'],
        data['sanitationData'],
        np.mean(data['historicalPatterns'])
    ]).reshape(1, -1)

    # Simulate prediction (replace with model.predict)
    prediction = model.predict(features)

    # Generate SHAP explanations
    explainer = shap.Explainer(model, features)
    shap_values = explainer(features)

    return {
        'prediction': prediction[0],
        'explanation': shap_values.values.tolist()
    }

if __name__ == "__main__":
    # Read input data from stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    # Perform prediction with explanation
    try:
        result = predict_with_explanation(data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)