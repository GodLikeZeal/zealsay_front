/* eslint-disable */
import Vue from "vue";
const FN_MESSAGE = {
  waifu: {
    console_open_msg: ["哈哈，你打开了控制台，是想要看看我的秘密吗？"],
    copy_message: ["你都复制了些什么呀，转载要记得加上出处哦"],
    screenshot_message: ["照好了嘛，是不是很可爱呢？"],
    hidden_message: ["我们还能再见面的吧…"],
    load_rand_textures: ["我还没有其他衣服呢", "我的新衣服好看嘛"],
    hour_tips: {
      "t5-7": ["早上好！一日之计在于晨，美好的一天就要开始了"],
      "t7-11": ["上午好！工作顺利嘛，不要久坐，多起来走动走动哦！"],
      "t11-14": ["中午了，工作了一个上午，现在是午餐时间！"],
      "t14-17": ["午后很容易犯困呢，今天的运动目标完成了吗？"],
      "t17-19": ["傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~"],
      "t19-21": ["晚上好，今天过得怎么样？"],
      "t21-23": ["已经这么晚了呀，早点休息吧，晚安~"],
      "t23-5": ["你是夜猫子呀？这么晚还不睡觉，明天起的来嘛"],
      default: ["嗨~ 快来逗我玩吧！"]
    },
    referrer_message: {
      localhost: [
        '欢迎阅读<span style="color:#0099cc;">『',
        "』</span>",
        " - "
      ],
      baidu: [
        'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">',
        "</span> 找到的我吗？"
      ],
      so: [
        'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">',
        "</span> 找到的我吗？"
      ],
      google: [
        'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『',
        "』</span>",
        " - "
      ],
      default: ['Hello! 来自 <span style="color:#0099cc;">', "</span> 的朋友"],
      none: ['欢迎阅读<span style="color:#0099cc;">『', "』</span>", " - "]
    },
    referrer_hostname: {
      "baidu.com": ["百度"],
      "www.google.net": ["谷歌"]
    },
    model_message: {
      "1": ["来自 Potion Maker 的 Pio 酱 ~"],
      "2": ["来自 Potion Maker 的 Tia 酱 ~"]
    },
    hitokoto_api_message: {
      "lwl12.com": [
        '这句一言来自 <span style="color:#0099cc;">『{source}』</span>',
        '，是 <span style="color:#0099cc;">{creator}</span> 投稿的',
        "。"
      ],
      "fghrsh.net": [
        '这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">FGHRSH</span> 在 {date} 收藏的！'
      ],
      "jinrishici.com": [
        '这句诗词出自 <span style="color:#0099cc;">《{title}》</span>，是 {dynasty}诗人 {author} 创作的！'
      ],
      "hitokoto.cn": [
        '这句一言来自 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{creator}</span> 在 hitokoto.cn 投稿的。'
      ]
    }
  },
  mouseover: [{
      selector: ".container a[href^='http']",
      text: ['要看看 <span style="color:#0099cc;">{text}</span> 么？']
    },
    {
      selector: ".fui-home",
      text: ["点击前往首页，想回到上一页可以使用浏览器的后退功能哦"]
    },
    {
      selector: ".fui-chat",
      text: ["一言一语，一颦一笑。一字一句，一颗赛艇。"]
    },
    {
      selector: ".fui-eye",
      text: ["嗯··· 要切换 看板娘 吗？"]
    },
    {
      selector: ".fui-user",
      text: ["喜欢换装 Play 吗？"]
    },
    {
      selector: ".fui-photo",
      text: ["要拍张纪念照片吗？"]
    },
    {
      selector: ".fui-info-circle",
      text: ["这里有关于我的信息呢"]
    },
    {
      selector: ".fui-cross",
      text: ["你不喜欢我了吗..."]
    },
    {
      selector: "#tor_show",
      text: ["翻页比较麻烦吗，点击可以显示这篇文章的目录呢"]
    },
    {
      selector: "#comment_go",
      text: ["想要去评论些什么吗？"]
    },
    {
      selector: "#night_mode",
      text: ["深夜时要爱护眼睛呀"]
    },
    {
      selector: "#qrcode",
      text: ["手机扫一下就能继续看，很方便呢"]
    },
    {
      selector: ".comment_reply",
      text: ["要吐槽些什么呢"]
    },
    {
      selector: "#back-to-top",
      text: ["回到开始的地方吧"]
    },
    {
      selector: "#author",
      text: ["该怎么称呼你呢"]
    },
    {
      selector: "#mail",
      text: ["留下你的邮箱，不然就是无头像人士了"]
    },
    {
      selector: "#url",
      text: ["你的家在哪里呢，好让我去参观参观"]
    },
    {
      selector: "#textarea",
      text: ["认真填写哦，垃圾评论是禁止事项"]
    },
    {
      selector: ".OwO-logo",
      text: ["要插入一个表情吗"]
    },
    {
      selector: "#csubmit",
      text: ["要[提交]^(Commit)了吗，首次评论需要审核，请耐心等待~"]
    },
    {
      selector: ".ImageBox",
      text: ["点击图片可以放大呢"]
    },
    {
      selector: "input[name=s]",
      text: ["找不到想看的内容？搜索看看吧"]
    },
    {
      selector: ".previous",
      text: ["去上一页看看吧"]
    },
    {
      selector: ".next",
      text: ["去下一页看看吧"]
    },
    {
      selector: ".dropdown-toggle",
      text: ["这里是菜单"]
    },
    {
      selector: "c-player a.play-icon",
      text: ["想要听点音乐吗"]
    },
    {
      selector: "c-player div.time",
      text: ['在这里可以调整<span style="color:#0099cc;">播放进度</span>呢']
    },
    {
      selector: "c-player div.volume",
      text: ['在这里可以调整<span style="color:#0099cc;">音量</span>呢']
    },
    {
      selector: "c-player div.list-button",
      text: ['<span style="color:#0099cc;">播放列表</span>里都有什么呢']
    },
    {
      selector: "c-player div.lyric-button",
      text: ['有<span style="color:#0099cc;">歌词</span>的话就能跟着一起唱呢']
    },
    {
      selector: ".waifu #live2d",
      text: ["干嘛呢你，快把手拿开", "鼠…鼠标放错地方了！"]
    },
    {
      selector: ".post-body img",
      text: ["文章特色配图好看嘛？"]
    },
    {
      selector: ".fe-sidebar__gitee",
      text: ["我命令你给主人个star，哦不是...求求你了~~"]
    },
    {
      selector: "fancybox.image img",
      text: ["点击图片可以放大了噢~~"]
    },
    {
      selector: ".fe-sidebar__index",
      text: ["要返回主页嘛？"]
    },
    {
      selector: ".fe-sidebar__about",
      text: ["想要了解更多关于主人，那就再深入点吧~~"]
    },
    {
      selector: ".fe-sidebar__item-list",
      text: ["无敌换色 赤橙黄绿青蓝紫 来玩玩~~"]
    },
    {
      selector: ".meta-footer__chat-item",
      text: ["主人的社交ID，不关注下嘛？"]
    },
    {
      selector: ".reward-content",
      text: ["客官大人，是要准备给主人打赏吗？谢谢啦~~"]
    },
    {
      selector: ".back-to-top",
      text: ["回到顶部去吧~~"]
    },
    {
      selector: "#post-box input[name=name]",
      text: ["敢问客官尊姓大名~~"]
    },
    {
      selector: "#post-box input[name=email]",
      text: ["留下你的邮箱呗~这样我才能提醒到你呢~"]
    },
    {
      selector: "#post-box input[name=url]",
      text: ["客官的博客在哪儿呢？我要去看看。"]
    },
    {
      selector: "#post-box .markdown-editor",
      text: ["嘛，东西可以乱吃，话可不能乱说噢~~"]
    },
    {
      selector: ".reference .like",
      text: ["客官要给个大大的喜欢吗 小的感激不尽..."]
    },
    {
      selector: "#post-box .submit",
      text: ["写好了就回复吧！我会第一时间通知主人的~~"]
    }
  ],
  click: [{
    selector: ".waifu #live2d",
    text: [
      "是…是不小心碰到了吧",
      "萝莉控是什么呀",
      "你看到我的小熊了吗",
      "再摸的话我可要报警了！⌇●﹏●⌇",
      "110吗，这里有个变态一直在摸我(ó﹏ò｡)"
    ]
  }],
  seasons: [{
      date: "01/01",
      text: [
        '<span style="color:#0099cc;">元旦</span>了呢，新的一年又开始了，今年是{year}年~'
      ]
    },
    {
      date: "02/14",
      text: [
        '又是一年<span style="color:#0099cc;">情人节</span>，{year}年找到对象了嘛~'
      ]
    },
    {
      date: "03/08",
      text: ['今天是<span style="color:#0099cc;">妇女节</span>！']
    },
    {
      date: "03/12",
      text: ['今天是<span style="color:#0099cc;">植树节</span>，要保护环境呀']
    },
    {
      date: "04/01",
      text: [
        '悄悄告诉你一个秘密~<span style="background-color:#34495e;">今天是愚人节，不要被骗了哦~</span>'
      ]
    },
    {
      date: "05/01",
      text: [
        '今天是<span style="color:#0099cc;">五一劳动节</span>，计划好假期去哪里了吗~'
      ]
    },
    {
      date: "06/01",
      text: [
        '<span style="color:#0099cc;">儿童节</span>了呢，快活的时光总是短暂，要是永远长不大该多好啊…'
      ]
    },
    {
      date: "09/03",
      text: [
        '<span style="color:#0099cc;">中国人民抗日战争胜利纪念日</span>，铭记历史、缅怀先烈、珍爱和平、开创未来。'
      ]
    },
    {
      date: "09/10",
      text: [
        '<span style="color:#0099cc;">教师节</span>，在学校要给老师问声好呀~'
      ]
    },
    {
      date: "10/01",
      text: [
        '<span style="color:#0099cc;">国庆节</span>，新中国已经成立69年了呢'
      ]
    },
    {
      date: "11/05-11/12",
      text: [
        '今年的<span style="color:#0099cc;">双十一</span>是和谁一起过的呢~'
      ]
    },
    {
      date: "12/20-12/31",
      text: [
        '这几天是<span style="color:#0099cc;">圣诞节</span>，主人肯定又去剁手买买买了~'
      ]
    }
  ]
};
// window.oncontextmenu = function () {
//   return false;
// }
// window.onkeydown = window.onkeyup = window.onkeypress = function () {
//   window.event.returnValue = false;
//   return false;
// }
// var h = window.innerHeight,
//   w = window.innerWidth;
// window.onresize = function () {
//   if (h != window.innerHeight || w != window.innerWidth) {
//     window.close();
//     window.location = "about:blank";
//   }
// }

