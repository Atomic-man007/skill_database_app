
import pytest
import json
import logging
from api import app

"""
   Sample test data
"""
logging.basicConfig(filename='application_test.log', format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')


DUMMY_USERNAME = "apple"
DUMMY_EMAIL = "apple@apple.com"
DUMMY_PASS = "newpassword" 

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_user_signup(client):
    """
       Tests /register API
    """
    response = client.post(
        "api/register",
        data=json.dumps(
            {
                "username": DUMMY_USERNAME,
                "email": DUMMY_EMAIL,
                "password": DUMMY_PASS
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert "The user was successfully registered" in data["msg"]


def test_user_signup_invalid_data(client):
    """
       Tests /register API: invalid data like email field empty
    """
    response = client.post(
        "api/register",
        data=json.dumps(
            {
                "username": DUMMY_USERNAME,
                "email": "",
                "password": DUMMY_PASS
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "'' is too short" in data["msg"]


def test_user_login_correct(client):
    """
       Tests /signup API: Correct credentials
    """
    response = client.post(
        "api/login",
        data=json.dumps(
            {
                "email": DUMMY_EMAIL,
                "password": DUMMY_PASS
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert data["token"] != ""


def test_user_login_error(client):
    """
       Tests /signup API: Wrong credentials
    """
    response = client.post(
        "api/login",
        data=json.dumps(
            {
                "email": DUMMY_EMAIL,
                "password": DUMMY_EMAIL
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "Wrong credentials." in data["msg"]
