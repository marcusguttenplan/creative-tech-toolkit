from flask import request
from flask import Flask
from dotenv import load_dotenv
from google.cloud import storage
import pkgutil
import json
import os
import pandas as pd
PROJECT = 'anchordemo'
load_dotenv()

app = Flask(__name__)

CREDS = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')










# Open JSON of Store IDs and create list
suggestions_file = open('recs.json')
suggestions = json.load(suggestions_file)
# suggestions = ast.literal_eval(json.dumps(suggestions_arr))

out = {}
out['suggestions'] = suggestions




















# Offline BQML will_buy_banana
numeric_weights = pd.read_json('banana-weights.json').dropna()
numeric_weights

scaling_df = pd.read_json('banana-scaling.json').dropna()
scaling_df

categorical_weights = pd.read_json('banana-categories.json', lines=True)
categorical_weights.head()


def compute_prediction(rowdict, numeric_weights, scaling_df, categorical_weights):
    input_values = rowdict
    # numeric inputs
    pred = 0
    for column_name in numeric_weights['input'].unique():
        wt = numeric_weights[numeric_weights['input']
                             == column_name]['input_weight'].values[0]
        if column_name != '__INTERCEPT__':
            #minv = scaling_df[ scaling_df['input'] == column_name ]['min'].values[0]
            #maxv = scaling_df[ scaling_df['input'] == column_name ]['max'].values[0]
            #scaled_value = (input_values[column_name] - minv)/(maxv - minv)
            meanv = scaling_df[scaling_df['input']
                               == column_name]['mean'].values[0]
            stddev = scaling_df[scaling_df['input']
                                == column_name]['stddev'].values[0]
            scaled_value = (input_values[column_name] - meanv) / stddev
        else:
            scaled_value = 1.0
        contrib = wt * scaled_value
        # print('col={} wt={} scaled_value={} contrib={}'.format(column_name, wt, scaled_value, contrib))
        pred = pred + contrib
    # categorical inputs
    for column_name in categorical_weights['input'].unique():
        category_weights = categorical_weights[categorical_weights['input'] == column_name]
        wt = category_weights[category_weights['category_name'] ==
                              input_values[column_name]]['category_weight'].values[0]
        # print('col={} wt={} value={} contrib={}'.format(column_name, wt, input_values[column_name], wt))
        pred = pred + wt
    return pred






@app.route('/')
def index():
    return "/recommendations, /will_buy_banana"
    # return out
    print('Index Hit')


# TODO params
@app.route('/recommendations')
def recommend():
    # return "HELLO"
    user_id = request.args.get('user')
    product_id = request.args.get('product_id')

    # for user, product in out.items():
    #     if user == user_id:
    #         print(user)
    #         return

    return 'cool'
    print('Recs Hit')


@app.route('/will_buy_banana')
def predict():
    user = request.args.get('user')
    zip = request.args.get('zip')
    t_o_d = request.args.get('time')

    rowdict = {
        'customer_id': user,
        'home_zipcode': zip,
        'time_of_day': t_o_d,
    }

    prediction = compute_prediction(
        rowdict, numeric_weights,  scaling_df, categorical_weights)
    printer = rowdict.copy()
    printer['prediction'] = prediction

    # return compute_prediction(rowdict, numeric_weights,  scaling_df, categorical_weights)
    return printer
    print('Coupons Hit')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
