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
		lang.innerHTML = "<a>"+anychart.format.locales[key].engName + " - " + anychart.format.locales[key].nativeName+"</a>";
		listHolder.appendChild(lang);
		locals.push(lang);
	}
	console.log(keys);
	//keys.shift();
	//listHolder.children.shift();
	for (var ii=0;ii<locals.length;ii++){
		(function(index){
			locals[ii].onclick = function(){
				for (var i=0;i<locals.length;i++)
					locals[i].getElementsByTagName("a")[0].removeAttribute("class");
				this.getElementsByTagName("a")[0].className = "active";
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
			lang.innerHTML = "var language = '"+language+"'";
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
