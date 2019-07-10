from flask import Flask, json, render_template, url_for
from flask_sslify import SSLify
from tinydb import Query, TinyDB
from tinydb.middlewares import CachingMiddleware
from tinydb.storages import JSONStorage

from config import AppConfig
from db.middleware import ReadOnlyMiddleware

app = Flask(__name__)
app.config.from_object(AppConfig)

sslify = SSLify(app, permanent=True, subdomains=True)

gistdb = TinyDB(
    "db/gistdb.json",
    default_table="gist",
    storage=ReadOnlyMiddleware(CachingMiddleware(JSONStorage))
)


@app.context_processor
def url_for_webpack_asset_processor():
    def url_for_webpack_asset(asset_name):
        with app.open_resource(
            "static/dist/webpack-assets-manifest.json"
        ) as file:
            manifest = json.load(file)

        return url_for(
            "static",
            filename="dist/{0}".format(manifest.get(asset_name))
        )
    return dict(url_for_webpack_asset=url_for_webpack_asset)


@app.route("/")
@app.route("/home")
@app.route("/workbook")
@app.route("/workbook/concentration")
def index():
    return render_template("index.html")


@app.route("/gists/")
@app.route("/gists/<string:name>")
def gist(name="worksheet"):
    Gist = Query()
    gist_name = (
        gistdb.get(Gist.name == name)
        or gistdb.get(Gist.name == "worksheet")
    ).get("name")
    gist_id = gistdb.get(Gist.name == gist_name).get("id")

    return render_template("gist.html", gist_name=gist_name, gist_id=gist_id)


@app.errorhandler(404)
def pagenotfound(error):
    return render_template("index.html"), 404


if __name__ == "__main__":
    app.run()
