const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { OTLPMetricExporter } =  require('@opentelemetry/exporter-metrics-otlp-grpc');

const collectorOptions = {
  // url is optional and can be omitted - default is grpc://localhost:4317
  url: 'grpc://<IP of signoz backend>:4317',
};
const exporter = new OTLPMetricExporter(collectorOptions);

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
