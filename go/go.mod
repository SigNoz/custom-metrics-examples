module custom-metrics

go 1.16

require (
	go.opentelemetry.io/otel v1.0.1
	go.opentelemetry.io/otel/exporters/otlp/otlpmetric v0.24.0
	go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc v0.24.0
	go.opentelemetry.io/otel/metric v0.24.0
	go.opentelemetry.io/otel/sdk/metric v0.24.0
	google.golang.org/grpc v1.56.3
)
