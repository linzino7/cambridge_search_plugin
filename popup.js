
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

// main event
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    
    //確認cs_language 目前是中文還是英文 調整select 的value
    //預設都是中文
    chrome.storage.sync.get(['cs_language'], function(result) {
            var tmp = result.cs_language
            var dropdown = document.getElementById('dropdown');

            if(tmp == "english"){
              dropdown.value = "english"
            }else{
              dropdown.value = "traditional_chinese"
            }
    });


    //設定中文還是英文
    var dropdown = document.getElementById('dropdown');
    
    dropdown.addEventListener('change', () => {
      if(dropdown.value == "traditional_chinese"){
        //儲存到 storage 
        //要特別注意{ksy: url_head} key 是不需要單引號，但value 需要。
        chrome.storage.sync.set({cs_language: dropdown.value}, function() {
          //這個log基本上沒有公用
          console.log('Value is set to ' + dropdown.value);
        });

      }else if(dropdown.value == "english"){
        chrome.storage.sync.set({cs_language: dropdown.value}, function() {
          //alert('english');
          console.log('Value is set to ' + dropdown.value);
        });
      }
    });
    

    var github = document.getElementById('github');
    
    github.addEventListener('click', () => {
      window.open("https://github.com/linzion/cambridge_search_plugin", "dictWindow");
    });
    
  });
});
