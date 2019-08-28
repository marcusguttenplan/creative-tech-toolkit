from flask import request
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return "/recommendations, /users"
    # return out
    print('Index Hit')


@app.route('/recommendations')
def recommend():

    # Params
    user_id = request.args.get('user')
    product_id = request.args.get('product_id')

    return 'cool'
    print('Recs Hit')


@app.route('/users')
def predict():
    user = request.args.get('user')
    zip = request.args.get('zip')
    t_o_d = request.args.get('time')

    rowdict = {
        'customer_id': user,
        'home_zipcode': zip,
        'time_of_day': t_o_d,
    }

    return rowdict
    print('Users Hit')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
