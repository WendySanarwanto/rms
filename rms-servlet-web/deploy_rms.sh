export CATALINA_HOME=/usr/local/tomcat;
export TARGET_DIR=$CATALINA_HOME/webapps;
export TOMCAT_CONTAINER_NAME=tomcatdev;
export WAR_NAME=rms-servlet-web;
export WAR_FILENAME=$WAR_NAME.war;

echo "[INFO] - Deploying '$WAR_FILENAME' into '$TOMCAT_CONTAINER_NAME' container...";

# Remove older .war file
docker exec $TOMCAT_CONTAINER_NAME sh -c "rm -rf $TARGET_DIR/$WAR_NAME*";

# Copy target into $TOMCAT_CONTAINER_NAME:$TARGET_DIR directory
docker cp ./target/$WAR_FILENAME $TOMCAT_CONTAINER_NAME:$TARGET_DIR;

# Shutdown the Tomcat server
docker exec $TOMCAT_CONTAINER_NAME sh -c "./bin/shutdown.sh";
sleep 2s;

# Restart the Tomcat server
docker start $TOMCAT_CONTAINER_NAME;

echo "[INFO] - '$WAR_FILENAME' has been deployed into '$TOMCAT_CONTAINER_NAME' container.";

unset CATALINA_HOME;
unset TARGET_DIR;
unset TOMCAT_CONTAINER_NAME;
unset WAR_NAME;
unset WAR_FILENAME;
