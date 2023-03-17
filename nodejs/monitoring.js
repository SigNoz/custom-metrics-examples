const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { OTLPMetricExporter } =  require('@opentelemetry/exporter-metrics-otlp-proto');

const collectorOptions = {
  // url is optional and can be omitted - default is grpc://localhost:4317
  url: 'grpc://<IP of signoz backend>:4317',
  // concurrencyLimit: 1, // an optional limit on pending requests

  // k8s urls might be

  // grpc://${HELM_RELEASE}-otel-collector.${SIGNOZ_NAMESPACE}.svc.cluster.local:4317"
  // url: "grpc://my-release-otel-collector.platform.svc.cluster.local:4317"

  // http://${HELM_RELEASE}-otel-collector.${SIGNOZ_NAMESPACE}.svc.cluster.local:4318/v1/metrics"
  // url: "http://my-release-otel-collector.platform.svc.cluster.local:4318/v1/metrics"
};
const exporter = new OTLPMetricExporter(collectorOptions);
const meterProvider = new MeterProvider({});

// Register the exporter
meterProvider.addMetricReader(new PeriodicExportingMetricReader({
  exporter: exporter,
  exportIntervalMillis: 1000,
}));

// Now, start recording data
const meter = meterProvider.getMeter('example-meter');

const counter = meter.createCounter('metric_name_test');
counter.add(15, { 'key': 'value' });

const requestCount = meter.createCounter("requests_count", {
  description: "Count all incoming requests"
});

module.exports.countAllRequests = () => {
  return (req, res, next) => {
    requestCount.add(1, { route: req.path });
    next();
  };
};
