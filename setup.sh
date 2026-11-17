#!/bin/bash
# One-time per container: TTS deps + Kokoro voice model (~350MB from GitHub releases)
set -e
pip install -q kokoro-onnx soundfile scipy 2>&1 | grep -v WARNING || true
M=${KOKORO_DIR:-/tmp/kokoro}; mkdir -p $M
[ -s $M/kokoro.onnx ] || curl -sSL -o $M/kokoro.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
[ -s $M/voices.bin ] || curl -sSL -o $M/voices.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
echo "setup ok"
