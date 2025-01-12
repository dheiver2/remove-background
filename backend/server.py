from flask import Flask, request, jsonify
from flask_cors import CORS
from rembg import remove
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)  # Habilita o CORS para todas as rotas

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return jsonify({"error": "Nenhuma imagem enviada"}), 400

    file = request.files['image']
    input_image = Image.open(file.stream)
    output_image = remove(input_image)

    buffered = BytesIO()
    output_image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return jsonify({"image": img_str})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
