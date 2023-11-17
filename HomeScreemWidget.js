// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: stream;

// Author: 叮噹鬧 github.com/dingdangnao //

// 天气部份 mod from https://github.com/Enjoyee/Scriptable
// calendar.js from https://github.com/jjonline/calendar.js
// const { calendar } = importModule('calendar.js');

// 选择true时，使用透明背景
const changePicBg = false
// 选择true时，使用必应壁纸  
const ImageMode = true
// 预览大小  small/medium/large
const previewSize = (config.runsInWidget ? config.widgetFamily : "medium");
// 是否使用纯色背景
const colorMode = false
// 小组件背景色
const bgColor = new Color('#223A70', 1)
// 高斯样式：light/dark
const blurStyle = "dark"
// 模糊程度 参数范围 1~150
const blursize = 100
// 1：图片加蒙板 2：unsplash壁纸  3：Bing 壁纸
const Imgstyle = 1
// 仅当选项为Unsplash有效 即Imgstyle = 2
const IMAGE_SEARCH_TERMS = "nature,wather"
// 在此处输入你喜欢的NBA球队的缩写。 具体配置 详见公众号内推文---曰坛
const MY_NBA_TEAM = "GSW"; 
// 当前季节的开始年份
// 对于2020-21赛季，该值必须为“ 2020”
// 对于2021-22赛季，该值必须为“ 2021”
const CURRENT_SEASON_START_YEAR = "2023";
// 上下左右间距
 const padding = { top: 10, left: 10, bottom: 10, right: 10 }


const calendar = calendarFunc();
const fmLocal = FileManager.local();
const _config = {
    apiKey: "", // 彩云天气 key https://caiyunapp.com/api/weather#api
    emojiUrl: "https://raw.githubusercontent.com/dingdangnao/Scriptable/main/AMEmoji/", //年份emoji的链接地址，要以 / 结尾
    refreshInterval: 10, // 刷新时间--估算(单位：分钟)
    imgRefreshInterval: 120, // 刷新时间--估算(单位：分钟)
    // 位置，可以不进行定位，或者定位为出错的时候使用
    location: {
        latitude: undefined,
        longitude: undefined,
        locality: undefined,
        subLocality: undefined,
    },

    locale: "zh-cn", // 地区
    weatherDesc: {
        CLEAR_DAY: "晴",
        CLEAR_NIGHT: "晴",
        PARTLY_CLOUDY_DAY: "多云",
        PARTLY_CLOUDY_NIGHT: "多云",
        CLOUDY: "阴",
        CLOUDY_NIGHT: "阴",
        LIGHT_HAZE: "轻度雾霾",
        LIGHT_HAZE_NIGHT: "轻度雾霾",
        MODERATE_HAZE: "中度雾霾",
        MODERATE_HAZE_NIGHT: "中度雾霾",
        HEAVY_HAZE: "重度雾霾",
        HEAVY_HAZE_NIGHT: "重度雾霾",
        LIGHT_RAIN: "小雨",
        MODERATE_RAIN: "中雨",
        HEAVY_RAIN: "大雨",
        STORM_RAIN: "暴雨",
        FOG: "雾",
        LIGHT_SNOW: "小雪",
        MODERATE_SNOW: "中雪",
        HEAVY_SNOW: "大雪",
        STORM_SNOW: "暴雪",
        DUST: "浮尘",
        SAND: "沙尘",
        WIND: "大风",
    },
    weatherSFIcos: {
        CLEAR_DAY: "sun.max.fill", // 晴（白天） CLEAR_DAY
        CLEAR_NIGHT: "moon.stars.fill", // 晴（夜间） CLEAR_NIGHT
        PARTLY_CLOUDY_DAY: "cloud.sun.fill", // 多云（白天）  PARTLY_CLOUDY_DAY
        PARTLY_CLOUDY_NIGHT: "cloud.moon.fill", // 多云（夜间）  PARTLY_CLOUDY_NIGHT
        CLOUDY: "cloud.fill", // 阴（白天）  CLOUDY
        CLOUDY_NIGHT: "cloud.fill", // 阴（夜间）  CLOUDY
        LIGHT_HAZE: "sun.haze.fill", // 轻度雾霾   LIGHT_HAZE
        LIGHT_HAZE_NIGHT: "sun.haze.fill", // 轻度雾霾   LIGHT_HAZE
        MODERATE_HAZE: "sun.haze.fill", // 中度雾霾  MODERATE_HAZE
        MODERATE_HAZE_NIGHT: "sun.haze.fill", // 中度雾霾  MODERATE_HAZE
        HEAVY_HAZE: "sun.haze.fill", // 重度雾霾   HEAVY_HAZE
        HEAVY_HAZE_NIGHT: "sun.haze.fill", // 重度雾霾   HEAVY_HAZE
        LIGHT_RAIN: "cloud.drizzle.fill", // 小雨 LIGHT_RAIN
        MODERATE_RAIN: "cloud.drizzle.fill", // 中雨 MODERATE_RAIN
        HEAVY_RAIN: "cloud.rain.fill", // 大雨  HEAVY_RAIN
        STORM_RAIN: "cloud.heavyrain.fill", // 暴雨 STORM_RAIN
        FOG: "cloud.fog.fill", // 雾 FOG
        LIGHT_SNOW: "cloud.snow.fill", // 小雪  LIGHT_SNOW
        MODERATE_SNOW: "cloud.snow.fill", // 中雪 MODERATE_SNOW
        HEAVY_SNOW: "cloud.snow.fill", // 大雪  HEAVY_SNOW
        STORM_SNOW: "cloud.snow.fill", // 暴雪 STORM_SNOW
        DUST: "sun.dust.fill", // 浮尘  DUST
        SAND: "smoke.fill", // 沙尘  SAND
        WIND: "wind", // 大风  WIND
    },
};

//#####################背景模块-START#####################

let widget = await renderLockscreenWidget()
//#####################背景模块-START#####################

if (!colorMode && !ImageMode && !config.runsInWidget && changePicBg) {


    const okTips = "您的小部件背景已准备就绪"
    let message = "开始之前，请回到主屏幕并进入编辑模式。 滑到最右边的空白页并截图。"
    let options = ["图片选择", "透明背景", "配置文档", "取消"]
    let response = await generateAlert(message, options)
    if (response == 3) return
    if (response == 0) {
        let img = await Photos.fromLibrary()
        message = okTips
        const resultOptions = ["好的"]
        await generateAlert(message, resultOptions)
        files.writeImage(path, img)
    }
    if (response == 2) {
        Safari.openInApp(versionData['ONE-NBA'].wxurl, false);
    }
    if (response == 1) {
        message = "以下是【透明背景】生成步骤，如果你没有屏幕截图请退出，并返回主屏幕长按进入编辑模式。滑动到最右边的空白页截图。然后重新运行！"
        let exitOptions = ["继续(已有截图)", "退出(没有截图)"]

        let shouldExit = await generateAlert(message, exitOptions)
        if (shouldExit) return

        // Get screenshot and determine phone size.
        let img = await Photos.fromLibrary()
        let height = img.size.height
        let phone = phoneSizes()[height]
        if (!phone) {
            message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次!"
            await generateAlert(message, ["好的！我现在去截图"])
            return
        }
        if (height == 2436) {
            let files = FileManager.local()
            let cacheName = "nk-phone-type"
            let cachePath = files.joinPath(files.libraryDirectory(), cacheName)
            if (files.fileExists(cachePath)) {
                let typeString = files.readString(cachePath)
                phone = phone[typeString]
            } else {
                message = "你使用什么型号的iPhone？"
                let types = ["iPhone 12 mini", "iPhone 11 Pro, XS, or X"]
                let typeIndex = await generateAlert(message, types)
                let type = (typeIndex == 0) ? "mini" : "x"
                phone = phone[type]
                files.writeString(cachePath, type)
            }
        }
        // Prompt for widget size and position.
        message = "您想要创建什么尺寸的小部件？"
        let sizes = ["小号", "中号", "大号"]
        let size = await generateAlert(message, sizes)
        let widgetSize = sizes[size]

        message = "您想它在什么位置？"
        message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")

        // Determine image crop based on phone size.
        let crop = {
            w: "",
            h: "",
            x: "",
            y: ""
        }
        if (widgetSize == "小号") {
            crop.w = phone.小号
            crop.h = phone.小号
            let positions = ["顶部 左边", "顶部 右边", "中间 左边", "中间 右边", "底部 左边", "底部 右边"]
            let position = await generateAlert(message, positions)

            // Convert the two words into two keys for the phone size dictionary.
            let keys = positions[position].split(' ')
            crop.y = phone[keys[0]]
            crop.x = phone[keys[1]]

        } else if (widgetSize == "中号") {
            crop.w = phone.中号
            crop.h = phone.小号

            // 中号 and 大号 widgets have a fixed x-value.
            crop.x = phone.左边
            let positions = ["顶部", "中间", "底部"]
            let position = await generateAlert(message, positions)
            let key = positions[position].toLowerCase()
            crop.y = phone[key]

        } else if (widgetSize == "大号") {
            crop.w = phone.中号
            crop.h = phone.大号
            crop.x = phone.左边
            let positions = ["顶部", "底部"]
            let position = await generateAlert(message, positions)

            // 大号 widgets at the 底部 have the "中间" y-value.
            crop.y = position ? phone.中间 : phone.顶部
        }

        // Crop image and finalize the widget.
        let imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))

        message = "您的小部件背景已准备就绪，退出到桌面预览。"
        const resultOptions = ["导出到相册", "预览组件"]
        const exportToFiles = await generateAlert(message, resultOptions)
        if (exportToFiles) {
            files.writeImage(path, imgCrop)
        } else {
            Photos.save(imgCrop)
        }
    }

}

