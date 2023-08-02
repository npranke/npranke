# pyright: basic

import os

import flask
from flask_talisman import Talisman
from tinydb import Query, TinyDB
from tinydb.middlewares import CachingMiddleware
from tinydb.storages import JSONStorage

from config import AppConfig
from constants import BROTLI
from db.middleware import ReadOnlyMiddleware

app = flask.Flask(__name__)
app.config.from_object(AppConfig)


talisman = Talisman(
    app,
    content_security_policy={
        "connect-src": "'self' www.google-analytics.com",
        "default-src": "'self'",
        "font-src": "'self' fonts.gstatic.com",
        "img-src": "'self' www.google-analytics.com",
        "object-src": "'none'",
        "script-src": "'self' www.googletagmanager.com",
        "style-src": (
            "'self' 'sha256-Xb6VsMsUW5jBy8HAXlMcrIeEC0qAgR5OuKvwp+fJWi0=' "
            "'unsafe-hashes' fonts.googleapis.com github.githubassets.com"
        ),
    },
    content_security_policy_nonce_in=["script-src", "style-src"],
    force_https_permanent=True,
)


gistdb = TinyDB(
    "db/gistdb.json",
    storage=ReadOnlyMiddleware(CachingMiddleware(JSONStorage)),
)
gistdb.default_table_name = "gist"


@app.context_processor
def url_for_webpack_asset_processor():
    def url_for_webpack_asset(asset_name):
        """Open webpack manifest and return url to webpack asset."""
        with app.open_resource(
            "static/dist/webpack-manifest.json",
        ) as file:
            manifest = flask.json.load(file)
        return "/bundles/{0}".format(manifest.get(asset_name))
    return {"url_for_webpack_asset": url_for_webpack_asset}


@app.route("/")
@app.route("/home")
@app.route("/workbook")
@app.route("/workbook/concentration")
@app.route("/workbook/tower")
def index():
    return flask.render_template("index.html")


@app.route("/gists/")
@app.route("/gists/<string:name>")
def gist(name="worksheet"):
    Gist = Query()
    gist_name = (
        gistdb.get(Gist.name == name)
        or gistdb.get(Gist.name == "worksheet")
    ).get("name")  # pyright: ignore
    gist_id = gistdb.get(Gist.name == gist_name).get("id")  # pyright: ignore

    return flask.render_template(
        "gist.html",
        gist_name=gist_name,
        gist_id=gist_id,
    )


@app.route("/bundles/<string:asset>")
def bundle(asset=None):
    if not asset:
        return flask.abort(404)

    if asset.endswith(".css"):
        content_type = "text/css"
    elif asset.endswith(".js"):
        content_type = "text/javascript"
    else:
        return flask.abort(404)

    asset_to_serve = asset
    asset_encoding = None
    accepted_encodings = flask.request.headers.get("Accept-Encoding", "")

    if BROTLI.code in accepted_encodings:
        compressed_asset = "{0}.{1}".format(asset, BROTLI.ext)
        with app.open_resource(
            "static/dist/webpack-manifest.json",
        ) as file:
            manifest = flask.json.load(file)
            if compressed_asset in manifest.values():
                asset_to_serve = compressed_asset
                asset_encoding = BROTLI.code

    resp = flask.send_from_directory(
        os.path.join(app.root_path, "static", "dist"),
        asset_to_serve,
        mimetype=content_type,
    )
    if asset_encoding:
        resp.content_encoding = asset_encoding

    return resp


@app.route("/apple-touch-icon.png")
def appletouchicon():
    return flask.send_from_directory(
        os.path.join(app.root_path, "static"),
        "apple-touch-icon.png",
        mimetype="image/png",
        max_age=3600,
    )


@app.route("/mask-icon.svg")
def maskicon():
    return flask.send_from_directory(
        os.path.join(app.root_path, "static"),
        "mask-icon.svg",
        mimetype="image/svg+xml",
        max_age=3600,
    )


@app.route("/favicon.ico")
def favicon():
    return flask.send_from_directory(
        os.path.join(app.root_path, "static"),
        "favicon.ico",
        mimetype="image/x-icon",
        max_age=3600,
    )


@app.errorhandler(404)
def pagenotfound(error):
    return flask.render_template("index.html"), 404
