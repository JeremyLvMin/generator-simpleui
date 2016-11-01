'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = generators.Base.extend({
    initializing: function() { //初始化准备工作

    },
    prompting: function() {
        var done = this.async();

        this.log(yosay('欢迎使用基础样式脚手架 ' + chalk.red('simple UI') + ' 生成器!'));
        this.name = path.basename(process.cwd());
        this.description = '';
        this.author = '';

        var prompts = [{
                type: 'input',
                name: 'name',
                message: '请输入项目名称:',
                default: this.name
            }, {
                type: 'input',
                name: 'description',
                message: '请输入项目描述:',
                default: this.description
            }, {
                type: 'input',
                name: 'author',
                message: '请输入开发人员:',
                default: this.author
            }

        ];

        this.prompt(prompts, function(props) {

            this.name = props.name;
            this.pkgName = props.name;
            this.author = props.author;
            this.description = props.description;

            done();
        }.bind(this));
    },
    writing: {
        app: function() {
            var done = this.async();
            this.template('package.json', 'package.json');
            this.template('gulpfile.js', 'gulpfile.js');

            this.spawnCommand('git', ['clone', 'https://github.com/JeremyLvMin/Simple-UI-template.git'])
                .on('exit', function(code) {
                    if (code) {
                        done(new Error('code:' + code));
                    } else {
                        done();
                    }
                })
                .on('error', done);
        }
    },
    install: function() {
        var done = this.async();
        this.spawnCommand('cnpm', ['install']) //安装项目依赖
            .on('exit', function(code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
    },
    end: function() {
        var done = this.async();
        this.spawnCommand('gulp') //生成器退出前运行gulp，开启watch任务
            .on('exit', function(code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
    }

})