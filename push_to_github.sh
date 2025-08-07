#!/bin/bash

echo "Push to GitHub Script"
echo "===================="
echo ""

# Check if the repository exists on GitHub first
echo "Checking if repository exists on GitHub..."
curl -s -o /dev/null -w "%{http_code}" https://github.com/hungson175/spinning-wheel-app > /tmp/repo_check.txt 2>&1
STATUS=$(cat /tmp/repo_check.txt)

if [ "$STATUS" = "404" ]; then
    echo "❌ Repository not found. Please create the repository on GitHub first:"
    echo "   https://github.com/new"
    echo "   Repository name: spinning-wheel-app"
    echo ""
    echo "After creating the repository, run this script again."
    exit 1
fi

echo "✅ Repository check complete"
echo ""

# Show current git status
echo "Current git status:"
git status --short
echo ""

# Show remote configuration
echo "Remote configuration:"
git remote -v
echo ""

# Try SSH first
echo "Attempting to push via SSH..."
if git push -u origin master 2>/tmp/git_error.txt; then
    echo "✅ Successfully pushed to GitHub via SSH!"
    echo "Your repository is now available at:"
    echo "https://github.com/hungson175/spinning-wheel-app"
else
    echo "⚠️  SSH push failed. Trying HTTPS..."
    
    # Switch to HTTPS
    git remote set-url origin https://github.com/hungson175/spinning-wheel-app.git
    
    echo ""
    echo "Please enter your GitHub credentials:"
    echo "(For password, use a personal access token from https://github.com/settings/tokens)"
    
    if git push -u origin master; then
        echo "✅ Successfully pushed to GitHub via HTTPS!"
        echo "Your repository is now available at:"
        echo "https://github.com/hungson175/spinning-wheel-app"
        
        # Switch back to SSH for future use
        git remote set-url origin git@github.com:hungson175/spinning-wheel-app.git
        echo ""
        echo "Remote URL has been switched back to SSH for future pushes."
    else
        echo "❌ Push failed. Please check your network connection and try again."
        echo "Error details saved in /tmp/git_error.txt"
        
        # Switch back to SSH
        git remote set-url origin git@github.com:hungson175/spinning-wheel-app.git
        exit 1
    fi
fi

echo ""
echo "Done!"