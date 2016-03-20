/**
 * Created by a1 on 06/01/16.
 */

/**********************************
 *
 * Main Engine
 *
 **********************************/
var language = 'en-us';
window.onload = function(){
	/*
	 * Create chart tabs
	 */
	var tabsContainer = document.getElementsByClassName("nav-tabs")[0];
	var tabs = tabsContainer.getElementsByTagName("li");
	for (var i=0;i<tabs.length;i++){
		tabs[i].addEventListener("click", function (){
			for (var i=0;i<tabs.length;i++)
				tabs[i].removeAttribute("class");
			this.className = "active";
			var containers = document.getElementsByClassName("containers");
			for (var counter=0;counter<containers.length;counter++){
				containers[counter].style.display = "none";
			}
			document.getElementById(this.getAttribute("container")).style.display = "block";
		});
	}

	var formatsContainer = document.getElementById("formatter");
	var formatsHolder = document.createElement("ul");
	formatsHolder.className = "menu";
	formatsContainer.appendChild(formatsHolder);

	getFormatters("en-us").forEach(function(formatter){
		formatsHolder.appendChild(
			createListItem(
				"<a>"+formatter+"</a>",
				function(){
					chartFrame("en-us", formatter, "src/locale/english-(united-states).js");
				}
			)
		);
	});
	chartFrame ("en-us", anychart.format.locales["en-us"].dateTimeLocale.timeFormats[0], "src/locale/english-(united-states).js");

	/**
	 * Create list of langs
	 */

	var langsContainer = document.getElementById("langs");
	var listHolder = document.createElement("ul");
	listHolder.className = "menu";
	langsContainer.appendChild(listHolder);
	var keys = [];
	for (var key in anychart.format.locales)
		keys.push(key);
	keys.forEach(function(current, index){
		listHolder.appendChild(createListItem(
			"<a>"+anychart.format.locales[current].engName + " - " + anychart.format.locales[current].nativeName+"</a>",
			function(){
				var items = listHolder.getElementsByTagName("li");
				for (var i=0;i<items.length;i++)
					items[i].getElementsByTagName("a")[0].removeAttribute("class");
				this.getElementsByTagName("a")[0].className = "active";

				formatsHolder.innerHTML = "";

				getFormatters(current).forEach(function(formatter){
					formatsHolder.appendChild(createListItem("<a>"+formatter+"</a>",
							function(){
								var items = formatsHolder.getElementsByTagName("li");
								for(var i=0;i<items.length;i++)
									items[i].getElementsByTagName("a")[0].removeAttribute("class");
								this.getElementsByTagName("a")[0].className = "active";
								console.log(keys[index]);
								chartFrame(current, formatter, document.getElementsByClassName("language")[index].getAttribute("src"));
							})
					);
				});

				chartFrame(current, anychart.format.locales[current].dateTimeLocale.timeFormats[0], document.getElementsByClassName("language")[index].getAttribute("src"));

			})
		);
	});
};

/**
 * Return all formatters
 */

function getFormatters (lang){
	var variants = [];
	var formatters = anychart.format.locales[lang].dateTimeLocale.dateTimeFormats;
	var timeFormatters = anychart.format.locales[lang].dateTimeLocale.timeFormats;
	var dateFormatters = anychart.format.locales[lang].dateTimeLocale.dateFormats;
	// add time only
	for (var timeCounter = 0;timeCounter<timeFormatters.length; timeCounter++)
		variants.push(timeFormatters[timeCounter]);

	// add date only
	for (var dateCounter = 0; dateCounter<dateFormatters.length; dateCounter++)
		variants.push(dateFormatters[dateCounter]);

	// Consider albanian-(albania).js
	formatters.forEach(function(format){
		timeFormatters.forEach(function(time){
			dateFormatters.forEach(function(date){
				variants.push(format.replace("{0}", time).replace("{1}", date));
			});
		});
	});
	return variants;
}


/****************************************************
 * create a simple "li" tag and set custom innerHTML
 ***************************************************/
function createListItem(inner, action){
	var item = document.createElement("li");
	item.innerHTML = inner;
	item.addEventListener("click", action);
	return item;
}

/**********************************
 *
 * Chart Engine
 *
 **********************************/

function chartFrame (language, formatter, src) {
	console.log(formatter);
	var format = formatter.replace(/\//,"\\/");
	frameSetter(document.getElementById("project"), "src/js/draw_project.js");
	frameSetter(document.getElementById("resource"), "src/js/draw_resource.js");
	function frameSetter (container, js){
		var frame = document.createElement('iframe');
		frame.className = "chartFrame";
		frame.setAttribute("src", "./src/frame.html");
		container.innerHTML = "";
		frame.onload = function (){
			var frameDoc = frame.contentDocument || frame.contentWindow.document;
			var lang = frameDoc.createElement("script");
			lang.innerHTML = 'var language = "'+language+'";\nvar formatter = "'+format+'"';
			frameDoc.head.appendChild(lang);
			var langFile = frameDoc.createElement("script");
			langFile.setAttribute("src", "../"+src);
			frameDoc.head.appendChild(langFile);
			var script = frameDoc.createElement("script");
			script.setAttribute("src", "../"+js);
			frameDoc.head.appendChild(script);
		};
		container.appendChild(frame);
		return frame;
	}
}
