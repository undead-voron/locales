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
		var li = createListItem("<a>"+formatter+"</a>");
		li.addEventListener("click", function(){
			chartFrame("en-us", formatter, "src/locale/english-(united-states).js");
		});
		formatsHolder.appendChild(li);
	});
	chartFrame ("en-us", anychart.format.locales["en-us"].dateTimeLocale.timeFormats[0], "src/locale/english-(united-states).js");
	/*
	 * Create chart in iFrame
	 */

	/**
	 * Create list of langs
	 */

	var langsContainer = document.getElementById("langs");
	var listHolder = document.createElement("ul");
	listHolder.className = "menu";
	langsContainer.appendChild(listHolder);
	var locals = [];
	var keys = [];
	for (var key in anychart.format.locales) {
		keys.push(key);
		var lang = createListItem(
			"<a>"+anychart.format.locales[key].engName + " - " + anychart.format.locales[key].nativeName+"</a>"
		);
		listHolder.appendChild(lang);
		locals.push(lang);
	}
	//keys.shift();
	//listHolder.children.shift();
	for (var ii=0;ii<locals.length;ii++){
		(function(index){
			locals[ii].onclick = function(){
				for (var i=0;i<locals.length;i++)
					locals[i].getElementsByTagName("a")[0].removeAttribute("class");
				this.getElementsByTagName("a")[0].className = "active";


				/**************
				 * Get all formatters
				 */


				formatsHolder.innerHTML = "";

				getFormatters(keys[index]).forEach(function(formatter){
					var li = createListItem("<a>"+formatter+"</a>");
					li.addEventListener("click", function(){
						var items = formatsHolder.getElementsByTagName("li");
						for(var i=0;i<items.length;i++)
							items[i].getElementsByTagName("a")[0].removeAttribute("class");
						this.getElementsByTagName("a")[0].className = "active";
						console.log(keys[index]);
						chartFrame(keys[index], formatter, document.getElementsByClassName("language")[index].getAttribute("src"));
					});
					formatsHolder.appendChild(li);
				});


				chartFrame(keys[index], anychart.format.locales[keys[index]].dateTimeLocale.timeFormats[0], document.getElementsByClassName("language")[index].getAttribute("src"));

				/*
				 * Set list of formatters
				 */



			}
		})(ii);
	}
}

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

	// Consider albanian-(albania).js !!!
	formatters.forEach(function(format){
		timeFormatters.forEach(function(time){
			dateFormatters.forEach(function(date){
				var currentDate = format.indexOf("{0}");
				var currentTime = format.indexOf("{1}");
				if (currentDate>currentTime) {
					var string = format.substr(0, currentTime) + time + format.substr(currentTime + 3, currentDate - currentTime - 3) + date + format.substr(currentDate + 3, format.length - currentDate - 3);
				}else{
					var string = format.substr(0,currentDate) + date + format.substr(currentDate+3,currentTime-currentDate-3) + time + format.substr(currentTime+3, format.length-currentTime-3);
				}
				variants.push(string);
			});
		});
	});
	return variants;
}


/****************************************************
 * create a simple "li" tag and set custom innerHTML
 ***************************************************/
function createListItem(inner){
	var item = document.createElement("li");
	item.innerHTML = inner;
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
