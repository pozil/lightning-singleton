#!/bin/bash

# Set parameters
ORG_ALIAS="singleton"

echo ""
echo "Installing Lightning Singleton:"
echo "- Org alias:      $ORG_ALIAS"
echo ""

# Install script
echo "Creating scratch org..." && \
sfdx force:org:create -s -f config/project-scratch-def.json -a $ORG_ALIAS -d 30 && \
echo "" && \
echo "Pushing source..." && \
sfdx force:source:push -u $ORG_ALIAS
EXIT_CODE="$?"

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Installation completed."
  sfdx force:org:open -p /c/SingletonSampleApp.app
else
  echo "Installation failed."
fi

exit $EXIT_CODE


