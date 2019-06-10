from flask import Flask, json, render_template, url_for
from flask_sslify import SSLify

from config import AppConfig

app = Flask(__name__)
app.config.from_object(AppConfig)

sslify = SSLify(app, permanent=True, subdomains=True)

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
def home():
    return render_template("home.html")

@app.route("/workbook")
def workbook():
    return render_template("workbook.html")

if __name__ == "__main__":
    app.run()
