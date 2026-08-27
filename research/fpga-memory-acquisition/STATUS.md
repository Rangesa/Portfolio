# Evidence and Claim Status

This file distinguishes direct command-output evidence, derived values, earlier project records, and publication claims.

| Item | Status |
|---|---|
| 256-byte physical-memory read | **Direct stdout verified** |
| 4-KiB MRd32 requests | **32, direct stdout verified** |
| 4-KiB CplD completions | **32, direct stdout verified** |
| TLP tags | **01–20 sequence matched** |
| 63,966 / 65,536 probe pages read | **Direct stdout verified** |
| 1,570 failed / UR pages | **Direct stdout verified** |
| 97.604% page-read rate | **Derived from direct counts** |
| Probe retry=0 | **Direct stdout verified** |
| exhausted=0 | **Direct stdout verified** |
| protocol=0 | **Direct stdout verified** |
| WinAPI / MemProcFS DMA backend acceptance | **Direct stdout verified PASS** |
| ReaderUnitTests | **Direct stdout verified PASS** |
| Release x64 build | **Exit code 0 verified** |
| 18.91 MiB/s DMA throughput | **Earlier project record; source log not present in supplied rollouts** |
| 270.58 µs FT601 average latency (64 B × 500) | **Earlier project record; source log not present in supplied rollouts** |
| Peer reviewed | **No** |
| Published in an academic venue | **No** |
| Assigned DOI | **No** |
| Independent replication | **Not yet** |

See [`evidence/2026-08-27-acceptance.md`](evidence/2026-08-27-acceptance.md) for sanitized extracts and [`evidence/source-rollouts.sha256`](evidence/source-rollouts.sha256) for source-file hashes.
