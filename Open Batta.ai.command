#!/bin/bash
cd "$(dirname "$0")/dist"
echo "Starting Batta.ai at http://localhost:8000"
echo "Close this terminal window to stop the server."
open "http://localhost:8000"
python3 -m http.server 8000
