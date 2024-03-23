function param() {
	var queryParams = {};
	var queryString = window.location.search.substring(1);
	var params = queryString.split("&");
	for (var i = 0; i < params.length; i++) {
		var pair = params[i].split("=");
		var key = decodeURIComponent(pair[0]);
		var value = decodeURIComponent(pair[1]);
		queryParams[key] = value;
	}
	return queryParams;
}
var param = param();
String.prototype.en2bnN = function() {
	var convertToBanglaDigit = {
		'1': '১',
		'2': '২',
		'3': '৩',
		'4': '৪',
		'5': '৫',
		'6': '৬',
		'7': '৭',
		'8': '৮',
		'9': '৯',
		'0': '০'
	};
	return this.replace(/\d/g, function(match) {
		return convertToBanglaDigit[match];
	});
};

function bnDate(now) {
	function isLeapYear(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	function dateDiffInDays(a, b) {
		var MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
		var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
		return Math.floor((utc2 - utc1) / MILLISECONDS_PER_DAY);
	}
	now = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 6));
	var gregDate = now.getDate(),
		gregMonth = now.getMonth(),
		gregYear = now.getFullYear(),
		gregDay = now.getDay(),
		hour = now.getHours();
	var tmm = 'অজানা';
	if (hour >= 4 && hour < 6) {
		tmm = 'ভোর';
	} else if (hour >= 6 && hour < 11) {
		tmm = 'সকাল';
	} else if (hour >= 11 && hour < 13) {
		tmm = 'বেলা';
	} else if (hour >= 13 && hour < 16) {
		tmm = 'দুপুর';
	} else if (hour >= 16 && hour < 18) {
		tmm = 'বিকাল';
	} else if (hour >= 18 && hour < 20) {
		tmm = 'সন্ধ্যা';
	} else if ((hour >= 20 && hour < 24) || (hour >= 0 && hour < 3)) {
		tmm = 'রাত';
	} else if (hour >= 3 && hour < 4) {
		tmm = 'মধ্যরাত';
	} else {
		tmm = 'অজানা';
	}
	var banglaMonths = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
	var weekDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
	var banglaSeasons = ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'];
	var totalMonthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
	if (isLeapYear(gregYear)) {
		totalMonthDays[10] = 31;
	}
	if (gregMonth < 3 || (gregMonth === 3 && gregDate < 14)) {
		gregYear = gregYear - 1;
	}
	var epoch = new Date(gregYear + '-04-14');
	var banglaYear = gregYear - 593;
	var dayRemaining = dateDiffInDays(epoch, now);
	var banglaMonthIndex = 0;
	for (var i = 0; i < banglaMonths.length; i++) {
		if (dayRemaining <= totalMonthDays[i]) {
			banglaMonthIndex = i;
			break;
		}
		dayRemaining -= totalMonthDays[i];
	}
	var banglaMonth = banglaMonthIndex + 1;
	var banglaDate = dayRemaining;
	var banglaSeason = banglaSeasons[Math.floor(banglaMonthIndex / 2)];
	return {
		year: String(banglaYear).en2bnN(),
		date: String(banglaDate).en2bnN(),
		monthN: String(banglaMonth).en2bnN(),
		month: banglaMonths[banglaMonthIndex],
		day: weekDays[gregDay],
		season: banglaSeason,
		ampm: tmm
	};
}

function enDate(now) {
	var day = {
		day: 'numeric'
	};
	var month = {
		month: 'long'
	};
	var monthN = {
		month: 'numeric'
	};
	var year = {
		year: 'numeric'
	};

	function makeDT(opt, dat) {
		var formatter = new Intl.DateTimeFormat('bn-BD', opt);
		return formatter.format(dat);
	}
	return {
		year: makeDT({
			year: 'numeric'
		}, now),
		date: makeDT({
			day: 'numeric'
		}, now),
		monthN: makeDT({
			month: 'numeric'
		}, now),
		month: makeDT({
			month: 'long'
		}, now)
	};
}

