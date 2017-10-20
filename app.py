from flask import Flask, render_template
from flask_sslify import SSLify

from config import AppConfig

app = Flask(__name__)
app.config.from_object(AppConfig)

sslify = SSLify(app, permanent=True, subdomains=True)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
