from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

item_similarity_df = pd.read_csv("movie_similarity.csv", index_col=0)

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_from_root():
    return jsonify(message='Hello from root!')


@app.route("/recms/<string:movieName>", methods=["POST","GET"])
def make_rec(movieName):
    movie = movieName
    try:
        movies=[]
        similar_score = item_similarity_df[movie]
        similar_movies = similar_score.sort_values(ascending=False)[1:21]
        api_recommendations = similar_movies.index.to_list()
        for x in api_recommendations:
            print(x)
            movies.append(x.split(" (")[0])
    except:
        movies=['Movie not found']
    return {"rec_movie": movies}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
