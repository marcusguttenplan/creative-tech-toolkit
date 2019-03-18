from flask import Flask
app = Flask(__name__)


@app.route('/')
def test():
    return 'Greetings from Flask!'
    print('greetings!!')

# def hello_world:
#     # return 'Greetings from Flask!'
#     print('greetings!!')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9000)
