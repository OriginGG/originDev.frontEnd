#!/bin/sh
rsync -avz -e "ssh -i stefan.pem"  ./build ubuntu@ec2-52-86-203-150.compute-1.amazonaws.com:~/applications/frontend
# ssh -i RLM-Private-NEW.pem ubuntu@54.191.182.21 <<'ENDSSH'
# cd applications/web/rd1_ink
# ./update_web_ink.sh
# ENDSSH