//#####################背景模块-设置小组件的背景#####################

if (colorMode) {
    widget.backgroundColor = bgColor
} else if (ImageMode) {
    switch (Imgstyle) {
        case 1:
            const blugImgs = await getImageByUrl("https://source.unsplash.com/random/800x373?" + IMAGE_SEARCH_TERMS, `_${Script.name()}-bg`, false)
            bgImg = await blurImage(blugImgs, blurStyle, blursize)
            widget.backgroundImage = bgImg
            break;
        case 2:
            const unsplashurl = "https://source.unsplash.com/random/800x373?" + IMAGE_SEARCH_TERMS
            const orginImgs = await getImageByUrl(unsplashurl, `_${Script.name()}-orginImgs-bg`, false)

            bgImg = await shadowImage(orginImgs)
            widget.backgroundImage = bgImg
            break;
        case 3:
            const bingurl = "https://api.dujin.org/bing/1366.php"
            const bingImgs = await getImageByUrl(bingurl, `_${Script.name()}-bingImgs-bg`, false)
            bgImg = await shadowImage(bingImgs)
            widget.backgroundImage = bgImg
            break;
    }


}
else {
    widget.backgroundImage = files.readImage(path)
}
// 设置边距(上，左，下，右)
widget.setPadding(padding.top, padding.left, padding.bottom, padding.right)
// 设置组件
if (!config.runsInWidget) {
    switch (previewSize) {
        case "small":
            await widget.presentSmall();
            break;
        case "medium":
            await widget.presentMedium();
            break;
        case "large":
            await widget.presentLarge();
            break;
    }
}
Script.setWidget(widget)
// 完成脚本
Script.complete()
// 预览


///////////////////////////////////////////


Script.setWidget(widget);
Script.complete();

