## Requirements

- mongodb
- npm
- webpack

## Misc

Create sample data

```sh
$ rake sample_data_generator:execute
```

Build javascript

```sh
$ cd frontend && webpack --config ./config/development/webpack.config.js --display-error-details
```

## ToDos

1. Enable specifying time boundary of log data
- Enable changing seekbar speed
- Enable npm shortcut commands (doesn't work for some reason)