if (process.client) {
  window.live2d_settings = Array();
  live2d_settings["modelAPI"] = "//live2d.fghrsh.net/api/";
  live2d_settings["hitokotoAPI"] = "lwl12.com";
  live2d_settings["modelId"] = "4";
  live2d_settings["modelTexturesId"] = 0;
  live2d_settings["showToolMenu"] = true; // 显示 工具栏
  live2d_settings["canCloseLive2d"] = true; // 显示 关闭看板娘
  live2d_settings["canSwitchModel"] = true; // 显示 模型切换
  live2d_settings["canSwitchTextures"] = true; // 显示 材质切换
  live2d_settings["canSwitchHitokoto"] = true; // 显示 一言切换
  live2d_settings["canTakeScreenshot"] = true; // 显示 看板娘截图
  live2d_settings["canTurnToHomePage"] = true; // 显示 返回首页
  live2d_settings["canTurnToAboutPage"] = true; // 显示 跳转关于页
  // 模型切换模式
  live2d_settings["modelStorage"] = true;
  live2d_settings["modelRandMode"] = "rand";
  live2d_settings["modelTexturesRandMode"] = "rand";
  // 提示消息选项
  live2d_settings["showHitokoto"] = true;
  live2d_settings["showF12Status"] = true;
  live2d_settings["showF12Message"] = true;
  live2d_settings["showF12OpenMsg"] = true;
  live2d_settings["showCopyMessage"] = true;
  live2d_settings["showWelcomeMessage"] = true;
  //看板娘样式设置
  live2d_settings["waifuSize"] = "200x220";
  live2d_settings["waifuTipsSize"] = "160x30";
  live2d_settings["waifuFontSize"] = "12px";
  live2d_settings["waifuToolFont"] = "14px";
  live2d_settings["waifuToolLine"] = "30px";
  live2d_settings["waifuToolTop"] = "-10px";
  live2d_settings["waifuMinWidth"] = "disable";
  live2d_settings["waifuEdgeSide"] = "left: 0";
  live2d_settings["waifuDraggable"] = "disable";
  live2d_settings["waifuDraggableRevert"] = true;

  live2d_settings["l2dVersion"] = "1.4.2";
  live2d_settings["l2dVerDate"] = "2018.11.12";
  live2d_settings["homePageUrl"] = "http://teeoo.cn";
  live2d_settings["aboutPageUrl"] = "http://teeoo.cn";
  live2d_settings["screenshotCaptureName"] = "live2d.png";

  String.prototype.render = function (context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function (word, slash1, token, slash2) {
      if (slash1 || slash2) {
        return word.replace("\\", "");
      }

      var variables = token.replace(/\s/g, "").split(".");
      var currentObject = context;
      var i, length, variable;

      for (i = 0, length = variables.length; i < length; ++i) {
        variable = variables[i];
        currentObject = currentObject[variable];
        if (currentObject === undefined || currentObject === null) return "";
      }
      return currentObject;
    });
  };

  var re = /x/;

  const empty = obj => typeof obj == "undefined" || obj == null || obj == "" ? true : false;

  const getRandText = text => Array.isArray(text) ?
    text[Math.floor(Math.random() * text.length + 1) - 1] :
    text;

  const showMessage = (text, timeout, flag) => {
    if (
      flag ||
      sessionStorage.getItem("waifu-text") === "" ||
      sessionStorage.getItem("waifu-text") === null
    ) {
      if (Array.isArray(text))
        text = text[Math.floor(Math.random() * text.length + 1) - 1];
      if (live2d_settings.showF12Message)
        console.log("[Message]", text.replace(/<[^<>]+>/g, ""));

      if (flag) sessionStorage.setItem("waifu-text", text);

      $(".waifu-tips").stop();
      $(".waifu-tips")
        .html(text)
        .fadeTo(200, 1);
      if (timeout === undefined) timeout = 5000;
      hideMessage(timeout);
    }
  };

  const hideMessage = timeout => {
    $(".waifu-tips")
      .stop()
      .css("opacity", 1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function () {
      sessionStorage.removeItem("waifu-text");
    }, timeout);
    $(".waifu-tips")
      .delay(timeout)
      .fadeTo(200, 0);
  };

  window.loadModel = (modelId, modelTexturesId = 0) => {
    if (live2d_settings.modelStorage) {
      localStorage.setItem("modelId", modelId);
      localStorage.setItem("modelTexturesId", modelTexturesId);
    } else {
      sessionStorage.setItem("modelId", modelId);
      sessionStorage.setItem("modelTexturesId", modelTexturesId);
    }
    loadlive2d(
      "live2d",
      live2d_settings.modelAPI + "get/?id=" + modelId + "-" + modelTexturesId,
      live2d_settings.showF12Status ?
      console.log() :
      null
    );
  }

  window.loadTipsMessage = (result) => {
    window.waifu_tips = result;

    $.each(result.mouseover, function (index, tips) {
      $(document).on("mouseover", tips.selector, function () {
        var text = getRandText(tips.text);
        text = text.render({
          text: $(this).text()
        });
        showMessage(text, 3000);
      });
    });
    $.each(result.click, function (index, tips) {
      $(document).on("click", tips.selector, function () {
        var text = getRandText(tips.text);
        text = text.render({
          text: $(this).text()
        });
        showMessage(text, 3000, true);
      });
    });
    $.each(result.seasons, function (index, tips) {
      var now = new Date();
      var after = tips.date.split("-")[0];
      var before = tips.date.split("-")[1] || after;
      if (
        after.split("/")[0] <= now.getMonth() + 1 &&
        now.getMonth() + 1 <= before.split("/")[0] &&
        (after.split("/")[1] <= now.getDate() &&
          now.getDate() <= before.split("/")[1])
      ) {
        var text = getRandText(tips.text);
        text = text.render({
          year: now.getFullYear()
        });
        showMessage(text, 6000, true);
      }
    });

    if (live2d_settings.showF12OpenMsg) {
      re.toString = function () {
        showMessage(getRandText(result.waifu.console_open_msg), 5000, true);
        return "";
      };
    }

    if (live2d_settings.showCopyMessage) {
      $(document).on("copy", function () {
        showMessage(getRandText(result.waifu.copy_message), 5000, true);
      });
    }

    $(".waifu-tool .fui-photo").click(function () {
      showMessage(getRandText(result.waifu.screenshot_message), 5000, true);
      window.Live2D.captureName = live2d_settings.screenshotCaptureName;
      window.Live2D.captureFrame = true;
    });

    $(".waifu-tool .fui-cross").click(function () {
      sessionStorage.setItem("waifu-dsiplay", "none");
      showMessage(getRandText(result.waifu.hidden_message), 1300, true);
      window.setTimeout(function () {
        $(".waifu").hide();
      }, 1300);
    });

    window.showWelcomeMessage = function (result) {
      var text;
      if (window.location.href == live2d_settings.homePageUrl) {
        var now = new Date().getHours();
        if (now > 23 || now <= 5)
          text = getRandText(result.waifu.hour_tips.t23 - 5);
        else if (now > 5 && now <= 7)
          text = getRandText(result.waifu.hour_tips.t5 - 7);
        else if (now > 7 && now <= 11)
          text = getRandText(result.waifu.hour_tips.t7 - 11);
        else if (now > 11 && now <= 14)
          text = getRandText(result.waifu.hour_tips.t11 - 14);
        else if (now > 14 && now <= 17)
          text = getRandText(result.waifu.hour_tips.t14 - 17);
        else if (now > 17 && now <= 19)
          text = getRandText(result.waifu.hour_tips.t17 - 19);
        else if (now > 19 && now <= 21)
          text = getRandText(result.waifu.hour_tips.t19 - 21);
        else if (now > 21 && now <= 23)
          text = getRandText(result.waifu.hour_tips.t21 - 23);
        else text = getRandText(result.waifu.hour_tips.default);
      } else {
        var referrer_message = result.waifu.referrer_message;
        if (document.referrer !== "") {
          var referrer = document.createElement("a");
          referrer.href = document.referrer;
          var domain = referrer.hostname.split(".")[1];
          if (window.location.hostname == referrer.hostname)
            text =
            referrer_message.localhost[0] +
            document.title.split(referrer_message.localhost[2])[0] +
            referrer_message.localhost[1];
          else if (domain == "baidu")
            text =
            referrer_message.baidu[0] +
            referrer.search.split("&wd=")[1].split("&")[0] +
            referrer_message.baidu[1];
          else if (domain == "so")
            text =
            referrer_message.so[0] +
            referrer.search.split("&q=")[1].split("&")[0] +
            referrer_message.so[1];
          else if (domain == "google")
            text =
            referrer_message.google[0] +
            document.title.split(referrer_message.google[2])[0] +
            referrer_message.google[1];
          else {
            $.each(result.waifu.referrer_hostname, function (i, val) {
              if (i == referrer.hostname) referrer.hostname = getRandText(val);
            });
            text =
              referrer_message.default[0] +
              referrer.hostname +
              referrer_message.default[1];
          }
        } else
          text =
          referrer_message.none[0] +
          document.title.split(referrer_message.none[2])[0] +
          referrer_message.none[1];
      }
      showMessage(text, 6000);
    };
    if (live2d_settings.showWelcomeMessage) showWelcomeMessage(result);

    var waifu_tips = result.waifu;

    function loadOtherModel() {
      var modelId = modelStorageGetItem("modelId");
      var modelRandMode = live2d_settings.modelRandMode;

      $.ajax({
        cache: modelRandMode == "switch" ? true : false,
        url: live2d_settings.modelAPI + modelRandMode + "/?id=" + modelId,
        dataType: "json",
        success: function (result) {
          loadModel(result.model["id"]);
          var message = result.model["message"];
          $.each(waifu_tips.model_message, function (i, val) {
            if (i == result.model["id"]) message = getRandText(val);
          });
          showMessage(message, 3000, true);
        }
      });
    }

    function loadRandTextures() {
      var modelId = modelStorageGetItem("modelId");
      var modelTexturesId = modelStorageGetItem("modelTexturesId");
      var modelTexturesRandMode = live2d_settings.modelTexturesRandMode;

      $.ajax({
        cache: modelTexturesRandMode == "switch" ? true : false,
        url: live2d_settings.modelAPI +
          modelTexturesRandMode +
          "_textures/?id=" +
          modelId +
          "-" +
          modelTexturesId,
        dataType: "json",
        success: function (result) {
          if (
            result.textures["id"] == 1 &&
            (modelTexturesId == 1 || modelTexturesId == 0)
          )
            showMessage(waifu_tips.load_rand_textures[0], 3000, true);
          else showMessage(waifu_tips.load_rand_textures[1], 3000, true);
          loadModel(modelId, result.textures["id"]);
        }
      });
    }

    function modelStorageGetItem(key) {
      return live2d_settings.modelStorage ?
        localStorage.getItem(key) :
        sessionStorage.getItem(key);
    }

    /* 检测用户活动状态，并在空闲时显示一言 */
    if (live2d_settings.showHitokoto) {
      window.getActed = false;
      window.hitokotoTimer = 0;
      window.hitokotoInterval = false;
      $(document)
        .mousemove(function (e) {
          getActed = true;
        })
        .keydown(function () {
          getActed = true;
        });
      setInterval(function () {
        if (!getActed) ifActed();
        else elseActed();
      }, 1000);
    }

    function ifActed() {
      if (!hitokotoInterval) {
        hitokotoInterval = true;
        hitokotoTimer = window.setInterval(showHitokotoActed, 30000);
      }
    }

    function elseActed() {
      getActed = hitokotoInterval = false;
      window.clearInterval(hitokotoTimer);
    }

    function showHitokotoActed() {
      if ($(document)[0].visibilityState == "visible") showHitokoto();
    }

    function showHitokoto() {
      switch (live2d_settings.hitokotoAPI) {
        case "lwl12.com":
          $.getJSON(
            "https://api.lwl12.com/hitokoto/v1?encode=realjson",
            function (result) {
              if (!empty(result.source)) {
                var text = waifu_tips.hitokoto_api_message["lwl12.com"][0];
                if (!empty(result.author))
                  text += waifu_tips.hitokoto_api_message["lwl12.com"][1];
                text = text.render({
                  source: result.source,
                  creator: result.author
                });
                window.setTimeout(function () {
                  showMessage(
                    text + waifu_tips.hitokoto_api_message["lwl12.com"][2],
                    3000,
                    true
                  );
                }, 5000);
              }
              showMessage(result.text, 5000, true);
            }
          );
          break;
        case "fghrsh.net":
          $.getJSON(
            "https://api.fghrsh.net/hitokoto/rand/?encode=jsc&uid=3335",
            function (result) {
              if (!empty(result.source)) {
                var text = waifu_tips.hitokoto_api_message["fghrsh.net"][0];
                text = text.render({
                  source: result.source,
                  date: result.date
                });
                window.setTimeout(function () {
                  showMessage(text, 3000, true);
                }, 5000);
                showMessage(result.hitokoto, 5000, true);
              }
            }
          );
          break;
        case "jinrishici.com":
          $.ajax({
            url: "https://v2.jinrishici.com/one.json",
            xhrFields: {
              withCredentials: true
            },
            success: function (result, status) {
              if (!empty(result.data.origin.title)) {
                var text = waifu_tips.hitokoto_api_message["jinrishici.com"][0];
                text = text.render({
                  title: result.data.origin.title,
                  dynasty: result.data.origin.dynasty,
                  author: result.data.origin.author
                });
                window.setTimeout(function () {
                  showMessage(text, 3000, true);
                }, 5000);
              }
              showMessage(result.data.content, 5000, true);
            }
          });
          break;
        default:
          $.getJSON("https://v1.hitokoto.cn", function (result) {
            if (!empty(result.from)) {
              var text = waifu_tips.hitokoto_api_message["hitokoto.cn"][0];
              text = text.render({
                source: result.from,
                creator: result.creator
              });
              window.setTimeout(function () {
                showMessage(text, 3000, true);
              }, 5000);
            }
            showMessage(result.hitokoto, 5000, true);
          });
      }
    }

    $(".waifu-tool .fui-eye").click(function () {
      loadOtherModel();
    });
    $(".waifu-tool .fui-user").click(function () {
      loadRandTextures();
    });
    $(".waifu-tool .fui-chat").click(function () {
      showHitokoto();
    });
  }
  window.initModel = (waifuPath, type) => {
    /* 加载看板娘样式 */
    live2d_settings.waifuSize = live2d_settings.waifuSize.split("x");
    live2d_settings.waifuTipsSize = live2d_settings.waifuTipsSize.split("x");
    live2d_settings.waifuEdgeSide = live2d_settings.waifuEdgeSide.split(":");

    $("#live2d").attr("width", live2d_settings.waifuSize[0]);
    $("#live2d").attr("height", live2d_settings.waifuSize[1]);
    $(".waifu-tips").width(live2d_settings.waifuTipsSize[0]);
    $(".waifu-tips").css("top", live2d_settings.waifuToolTop);
    $(".waifu-tips").css("font-size", live2d_settings.waifuFontSize);
    $(".waifu-tool").css("font-size", live2d_settings.waifuToolFont);
    $(".waifu-tool span").css("line-height", live2d_settings.waifuToolLine);

    if (live2d_settings.waifuEdgeSide[0] == "left")
      $(".waifu").css("left", live2d_settings.waifuEdgeSide[1] + "px");
    else if (live2d_settings.waifuEdgeSide[0] == "right")
      $(".waifu").css("right", live2d_settings.waifuEdgeSide[1] + "px");

    window.waifuResize = function () {
      $(window).width() <=
        Number(live2d_settings.waifuMinWidth.replace("px", "")) ?
        $(".waifu").hide() :
        $(".waifu").show();
    };
    if (live2d_settings.waifuMinWidth != "disable") {
      waifuResize();
      $(window).resize(function () {
        waifuResize();
      });
    }

    try {
      if (live2d_settings.waifuDraggable == "axis-x")
        $(".waifu").draggable({
          axis: "x",
          revert: live2d_settings.waifuDraggableRevert
        });
      else if (live2d_settings.waifuDraggable == "unlimited")
        $(".waifu").draggable({
          revert: live2d_settings.waifuDraggableRevert
        });
      else $(".waifu").css("transition", "all .3s ease-in-out");
    } catch (err) {
      console.log("[Error] JQuery UI is not defined.");
    }

    live2d_settings.homePageUrl == "auto" ?
      window.location.protocol + "//" + window.location.hostname + "/" :
      live2d_settings.homePageUrl;
    if (
      window.location.protocol == "file:" &&
      live2d_settings.modelAPI.substr(0, 2) == "//"
    )
      live2d_settings.modelAPI = "http:" + live2d_settings.modelAPI;

    $(".waifu-tool .fui-home").click(function () {
      //window.location = 'https://www.fghrsh.net/';
      window.location = live2d_settings.homePageUrl;
    });

    $(".waifu-tool .fui-info-circle").click(function () {
      //window.open('https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02');
      window.open(live2d_settings.aboutPageUrl);
    });

    window.loadTipsMessage(FN_MESSAGE);

    if (!live2d_settings.showToolMenu) $(".waifu-tool").hide();
    if (!live2d_settings.canCloseLive2d) $(".waifu-tool .fui-cross").hide();
    if (!live2d_settings.canSwitchModel) $(".waifu-tool .fui-eye").hide();
    if (!live2d_settings.canSwitchTextures) $(".waifu-tool .fui-user").hide();
    if (!live2d_settings.canSwitchHitokoto) $(".waifu-tool .fui-chat").hide();
    if (!live2d_settings.canTakeScreenshot) $(".waifu-tool .fui-photo").hide();
    if (!live2d_settings.canTurnToHomePage) $(".waifu-tool .fui-home").hide();
    if (!live2d_settings.canTurnToAboutPage)
      $(".waifu-tool .fui-info-circle").hide();

    if (waifuPath === undefined) waifuPath = "";
    var modelId = localStorage.getItem("modelId");
    var modelTexturesId = localStorage.getItem("modelTexturesId");

    if (!live2d_settings.modelStorage || modelId == null) {
      var modelId = live2d_settings.modelId;
      var modelTexturesId = live2d_settings.modelTexturesId;
    }
    loadModel(modelId, modelTexturesId);
  };
}
