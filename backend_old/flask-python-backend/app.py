from flask import Flask, render_template, request, jsonify, session
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
# import yaml 
from flask_session import Session
from config import ApplicationConfig
from models import db, User
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
app.config['SECRET_KEY'] = 'dqwafa2edscze2qwafq2eq35tsdg'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./db.sqlite'
app.config['SESSION_TYPE'] = 'sqlalchemy'
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
sdb = SQLAlchemy(app)
db.init_app(app)

app.config['SESSION_SQLALCHEMY'] = sdb
server_session = Session(app) 
#mongodb connection
# config = yaml.load(open('database.yaml'))
client = MongoClient('mongodb+srv://skill_database:Geology@cluster007.xddmy.mongodb.net/skill_management?authSource=admin',tls=True, tlsAllowInvalidCertificates=True) 
# db = client.lin_flask
database = client['skill_management']


with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/users', methods=['POST', 'GET'])
def data():
    
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        Name = body['Name']
        Skill = body['Skill']
        Domain = body['Domain'] 
        Years = body['Years'] 
        Level = body['Level'] 
        # db.users.insert_one({
        database['users'].insert_one({
            "Name": Name,
            "Skill": Skill,
            "Domain":Domain,
            "Years":Years,
            "Level":Level
        })
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            'Name': Name,
            'Skill': Skill,
            'Domain':Domain,
            'Years':Years,
            'Level':Level
        })
    
    # GET all data from database
    if request.method == 'GET':
        allData = database['users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            Name = data['Name']
            Skill = data['Skill']
            Domain = data['Domain']
            Years = data['Years']
            Level = data['Level']
            dataDict = {
                'id': str(id),
                'Name': Name,
                'Skill': Skill,
                'Domain': Domain,
                'Years': Years,
                'Level': Level
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)

@app.route('/users/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = database['users'].find_one({'_id': ObjectId(id)})
        id = data['_id']
        Name = data['Name']
        Skill = data['Skill']
        Domain = data['Domain']
        Years = data['Years']
        Level = data['Level']
        dataDict = {
            'id': str(id),
            'Name': Name,
            'Skill': Skill,
            'Domain':Domain,
            'Years':Years,
            'Level':Level
        }
        print(dataDict)
        return jsonify(dataDict)
        
    # DELETE a data
    if request.method == 'DELETE':
        database['users'].delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        Name = body['Name']
        Skill = body['Skill']
        Domain = body['Domain']
        Years = body['Years']
        Level = body['Level']

        database['users'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "Name":Name,
                    "Skill":Skill,
                    "Domain": Domain,
                    "Years": Years,
                    "Level": Level
                }
            }
        )

        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})


if __name__ == '__main__':
    app.config['SESSION_TYPE'] = 'filesystem'
    server_session.init_app(app)
    app.debug = True
    app.run()