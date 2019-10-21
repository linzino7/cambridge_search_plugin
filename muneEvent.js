var menuItem = { 
    "id": "cambridge_search_plugin",
    "title": "cambridge_search",
    "contexts": ["selection"]
};

function openlink(keyword,url) {
    // 取代
    var word = keyword;
    var re_word = word.toLowerCase().replace(/ /g, '-');
    //合併成搜尋連結
    var url =  url + re_word;
    // 開啟新視窗
    window.open(url, "dictWindow"+getRandomInt(1000));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if(clickData.menuItemId == "cambridge_search_plugin" && clickData.selectionText) {

        console.log('click');

        // 進storage非同步抓取資料
        chrome.storage.sync.get(['cs_language'], function(result) {

            tmp = result.cs_language
            //alert(tmp);

            if(tmp == "english"){
                var url_head = "https://dictionary.cambridge.org/dictionary/english/"
                // alert("english");
                openlink(clickData.selectionText, url_head);
            }else{
                var url_head = "https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/"
                // alert("traditional_chinese");
                openlink(clickData.selectionText, url_head);
            }
        });

    }
});
