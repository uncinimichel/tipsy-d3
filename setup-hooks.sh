REPO=$(git rev-parse --show-toplevel)

cd ${REPO}

cd ${REPO}/.git/hooks
ln -sf ../../hooks/* .
chmod +x ${REPO}/hooks/*
chmod +x ${REPO}/.git/hooks/{post-checkout,post-receive,pre-commit}
echo "Hooks have been set up"
