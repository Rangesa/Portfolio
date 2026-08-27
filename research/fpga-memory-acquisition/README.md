# FPGA-Assisted Memory Acquisition — Technical Report

A reproducibility package accompanying an **unpublished, non-peer-reviewed technical report** on read-only FPGA-assisted external memory acquisition for controlled Windows security-research environments.

## What is included

- [`paper.md`](paper.md) — technical report
- [`data/measurements.csv`](data/measurements.csv) — measurements with provenance status
- [`evidence/2026-08-27-acceptance.md`](evidence/2026-08-27-acceptance.md) — sanitized direct stdout extracts and deterministic checks
- [`evidence/source-rollouts.sha256`](evidence/source-rollouts.sha256) — SHA-256 manifest for the supplied source rollouts
- [`figures/architecture.svg`](figures/architecture.svg) — experimental architecture
- [`figures/benchmark-summary.svg`](figures/benchmark-summary.svg) — rollout-backed acceptance summary
- [`STATUS.md`](STATUS.md) — claim/provenance status

## Rollout-backed results

The supplied JSONL contains direct command-output evidence for the following:

- 256-byte physical-memory read: **PASS** (`Memory Display: Contents for address: 0x1000`)
- 4-KiB TLP validation: **32 MRd32 / 32 CplD**, tags `01` through `20` matched in sequence
- 0–256 MiB probe: **63,966 / 65,536 pages read**
- Probe failures/UR: **1,570**
- Derived page-read rate: **97.604%**
- `retry=0`, `exhausted=0`, `protocol=0`
- WinAPI and MemProcFS DMA backend acceptance: **PASS** with matching PID/module/PE/section/pattern results
- Release x64 build and ReaderUnitTests: **PASS**

## Additional project measurements awaiting attached source logs

Two earlier project measurements are preserved in the dataset but are **not treated as rollout-backed evidence yet**, because their exact raw lines were not found in the five supplied rollout files:

- DMA throughput: `18.91 MiB/s`
- FT601 64-byte average latency: `270.58 µs` across 500 iterations

They should be promoted to direct-evidence status only after the originating benchmark output is attached.

## Research scope

The documented configuration is read-only and is intended for controlled memory-analysis, reverse-engineering, forensics, and vulnerability-research experiments. Memory modification, injection, patching, persistence, and automated exploitation are outside the scope of this report.

## Status

**Unpublished technical report / preprint. Not peer reviewed.**

That status is intentional: this repository provides inspectable evidence of practical research work without presenting the work as a journal publication, CVE, or independently reviewed result.
