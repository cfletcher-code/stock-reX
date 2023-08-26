from flask import Flask, send_from_directory, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.String(255))
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

   
@app.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory('data/shoe_pngs',filename)

@app.route('/shoemetadata/get_metadata', methods=['GET'])
def get_metadata():
    metadata_list = ShoeMetadata.query.all()
    metadata_data = [{
        'id': item.id,
        'title': item.title,
        'colorway': item.colorway,
        'releaseDate': str(item.releaseDate),
        'retailPrice': str(item.retailPrice),
        'brand': item.brand,
        'model': item.model,
        'lowestAsk': item.lowestAsk,
        'numberOfAsks': item.numberOfAsks,
        'highestBid': item.highestBid,
        'numberOfBids': item.numberOfBids,
        'annualHigh': item.annualHigh,
        'annualLow': item.annualLow,
        'volatility': str(item.volatility),
        'pricePremium': str(item.pricePremium),
        'lastSale': item.lastSale,
        'changeValue': item.changeValue,
        'changePercentage': str(item.changePercentage),
        'salesLast72Hours': item.salesLast72Hours,
        'sku': item.sku,
        'currency': item.currency,
        'png_path': item.png_path
    } for item in metadata_list]

    return jsonify(metadata_data), 200

@app.route('/feedback/add_feedback',methods=['POST'])
def add_feedback():
    data = request.get_json()
    new_feedback = Feedback(**data)
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify({'message':'Feedback added successfully'}), 201

@app.route('/feedback/get_feedback',methods=['GET'])
def get_feedback():
    feedback_list = Feedback.query.all()
    feedback_data = [{'id':f.id,'user_id':f.user_id,'product_id':f.product_id,'feedback_value':f.feedback_value} for f in feedback_list]
    return jsonify(feedback_data), 200

if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=8080)