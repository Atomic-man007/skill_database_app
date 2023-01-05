from datetime import datetime, timezone, timedelta
from functools import wraps
from flask import request
from flask_restx import Api, Resource, fields
import jwt
from .models import db, Users, JWTTokenBlocklist
from .config import BaseConfig
import requests

rest_api = Api(version="1.0", title="Users API")

    
"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })

login_model = rest_api.model('LoginModel', {"email": fields.String(required=True, min_length=4, max_length=64),
                                            "password": fields.String(required=True, min_length=4, max_length=16)
                                            })

user_edit_model = rest_api.model('UserEditModel', {"userID": fields.String(required=True, min_length=1, max_length=32),
                                                   "username": fields.String(required=True, min_length=2, max_length=32),
                                                   "email": fields.String(required=True, min_length=4, max_length=64)
                                                   })


"""
   Helper function for JWT token required
"""

def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


"""
    Flask-Restx routes
"""


@rest_api.route('/api/register')
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        username = req_data.get("username")
        email = req_data.get("email")
        password = req_data.get("password")

        user_exists = Users.get_by_email(email)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400

        new_user = Users(username=username, email=email)

        new_user.set_password(password)
        new_user.save()
        print(email)
        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200


@rest_api.route('/api/login')
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        email = req_data.get("email")
        password = req_data.get("password")

        user_exists = Users.get_by_email(email)

        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        if not user_exists.check_password(password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # create access token uwing JWT
        token = jwt.encode({'email': email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200


@rest_api.route('/api/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    @token_required
    def post(self, current_user):

        req_data = request.get_json()

        new_username = req_data.get("username")
        new_email = req_data.get("email")

        if new_username:
            self.update_username(new_username)

        if new_email:
            self.update_email(new_email)

        self.save()

        return {"success": True}, 200


@rest_api.route('/api/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200


# @rest_api.route('/api/sessions/oauth/github/')
# class GitHubLogin(Resource):
#     def get(self):
#         code = request.args.get('code')
#         client_id = BaseConfig.GITHUB_CLIENT_ID
#         client_secret = BaseConfig.GITHUB_CLIENT_SECRET
#         root_url = 'https://github.com/login/oauth/access_token'

#         params = { 'client_id': client_id, 'client_secret': client_secret, 'code': code }

#         data = requests.post(root_url, params=params, headers={
#             'Content-Type': 'application/x-www-form-urlencoded',
#         })

#         response = data._content.decode('utf-8')
#         access_token = response.split('&')[0].split('=')[1]

#         user_data = requests.get('https://api.github.com/user', headers={
#             "Authorization": "Bearer " + access_token
#         }).json()
        
#         user_exists = Users.get_by_username(user_data['login'])
#         if user_exists:
#             user = user_exists
#         else:
#             try:
#                 user = Users(username=user_data['login'], email=user_data['email'])
#                 user.save()
#             except:
#                 user = Users(username=user_data['login'])
#                 user.save()
        
#         user_json = user.toJSON()

#         token = jwt.encode({"username": user_json['username'], 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)
#         user.set_jwt_auth_active(True)
#         user.save()

#         return {"success": True,
#                 "user": {
#                     "_id": user_json['_id'],
#                     "email": user_json['email'],
#                     "username": user_json['username'],
#                     "token": token,
#                 }}, 200