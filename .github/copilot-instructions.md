When making changes to the root src/ directory, do not touch any of the files in the component directories (angular/, react/, svelte/ and vue/). A lot of the files in those directories are just symlinks to the root src/ directory.

At the beginning of a chat, remind me to run `npm run watch`, so any changes get automatically built, meaning I can manually test them in the browser, and also when you run the tests, they will be running the latest code.

When making changes to the root src/ code, make sure to also update the tests (in the root tests/ directory) if necessary, and run the tests to make sure they are passing.

When making changes to the root src/ code, make sure to also update the documentation if necessary. The documentation is located in the site/src/docs/ directory. If you are not sure how to update the documentation, just ask me.

When writing code, prioritise clarity and brevity. Try to follow the existing code style as much as possible.