async function renderLockscreenWidget() {
    let widget = new ListWidget();
    //   widget.refreshAfterDate = new Date(Date.now() + 60 * 5 * 1000);  // 设置刷新时间为30秒后
    widget.useDefaultPadding();
    let weatherInfo = await getWeather();
    console.log('weatherInfo', weatherInfo)
    if (!weatherInfo || !weatherInfo.temperature) {
        for (let retries = 0; retries < 5; retries++) {
            weatherInfo = await getWeather(true);
            if (weatherInfo && weatherInfo.temperature) {
                break; // 如果成功获取到数据，立即跳出循环
            } else {
                console.log(weatherInfo)
            }
        }
    }

    const dateInfo = calendar.solar2lunar();
    console.log(`当前时间：`, dateInfo.solarDate);
    //////////////////////////
    // 农历
    const lunarCalendarStack = widget.addStack();
    lunarCalendarStack.centerAlignContent();

    let lunarInfoData = `${dateInfo.gzYear}年 ${dateInfo.IMonthCn}${dateInfo.IDayCn}`;

    if (dateInfo.Term) {
        lunarInfoData += ` ${dateInfo.Term}`;
    }

    if (dateInfo.lunarFestival && !dateInfo.festival) {
        lunarInfoData = `${dateInfo.gzYear}年 ${dateInfo.IMonthCn}${dateInfo.IDayCn} • ${dateInfo.lunarFestival}`;
        if (dateInfo.lunarFestival.length > 3) {
            lunarInfoData = `${dateInfo.IMonthCn}${dateInfo.IDayCn} • ${dateInfo.lunarFestival}`;
        }
    }

    if (dateInfo.festival && !dateInfo.lunarFestival) {
        lunarInfoData = `${dateInfo.gzYear}年 ${dateInfo.IMonthCn}${dateInfo.IDayCn} • ${dateInfo.festival}`;
        if (dateInfo.festival.length > 3) {
            lunarInfoData = `${dateInfo.IMonthCn}${dateInfo.IDayCn} • ${dateInfo.festival}`;
        }
    }

    if (dateInfo.festival && dateInfo.lunarFestival) {
        lunarInfoData = `${dateInfo.IMonthCn}${dateInfo.IDayCn} • ${dateInfo.lunarFestival} • ${dateInfo.festival}`;
    }

    if (!dateInfo.festival && !dateInfo.lunarFestival) {
        let yearAnimalImageContent = await getImageByUrl(
            animalEmoji(dateInfo.Animal)
        );
        yearAnimalImage = lunarCalendarStack.addImage(yearAnimalImageContent);
        yearAnimalImage.imageSize = new Size(18, 18);
        yearAnimalImage.centerAlignImage();
        lunarCalendarStack.addSpacer(6)
    }

    let lunarInfoTextWidget = lunarCalendarStack.addText(lunarInfoData);
    lunarInfoTextWidget.font = Font.boldSystemFont(12);
    if (lunarInfoData.length > 12) {
        lunarInfoTextWidget.font = Font.boldSystemFont(11);
    }
    lunarInfoTextWidget.lineLimit = 1;

    lunarCalendarStack.addSpacer();

    // 农历 END
    //////////////////////////

    widget.addSpacer(7);
    //////////////////////////
    // 天气
    if (weatherInfo && weatherInfo.temperature) {
        const weatherStack = widget.addStack();
        // weatherStack.layoutHorizontally()
        weatherStack.centerAlignContent();
        // weatherStack.addSpacer()

        // 天气图标
        const weatherIcon = getSFSymbol(
            _config.weatherSFIcos[weatherInfo.weatherIco]
        );
        let weatherIconWidget = weatherStack.addImage(weatherIcon);
        weatherIconWidget.imageSize = new Size(18, 18);
        weatherIconWidget.centerAlignImage();

        // 天气描述
        weatherStack.addSpacer(6);
        let weatherDescValue = _config.weatherDesc[weatherInfo.weatherIco];
        let weatherDescWidget = weatherStack.addText(`${weatherDescValue}`);
        weatherDescWidget.font = Font.blackSystemFont(12);

        // 天气温度
        weatherStack.addSpacer(6);
        let weatherTemperatureValue = weatherInfo.temperature;
        weatherTemperatureValue = `${weatherTemperatureValue}℃`;
        let weatherTemperatureWidget = weatherStack.addText(
            `${weatherTemperatureValue}`
        );
        weatherTemperatureWidget.font = Font.boldRoundedSystemFont(12);
        weatherStack.addSpacer();
        widget.addSpacer(8);


        // 处理温度范围显示
        const weatherRangeStack = widget.addStack();
        // weatherStack.layoutHorizontally()
        weatherRangeStack.centerAlignContent();
        // weatherStack.addSpacer()

        // 温度范围
        if (weatherDescValue.length < 3) {
            // weatherRangeStack.addSpacer(6);
            let thermometerIcon = "thermometer.medium";
            if (weatherInfo.maxTemperature > 30) {
                thermometerIcon = "thermometer.high";
            } else if (weatherInfo.maxTemperature > 15) {
                thermometerIcon = "thermometer.medium";
            } else {
                thermometerIcon = "thermometer.low";
            }
            const tRangeIcon = getSFSymbol(thermometerIcon);
            let tRangeIconWidget = weatherRangeStack.addImage(tRangeIcon);
            tRangeIconWidget.imageSize = new Size(18, 18);
            // tRangeIconWidget.tintColor = new Color("ffffff", 0.8);
            weatherRangeStack.addSpacer(2);
            let aqiTextWidget = weatherRangeStack.addText(
                `${weatherInfo.minTemperature}~${weatherInfo.maxTemperature}`
            );
            aqiTextWidget.font = Font.semiboldRoundedSystemFont(12);
            // aqiTextWidget.textColor = new Color("ffffff", 0.8);
        }

        // 天气 END
        //////////////////////////
        weatherRangeStack.addSpacer(6);
        // widget.addSpacer(8);

        //////////////////////////
        // AQI 
        // const otherWeatherStack = widget.addStack();
        // otherWeatherStack.centerAlignContent();

        // AQI
        let aqiIcon = "aqi.medium";
        if (weatherInfo.aqiValue <= 150) {
            aqiIcon = "aqi.low";
        } else if (weatherInfo.aqiValue < 200) {
            aqiIcon = "aqi.medium";
        } else {
            aqiIcon = "aqi.high";
        }
        aqiImg = SFSymbol.named(aqiIcon).image;
        const aqiImageElement = weatherRangeStack.addImage(aqiImg);
        aqiImageElement.imageSize = new Size(18, 18);
        // let aqiTintColor = new Color("ffffff", 0.9);
        // aqiImageElement.tintColor = aqiTintColor;

        //
        weatherRangeStack.addSpacer(4);

        const aqiTextElement = weatherRangeStack.addText(`${weatherInfo.aqiValue}`);
        aqiTextElement.lineLimit = 1;
        aqiTextElement.font = Font.boldRoundedSystemFont(12);
        // aqiTextElement.textColor = new Color("ffffff", 0.8);
        weatherRangeStack.addSpacer();
        widget.addSpacer(8);


        //处理日出日落
        const sunRiseSetStack = widget.addStack();
        // weatherStack.layoutHorizontally()
        sunRiseSetStack.centerAlignContent();

        // 日出ico
        // sunRiseSetStack.addSpacer(8);

        sunriseImg = SFSymbol.named("sunrise.fill").image;
        const sunriseImageElement = sunRiseSetStack.addImage(sunriseImg)
        sunriseImageElement.imageSize = new Size(18, 18);
        // let sunriseTintColor = new Color("ffffff", 0.8);
        // sunriseImageElement.tintColor = sunriseTintColor;

        //
        sunRiseSetStack.addSpacer(4);

        const sunriseTextElement = sunRiseSetStack.addText(`${weatherInfo.sunrise}`);
        sunriseTextElement.lineLimit = 1;
        sunriseTextElement.font = Font.boldRoundedSystemFont(11);
        // sunriseTextElement.textColor = new Color("ffffff", 0.8);


        // 日落ico
        sunRiseSetStack.addSpacer(6);
        sunsetImg = SFSymbol.named("sunset.fill").image;
        const sunsetImageElement = sunRiseSetStack.addImage(sunsetImg)
        sunsetImageElement.imageSize = new Size(18, 18);
        // let sunsetTintColor = new Color("ffffff", 0.8);
        // sunsetImageElement.tintColor = sunsetTintColor;

        //
        sunRiseSetStack.addSpacer(4);

        const sunsetTextElement = sunRiseSetStack.addText(`${weatherInfo.sunset}`);
        sunsetTextElement.lineLimit = 1;
        sunsetTextElement.font = Font.boldRoundedSystemFont(11);
        // sunsetTextElement.textColor = new Color("ffffff", 0.8);

        sunRiseSetStack.addSpacer();
    } else {
        const errStack = widget.addStack()
        errStack.layoutVertically()
        let errline1 = errStack.addText("🤔 获取天气信息失败")
        errline1.font = Font.systemFont(12);
        errStack.addSpacer(6)
        let errline2 = errStack.addText("叮噹鬧")
        errline2.font = Font.blackSystemFont(12);
    }
    widget.url = "weather://";

    return widget;
}

/***************************************************************************
 ***************************************************************************
 ***************************************************************************
 ***************************************************************************
 ***************************************************************************
 *******    ___  _____  __________  ___   _  ________  _____  ____  ********
 *******   / _ \/  _/ |/ / ___/ _ \/ _ | / |/ / ___/ |/ / _ |/ __ \ ********
 *******  / // // //    / (_ / // / __ |/    / (_ /    / __ / /_/ / ********
 ******* /____/___/_/|_/\___/____/_/ |_/_/|_/\___/_/|_/_/ |_\____/  ********
 ***************************************************************************
 ***************************************************************************
 ***************************************************************************
 ***************************************************************************
 **************************************************************************/

/**
 * 获取彩云天气信息
 */