function rbDate(now) {
	now = (now - (24 * 60 * 60 * 1000));
	var day = {
		day: 'numeric'
	};
	var month = {
		month: 'long'
	};
	var monthN = {
		month: 'numeric'
	};
	var year = {
		year: 'numeric'
	};

	function makeDT(opt, dat) {
		var formatter = new Intl.DateTimeFormat('bn-TN-u-ca-islamic', opt);
		return formatter.format(dat);
	}
	return {
		year: makeDT({
			year: 'numeric'
		}, now).replace(/ যুগ/g, ""),
		date: makeDT({
			day: 'numeric'
		}, now),
		monthN: makeDT({
			month: 'numeric'
		}, now),
		month: makeDT({
			month: 'long'
		}, now)
	};
}
async function sunTm(area, now) {
	area = area.split(',');
	now = now.toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric'
	});
	var url = "https://api.sunrise-sunset.org/json?lat=" + area[0] + "&lng=" + area[1] + "&date=" + now + "&tzid=Asia%2FDhaka";
	try {
		const response = await fetch(url);
		const json = await response.json();
		const si = json.results.astronomical_twilight_begin;
		const ir = json.results.sunset;
		const sahari = si.replace(' AM', '');
		const ifter = ir.replace(' PM', '');
		return {
			sahari: String(sahari).en2bnN(),
			ifter: String(ifter).en2bnN()
		};
	} catch (error) {
		console.error("Error fetching sunrise and sunset data:", error);
		return {
			sahari: "N/A",
			ifter: "N/A"
		};
	}
}
async function weather(ltlg, now) {
	const weatherURL = 'https://weather.com/bn-BD/weather/today/l/' + ltlg + '?unit=m';
	try {
		const response = await fetch(weatherURL);
		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const lo = doc.querySelector('.CurrentConditions--location--1YWj_').textContent.trim();
		const tm = doc.querySelector('[data-testid="TemperatureValue"]').textContent.trim() + " সে:";
		const st = doc.querySelector('[data-testid="wxPhrase"]').textContent.trim();
		const vu = doc.querySelector('[data-testid="VisibilityValue"]').textContent.trim();
		const sr = doc.querySelector('[data-testid="SunriseValue"]').textContent.trim().replace('Sun Rise', '');
		const ss = doc.querySelector('[data-testid="SunsetValue"]').textContent.trim().replace('Sunset', '');
		const wi = doc.querySelector('[data-testid="Wind"]').textContent.trim().replace('Wind Direction', '');
		const hi = doc.querySelector('[data-testid="PercentageValue"]').textContent.trim();
		const ps = doc.querySelector('[data-testid="PressureValue"]').textContent.trim().replace('Arrow Up', '').replace('Arrow Down', '');
		const uv = doc.querySelector('[data-testid="UVIndexValue"]').textContent.trim();
		return {
			lo: lo,
			tm: String(tm).en2bnN(),
			st: String(st).en2bnN(),
			vu: String(vu).en2bnN(),
			sr: String(sr).en2bnN(),
			ss: String(ss).en2bnN(),
			wi: String(wi).en2bnN(),
			hi: String(hi).en2bnN(),
			ps: String(ps).en2bnN(),
			uv: String(uv).en2bnN()
		};
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return {
			lo: 'N/A',
			tm: 'N/A',
			st: 'N/A',
			vu: 'N/A',
			sr: 'N/A',
			ss: 'N/A',
			wi: 'N/A',
			hi: 'N/A',
			ps: 'N/A',
			uv: 'N/A'
		};
	}
}

function additional(now, timeZone) {
	const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	const firstWeekDay = firstDayOfMonth.getDay();
	const remainingDays = lastDayOfMonth.getDate() - (8 - firstWeekDay);
	const week = Math.ceil(remainingDays / 7);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var last = new Date(year, month, 0).getDate();
	var isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
	var leapyear = isLeapYear ? "হ্যাঁ" : "না";
	return {
		week: String(week).en2bnN(),
		last: String(last).en2bnN(),
		leapyear: leapyear
	};
}
async function getAll() {
	const startTime = performance.now();
	var now = new Date();
	var timeZone = 'Asia/Dhaka';
	var optionsTM = {
		timeZone: timeZone,
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	};
	var timeFormatter = new Intl.DateTimeFormat('en-US', optionsTM);
	var time = timeFormatter.format(now);
	time = time.replace(/\s[AaPp][Mm]\s*/, '');
	time = String(time).en2bnN();
	var bnDT = bnDate(now);
	var rbDt = rbDate(now);
	var enDt = enDate(now);
	var latitude = param["latitude"];
	var longitude = param["longitude"];
	if (!latitude || !longitude) {
		latitude = "24.50";
		longitude = "88.95";
	}
	var lat_lon = latitude + "," + longitude;
	var snTM = await sunTm(lat_lon, now);
	var weat = await weather(lat_lon, now);
	var adi = additional(now, timeZone);
	var timeString1 = snTM.ifter;
	var sunset = timeString1.substring(0, timeString1.lastIndexOf(":"));
	var timeString2 = weat.sr;
	var sunrise = timeString2.substring(1);
	const endTime = performance.now();
	const responseTime = endTime - startTime;
	let response;
	if (responseTime < 1000) {
		response = responseTime.toFixed(2) + " ms";
	} else {
		response = (responseTime / 1000).toFixed(2) + " sec";
	}
	var dateObject = {
		"status": 200,
		"bangla": {
			"day": bnDT.date,
			"month": bnDT.month,
			"month_n": bnDT.monthN,
			"year": bnDT.year
		},
		"english": {
			"day": enDt.date,
			"month": enDt.month,
			"month_n": enDt.monthN,
			"year": enDt.year
		},
		"arabic": {
			"day": rbDt.date,
			"month": rbDt.month,
			"month_n": rbDt.monthN,
			"year": rbDt.year
		},
		"additional": {
			"time": time,
			"day": bnDT.day,
			"ampm": bnDT.ampm,
			"week": adi.week,
			"month_length": adi.last,
			"leapyear": adi.leapyear,
			"season": bnDT.season
		},
		"ramadan": {
			"sahari": snTM.sahari,
			"ifter": snTM.ifter
		},
		"weather": {
			"temperature": weat.tm,
			"status": weat.st,
			"visibility": weat.vu,
			"sunrise": sunrise,
			"sunset": sunset,
			"wind": weat.wi,
			"humidity": weat.hi,
			"pressure": weat.ps,
			"uvindex": weat.uv
		},
		"debug": {
			"status": 200,
			"response": response,
			"latitude": latitude,
			"longitude": longitude,
			"location": weat.lo
		},
		"about": {
			"name": "sonarbangla",
			"version": "1.0",
			"description": "Date Time in Bangla",
			"homepage": "https://github.com/sakibweb/sonarbangla",
			"author": "Sakibur Rahman",
			"author_homepage": "https://github.com/sakibweb"
		}
	};
	var sonarbangla = JSON.stringify(dateObject);
	document.getElementById("sonarbangla").textContent = sonarbangla;
	console.log(sonarbangla);
	return sonarbangla;
}
getAll();
