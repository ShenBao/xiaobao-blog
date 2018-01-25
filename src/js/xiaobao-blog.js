import $ from "./jquery";
import emojify from "./emojify.js";

import hljs from "./highlight";
// var hljs = require('./highlight.pack');
import logionList from "../data/logionList";
import globalConfig from "../config";

(function (global, $) {

    console.log('Hello,Welcome to ShenBao Blog ！');
    console.log('Email: %c shenbaoone@gmail.com', "color:blue");
    console.log('QQ、WeChat: %c 1351814223', "color:blue");
    console.log("%c 欢迎勾搭！！！", "color:red");

    var ShenBaoBlogApplication = function () {
        this.initialization();
    };

    ShenBaoBlogApplication.prototype = {

        constructor: ShenBaoBlogApplication,

        initialization: function () {

            this.todayLogion();
            this.backTop();
            this.progress();
            this.emojify();
            this.clickHearts();
            this.Highlight();

        },

        todayLogion: function () {
            var i = parseInt(Math.random() * logionList.length);
            document
                .getElementById("today-logion")
                .innerHTML = logionList[i];
        },

        backTop: function () {
            $('#site-back-top').hide();
            $(document).ready(function () {
                $(window)
                    .scroll(function () {
                        if ($(this).scrollTop() > 250) {
                            $('#site-back-top').fadeIn();
                        } else {
                            $('#site-back-top').fadeOut();
                        }
                    });
                $('#site-back-top').click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            });
        },

        progress: function () {
            var $window = $(window);
            var $progress = $('.progress-indicator');
            $window.on('scroll', function () {
                var wh = $window.height();
                var h = $('body').height();
                var sHeight = h - wh;
                window.requestAnimationFrame(function () {
                    var perc = Math.max(0, Math.min(1, $window.scrollTop() / sHeight));
                    updateProgress(perc);
                });
            });

            function updateProgress(perc) {
                $progress.css({
                    width: perc * 100 + '%'
                });
            }
        },

        emojify: function () {
            emojify.setConfig({
                emojify_tag_type: 'div',
                only_crawl_id: null,
                img_dir: globalConfig.emojiImg,
                ignored_tags: {
                    'SCRIPT': 1,
                    'TEXTAREA': 1,
                    'A': 1,
                    'PRE': 1,
                    'CODE': 1
                }
            });
            emojify.run();
        },

        clickHearts: function () {
            var hearts = [];
            window.requestAnimationFrame = (function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    setTimeout(callback, 1000 / 60);
                }
            })();
            init();

            function init() {
                css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rota" +
                    "te(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart" +
                    ":after,.heart:before{content: '';width: inherit;height: inherit;background: inhe" +
                    "rit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;positi" +
                    "on: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
                attachEvent();
                gameloop();
            }

            function gameloop() {
                for (var i = 0; i < hearts.length; i++) {
                    if (hearts[i].alpha <= 0) {
                        document
                            .body
                            .removeChild(hearts[i].el);
                        hearts.splice(i, 1);
                        continue;
                    }
                    hearts[i].y--;
                    hearts[i].scale += 0.004;
                    hearts[i].alpha -= 0.013;
                    hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color + ";z-index:99999";
                }
                requestAnimationFrame(gameloop);
            }

            function attachEvent() {
                var old = typeof window.onclick === "function" && window.onclick;
                window.onclick = function (event) {
                    old && old();
                    createHeart(event);
                }
            }

            function createHeart(event) {
                var d = document.createElement("div");
                d.className = "heart";
                hearts.push({
                    el: d,
                    x: event.clientX - 5,
                    y: event.clientY - 5,
                    scale: 1,
                    alpha: 1,
                    color: randomColor()
                });
                document
                    .body
                    .appendChild(d);
            }

            function css(css) {
                var style = document.createElement("style");
                style.type = "text/css";
                try {
                    style.appendChild(document.createTextNode(css));
                } catch (ex) {
                    style.styleSheet.cssText = css;
                }
                document
                    .getElementsByTagName('head')[0]
                    .appendChild(style);
            }

            function randomColor() {
                return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
            }
        },

        Highlight: function () {
            // init
            hljs.initHighlightingOnLoad();
            // 添加行号
            $('pre code').each(function () {
                var lines = $(this)
                    .text()
                    .split('\n')
                    .length - 1;
                var $numbering = $('<ul/>').addClass('pre-numbering');
                $(this)
                    .addClass('has-numbering')
                    .parent()
                    .append($numbering);
                for (var i = 1; i <= lines; i++) {
                    $numbering.append($('<li/>').text(i));
                }
            });
        }
    };

    $(function () {
        global.BlogApplication = new ShenBaoBlogApplication();
    });

})(window, $);