#!/bin/bash
# Isolated tests for pipeline/jobs.py — uses a temp JOBS_FILE, never touches series/jobs.json, never calls Metricool.
set -u; cd "$(dirname "$0")/.."; T=$(mktemp -d); export JOBS_FILE=$T/jobs.json; J="python3 pipeline/jobs.py"; pass=0; fail=0
ok(){ if [ "$1" = "$2" ]; then pass=$((pass+1)); echo "PASS $3"; else fail=$((fail+1)); echo "FAIL $3 (got $1, want $2)"; fi; }
$J new --slot 2099-01-01 --series test --ep 1 --title "T1" >/dev/null; ok $? 0 "create job"
$J new --slot 2099-01-01 --series test --ep 1 | grep -q '"exists": true'; ok $? 0 "create is idempotent"
$J new --slot 2099-01-02 --series test --ep 1 | grep -q '"exists": true'; ok $? 0 "same episode on another slot reuses job"
ID=2099-01-01-test-ep1
$J can-schedule $ID >/dev/null; ok $? 4 "cannot schedule before QA"
for s in scripted voiced rendered qa_passed; do $J stage $ID $s >/dev/null; done; ok $? 0 "advance to qa_passed"
$J stage $ID voiced 2>/dev/null >/dev/null; ok $? 3 "refuse going backwards"
$J can-schedule $ID >/dev/null; ok $? 0 "can schedule after QA"
$J stage $ID scheduling >/dev/null; $J can-schedule $ID >/dev/null; ok $? 5 "in-flight scheduling => reconcile, no blind retry"
$J uncertain $ID "response lost" >/dev/null; $J stage $ID rendered 2>/dev/null >/dev/null; ok $? 3 "uncertain job refuses non-verified stages"
$J resume | grep -q RECONCILE; ok $? 0 "resume says reconcile"
$J stage $ID scheduled --set metricool_id=111 >/dev/null; ok $? 0 "record verified scheduled"
$J can-schedule $ID >/dev/null; ok $? 3 "already scheduled => duplicate blocked"
$J new --slot 2099-01-05 --series test --ep 2 --title "T1" >/dev/null; for s in scripted voiced rendered qa_passed; do $J stage 2099-01-05-test-ep2 $s >/dev/null; done
$J can-schedule 2099-01-05-test-ep2 >/dev/null; ok $? 3 "same title on another job => duplicate blocked"
$J new --slot 2099-01-06 --series test --ep 3 >/dev/null; for i in 1 2; do $J fail 2099-01-06-test-ep3 "boom" >/dev/null; done; $J fail 2099-01-06-test-ep3 "boom" >/dev/null; ok $? 6 "bounded retries (3) => failed"
$J stage 2099-01-06-test-ep3 scripted 2>/dev/null >/dev/null; ok $? 3 "failed job refuses to continue without --force"
# concurrency: 20 parallel creators must not corrupt the file
for i in $(seq 1 20); do $J new --slot 2099-02-$(printf %02d $i) --series par --ep $i >/dev/null & done; wait
python3 -c "import json;d=json.load(open('$JOBS_FILE'));assert sum(1 for k in d['jobs'] if '-par-' in k)==20"; ok $? 0 "20 parallel writes, valid JSON, no lost jobs"
$J status >/dev/null; ok $? 0 "status works"
rm -rf $T; echo "RESULT: $pass passed, $fail failed"; [ $fail = 0 ]
