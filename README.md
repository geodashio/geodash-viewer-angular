# GeoDash Viewer Angular (geodash-viewer-angular)

[Angular](https://angular.io/) (aka Angular 2+) version of GeoDash Viewer.

**GeoDash**

[GeoDash](https://geodash.io) is a modern web framework and approach for quickly producing visualizations of geospatial data. The name comes from "geospatial dashboard". The framework is built to be extremely extensible. You can use framework code for AngularJS and Angular2, the low-level GeoDashJS, or only the Gulp pipeline. Have fun!

# Usage

This viewer is published to:

[http://viewer.geodash.io]([http://viewer.geodash.io])

You can use by passing a link to your Internet accessible config file with:

```
http://viewer.geodash.io?main:config=<PATH_TO_YOUR_YAML_FILE>
```

For example:

```
http://viewer.geodash.io?main:config=http://summit.geonode.org/logistics/map.yml
```

**Note on HTTPS**

The public hosted viewer at **viewer.geodash.io** supports http and https.  Depending on the context, you should use http or https.  For example, if visualizing data from a GeoNode that only supports **HTTP** you'll need to use **HTTP** too.  If using the geolocation API, then you'll need to use **HTTPS**.

# Developer

As mentioned in @angular-cli [documentation](https://github.com/angular/angular-cli#prerequisites), you need to upgrade NodeJS to at least 6.9.0 or higher and NPM to 3 or higher.  The instructions below are based on an askubuntu [answer](http://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version)

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/node

```

There are three html pages you can use:

- index.html - `used for production`
- dev.html - `used for development; all dependencies loaded separately using systemjs`
- systemjs.html - `used for development; all dependencies in cloudfront`


# Publishing

## Publish static files to CDN

To push the files to the CDN (AWS S3), add the `--publish` flag to the `gulp` command and load your AWS credentials as environmental variables.  For example,

```
cd ~/geodash-viewer.git/;
ACCESS_KEY_ID=<YOUR_ACCESS_KEY_HERE> SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY_HERE> gulp --s3
```

The publish tasks will push the assets to the CDN and patch `index.html`.  You'll then need to push the latest code to `gh-pages` as below to update production.

## Push Latest Master to gh-pages

Push latest code from master `branch` to `gh-pages`.

```
git push origin master:gh-pages
```

vim /home/vagrant/geodash-viewer-angular.git/node_modules/awesome-typescript-loader/dist/entry.js
```
//require('source-map-support').install();
module.exports = require('./index.js');
//# sourceMappingURL=entry.js.map

```
