# loadable_runtimechunk_error
## steps to reproduce the error
### step 1
npm i
### step 2
npm start
### step 3
visit localhost:3000

then you would see the error

## ways to avoid it
remove webpack.config.js, optimization.runtimeChunk property, then it will be fine
