import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
import joblib,os
from flask_cors import CORS

# Load dataset
diabetes_dataset = pd.read_csv('diabetes.csv')
X = diabetes_dataset.drop(columns='Outcome', axis=1)
Y = diabetes_dataset['Outcome']

# Standardize data
scaler = StandardScaler()
scaler.fit(X)
X = scaler.transform(X)

# Train model
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)
classifier = svm.SVC(kernel='linear')
classifier.fit(X_train, Y_train)

# Save model & scaler
joblib.dump(classifier, 'diabetes_model.sav')
joblib.dump(scaler, 'scaler.sav')

# Load saved model & scaler
model = joblib.load('diabetes_model.sav')
scaler = joblib.load('scaler.sav')

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if not data or 'input' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    input_data = np.asarray(data['input']).reshape(1, -1)
    std_data = scaler.transform(input_data)
    prediction = model.predict(std_data)

    result = 'Diabetic' if prediction[0] == 1 else 'Not Diabetic'
    return jsonify({'prediction': result})

if __name__ == '__main__':
     port = int(os.environ.get('PORT', 5000))
     app.run(host='0.0.0.0', port=port)
