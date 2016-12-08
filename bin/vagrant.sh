#!/usr/bin/env bash
sudo su

if [ ! -d "/var/source" ]
then 
    echo "beginning vagrant provisioning process"
    sudo apt-get install -y git-core curl

    # Installing nodejs
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Adding GPG keys
    # Yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

    # Mongo
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

    sudo apt-get update && sudo apt-get install -y mongodb-org yarn build-essential

    ln -s /vagrant/source /var/source
    
    pushd /var/source && yarn install && yarn dev
fi