async function getWeather(forceRefresh = false) {
    // 获取位置
    let location = _config.location;
    location = await getLocation(_config.locale);
    // 小时
    const hour = new Date().getHours();

    // 彩云天气域名
    const url = `https://api.caiyunapp.com/v2.6/${_config.apiKey}/${location.longitude},${location.latitude}/weather?alert=true`;
    const weatherJsonData = await httpGet(url, true, null, "caiyunData", false, forceRefresh);
    // console.log(weatherJsonData);
    // 天气数据
    let weatherInfo = {};
    if (weatherJsonData.status == "ok") {
        // log("天气数据请求成功");
        // 天气突发预警
        let alertWeather = weatherJsonData.result.alert.content;
        if (alertWeather.length > 0) {
            const alertWeatherTitle = alertWeather[0].title;
            // log(`突发的天气预警==>${alertWeatherTitle}`);
            weatherInfo.alertWeatherTitle = alertWeatherTitle;
        }
        if (weatherJsonData.status != 'ok') {
            console.log(weatherJsonData);
        }

        // 温度范围
        const temperatureData = weatherJsonData.result.daily.temperature[0];
        // 最低温度
        const minTemperature = temperatureData.min;
        // 最高温度
        const maxTemperature = temperatureData.max;
        weatherInfo.minTemperature =
            Math.round(minTemperature);
        weatherInfo.maxTemperature = Math.round(maxTemperature);

        // 体感温度
        const bodyFeelingTemperature =
            weatherJsonData.result.realtime.apparent_temperature;
        weatherInfo.bodyFeelingTemperature = Math.floor(bodyFeelingTemperature);

        // 显示温度
        const temperature = weatherJsonData.result.realtime.temperature;
        weatherInfo.temperature = Math.floor(temperature);

        // 天气状况 weatherIcos[weatherIco]
        let weather = weatherJsonData.result.realtime.skycon;

        let night = hour - 12 >= 7;
        let nightCloudy = night && weather == "CLOUDY";
        let nightLightHaze = night && weather == "LIGHT_HAZE";
        let nightModerateHaze = night && weather == "MODERATE_HAZE";
        let nightHeavyHaze = night && weather == "HEAVY_HAZE";
        if (nightCloudy) {
            weather = "CLOUDY_NIGHT";
        }
        if (nightLightHaze) {
            weather = "LIGHT_HAZE_NIGHT";
        }
        if (nightModerateHaze) {
            weather = "MODERATE_HAZE_NIGHT";
        }
        if (nightHeavyHaze) {
            weather = "HEAVY_HAZE_NIGHT";
        }
        weatherInfo.weatherIco = weather;
        // log(`天气：${weather}`);

        // 天气描述
        const weatherDesc = weatherJsonData.result.forecast_keypoint;
        weatherInfo.weatherDesc = weatherDesc.replace("。还在加班么？", "，");
        // log("天气预告==>" + weatherDesc)

        // 相对湿度
        const humidity =
            Math.floor(weatherJsonData.result.realtime.humidity * 100) + "%";
        weatherInfo.humidity = humidity;

        // 舒适指数
        const comfort = weatherJsonData.result.realtime.life_index.comfort.desc;
        weatherInfo.comfort = comfort;
        // log(`舒适指数：${comfort}`)

        // 紫外线指数
        const ultraviolet =
            weatherJsonData.result.realtime.life_index.ultraviolet.desc;
        weatherInfo.ultraviolet = ultraviolet;

        // 空气质量
        const aqi = weatherJsonData.result.realtime.air_quality.aqi.chn;
        const aqiInfo = airQuality(aqi);
        weatherInfo.aqiInfo = aqiInfo;
        weatherInfo.aqiValue = aqi;
        // 日出日落
        const astro = weatherJsonData.result.daily.astro[0];
        // 日出
        const sunrise = astro.sunrise.time;
        // 日落
        const sunset = astro.sunset.time;
        weatherInfo.sunrise = sunrise.toString();
        weatherInfo.sunset = sunset.toString();

        // 小时预告
        let hourlyArr = [];
        const hourlyData = weatherJsonData.result.hourly;
        const temperatureArr = hourlyData.temperature;
        const temperatureSkyconArr = hourlyData.skycon;
        for (var i = 0; i < temperatureArr.length; i++) {
            let hourlyObj = {};
            hourlyObj.datetime = temperatureArr[i].datetime;
            hourlyObj.temperature = Math.round(temperatureArr[i].value);

            let weather = temperatureSkyconArr[i].value;
            if (nightCloudy) {
                weather = "CLOUDY_NIGHT";
            }
            hourlyObj.skycon = `${weather}`;
            hourlyArr.push(hourlyObj);
        }
        //         weatherInfo.hourly = hourlyArr
        console.log("=== weatherInfo ===");
        console.log(weatherInfo);
    } else {
        log(`请求彩云天气出错：${weatherJsonData}`);
        console.log(weatherJsonData)
        //     getWeather()
    }
    return weatherInfo;
}

/**
 * 获取手机定位信息
 * @param {string} locale 地区
 * @return 定位信息
 */
async function getLocation(locale = "zh_cn") {
    console.log("");

    console.log(`----------------------------------------`);
    console.log(`开始定位`);
    // 定位信息
    let locationData = {
        latitude: undefined,
        longitude: undefined,
        locality: undefined,
        subLocality: undefined,
    };

    // 缓存key
    const cacheKey = "lsp-location-cache";

    // 判断是否需要刷新
    const lastCacheTime = getCacheModificationDate(cacheKey);
    const timeInterval = Math.floor((getCurrentTimeStamp() - lastCacheTime) / 60);
    // 缓存数据
    const locationCache = loadStringCache(cacheKey);
    console.log(
        `定位缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${_config.refreshInterval}分钟，cache=${locationCache.length}`
    );

    if (
        timeInterval <= _config.refreshInterval &&
        locationCache != null &&
        locationCache.length > 0
    ) {
        // 读取缓存数据
        console.log(`读取定位缓存数据：${locationCache}`);
        locationData = JSON.parse(locationCache);
    } else {
        try {
            const location = await Location.current();
            const geocode = await Location.reverseGeocode(
                location.latitude,
                location.longitude,
                locale
            );
            locationData.latitude = location.latitude;
            locationData.longitude = location.longitude;
            const geo = geocode[0];
            // 市
            if (locationData.locality == undefined) {
                locationData.locality = geo.locality;
            }
            // 区
            if (locationData.subLocality == undefined) {
                locationData.subLocality = geo.subLocality;
            }
            // 街道
            locationData.street = geo.thoroughfare;

            // 缓存数据
            saveStringCache(cacheKey, JSON.stringify(locationData));

            console.log(
                `定位信息：latitude=${location.latitude}，longitude=${location.longitude}，locality=${locationData.locality}，subLocality=${locationData.subLocality}，street=${locationData.street}`
            );
        } catch (e) {
            console.log(`定位出错了，${e.toString()}`);
            // 读取缓存数据
            const locationCache = loadStringCache(cacheKey);
            console.log(`读取定位缓存数据：${locationCache}`);
            locationData = JSON.parse(locationCache);
        }
    }

    console.log(`----------------------------------------`);
    return locationData;
}

/**
 * 保存图片到本地
 * @param {string} cacheKey 缓存key
 * @param {Image} img 缓存图片
 */
function saveImgCache(cacheKey, img) {
    const cacheFile = fmLocal.joinPath(
        FileManager.local().documentsDirectory(),
        cacheKey
    );
    fmLocal.writeImage(cacheFile, img);
}

/**
 * 获取本地缓存图片
 * @param {string} cacheKey 缓存key
 * @return {Image} 本地图片缓存
 */
function loadImgCache(cacheKey) {
    const cacheFile = fmLocal.joinPath(
        FileManager.local().documentsDirectory(),
        cacheKey
    );
    const fileExists = fmLocal.fileExists(cacheFile);
    let img = undefined;
    if (fileExists) {
        img = fmLocal.readImage(cacheFile);
    }
    return img;
}

/**
 * 保存字符串到本地
 * @param {string} cacheKey 缓存key
 * @param {string} content 缓存内容
 */
function saveStringCache(cacheKey, content) {
    const cacheFile = fmLocal.joinPath(
        FileManager.local().documentsDirectory(),
        cacheKey
    );
    fmLocal.writeString(cacheFile, content);
}

/**
 * 获取本地缓存字符串
 * @param {string} cacheKey 缓存key
 * @return {string} 本地字符串缓存
 */
function loadStringCache(cacheKey) {
    const cacheFile = fmLocal.joinPath(
        FileManager.local().documentsDirectory(),
        cacheKey
    );
    const fileExists = fmLocal.fileExists(cacheFile);
    let cacheString = "";
    if (fileExists) {
        cacheString = fmLocal.readString(cacheFile);
    }
    return cacheString;
}

/**
 * 获取缓存文件的上次修改时间
 * @param {string} cacheKey 缓存key
 * @return 返回上次缓存文件修改的时间戳(单位：秒)
 */
function getCacheModificationDate(cacheKey) {
    const cacheFile = fmLocal.joinPath(
        FileManager.local().documentsDirectory(),
        cacheKey
    );
    const fileExists = fmLocal.fileExists(cacheFile);
    if (fileExists) {
        return fmLocal.modificationDate(cacheFile).getTime() / 1000;
    } else {
        return 0;
    }
}

/**
 * 获取当前时间戳(单位：秒)
 */
function getCurrentTimeStamp() {
    return new Date().getTime() / 1000;
}

/**
 * Http Get 请求接口
 * @param {string} url 请求的url
 * @param {bool} json 返回数据是否为json，默认true
 * @param {Obj} headers 请求头
 * @param {string} pointCacheKey 指定缓存key
 * @param {bool} logable 是否打印数据，默认false
 * @return {string | json | null}
 */
