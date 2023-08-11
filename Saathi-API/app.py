from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import firebase_admin
from firebase_admin import credentials , db

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred,{

    "databaseURL": ""
})

ref1 = db.reference("deployementLocation")
ref2 = db.reference("gatewayData")

@app.route("/", methods=["GET"])
@cross_origin()
def index():
    return "This is Saathi-The Savior API"


@app.route("/deployGateway", methods=["POST"])
@cross_origin()
def deploy():
    output = request.get_json()
    print(output)
    data1 = {
        "latitude": output["latitude"],
        "longitude": output["longitude"],
        "place": output["place"]
    }
    data2 = {
        "temperature": "",
        "humadity": "",
        "waterLevel":"",
    }

    ref1.child(output["gatewayid"]).set(data1)
    ref2.child(output["gatewayid"]).set(data2)
    print(output)

    return "data Received"

@app.route("/gatewayInfo", methods=["GET"])
@cross_origin()
def gatInfo():
    gatewayInfo = ref1.get()
    return jsonify(gatewayInfo)

@app.route("/gatewayData", methods=["GET"])
@cross_origin()
def gatData():
    gatewayData = ref2.get()
    return jsonify(gatewayData)

@app.route("/updateData", methods=["POST"])
@cross_origin()
def updateData():
    updatedData = request.json
  
    ref2.child(updatedData["DeviceID"]).update({
        "humadity":updatedData["Humidity"],
        "temperature":updatedData["Temperature"],
        "waterLevel":updatedData["Level"]

    })
    return "success",201



if __name__ == "__main__":
    app.run(debug=True)