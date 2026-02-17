At the beginning of a chat, remind me to run `npm run watch`, so any changes get automatically built, meaning I can manually test them in the browser, and also when you run the tests, they will be running the latest code. Do not offer to run the build command yourself. Do not ever make changes to files in the build/ directories, e.g. the root ./build/ directory, or the component build/ directories (angular/build/, react/build/, svelte/build/ and vue/build/). These files are auto-generated, so do not update them.

When making changes to the root src/ directory, do not touch any of the files in the component directories (angular/, react/, svelte/ and vue/). A lot of the files in those directories are just symlinks to the root src/ directory.

When making changes to the root src/ code, make sure to also update the tests (in the root tests/ directory) if necessary, and run the tests to make sure they are passing.

When making changes to the root src/ code, make sure to also update the website documentation and example pages if necessary. The documentation is located in the site/src/docs/ directory, and the examples are located in the site/src/examples/ directory. If you are not sure how to update the documentation or examples, just ask me.

When writing code, prioritise clarity and brevity. Try to follow the existing code style as much as possible.

When making changes in the root site/ directory, remember there are no tests for this, so don't bother running the tests. This also applies to the component directories (angular/, react/, svelte/ and vue/), as they also don't have tests.

When making changes in the component directories (angular/, react/, svelte/ and vue/), note that the "withUtils" files are auto-generated, so do not update them. For example, when making changes to react/src/intl-tel-input/react.tsx, do not update react/src/intl-tel-input/react-withUtils.tsx, as it is auto-generated. The same applies to the other component directories.