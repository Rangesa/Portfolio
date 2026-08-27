# Reliability Evaluation of FPGA-Assisted External Memory Acquisition for Security Research

**Status:** Unpublished technical report / preprint  
**Peer review:** Not peer reviewed  
**Date:** 2026-08-28  
**Author:** Rangesa

## Abstract

This report evaluates the reliability of a read-only FPGA-assisted external memory-acquisition setup in a controlled Windows laboratory environment. The prototype uses an Artix-7 FPGA and FT601 transport together with a memory-analysis stack and a common software abstraction for hardware-assisted and WinAPI-based reads. Recorded acceptance measurements include 18.91 MiB/s host-side DMA throughput, 270.58 µs average latency for 64-byte transfers across 500 iterations, successful 256-byte and 4-KiB DMA reads, and 63,966 successful regions out of 65,536 during a 256-MiB probe (97.604%), with zero recorded retries.

![Architecture](figures/architecture.svg)

## 1. Scope and Research Question

The purpose of this work is to determine whether external, FPGA-assisted memory acquisition can be made sufficiently reproducible for controlled reverse-engineering, memory-forensics, and vulnerability-research experiments.

The implementation described here is intentionally read-only. Memory writing, code injection, process patching, persistence, and automated exploitation are outside the scope of this report.

## 2. Experimental Architecture

The acquisition pipeline consists of a Windows target system, a PCIe-attached Artix-7 FPGA, an FT601-based USB transport path, and a separate analysis host. On the software side, the external acquisition path is exposed through MemProcFS-compatible tooling and a common `MemoryReader` abstraction. A WinAPI backend is retained as a controlled baseline for consistency checks.

See Figure 1 above.

## 3. Validation Method

Validation was divided into four layers:

1. **Transport validation.** Confirm that data can be transferred repeatedly over the FPGA/FT601 path.
2. **Read-size validation.** Confirm successful reads at small (256 B) and page-sized (4 KiB) granularity.
3. **Address-space probing.** Probe a larger 256-MiB region and record successful versus attempted regions and retries.
4. **Structural validation.** Confirm recognizable Windows executable structures such as PE headers, module metadata, executable sections, and expected byte patterns.

The structural layer is important because a successful low-level transfer does not by itself establish that the retrieved bytes are semantically correct.

## 4. Recorded Measurements

| Measurement | Result | Provenance |
|---|---:|---|
| DMA sequential read throughput | **18.91 MiB/s** | Duck's DMA Test |
| FT601 64-byte average latency | **270.58 µs** | 500 iterations |
| 256-byte DMA read | **PASS** | Acceptance test |
| 4-KiB DMA read | **PASS** | Acceptance test |
| 256-MiB probe | **63,966 / 65,536** successful regions | Acceptance test |
| Derived probe success rate | **97.604%** | Computed from counts above |
| Recorded retries | **0** | Probe counter |

![Benchmark summary](figures/benchmark-summary.svg)

The raw values used by this report are stored in [`data/measurements.csv`](data/measurements.csv).

## 5. Results

The recorded tests demonstrate that the acquisition path was capable of retrieving both small and page-sized regions and of sustaining a larger address-space probe without recorded retries. The 256-MiB probe yielded 63,966 successful regions out of 65,536 attempts, corresponding to a derived success rate of 97.604%.

The observed 18.91 MiB/s throughput should be treated as an empirical property of this specific host/device/software configuration rather than a general performance claim about PCILeech-compatible FPGA hardware.

Similarly, the measured 270.58 µs average for 64-byte transfers represents the recorded test configuration and should not be generalized to other FT601 implementations without independent measurement.

## 6. Engineering Findings

A key practical issue was separating hardware transport failures from software initialization failures. In the test environment, optional network-dependent symbol-resolution behavior could introduce delays or initialization failures unrelated to the underlying FPGA memory transport.

Disabling unnecessary network-dependent components improved reproducibility in the isolated test setup.

A second finding was that acquisition and interpretation must be treated as separate research layers. Obtaining bytes reliably is substantially easier than reconstructing the semantics of undocumented native runtime structures. Strong structural validation therefore remains necessary before higher-level reverse-engineering conclusions are accepted.

## 7. Limitations

This report has several limitations:

- The benchmark set is small and does not yet provide confidence intervals.
- Throughput and latency measurements were collected on a single hardware/software configuration.
- The 256-MiB probe success rate includes addressability/mapping effects and is not equivalent to a transport bit-error rate.
- No claim of peer review, independent replication, or academic publication is made.
- Measurements listed as “measured” are preserved from the project's recorded acceptance-test results; the percentage is explicitly marked as derived.

## 8. Reproducibility

Future revisions should record:

- exact FPGA firmware revision;
- MemProcFS/LeechCore version;
- FT601 driver version;
- motherboard/chipset and PCIe link state;
- target OS build;
- raw benchmark output;
- repeated benchmark runs with mean, median, standard deviation, and percentile latency.

The current repository intentionally separates measured observations from derived values so later experiments can replace or extend the initial dataset without silently rewriting historical results.

## 9. Security and Responsible Use

External memory acquisition is dual-use. The same low-level access techniques can support digital forensics, incident response, malware analysis, reverse engineering, and vulnerability research, but can also be misused.

This project therefore documents a controlled, read-only research configuration and does not present memory modification, injection, evasion, or exploitation as experimental objectives.

## 10. Conclusion

The recorded acceptance tests support the feasibility of a reproducible FPGA-assisted read-only memory-acquisition platform for controlled security research. The most important result is not raw bandwidth but the separation of transport, acquisition, validation, and semantic analysis into independently testable layers.

Additional repeated measurements and preservation of raw logs are required before making broader statistical performance claims.

## References

1. Ulf Frisk, **MemProcFS**, GitHub: https://github.com/ufrisk/MemProcFS
2. Ulf Frisk, **PCILeech FPGA**, GitHub: https://github.com/ufrisk/pcileech-fpga

---

**Publication status:** Unpublished technical report / preprint  
**Peer-review status:** Not peer reviewed