async function httpGet(
    url,
    json = true,
    headers,
    pointCacheKey,
    logable = false,
    forceRefresh = false
) {
    console.log("");
    console.log(`----------------------------------------`);

    // 根据URL进行md5生成cacheKey
    let cacheKey = pointCacheKey;
    if (cacheKey == undefined || cacheKey == null || cacheKey.length == 0) {
        cacheKey = md5(url);
    }
    // 读取本地缓存
    const localCache = loadStringCache(cacheKey);

    // 判断是否需要刷新
    const lastCacheTime = getCacheModificationDate(cacheKey);
    const timeInterval = Math.floor((getCurrentTimeStamp() - lastCacheTime) / 60);
    // 过时且有本地缓存则直接返回本地缓存数据
    console.log(
        `httpGet缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${_config.refreshInterval}分钟，cache=${localCache.length}`
    );
    if (
        timeInterval <= _config.refreshInterval &&
        localCache != null &&
        localCache.length > 0
        && !forceRefresh
    ) {
        console.log(`httpGet读取缓存数据：==> ${url}`);
        // 是否打印响应数据
        if (logable) {
            console.log(``);
            console.log(`httpGet请求响应数据：${localCache}`);
            console.log(``);
        }
        console.log(`----------------------------------------`);
        return json ? JSON.parse(localCache) : localCache;
    }

    let data = null;
    try {
        console.log(`httpGet在线请求数据：==> ${url}`);
        let req = new Request(url);
        req.method = "GET";
        if (headers != null && headers != undefined) {
            req.headers = headers;
        }
        data = await (json ? req.loadJSON() : req.loadString());
    } catch (e) {
        console.error(`httpGet请求失败：${e}：==> ${url}`);
    }

    // 判断数据是否为空（加载失败）
    if (!data && localCache != null && localCache.length > 0) {
        console.log(`空数据`);
        console.log(`httpGet读取缓存数据：==> ${url}`);
        console.log(``);
        console.log(`----------------------------------------`);
        return json ? JSON.parse(localCache) : localCache;
    }

    // 存储缓存
    saveStringCache(cacheKey, json ? JSON.stringify(data) : data);

    // 是否打印响应数据
    if (logable) {
        console.log(``);
        console.log(`httpGet请求响应数据：${JSON.stringify(data)}`);
        console.log(``);
    }
    console.log(`----------------------------------------`);

    return data;
}

/**
    * Http POST 请求接口
    * @param {string} url 请求的url
    * @param {Array} parameterKV 请求参数键值对数组
    * @param {bool} json 返回数据是否为json，默认true
    * @param {Obj} headers 请求头
    * @param {string} pointCacheKey 指定缓存key
    * @param {bool} logable 是否打印数据，默认false
    * @return {string | json | null}
    */
async function httpPost(url, parameterKV, json = true, headers, pointCacheKey, logable = true) {
    // 根据URL进行md5生成cacheKey
    let cacheKey = pointCacheKey
    if (cacheKey == undefined || cacheKey == null || cacheKey.length == 0) {
        cacheKey = md5(url)
    }
    // 读取本地缓存
    const localCache = loadStringCache(cacheKey)
    // 判断是否需要刷新
    const lastCacheTime = getCacheModificationDate(cacheKey)
    const timeInterval = Math.floor((getCurrentTimeStamp() - lastCacheTime) / 60)
    const canLoadCache = localCache != null && localCache.length > 0;
    // console.log(`⏰已缓存：${timeInterval}min, 缓存时间：${getDateStr(new Date(lastCacheTime * 1000), 'HH:mm')}, 刷新：${refreshInterval}min`);
    // 过时且有本地缓存则直接返回本地缓存数据
    if (timeInterval <= _config.refreshInterval && canLoadCache) {
        console.log(`🤖Post读取缓存： ${url}`)
        // 是否打印响应数据
        if (logable) {
            console.log(`🤖Post请求响应：${localCache}`)
        }
        console.log(`----------------------------------------`)
        return json ? JSON.parse(localCache) : localCache
    }

    let data = null
    try {
        console.log(`🚀Post在线请求：${url}`)
        let req = new Request(url)
        req.method = 'POST'
        if (headers != null && headers != undefined) {
            req.headers = headers
        }
        for (const parameter of parameterKV) {
            req.addParameterToMultipart(Object.keys(parameter)[0], Object.values(parameter)[0])
        }
        data = await (json ? req.loadJSON() : req.loadString())
    } catch (e) {
        console.error(`🚫Post请求失败：${e}： ${url}`)
    }

    // 判断数据是否为空（加载失败）
    if (!data && canLoadCache) {
        console.log(`🤖Post读取缓存： ${url}`)
        console.log(`----------------------------------------`)
        return json ? JSON.parse(localCache) : localCache
    }
    // 存储缓存
    saveStringCache(cacheKey, json ? JSON.stringify(data) : data)
    // 是否打印响应数据
    if (logable) {
        console.log(`🤖Post请求响应：${JSON.stringify(data)}`)
    }
    console.log(`----------------------------------------`)
    return data
}

async function getImageByUrl(url, pointCacheKey = md5(url), useCache = true) {
    console.log("");
    console.log(`----------------------------------------`);

    // 根据URL进行md5生成cacheKey
    let cacheKey = pointCacheKey;
    let isPointCacheKey = true;
    if (cacheKey == undefined || cacheKey == null || cacheKey.length == 0) {
        isPointCacheKey = false;
        cacheKey = md5(url);
    }

    // 缓存数据
    if (useCache) {
        const cacheImg = loadImgCache(cacheKey);
        if (cacheImg != undefined && cacheImg != null) {
            console.log(`图片是否指定了缓存key：${isPointCacheKey}`);
            if (isPointCacheKey) {
                // 判断是否需要刷新
                const lastCacheTime = getCacheModificationDate(cacheKey);
                const timeInterval = Math.floor(
                    (getCurrentTimeStamp() - lastCacheTime) / 60
                );
                console.log(
                    `图片缓存判断，上次缓存时间=${timeInterval}分钟前，缓存过期时间=${_config.imgRefreshInterval}分钟`
                );
                // 是否使用缓存
                if (timeInterval <= _config.imgRefreshInterval) {
                    console.log(`使用缓存图片：${url}`);
                    console.log(`----------------------------------------`);
                    return cacheImg;
                }
            } else {
                console.log(`使用缓存图片：${url}`);
                console.log(`----------------------------------------`);
                return cacheImg;
            }
        }
    }

    // 在线
    try {
        console.log(`在线请求图片：${url}`);
        console.log(`----------------------------------------`);
        const req = new Request(url);
        const img = await req.loadImage();
        // 存储到缓存
        saveImgCache(cacheKey, img);
        return img;
    } catch (e) {
        console.error(`图片加载失败：${e}`);
        // 判断本地是否有缓存，有的话直接返回缓存
        let cacheImg = loadImgCache(cacheKey);
        if (cacheImg != undefined) {
            console.log(`使用缓存图片：${url}`);
            console.log(`----------------------------------------`);
            return cacheImg;
        }
        // 没有缓存+失败情况下，返回灰色背景
        console.log(`返回默认图片：${url}`);
        console.log(`----------------------------------------`);
        let ctx = new DrawContext();
        ctx.size = new Size(80, 80);
        ctx.setFillColor(Color.darkGray());
        ctx.fillRect(new Rect(0, 0, 80, 80));
        return await ctx.getImage();
    }
}

function airQuality(levelNum) {
    // 0-50 优，51-100 良，101-150 轻度污染，151-200 中度污染
    // 201-300 重度污染，>300 严重污染
    if (levelNum >= 0 && levelNum <= 50) {
        return "优秀";
    } else if (levelNum >= 51 && levelNum <= 100) {
        return "良好";
    } else if (levelNum >= 101 && levelNum <= 150) {
        return "轻度";
    } else if (levelNum >= 151 && levelNum <= 200) {
        return "中度";
    } else if (levelNum >= 201 && levelNum <= 300) {
        return "重度";
    } else {
        return "严重";
    }
}

