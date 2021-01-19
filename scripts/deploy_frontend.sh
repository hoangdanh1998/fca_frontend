#!/bin/bash
export CUR_DATE=$(date +%Y-%m-%d-%H-%M)
echo "[Talaria FE] Deploy to new dir $CUR_DATE"
rm -rf /tmp/dist_frontend
mkdir /tmp/dist_frontend
tar -xf /opt/talaria/deployment/dist_frontend.tgz -C /tmp/dist_frontend
mv /tmp/dist_frontend/dist /opt/talaria/frontend/$CUR_DATE
echo "[Talaria FE] -- Remove current folder"
rm -rf /opt/talaria/current/frontend
echo "[Talaria FE] -- Point current to $CUR_DATE"
ln -s /opt/talaria/frontend/$CUR_DATE /opt/talaria/current/frontend
echo "[Talaria FE] DONE."
