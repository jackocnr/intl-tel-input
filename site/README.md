# Website for intl-tel-input

Live here: https://intl-tel-input.com

There are 4 page types:
- Homepage
- Docs page
- Playground
- Examples page

## Contributing

To build and run the site locally:
- Install the dependencies: run `npm install` in the root of the intl-tel-input project
- Build the website: cd into the site/ directory and run `npm run build --env=dev`
- Run the website: cd into the build/ directory and start a web server, e.g. by running `http-server` (you may have to run `npm install -g http-server` first), and it will give you an address to open in your browser, and you should see the site running locally.

Making changes:  
In the site/ directory, run `npm run watch` to automatically re-build when you edit the source files.

See src/ directory for HTML templates/partials, JS/CSS and the docs markdown files.

See grunt/template.js for where everything is threaded together.