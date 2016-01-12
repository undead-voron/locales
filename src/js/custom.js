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
				tabs[i].className = null;
			this.className = "active";
			var containers = document.getElementsByClassName("containers");
			for (var counter=0;counter<containers.length;counter++){
				containers[counter].style.display = "none";
			}
			document.getElementById(this.getAttribute("container")).style.display = "block";
		});
	}
	chartFrame ("en-us", "src/locale/english-(united-states).js");
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
		var currentLang = key;
		var lang = document.createElement("li");
		lang.innerHTML = anychart.format.locales[key].engName + " - " + anychart.format.locales[key].nativeName;
		listHolder.appendChild(lang);
		locals.push(lang);
	}
	console.log(keys);
	//keys.shift();
	//listHolder.children.shift();
	for (var ii=0;ii<locals.length;ii++){
		(function(index){
			locals[ii].onclick = function(){

				chartFrame(keys[index], document.getElementsByClassName("language")[index].getAttribute("src"));
			}
		})(ii);
	}
}
/**********************************
 *
 * Chart Engine
 *
 **********************************/

function chartFrame (language, src) {

	var projectFrame = frameSetter(document.getElementById("project"));
	var resourceFrame = frameSetter(document.getElementById("resource"));

	var projectDoc = projectFrame.contentDocument || projectFrame.contentWindow.document;
	var projectScript = projectDoc.createElement("script");
	projectScript.setAttribute("type", "text/javascript");
	projectScript.setAttribute("src", "src/js/draw_project.js");
	projectDoc.head.appendChild(projectScript);

	var resourceDoc = resourceFrame.contentDocument || resourceFrame.contentWindow.document;
	var resourceScript = resourceDoc.createElement("script");
	resourceScript.setAttribute("type", "text/javascript");
	resourceScript.setAttribute("src", "src/js/draw_resource.js");
	resourceDoc.head.appendChild(resourceScript);
	function frameSetter (container){
		var frame = document.createElement('iframe');
		frame.className = "chartFrame";
		container.innerHTML = "";
		container.appendChild(frame);
		var frameDoc = frame.contentDocument || frame.contentWindow.document;
		var library = frameDoc.createElement("script");
		library.setAttribute("src","src/vendors/anychart/anychart-bundle.min.js");
		frameDoc.head.appendChild(library);
		var lang = frameDoc.createElement("script");
		lang.innerHTML = "var language = '"+language+"'";
		frameDoc.head.appendChild(lang);
		var langFile = frameDoc.createElement("script");
		langFile.setAttribute("src", src);
		frameDoc.head.appendChild(langFile);
		var style = frameDoc.createElement("link");
		style.setAttribute("href","src/css/frame_style.css");
		style.setAttribute("type", "text/css");
		frameDoc.head.appendChild(style);
		var chartContainer = frameDoc.createElement("div");
		chartContainer.id = "container";
		frameDoc.body.appendChild(chartContainer);
		return frame;
	}
}
