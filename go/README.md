- Install packages mentioned in `go.mod`

- Update IP of SigNoz backend in [this line](https://github.com/SigNoz/custom-metrics-examples/blob/320d7e1495800f3fb4afeef868033ea1f1a90e7f/go/metrics-sample.go#L136)

- Run the `metrics-sample.go` application

```
go run metrics-sample.go
```

This will update a counter metrics `an_important_metric_total` which you can plot in SigNoz dashboard

You can change the value by updating [this loop](https://github.com/SigNoz/custom-metrics-examples/blob/320d7e1495800f3fb4afeef868033ea1f1a90e7f/go/metrics-sample.go#L184) which sets the counter value