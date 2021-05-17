#! /bin/bash

pids=()

serve build-srm --cors &
pids+=($!)

node node_modules/react-scripts/bin/react-scripts.js start

for pid in ${pids[*]}; do
    wait $pid
done
