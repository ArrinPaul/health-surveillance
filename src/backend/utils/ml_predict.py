import json
import sys
from sklearn.ensemble import GradientBoostingClassifier
import numpy as np

# Placeholder for the ML model (replace with a trained model)
model = GradientBoostingClassifier()

def predict(data):
    # Example: Combine features into a numpy array
    features = np.array([
        data['populationDensity'],
        data['sanitationData'],
        np.mean(data['historicalPatterns'])
    ]).reshape(1, -1)

    # Simulate prediction (replace with model.predict(features))
    prediction = model.predict(features)
    return {'outbreakRisk': prediction[0]}

if __name__ == "__main__":
    # Read input data from stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    # Perform prediction
    try:
        result = predict(data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)