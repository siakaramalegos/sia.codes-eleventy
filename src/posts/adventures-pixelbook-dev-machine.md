---
title: My adventures in turning a Pixelbook into a developer machine
description: With the Chromebook Linux beta, web development got a whole lot easier.
date: 2018-12-07
tags: ['Tools']
layout: layouts/post.njk
tweetId: '1197670409543540738'
isSelect: false
featuredImage: pixelbook_vkhrbc.jpg
---

<figure>
  <img src="{% src 'pixelbook_vkhrbc.jpg' %}"
    srcset="{% srcset 'pixelbook_vkhrbc.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Side-view of Pixelbook showing how thin it is"
    width="1360" height="776">
  <figcaption>My favorite view of the ultra-thin Pixelbook by Google</figcaption>
</figure>

Today the FedEx man delivered my brand new Pixelbook. So much fun! I got this little tool to attempt to get off of the Mac platform without going full Linux distro. For the most part, I do web development and only need (1) a terminal, (2) an editor, preferably VS Code, and (3) a browser. Since Chrome OS deployed the new Linux beta, all these things are now possible with fewer install headaches than before. These are my adventures in trying to turn it into a dev machine.

## Step 1: Give it a chance to update before panicking
Don’t fret that the Linux beta option doesn’t show up in your settings. First, check to see which Chrome OS you are on.

1. Click on the clock.
2. Open Settings
3. Click on the hamburger menu
4. Select “About Chrome OS”

You should then see your current version and whether it is checking for updates. Version 70 was the latest stable for me, though the Linux beta came out in version 69. After updating, Chrome OS will require a restart.

## Step 2: Turn on Linux
Open your Settings again. Scroll down, and you will find a setting for the Linux beta:

<figure>
  <img src="{% src 'linux-flag_p9lyoy.jpg' %}"
    srcset="{% srcset 'linux-flag_p9lyoy.jpg' %}"
    sizes="{% defaultSizes %}"
    alt=""
    loading="lazy"
    width="1360" height="907">
  <figcaption>Linux (Beta) setting in Chrome OS. Oh hai, Momentum!</figcaption>
</figure>

After you turn on the flag, it will download and open a terminal!! 🤯🤯🤯

<figure>
  <img src="{% src 'terminal_t0fcej.jpg' %}"
    srcset="{% srcset 'terminal_t0fcej.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Terminal window view"
    loading="lazy"
    width="1360" height="907">
  <figcaption>Terminal systems are go!</figcaption>
</figure>

<aside><strong>Note</strong>: You may have struggled like me to copy-paste things into this new terminal. Try ctrl-shift-V instead of just ctrl-V.</aside>

I like tools that make me faster, so I immediately attempted to install `zsh` and `oh-my-zsh`, and that’s when I came across my next problem…

## Step 3. WTF is the password in terminal?
It’s [a little unclear](https://www.reddit.com/r/chromeos/comments/9hzrzm/linux_beta_user_password/), but you can update it as follows:

1. Switch to root with `$ sudo su`
2. Run `passwd your-username-here`
3. It will prompt you twice for a new password. To exit, type `exit`

Boom! Now you can install and update things in your terminal.

## Step 4. Oh My Zsh!
I debated on adding this section, but this article really is about my adventures in setting up my machine, so here goes. [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) is totally an easy cop-out I’ve used for setting up my terminal on every machine:

> Oh My Zsh is an open source, community-driven framework for managing your [zsh](https://www.zsh.org/) configuration.

It gives me a custom terminal prompt that I like and Git aliases. You just need to install Zsh and then Oh My Zsh:

```bash
$ apt install zsh
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

This worked like a breeze once I knew my password. 🤦

## Step 5. ️VS Code
By now you should know that I like things that make my life easy. As I type these words, I have not yet attempted to install VS Code. I hope I don’t have to delete this section. Hold on while I Google some stuff…

Success! Okay, it looks like we might not have access to the file system for files downloaded using Chrome. So instead, we need to download the .deb installer using `curl` and then install it:

```bash
$ curl -L https://go.microsoft.com/fwlink/\?LinkID\=760868 > code.deb
$ sudo apt-get install ./code.deb
```

For the final test, see if it runs:

```bash
$ code .
```

Success! 🙌

Thanks to [this Reddit post](https://www.reddit.com/r/Crostini/comments/8f5zu8/from_scratch_to_vs_code/) for the VS Code installation clues. It suggests a few other libs that they had to install because of bugs, but I have not come across any bugs yet. I’ll update this post if I come across those bugs later.

## Step 6. Installing Node and NPM via NVM
I chose to install Node and NPM via [Node Version Manager](https://github.com/creationix/nvm). Install via `curl`:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Then, add these 3 lines to your .zshrc (or .bashrc):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

Then, restart your terminal or type `source .zshrc` or `source .bashrc` to have it load the updated run commands.

Check that it’s working with `nvm -v`, then you can install Node with `nvm install node` for the latest release of Node (and NPM).

Special thanks to [Yulan Lin](https://twitter.com/y3l2n) for all her help with setting up my Pixelbook!
