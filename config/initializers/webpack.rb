Rails.application.configure do
  # Webpack
  config.webpack.config_file = 'config/webpack.config.js'
  config.webpack.binary = 'node_modules/.bin/webpack'

  # Host & port to use when generating asset URLS in the manifest helpers in dev
  # server mode. Defaults to the requested host rather than localhost, so
  # that requests from remote hosts work.
  config.webpack.dev_server.host = proc { respond_to?(:request) ? request.host : 'localhost' }
  config.webpack.dev_server.port = 3808

  # The host and port to use when fetching the manifest
  # This is helpful for e.g. docker containers, where the host and port you
  # use via the web browser is not the same as those that the containers use
  # to communicate among each other
  config.webpack.dev_server.manifest_host = 'localhost'
  config.webpack.dev_server.manifest_port = 3808

  config.webpack.dev_server.https = false # note - this will use OpenSSL::SSL::VERIFY_NONE
  config.webpack.dev_server.binary = 'node_modules/.bin/webpack-dev-server'
  config.webpack.dev_server.enabled = Rails.env.development? || Rails.env.test?

  config.webpack.output_dir = "public/assets"
  config.webpack.public_path = "assets"
  config.webpack.manifest_filename = "manifest.json"
end
