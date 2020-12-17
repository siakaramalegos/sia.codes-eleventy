---
title: Rails folder tree explained
description: Descriptions of the auto-generated folders in Rails 4.2
date: 2015-05-12
tags: ['Rails']
layout: layouts/post.njk
---

<figure>
  <img src="{% src 'folders_b2nyci.jpg' %}"
    srcset="{% srcset 'folders_b2nyci.jpg' %}"
    sizes="{% defaultSizes %}"
    alt="Shelves of multi-colored folders"
    width="4898" height="3265">
  <figcaption>Photo by <a href="https://unsplash.com/@mvdheuvel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Maarten van den Heuvel</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></figcaption>
</figure>

Sometimes you just don’t like any one particular reference out there.  This happened to me when I was trying to build lesson content for our first lesson on Rails.  Oh, by the way, I’m teaching a coding bootcamp here in New Orleans right now (fun stuff!).

To summarize, I found a lot of different content explaining the folder tree and files for Rails, but no one particular source spoke to me above all others.  So, I decided to mash them all together and only leave the bits I liked, modifying other bits, and adding some new bits.

First, I want to thank these sources for their initial great explanations - you should check them out also in case they speak more to you than the one I generated here.

<ul>
  <li><a href="http://guides.rubyonrails.org/getting_started.html#creating-the-blog-application">RailsGuides:  Getting started with Rails</a></li>
  <li><a href="http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm">TutorialsPoint:  Ruby on Rails directory structure</a></li>
  <li><a href="http://www.pragtob.info/rails-beginner-cheatsheet/">Rails Beginner Cheat Sheet</a></li>
</ul>

And now for something completely different…

<h2 id="sias-guide-to-rails-folders">Sia’s Guide to Rails’ Folders</h2>
I would love to hear any feedback on this content - I’d love to make it a living document.

| Folder or File | Purpose |
| -------------- | ------- |
| `app/` | Organizes your application components. It's got subdirectories that hold the view (views, assets, helpers), controller (controllers), the backend business logic (models), and more. |
| `app/assets` | Basically your front-end stuff. This folder contains images, javascripts, and stylesheets.  These use the Rails asset pipeline which means that Rails is going to generate all this for us on deployment.|
| `app/controllers` | The controllers subdirectory contains the controllers, which handle the requests from the users. It is often responsible for a single resource type, such as places, users or attendees. Controllers also tie together the models and the views. |
| `app/helpers` | For the most part, helpers are going to be used to generate code for our views, though they can also be used to assist the models and controllers.  Rails encourages “creating custom helpers to extract complicated logic or reusable functionality.”  This helps keep our code small, focused, and uncluttered. |
| `app/mailers` | Functionality to send emails goes here. |
| `app/models` | Holds the classes that model the business logic of our application and wrap the data stored in our application's database. In most frameworks, this part of the application can grow pretty messy, tedious, verbose, and error-prone. Rails makes it much more simple. |
| `app/views` | The views subdirectory contains the display templates that will be displayed to the user after a successful request. By default they are written in HTML with embedded ruby (.html.erb). The embedded ruby is used to insert data from the application. It is then converted to HTML and sent to the browser of the user. It has subdirectories for every resource of our application. These subdirectories contain the associated view files.|
| `app/views/_filename` | Files starting with an underscore (_) are called partials. Those are parts of a view which are reused in other views. A common example is _form.html.erb which contains the basic form for a given resource. It is used in the new and in the edit view since creating something and editing something looks pretty similar.|
| `app/views/layouts` | Holds the template files for layouts to be used with views. This models the common header/footer method of wrapping views. |
| `bin/` | Contains the rails scripts, or executables, that start your app and perform other functions to setup, deploy, test, or run your application. Can be directly read by your computer, but not by humans. (The files we write need to be compiled in order to be read by computers.) Ex: bundle, rake, rails, gem. |
| `config/` | Configure your application's routes, database, and more., including your database configuration (in database.yml), your Rails environment structure (environment.rb), and routing of incoming web requests (routes.rb). You can also tailor the behavior of the three Rails environments for test, development, and deployment with files found in the environments directory. |
| `db/` | Contains your current database schema, as well as the database migrations.  Usually, your Rails application will have model objects that access relational database tables. Migrations set up your database structure, including the attributes of your models. With migrations you can add new attributes to existing models or create new models. It also initially contains seeds.rb which is used to populate the database with default data.  Schema.rb shows the current state of your app’s database |
| `Gemfile` | A file that specifies a list of gems that are required to run your application. Rails itself is a gem you will find listed in the Gemfile. Ruby gems are self-contained packages of code, more generally called libraries, that add functionality or features to your application. |
| `Gemfile.lock` | This file specifies the exact versions of all gems you use. Because some gems depend on other gems, Ruby will install all you need automatically. The file also contains specific version numbers. It can be used to make sure that everyone within a team is working with the same versions of gems. The file is auto-generated. **Do not edit this file.** |
| `lib/` | Extended modules for your application. You'll put libraries here, unless they explicitly belong elsewhere (such as vendor libraries).  For example, this might be code used to get specific information from Facebook. |
| `log/` | Application log files. See all the funny stuff that is written in the console where you started the Rails server? It is written to your development.log. Logs contain runtime information of your application. If an error happens, it will be recorded here. |
| `public/` | The only folder seen by the world as-is. Like the public directory for a web server, this directory has web files that don't change, such as JavaScript files (public/javascripts), graphics (public/images), stylesheets (public/stylesheets), and HTML files (public).  You should store your assets in the app/assets/images directory locally. In production, Rails precompiles these files to public/assets by default. |
| `Rakefile` | This file locates and loads tasks that can be run from the command line. The task definitions are defined throughout the components of Rails. Rather than changing Rakefile, you should add your own tasks by adding files to the lib/tasks directory of your application. |
| `README.rdoc` | This is a brief instruction manual for your application. You should edit this file to tell others what your application does, how to set it up, and so on.  To make it visible on GitHub, change it to a markdown file type (.md). |
| `test/` | Contains the tests for your application. With tests you make sure that your application actually does what you think it does. |
| `temp/` | Temporary files (like cache, pid, and session files).  Caching involves temporarily storing recently used information, which can improve application performance. |
| `vendor/` | A place for all third-party code. In a typical Rails application this includes vendored gems (such as security libraries). |
