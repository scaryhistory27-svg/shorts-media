#!/bin/bash
# Isolated hook tests: copies the working tree into a temp repo with a LOCAL bare remote — nothing is pushed to GitHub.
set -u; SRC="$(cd "$(dirname "$0")/.." && pwd)"; T=$(mktemp -d); pass=0; fail=0
ok(){ if [ "$1" = "$2" ]; then pass=$((pass+1)); echo "PASS $3"; else fail=$((fail+1)); echo "FAIL $3 (got $1, want $2)"; fi; }
git init -q --bare $T/remote.git
mkdir -p $T/w && (cd "$SRC" && tar --exclude=.git --exclude=build --exclude=videos -cf - .) | (cd $T/w && tar -xf -) || exit 1
cd $T/w || exit 1; case "$(pwd)" in "$T"/*) ;; *) echo "ABORT: not in temp dir"; exit 1;; esac
git init -q -b main && git add -A && git -c user.name=t -c user.email=t@t commit -qm init && git remote add origin $T/remote.git && git push -q origin main
export CLAUDE_PROJECT_DIR=$T/w
OUT=$(bash scripts/hooks/session_start.sh </dev/null); echo "$OUT" | grep -q "PROJECT MEMORY RESTORED" && echo "$OUT" | grep -q "UNFINISHED\|no unfinished" ; ok $? 0 "SessionStart prints memory + jobs"
echo "$OUT" | grep -q "CURRENT STATE"; ok $? 0 "SessionStart includes CURRENT_STATE"
C0=$(git rev-list --count HEAD); echo '{}' | bash scripts/hooks/checkpoint.sh stop; ok $(git rev-list --count HEAD) $C0 "Stop with no changes => no commit (dedupe)"
echo "- test task" >> docs/TASKS.md; echo '{}' | bash scripts/hooks/checkpoint.sh stop; ok $(git rev-list --count HEAD) $((C0+1)) "Stop with doc change => 1 commit"
ok "$(git rev-parse HEAD)" "$(git --git-dir=$T/remote.git rev-parse main)" "checkpoint pushed to remote"
mkdir -p videos build; echo x > videos/big.mp4; mkdir -p series/the-2am-knock/ep1/build; echo y > series/the-2am-knock/ep1/build/x.wav; echo '{}' | bash scripts/hooks/checkpoint.sh stop
git ls-files | grep -q "videos/big.mp4"; ok $? 1 "videos/builds never auto-committed"
echo 'api_key = "abcdEFGH1234567890xyz"' >> docs/TASKS.md; C1=$(git rev-list --count HEAD); echo '{}' | bash scripts/hooks/checkpoint.sh stop
ok $(git rev-list --count HEAD) $C1 "secret-looking diff => checkpoint aborted"; grep -q "secret" .claude/state/checkpoint.log; ok $? 0 "abort logged"
git checkout -q docs/TASKS.md
H=$(head -1 docs/SESSION_HANDOFF.md); echo '{}' | bash scripts/hooks/checkpoint.sh precompact; head -1 docs/SESSION_HANDOFF.md | grep -q "auto checkpoint before context compaction"; ok $? 0 "PreCompact prepends handoff entry"
ok "$(git status --porcelain docs | wc -l)" 0 "PreCompact entry committed"
CHECKPOINT_RUNNING=1 bash scripts/hooks/checkpoint.sh stop </dev/null; ok $? 0 "recursion guard exits cleanly"
( sleep 3 ) & exec 9>.git/checkpoint.lock; flock 9; echo "- z" >> docs/TASKS.md; C2=$(git rev-list --count HEAD); bash scripts/hooks/checkpoint.sh stop </dev/null; ok $(git rev-list --count HEAD) $C2 "concurrent checkpoint skipped while locked"; flock -u 9
# simulated session rotation: brand-new clone (= fresh session) restores state from repo only
git clone -q -b main $T/remote.git $T/fresh && OUT2=$(CLAUDE_PROJECT_DIR=$T/fresh bash $T/fresh/scripts/hooks/session_start.sh </dev/null)
echo "$OUT2" | grep -q "next stage\|nothing to resume"; ok $? 0 "fresh clone restores job resume point"
echo "$OUT2" | grep -q "auto checkpoint before context compaction"; ok $? 0 "fresh clone sees last handoff"
cd /; rm -rf $T; echo "RESULT: $pass passed, $fail failed"; [ $fail = 0 ]
