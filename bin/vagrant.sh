#!/usr/bin/env bash
sudo su

if [ ! -d "/var/www "]
then 
    echo "beginning vagrant provisioning process"
    sudo apt-get install -y git-core curl

    # Installing nvm
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
    echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
    source /home/vagrant/.profile

    nvm install 7.2.0
    nvm alias default 7.2.0
    
    # Adding GPG keys
    # Yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

    # Mongo
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

    sudo apt-get update && sudo apt-get install -y mongodb-org yarn

    ln -s /vagrant/www /var/www

    yarn install && yarn start
fi