function md5(str) {
    function d(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
    }

    function f(n, t, r, e, o, u) {
        return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r);
        var c, f;
    }

    function l(n, t, r, e, o, u, c) {
        return f((t & r) | (~t & e), n, t, o, u, c);
    }

    function v(n, t, r, e, o, u, c) {
        return f((t & e) | (r & ~e), n, t, o, u, c);
    }

    function g(n, t, r, e, o, u, c) {
        return f(t ^ r ^ e, n, t, o, u, c);
    }

    function m(n, t, r, e, o, u, c) {
        return f(r ^ (t | ~e), n, t, o, u, c);
    }

    function i(n, t) {
        var r, e, o, u;
        (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
        for (
            var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0;
            h < n.length;
            h += 16
        )
            (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
                (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
                (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
                (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
                (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
                (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
                (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
                (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
                (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
                (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
                (i = l(i, a, c, f, n[h + 10], 17, -42063)),
                (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
                (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
                (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
                (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
                (c = v(
                    c,
                    (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
                    i,
                    a,
                    n[h + 1],
                    5,
                    -165796510
                )),
                (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
                (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
                (f = v(f, i, a, c, n[h], 20, -373897302)),
                (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
                (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
                (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
                (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
                (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
                (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
                (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
                (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
                (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
                (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
                (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
                (c = g(
                    c,
                    (f = v(f, i, a, c, n[h + 12], 20, -1926607734)),
                    i,
                    a,
                    n[h + 5],
                    4,
                    -378558
                )),
                (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
                (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
                (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
                (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
                (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
                (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
                (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
                (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
                (a = g(a, c, f, i, n[h], 11, -358537222)),
                (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
                (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
                (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
                (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
                (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
                (c = m(
                    c,
                    (f = g(f, i, a, c, n[h + 2], 23, -995338651)),
                    i,
                    a,
                    n[h],
                    6,
                    -198630844
                )),
                (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
                (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
                (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
                (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
                (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
                (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
                (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
                (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
                (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
                (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
                (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
                (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
                (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
                (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
                (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
                (c = d(c, r)),
                (f = d(f, e)),
                (i = d(i, o)),
                (a = d(a, u));
        return [c, f, i, a];
    }

    function a(n) {
        for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8)
            t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255);
        return t;
    }

    function h(n) {
        var t = [];
        for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1) t[e] = 0;
        for (var r = 8 * n.length, e = 0; e < r; e += 8)
            t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
        return t;
    }

    function e(n) {
        for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1)
            (t = n.charCodeAt(o)), (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
        return e;
    }

    function r(n) {
        return unescape(encodeURIComponent(n));
    }

    function o(n) {
        return a(i(h((t = r(n))), 8 * t.length));
        var t;
    }

    function u(n, t) {
        return (function (n, t) {
            var r,
                e,
                o = h(n),
                u = [],
                c = [];
            for (
                u[15] = c[15] = void 0,
                16 < o.length && (o = i(o, 8 * n.length)),
                r = 0;
                r < 16;
                r += 1
            )
                (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
            return (
                (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
            );
        })(r(n), r(t));
    }

    function t(n, t, r) {
        return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n));
    }

    return t(str);
}

function getSFSymbol(name, size) {
    if (!name) {
        return SFSymbol.named("staroflife.circle").applyFont(Font.systemFont(8));
    }
    const sf = SFSymbol.named(name);
    if (sf != null) {
        if (size != undefined && size != null) {
            sf.applyFont(Font.systemFont(size));
        }
        return sf.image;
    } else {
        return SFSymbol.named("staroflife.circle").applyFont(Font.systemFont(size));
    }
}

async function getImage(url) {
    console.log(url);
    const request = new Request(url);
    console.log(request);
    const data = await request.loadImage();
    return data;
}


function animalEmoji(animalStr) {
    let emoji = "Default";
    switch (animalStr) {
        case "鼠":
            emoji = "Rat";
            break;
        case "牛":
            emoji = "Ox";
            break;
        case "虎":
            emoji = "Tiger";
            break;
        case "兔":
            emoji = "Rabbit";
            break;
        case "龙":
            emoji = "Dragon";
            break;
        case "蛇":
            emoji = "Snake";
            break;
        case "马":
            emoji = "Horse";
            break;
        case "羊":
            emoji = "Goat";
            break;
        case "猴":
            emoji = "Monkey";
            break;
        case "鸡":
            emoji = "Rooster";
            break;
        case "狗":
            emoji = "Dog";
            break;
        case "猪":
            emoji = "Pig";
            break;
        default:
            break;
    }
    return (
        _config.emojiUrl + emoji + "_W.png"
    );

}

function calendarFunc() {

    /**
     * @1900-2100区间内的公历、农历互转
     * @charset UTF-8
     * @Author  Jea杨(JJonline@JJonline.Cn)
     * @Time    2014-7-21
     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
     * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
     * @Version 1.0.3
     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
     */
    return {

        /**
         * 农历1900-2100的润大小信息表
         * @Array Of Property
         * @return Hex
         */
        lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
            0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
            0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
            /**Add By JJonline@JJonline.Cn**/
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
            0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
            0x0d520],//2100

        /**
         * 公历每个月份的天数普通表
         * @Array Of Property
         * @return Number
         */
        solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

        /**
         * 天干地支之天干速查表
         * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
         * @return Cn string
         */
        Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

        /**
         * 天干地支之地支速查表
         * @Array Of Property
         * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
         * @return Cn string
         */
        Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

        /**
         * 天干地支之地支速查表<=>生肖
         * @Array Of Property
         * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
         * @return Cn string
         */
        Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

        /**
         * 阳历节日
         */
        festival: {
            '1-1': { title: '元旦节' },
            '2-14': { title: '情人节' },
            '5-1': { title: '劳动节' },
            '5-4': { title: '青年节' },
            '6-1': { title: '儿童节' },
            '9-10': { title: '教师节' },
            '10-1': { title: '国庆节' },
            '12-25': { title: '圣诞节' },

            '3-8': { title: '妇女节' },
            '3-12': { title: '植树节' },
            '4-1': { title: '愚人节' },
            '5-12': { title: '护士节' },
            '7-1': { title: '建党节' },
            '8-1': { title: '建军节' },
            '12-24': { title: '平安夜' },
        },

        /**
         * 农历节日
         */
        lFestival: {
            '12-30': { title: '除夕' },
            '1-1': { title: '春节' },
            '1-15': { title: '元宵节' },
            '2-2': { title: '龙抬头' },
            '5-5': { title: '端午节' },
            '7-7': { title: '七夕节' },
            '7-15': { title: '中元节' },
            '8-15': { title: '中秋节' },
            '9-9': { title: '重阳节' },
            '10-1': { title: '寒衣节' },
            '10-15': { title: '下元节' },
            '12-8': { title: '腊八节' },
            '12-23': { title: '北方小年' },
            '12-24': { title: '南方小年' },
        },

        /**
         * 返回默认定义的阳历节日
         */
        getFestival() {
            return this.festival
        },

        /**
         * 返回默认定义的内容里节日
         */
        getLunarFestival() {
            return this.lFestival
        },

        /**
         *
         * @param param {Object} 按照festival的格式输入数据，设置阳历节日
         */
        setFestival(param = {}) {
            this.festival = param
        },

        /**
         *
         * @param param {Object} 按照lFestival的格式输入数据，设置农历节日
         */
        setLunarFestival(param = {}) {
            this.lFestival = param
        },

        /**
         * 24节气速查表
         * @Array Of Property
         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
         * @return Cn string
         */
        solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

        /**
         * 1900-2100各年的24节气日期速查表
         * @Array Of Property
         * @return 0x string For splice
         */
        sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
            '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
            'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
            '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
            '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
            '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
            '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
            '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
            '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
            '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
            '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
            '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

        /**
         * 数字转中文速查表
         * @Array Of Property
         * @trans ['日','一','二','三','四','五','六','七','八','九','十']
         * @return Cn string
         */
        nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

        /**
         * 日期转农历称呼速查表
         * @Array Of Property
         * @trans ['初','十','廿','卅']
         * @return Cn string
         */
        nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

        /**
         * 月份转农历称呼速查表
         * @Array Of Property
         * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
         * @return Cn string
         */
        nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

        /**
         * 返回农历y年一整年的总天数
         * @param y lunar Year
         * @return Number
         * @eg:var count = calendar.lYearDays(1987) ;//count=387
         */
        lYearDays: function (y) {
            let i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) {
                sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
            }
            return (sum + this.leapDays(y));
        },

        /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param y lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
        leapMonth: function (y) { //闰字编码 \u95f0
            return (this.lunarInfo[y - 1900] & 0xf);
        },

        /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param y lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
        leapDays: function (y) {
            if (this.leapMonth(y)) {
                return ((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
            }
            return (0);
        },

        /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param y lunar Year
         * @param m lunar Month
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
        monthDays: function (y, m) {
            if (m > 12 || m < 1) {
                return -1
            }//月份参数从1至12，参数错误返回-1
            return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },

        /**
         * 返回公历(!)y年m月的天数
         * @param y solar Year
         * @param m solar Month
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
        solarDays: function (y, m) {
            if (m > 12 || m < 1) {
                return -1
            } //若参数错误 返回-1
            const ms = m - 1;
            if (ms === 1) { //2月份的闰平规律测算后确认返回28或29
                return (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28);
            } else {
                return (this.solarMonth[ms]);
            }
        },

        /**
         * 农历年份转换为干支纪年
         * @param  lYear 农历年的年份数
         * @return Cn string
         */
        toGanZhiYear: function (lYear) {
            var ganKey = (lYear - 3) % 10;
            var zhiKey = (lYear - 3) % 12;
            if (ganKey === 0) ganKey = 10;//如果余数为0则为最后一个天干
            if (zhiKey === 0) zhiKey = 12;//如果余数为0则为最后一个地支
            return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];

        },

        /**
         * 公历月、日判断所属星座
         * @param  cMonth [description]
         * @param  cDay [description]
         * @return Cn string
         */
        toAstro: function (cMonth, cDay) {
            const s = "\u6469\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u6469\u7faf";
            const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
            return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";//座
        },

        /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
        toGanZhi: function (offset) {
            return this.Gan[offset % 10] + this.Zhi[offset % 12];
        },

        /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y y公历年(1900-2100)
         * @param n n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
        getTerm: function (y, n) {
            if (y < 1900 || y > 2100 || n < 1 || n > 24) {
                return -1;
            }
            const _table = this.sTermInfo[y - 1900];
            const _calcDay = []
            for (let index = 0; index < _table.length; index += 5) {
                const chunk = parseInt('0x' + _table.substr(index, 5)).toString()
                _calcDay.push(
                    chunk[0],
                    chunk.substr(1, 2),
                    chunk[3],
                    chunk.substr(4, 2)
                )
            }
            return parseInt(_calcDay[n - 1]);
        },

        /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param m lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
        toChinaMonth: function (m) { // 月 => \u6708
            if (m > 12 || m < 1) {
                return -1
            } //若参数错误 返回-1
            let s = this.nStr3[m - 1];
            s += "\u6708";//加上月字
            return s;
        },

        /**
         * 传入农历日期数字返回汉字表示法
         * @param d lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
        toChinaDay: function (d) { //日 => \u65e5
            let s;
            switch (d) {
                case 10:
                    s = '\u521d\u5341';
                    break;
                case 20:
                    s = '\u4e8c\u5341';
                    break;
                case 30:
                    s = '\u4e09\u5341';
                    break;
                default:
                    s = this.nStr2[Math.floor(d / 10)];
                    s += this.nStr1[d % 10];
            }
            return (s);
        },

        /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
        getAnimal: function (y) {
            return this.Animals[(y - 4) % 12]
        },

        /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * !important! 公历参数区间1900.1.31~2100.12.31
         * @param yPara  solar year
         * @param mPara  solar month
         * @param dPara  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
        solar2lunar: function (yPara, mPara, dPara) {
            let y = parseInt(yPara);
            let m = parseInt(mPara);
            let d = parseInt(dPara);
            //年份限定、上限
            if (y < 1900 || y > 2100) {
                return -1;// undefined转换为数字变为NaN
            }
            //公历传参最下限
            if (y === 1900 && m === 1 && d < 31) {
                return -1;
            }

            //未传参  获得当天
            let objDate;
            if (!y) {
                objDate = new Date();
            } else {
                objDate = new Date(y, parseInt(m) - 1, d);
            }
            let i, leap = 0, temp = 0;
            //修正ymd参数
            y = objDate.getFullYear();
            m = objDate.getMonth() + 1;
            d = objDate.getDate();
            let offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = this.lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }

            //是否今天
            let isTodayObj = new Date(),
                isToday = false;
            if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {
                isToday = true;
            }
            //星期几
            let nWeek = objDate.getDay(),
                cWeek = this.nStr1[nWeek];
            //数字表示周几顺应天朝周一开始的惯例
            if (nWeek === 0) {
                nWeek = 7;
            }
            //农历年
            const year = i;
            leap = this.leapMonth(i); //闰哪个月
            let isLeap = false;

            //效验闰月
            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leap > 0 && i === (leap + 1) && isLeap === false) {
                    --i;
                    isLeap = true;
                    temp = this.leapDays(year); //计算农历闰月天数
                } else {
                    temp = this.monthDays(year, i);//计算农历普通月天数
                }
                //解除闰月
                if (isLeap === true && i === (leap + 1)) {
                    isLeap = false;
                }
                offset -= temp;
            }
            // 闰月导致数组下标重叠取反
            if (offset === 0 && leap > 0 && i === leap + 1) {
                if (isLeap) {
                    isLeap = false;
                } else {
                    isLeap = true;
                    --i;
                }
            }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            //农历月
            const month = i;
            //农历日
            const day = offset + 1;
            //天干地支处理
            const sm = m - 1;
            const gzY = this.toGanZhiYear(year);

            // 当月的两个节气
            // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
            const firstNode = this.getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
            const secondNode = this.getTerm(y, (m * 2));//返回当月「节」为几日开始

            // 依据12节气修正干支月
            let gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
            if (d >= firstNode) {
                gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
            }

            //传入的日期的节气与否
            let isTerm = false;
            let Term = null;
            if (firstNode === d) {
                isTerm = true;
                Term = this.solarTerm[m * 2 - 2];
            }
            if (secondNode === d) {
                isTerm = true;
                Term = this.solarTerm[m * 2 - 1];
            }
            //日柱 当月一日与 1900/1/1 相差天数
            const dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
            const gzD = this.toGanZhi(dayCyclical + d - 1);
            //该日期所属的星座
            const astro = this.toAstro(m, d);

            const solarDate = y + '-' + m + '-' + d;
            const lunarDate = year + '-' + month + '-' + day;

            const festival = this.festival;
            const lFestival = this.lFestival;

            const festivalDate = m + '-' + d;
            let lunarFestivalDate = month + '-' + day;

            // bugfix https://github.com/jjonline/calendar.js/issues/29
            // 农历节日修正：农历12月小月则29号除夕，大月则30号除夕
            // 此处取巧修正：当前为农历12月29号时增加一次判断并且把lunarFestivalDate设置为12-30以正确取得除夕
            // 天朝农历节日遇闰月过前不过后的原则，此处取农历12月天数不考虑闰月
            // 农历润12月在本工具支持的200年区间内仅1574年出现
            if (month === 12 && day === 29 && this.monthDays(year, month) === 29) {
                lunarFestivalDate = '12-30';
            }
            return {
                date: solarDate,
                lunarDate: lunarDate,
                festival: festival[festivalDate] ? festival[festivalDate].title : null,
                lunarFestival: lFestival[lunarFestivalDate] ? lFestival[lunarFestivalDate].title : null,
                'lYear': year,
                'lMonth': month,
                'lDay': day,
                'Animal': this.getAnimal(year),
                'IMonthCn': (isLeap ? "\u95f0" : '') + this.toChinaMonth(month),
                'IDayCn': this.toChinaDay(day),
                'cYear': y,
                'cMonth': m,
                'cDay': d,
                'gzYear': gzY,
                'gzMonth': gzM,
                'gzDay': gzD,
                'isToday': isToday,
                'isLeap': isLeap,
                'nWeek': nWeek,
                'ncWeek': "\u661f\u671f" + cWeek,
                'isTerm': isTerm,
                'Term': Term,
                'astro': astro
            };
        },

        /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * !important! 参数区间1900.1.31~2100.12.1
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
        lunar2solar: function (y, m, d, isLeapMonth) {
            y = parseInt(y)
            m = parseInt(m)
            d = parseInt(d)
            isLeapMonth = !!isLeapMonth;
            const leapOffset = 0;
            const leapMonth = this.leapMonth(y);
            const leapDay = this.leapDays(y);
            if (isLeapMonth && (leapMonth !== m)) {
                return -1;
            }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
            if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
                return -1;
            }//超出了最大极限值
            const day = this.monthDays(y, m);
            let _day = day;
            //bugFix 2016-9-25
            //if month is leap, _day use leapDays method
            if (isLeapMonth) {
                _day = this.leapDays(y, m);
            }
            if (y < 1900 || y > 2100 || d > _day) {
                return -1;
            }//参数合法性效验

            //计算农历的时间差
            let offset = 0;
            let i;
            for (i = 1900; i < y; i++) {
                offset += this.lYearDays(i);
            }
            let leap = 0, isAdd = false;
            for (i = 1; i < m; i++) {
                leap = this.leapMonth(y);
                if (!isAdd) {//处理闰月
                    if (leap <= i && leap > 0) {
                        offset += this.leapDays(y);
                        isAdd = true;
                    }
                }
                offset += this.monthDays(y, i);
            }
            //转换闰月农历 需补充该年闰月的前一个月的时差
            if (isLeapMonth) {
                offset += day;
            }
            //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
            const strap = Date.UTC(1900, 1, 30, 0, 0, 0);
            const calObj = new Date((offset + d - 31) * 86400000 + strap);
            const cY = calObj.getUTCFullYear();
            const cM = calObj.getUTCMonth() + 1;
            const cD = calObj.getUTCDate();

            return this.solar2lunar(cY, cM, cD);
        }
    };
}

// **
//  * 图片高斯模糊
//  * @param {Image} img 
//  * @param {string} style light/dark
//  * @return {Image} 图片
//  */
async function blurImage(img, style, blur = blursize) {
    const js = `
   var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function stackBlurCanvasRGB(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=document.getElementById(id);var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e);}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(r_sum*mul_sum)>>shg_sum;pixels[yi+1]=(g_sum*mul_sum)>>shg_sum;pixels[yi+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(r_sum*mul_sum)>>shg_sum;pixels[p+1]=(g_sum*mul_sum)>>shg_sum;pixels[p+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}
         // https://gist.github.com/mjackson/5311256
       
         function rgbToHsl(r, g, b){
             r /= 255, g /= 255, b /= 255;
             var max = Math.max(r, g, b), min = Math.min(r, g, b);
             var h, s, l = (max + min) / 2;
       
             if(max == min){
                 h = s = 0; // achromatic
             }else{
                 var d = max - min;
                 s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                 switch(max){
                     case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                     case g: h = (b - r) / d + 2; break;
                     case b: h = (r - g) / d + 4; break;
                 }
                 h /= 6;
             }
       
             return [h, s, l];
         }
       
         function hslToRgb(h, s, l){
             var r, g, b;
       
             if(s == 0){
                 r = g = b = l; // achromatic
             }else{
                 var hue2rgb = function hue2rgb(p, q, t){
                     if(t < 0) t += 1;
                     if(t > 1) t -= 1;
                     if(t < 1/6) return p + (q - p) * 6 * t;
                     if(t < 1/2) return q;
                     if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                     return p;
                 }
       
                 var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                 var p = 2 * l - q;
                 r = hue2rgb(p, q, h + 1/3);
                 g = hue2rgb(p, q, h);
                 b = hue2rgb(p, q, h - 1/3);
             }
       
             return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
         }
         
         function lightBlur(hsl) {
         
           // Adjust the luminance.
           let lumCalc = 0.35 + (0.3 / hsl[2]);
           if (lumCalc < 1) { lumCalc = 1; }
           else if (lumCalc > 3.3) { lumCalc = 3.3; }
           const l = hsl[2] * lumCalc;
           
           // Adjust the saturation. 
           const colorful = 2 * hsl[1] * l;
           const s = hsl[1] * colorful * 1.5;
           
           return [hsl[0],s,l];
           
         }
         
         function darkBlur(hsl) {
       
           // Adjust the saturation. 
           const colorful = 2 * hsl[1] * hsl[2];
           const s = hsl[1] * (1 - hsl[2]) * 3;
           
           return [hsl[0],s,hsl[2]];
           
         }
       
         // Set up the canvas.
         const img = document.getElementById("blurImg");
         const canvas = document.getElementById("mainCanvas");
       
         const w = img.naturalWidth;
         const h = img.naturalHeight;
       
         canvas.style.width  = w + "px";
         canvas.style.height = h + "px";
         canvas.width = w;
         canvas.height = h;
       
         const context = canvas.getContext("2d");
         context.clearRect( 0, 0, w, h );
         context.drawImage( img, 0, 0 );
         
         // Get the image data from the context.
         var imageData = context.getImageData(0,0,w,h);
         var pix = imageData.data;
         
         var isDark = "${style}" == "dark";
         var imageFunc = isDark ? darkBlur : lightBlur;
       
         for (let i=0; i < pix.length; i+=4) {
       
           // Convert to HSL.
           let hsl = rgbToHsl(pix[i],pix[i+1],pix[i+2]);
           
           // Apply the image function.
           hsl = imageFunc(hsl);
         
           // Convert back to RGB.
           const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
         
           // Put the values back into the data.
           pix[i] = rgb[0];
           pix[i+1] = rgb[1];
           pix[i+2] = rgb[2];
       
         }
       
         // Draw over the old image.
         context.putImageData(imageData,0,0);
       
         // Blur the image.
         stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${blur});
         
         // Perform the additional processing for dark images.
         if (isDark) {
         
           // Draw the hard light box over it.
           context.globalCompositeOperation = "hard-light";
           context.fillStyle = "rgba(55,55,55,0.2)";
           context.fillRect(0, 0, w, h);
       
           // Draw the soft light box over it.
           context.globalCompositeOperation = "soft-light";
           context.fillStyle = "rgba(55,55,55,1)";
           context.fillRect(0, 0, w, h);
       
           // Draw the regular box over it.
           context.globalCompositeOperation = "source-over";
           context.fillStyle = "rgba(55,55,55,0.4)";
           context.fillRect(0, 0, w, h);
         
         // Otherwise process light images.
         } else {
           context.fillStyle = "rgba(255,255,255,0.4)";
           context.fillRect(0, 0, w, h);
         }
       
         // Return a base64 representation.
         canvas.toDataURL(); 
         `

    // Convert the images and create the HTML.
    let blurImgData = Data.fromPNG(img).toBase64String()
    let html = `
         <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
         <canvas id="mainCanvas" />
         `

    // Make the web view and get its return value.
    let view = new WebView()
    await view.loadHTML(html)
    let returnValue = await view.evaluateJavaScript(js)

    // Remove the data type from the string and convert to data.
    let imageDataString = returnValue.slice(22)
    let imageData = Data.fromBase64String(imageDataString)

    // Convert to image and crop before returning.
    let imageFromData = Image.fromData(imageData)
    // return cropImage(imageFromData)
    return imageFromData
}

async function shadowImage(img) {
    let ctx = new DrawContext()
    // 把画布的尺寸设置成图片的尺寸
    ctx.size = img.size
    // 把图片绘制到画布中
    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
    // 设置绘制的图层颜色，为半透明的黑色
    ctx.setFillColor(new Color('#000000', 0.5))
    // 绘制图层
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))

    // 导出最终图片
    return await ctx.getImage()
}
