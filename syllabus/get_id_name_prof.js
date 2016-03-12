/*
// author Koichi Uchinishi
// 下記のURLのリンクの検索先からデータを取得できます。
// https://campusweb.ritsumei.ac.jp/syllabus/sso/KJgSearchTop.do 
*/ 
var tr = document.getElementsByTagName("tr");
var ary = [];
for(var i = 0 ; i < tr.length ; i ++){
	if(tr[i].getElementsByTagName("a").length > 0){
		ary.push([
			tr[i].getElementsByTagName("a")[0].href.split("'")[1],
			tr[i].children[0].innerText,
			tr[i].children[4].innerText
			]);
	}
}
console.log(JSON.stringify(ary));
