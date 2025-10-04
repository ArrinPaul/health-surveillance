import json
import sys
from sklearn.naive_bayes import GaussianNB
import numpy as np

# Placeholder for the ML model (replace with a trained model)
model = GaussianNB()

# Function to simulate risk assessment (replace with actual model inference)
def assess_risk(data):
    # Example: Combine features into a numpy array
    features = np.array([
        data['rainfall'],
        data['temperature'],
        np.mean(data['healthData'])
    ]).reshape(1, -1)

    # Simulate risk assessment (replace with model.predict_proba(features))
    risk_score = model.predict_proba(features)[0][1]  # Probability of high risk
    return {'riskScore': risk_score}

if __name__ == "__main__":
    # Read input data from stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    # Perform risk assessment
    try:
        result = assess_risk(data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)