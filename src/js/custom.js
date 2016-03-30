/**
 * Created by a1 on 06/01/16.
 */

/**********************************
 *
 * Main Engine
 *
 **********************************/

var holder={};

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


	var customButton = document.getElementById("custom_button");
	var textField = document.getElementById("custom_formatter");

	var formatsContainer = document.getElementById("formatter");
	var formatsHolder = document.createElement("ul");
	formatsHolder.className = "menu";
	formatsHolder.style.bottom = "25px";

	formatsContainer.appendChild(formatsHolder);

	getFormatters("en-us").forEach(function(formatter){
		formatsHolder.appendChild(
			createListItem(
				"<a>"+formatter+"</a>",
				function(){
					chartFrame("en-us", formatter, "src/locale/english-(united-states).js");
					textField.value = "";
				}
			)
		);
	});

	//manage inner box shadow
	formatsHolder.style.webkitBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
	formatsHolder.style.mozBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
	formatsHolder.style.boxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
	formatsHolder.addEventListener("scroll", function(){
		if(formatsHolder.scrollTop<5){
			formatsHolder.style.webkitBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
			formatsHolder.style.mozBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
			formatsHolder.style.boxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
		}

		else if(formatsHolder.scrollTop+formatsHolder.offsetHeight > formatsHolder.scrollHeight-5){
			formatsHolder.style.webkitBoxShadow = "0 "+1+"px 3px -1px rgba(0,0,0,.5) inset";
			formatsHolder.style.mozBoxShadow = "0 "+1+"px 3px -1px rgba(0,0,0,.5) inset";
			formatsHolder.style.boxShadow = "0 "+1+"px 3px -1px rgba(0,0,0,.5) inset";
		}

		else{
			formatsHolder.style.webkitBoxShadow = "0 "+0+"px 3px -1px rgba(0,0,0,.5) inset";
			formatsHolder.style.mozBoxShadow = "0 "+0+"px 3px -1px rgba(0,0,0,.5) inset";
			formatsHolder.style.boxShadow = "0 "+0+"px 3px -1px rgba(0,0,0,.5) inset";
		}
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
								chartFrame(current, formatter, document.getElementsByClassName("language")[index].getAttribute("src"));
								textField.value = "";
							})
					);
				});

				chartFrame(current, anychart.format.locales[current].dateTimeLocale.timeFormats[0], document.getElementsByClassName("language")[index].getAttribute("src"));
				textField.value = "";

			})
		);
	});

	//manage inner box shadow
	listHolder.style.webkitBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
	listHolder.style.mozBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
	listHolder.style.boxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
	listHolder.addEventListener("scroll", function(){
		if(listHolder.scrollTop<5){
			listHolder.style.webkitBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
			listHolder.style.boxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
			listHolder.style.mozBoxShadow = "0 "+(-1)+"px 3px -1px rgba(0,0,0,.5) inset";
		}
		else if(listHolder.scrollTop+listHolder.offsetHeight > listHolder.scrollHeight-5){
			listHolder.style.webkitBoxShadow = "0 "+1+"px 3px -1px rgba(0,0,0,.5) inset";
			listHolder.style.boxShadow = "0 "+1+"px 3px -1px rgba(0,0,0,.5) inset";
			listHolder.style.mozBoxShadow = "0 "+1+"px 3px -1px rgba(0,0,0,.5) inset";
		}
		else{
			listHolder.style.webkitBoxShadow = "0 "+0+"px 3px -1px rgba(0,0,0,.5) inset";
			listHolder.style.boxShadow = "0 "+0+"px 3px -1px rgba(0,0,0,.5) inset";
			listHolder.style.mozBoxShadow = "0 "+0+"px 3px -1px rgba(0,0,0,.5) inset";
		}
	});

	customButton.addEventListener("click", holder.custom);
	textField.addEventListener("keydown", function(event){
		if (event.keyCode == 13) holder.custom();
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
	var format = formatter.replace(/\//,"\\/");

	var tabsContainer = document.getElementsByClassName("nav-tabs")[0];
	var tabs = tabsContainer.getElementsByTagName("li");

	tabs[0].removeEventListener("click",holder.project);
	tabs[1].removeEventListener("click",holder.resource);

	holder.project = function(){
		eventSetter(document.getElementById("project"), "src/js/draw_project.js", language, format, src, tabs[0]);
		tabs[0].removeEventListener("click", holder.project);
	};
	holder.resource = function() {
		eventSetter(document.getElementById("resource"), "src/js/draw_resource.js", language, format, src, tabs[1]);
		tabs[1].removeEventListener("click",holder.resource);
	};

	if (tabs[0].className=="active") holder.project();
	else tabs[0].addEventListener("click",holder.project);

	if (tabs[1].className=="active") holder.resource();
	else tabs[1].addEventListener("click",holder.resource);

	var jsonHolder = document.getElementById("json");
	jsonHolder.innerHTML = "";
	jsonHolder.style.position = "relative";
	jsonHolder.style.border = "1px solid #DDDDDD";
	jsonHolder.style.padding = "5px";
	jsonHolder.style.borderRadius = "5px";
	jsonHolder.style.background = "#f6f6f6";
	jsonHolder.style.overflowY = "auto";
	var jsonText = document.createElement("div");
	jsonText.className = "innerJson";
	var prefix = document.createElement("a");
	prefix.innerHTML = "anychart.format.locales["+language+"] = {";
	jsonText.appendChild(prefix);
	jsonText.appendChild(wheel(anychart.format.locales[language]));
	var postfix = document.createElement("a");
	postfix.innerHTML = "};";
	jsonText.appendChild(postfix);
	jsonHolder.appendChild(jsonText);

	/**********
	 * Manage custom formatter
	 */
	holder.custom = function(){
		var textField = document.getElementById("custom_formatter");
		if (textField.value !=="")chartFrame(language, textField.value, src);
	}
}

function wheel (code) {
	var domObj = document.createElement("div");
	for (var i in code) {
		switch (typeof code[i]){
			case ("object"):
				if (Array.isArray(code[i])){
					domObj.appendChild(newString(i+": ["));
					var strings = [];
					code[i].forEach(function(item){
						if (typeof item == "string") strings.push("'"+item+"'");
						else strings.push(item)
					});
					domObj.appendChild(newBlock(strings));
					domObj.appendChild(newString("],"));
					break;
				}
				domObj.appendChild(newString(i+": {"));
				domObj.appendChild(wheel (code[i]));
				domObj.appendChild(newString("}"));
				break;
			case ("string"):
				domObj.appendChild(newString(i+": '"+code[i] + "',"));
				break;
		}
	}
	domObj.style.overflow = "auto";
	domObj.style.paddingLeft = "10px";
	return domObj
}

function newString(text){
	var string = document.createElement("a");
	string.innerHTML = text.toString();
	return string;
}

// work only for arrays
function newBlock(array){
	var block = document.createElement("div");
	block.appendChild(newString(array.join(", ")));
	block.className = "textHolder";
	return block;
}

function frameSetter (container, js, language, formatter, src){
	var frame = document.createElement('iframe');
	frame.className = "chartFrame";
	frame.setAttribute("src", "./src/frame.html");
	container.innerHTML = "";
	frame.onload = function (){
		var frameDoc = frame.contentDocument || frame.contentWindow.document;
		var lang = frameDoc.createElement("script");
		lang.innerHTML = 'var language = "'+language+'";\nvar formatter = "'+formatter+'"';
		frameDoc.head.appendChild(lang);
		var langFile = frameDoc.createElement("script");
		langFile.setAttribute("src", "../"+src);
		frameDoc.head.appendChild(langFile);
		var script = frameDoc.createElement("script");
		script.setAttribute("src", "../"+js);
		frameDoc.head.appendChild(script);
	};
	container.appendChild(frame);
}

function eventSetter(target, path, language, format, src, tab){
	frameSetter(target, path, language, format, src);
}
