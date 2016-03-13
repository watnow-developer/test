/*
// author Koichi Uchinishi
// 下記のURLのリンクの検索先からデータを取得できます。
// https://campusweb.ritsumei.ac.jp/syllabus/sso/KJgSearchTop.do 
*/ 
var tr = document.getElementsByTagName("tr");
var ary = [];
for(var i = 0 ; i < tr.length ; i ++){
	if(tr[i].getElementsByTagName("a").length > 0){
		ary.push({
			id: tr[i].getElementsByTagName("a")[0].href.split("'")[1],
			name: tr[i].children[0].innerText,
			prof: tr[i].children[4].innerText,
			time: 1,
			day: 1,

			});
	}
}
console.log(JSON.stringify(ary));