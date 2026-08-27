# Acceptance Evidence Extract — 2026-08-27

This file contains **sanitized extracts and deterministic checks** from the supplied Codex rollout JSONL. The complete rollout is not published because it also contains unrelated project history and local filesystem details.

## Source

Primary source file:

`rollout-2026-08-26T18-46-03-01a03d76-6280-7772-a440-459417ba3b0e.jsonl`

SHA-256:

`91cf6f5ba9b612d388de6eb6ac808f883c728e97a1655f15094936183732ce8c`

Timestamps below are the UTC timestamps stored in the JSONL. The corresponding local test date in Japan was 2026-08-27.

## 1. 256-byte physical-memory read

Source event timestamp: `2026-08-26T15:06:11.403Z`  
Source record: `event_msg / CommandExecution`

```text
--- DISPLAY_256B ---
EXIT=0

DEVICE: FPGA: Enigma X1 PCIe gen1 x1 [300,25,500] [v4.14,0700] [ASYNC,NORM,FWCUST]
Memory Display: Contents for address: 0x0000000000001000
0000    e9 4d 06 00 01 00 00 00  01 00 00 00 3f 00 18 10   .M..........?...
0010    00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................
0020    00 00 00 00 00 00 00 00  00 00 00 00 00 9b 20 00   .............. .
0030    00 00 00 00 00 00 00 00  ff ff 00 00 00 93 cf 00   ................
0040    00 00 00 00 00 00 00 00  ff ff 00 00 00 9b cf 00   ................
0050    00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................
0060    7c 16 00 00 30 00 01 17  00 00 10 00 00 00 00 00   |...0...........
0070    30 74 8a e3 01 f8 ff ff  00 f0 00 40 db f7 ff ff   0t.........@....
0080    06 01 07 00 06 01 07 00  01 09 00 00 00 00 00 00   ................
0090    33 00 05 80 00 00 00 00  00 00 00 00 00 00 00 00   3...............
00a0    00 e0 1a 00 00 00 00 00  f8 0e 35 00 00 00 00 00   ..........5.....
00b0    00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................
00c0    00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................
00d0    00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................
00e0    00 00 00 00 00 00 57 00  b0 9f de be 80 d7 ff ff   ......W.........
00f0    00 00 00 00 00 00 ff 0f  00 70 de be 80 d7 ff ff   .........p......
```

Interpretation: PCILeech returned memory contents for physical address `0x1000`; this is direct command stdout, not an assistant summary.

## 2. 4-KiB TLP verification

Source event timestamp: `2026-08-26T15:06:25.543Z`  
Source record: `event_msg / CommandExecution`

The direct command stdout contains:

```text
TLP_4K_EXIT=0
TX MRd32 count: 32
RX CplD count: 32
TX tags: 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e 0f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20
RX tags: 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e 0f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20
Tag sequence identical: true
```

The counts and tag comparison above were computed directly from the recorded command stdout. The original stdout contains all 32 MRd32 requests and all 32 CplD completions.

## 3. Bounded 0–256 MiB probe

Source event timestamp: `2026-08-26T15:06:39.328Z`  
Source record: `event_msg / CommandExecution`

```text
BOUNDED_PROBE_EXIT=0

DEVICE: FPGA: Enigma X1 PCIe gen1 x1 [300,25,500] [v4.14,0700] [ASYNC,TINY,FWCUST]
Progress:       256 / 256 (100%)
Speed:          128 MB/s
Address:        0x0000000010000000
Pages read:     63966 / 65536 (97%)
Pages failed:   1570 (2%)
Memory Probe: Completed.
FPGA read outcomes [first_failed=1570, ur=1570, ca=0, retry=0, recovered=0, exhausted=0, protocol=0]
```

Derived success rate:

`63966 / 65536 × 100 = 97.604370%`

The console itself reports integer-rounded `97%`; the report uses `97.604%` as an explicitly derived value.

## 4. WinAPI / MemProcFS DMA backend consistency

Source event timestamp: `2026-08-26T15:12:55.653Z`  
Source record: `event_msg / CommandExecution`

```text
--- WinAPI probe ---
BACKEND=WinAPI
PID=9180
MODULE=BackendAcceptanceTarget.exe
MODULE_BASE=0x7FF66B810000
MODULE_SIZE=0x8000
DOS=PASS
PE64=PASS
SCATTER=PASS
EXECUTABLE_SECTIONS=2
TEXT_RVA=0x1000
TEXT_SIZE=0x1000
PATTERN_RVA=0x5000
PATTERN_READBACK=PASS
RESULT=PASS
--- DMA probe ---
BACKEND=MemProcFS DMA
PID=9180
MODULE=BackendAcceptanceTarget.exe
MODULE_BASE=0x7FF66B810000
MODULE_SIZE=0x8000
DOS=PASS
PE64=PASS
SCATTER=PASS
EXECUTABLE_SECTIONS=2
TEXT_RVA=0x1000
TEXT_SIZE=0x1000
PATTERN_RVA=0x5000
PATTERN_READBACK=PASS
RESULT=PASS
backend_acceptance: PASS
```

Both backends reported the same PID, module base/size, PE checks, executable-section count, `.text` RVA/size, pattern RVA, and pattern readback result during this acceptance run.

## 5. Release build and unit-test evidence

Source event timestamp: `2026-08-26T10:25:49.054Z`  
Source record: `event_msg / CommandExecution`

```text
ReaderUnitTests.vcxproj -> C:\Programming\SuperUE-DP\UE-Dumper\bin\Tests\Release\ReaderUnitTests.exe
reader_unit_tests: PASS
app_release_x64=0
tests_release_x64_build=0
tests_release_x64_run=0
```

## 6. Measurements not present in the supplied rollout set

The following values existed in prior project notes, but exact matching raw lines were **not found in the five rollout files supplied on 2026-08-28**:

- `18.91 MiB/s` DMA throughput
- `270.58 µs` FT601 64-byte average latency

They therefore remain excluded from the rollout-backed evidence claims until their originating benchmark logs are attached.
