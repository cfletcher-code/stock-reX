from flask import Flask, send_from_directory, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import load_only
from sqlalchemy.sql import func
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "*"}})

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)
    feedback_value = db.Column(db.Integer)

class ShoeMetadata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    colorway = db.Column(db.String(255))
    releaseDate = db.Column(db.Date)
    retailPrice = db.Column(db.Numeric)
    brand = db.Column(db.String(255))
    model = db.Column(db.String(255))
    lowestAsk = db.Column(db.Integer)
    numberOfAsks = db.Column(db.Integer)
    highestBid = db.Column(db.Integer)
    numberOfBids = db.Column(db.Integer)
    annualHigh = db.Column(db.Integer)
    annualLow = db.Column(db.Integer)
    volatility = db.Column(db.Numeric)
    pricePremium = db.Column(db.Numeric)
    lastSale = db.Column(db.Integer)
    changeValue = db.Column(db.Integer)
    changePercentage = db.Column(db.Numeric)
    salesLast72Hours = db.Column(db.Integer)
    sku = db.Column(db.String(255))
    currency = db.Column(db.String(255))
    png_path = db.Column(db.String(255))

def get_key_metadata(item):
    return {
        'id': item.id,
        'title': item.title,
        'colorway': item.colorway,
        'releaseDate': str(item.releaseDate),
        'retailPrice': str(item.retailPrice),
        'png_path': item.png_path
    }

@app.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory('data/shoe_pngs',filename)

@app.route('/shoemetadata/get_metadata/<id>', methods=['GET'])
def get_metadata(id):
    item = ShoeMetadata.query.filter_by(id=id).first()
    return jsonify(get_key_metadata(item)), 200

@app.route('/recommendation/<user_id>/<k>',methods=['GET'])
def get_recommendation(user_id,k):
    random_items = ShoeMetadata.query.order_by(func.random()).limit(k).all()
    return jsonify([get_key_metadata(item) for item in random_items]), 200

@app.route('/feedback/get_unseen_shoe/<user_id>', methods=['GET'])
def get_unseen_shoe(user_id):
    seen_shoes = Feedback.query.filter_by(user_id=user_id)
    seen_shoes_ids = [shoe.product_id for shoe in seen_shoes]
    print(seen_shoes_ids)
    random_item = ShoeMetadata.query.filter(~ShoeMetadata.id.in_(seen_shoes_ids)).order_by(func.random()).first()
    return jsonify(get_key_metadata(random_item)), 200

@app.route('/feedback/add_feedback/<user_id>/<product_id>',methods=['POST'])
def add_feedback(user_id, product_id):
    data = request.get_json()
    data['user_id'] = user_id
    data['product_id'] = product_id
    
    new_feedback = Feedback(**data)
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback added successfully'}), 201

@app.route('/feedback/get_feedback',methods=['GET'])
def get_feedback():
    feedback_list = Feedback.query.all()
    feedback_data = [{'id':f.id,'user_id':f.user_id,'product_id':f.product_id,'feedback_value':f.feedback_value} for f in feedback_list]
    return jsonify(feedback_data), 200

if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=8080)