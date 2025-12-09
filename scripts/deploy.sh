!#/bin/bash

pnpm run --filter server deploy server_build
cd server_build
pnpm build
tar -czvf server.tar.gz dist
tar -czvf server-modules.tar.gz node_modules
scp -r server.tar.gz root@185-47-174-99.cloud-xip.com:~/
scp -r server-modules.tar.gz root@185-47-174-99.cloud-xip.com:~/
