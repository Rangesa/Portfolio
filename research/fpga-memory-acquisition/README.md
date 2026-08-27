# FPGA-Assisted Memory Acquisition — Technical Report

A small reproducibility package accompanying an **unpublished, non-peer-reviewed technical report** on read-only FPGA-assisted external memory acquisition for controlled Windows security-research environments.

## What is included

- [`paper.md`](paper.md) — the technical report
- [`data/measurements.csv`](data/measurements.csv) — measured and derived values used in the report
- [`figures/architecture.svg`](figures/architecture.svg) — experimental architecture
- [`figures/benchmark-summary.svg`](figures/benchmark-summary.svg) — benchmark summary
- [`STATUS.md`](STATUS.md) — claim/provenance status

## Recorded results

- DMA read throughput: **18.91 MiB/s**
- FT601 64-byte transfer latency: **270.58 µs average across 500 iterations**
- 256-byte DMA read: **PASS**
- 4-KiB DMA read: **PASS**
- 256-MiB probe: **63,966 / 65,536 successful regions**
- Derived success rate: **97.604%**
- Recorded retries: **0**

These values are presented as observations from the recorded project acceptance tests, not as universal PCILeech/FT601 performance claims.

## Research scope

The documented configuration is read-only and is intended for controlled memory-analysis, reverse-engineering, forensics, and vulnerability-research experiments. Memory modification, injection, patching, persistence, and automated exploitation are outside the scope of this report.

## Status

**Unpublished technical report / preprint. Not peer reviewed.**

That status is intentional: this repository provides inspectable evidence of practical research work without presenting the work as a journal publication, CVE, or independently reviewed result.
