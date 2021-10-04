const { MeterProvider } = require('@opentelemetry/sdk-metrics-base');
const { CollectorMetricExporter } = require('@opentelemetry/exporter-collector');



const collectorOptions = {
  url: 'http://40.85.173.200:55681/v1/metrics', // url is optional and can be omitted - default is http://localhost:55681/v1/metrics
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 1, // an optional limit on pending requests
};
const exporter = new CollectorMetricExporter(collectorOptions);

// Register the exporter
const meter = new MeterProvider({
  exporter,
  interval: 60000,
}).getMeter('example-meter');


const counter = meter.createCounter('metric_name_test');
counter.add(15, { 'key': 'value' });

const requestCount = meter.createCounter("requests_count", {
  description: "Count all incoming requests"
});

const boundInstruments = new Map();

module.exports.countAllRequests = () => {
  return (req, res, next) => {
    if (!boundInstruments.has(req.path)) {
      const labels = { route: req.path };
      const boundCounter = requestCount.bind(labels);
      boundInstruments.set(req.path, boundCounter);
    }

    boundInstruments.get(req.path).add(1);
    next();
  };
};
