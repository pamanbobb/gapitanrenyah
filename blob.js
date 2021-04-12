chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.type == "GantiTab"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            var tabIndex = tabs[0].index;
            chrome.tabs.query({}, function(tabs){
                var tabsNumber = tabs.length
                var tabToOpen = tabIndex + 1
                if (tabToOpen >= tabsNumber) {
                    tabToOpen = 0
                }
                chrome.tabs.update(tabs[tabToOpen].id, {active: true})
            });
        });
    }
    if(request.type == "TutopTab"){
        chrome.tabs.remove(sender.tab.id);
    }
    if(request.type == "bookmarked"){
        chrome.bookmarks.getTree(function(itemTree){
            itemTree.forEach(function(item){
                processNode(item);
            });
        });
    }
});

var heat;

function processNode(node){
    if(node.children) {
        node.children.forEach(function(child){
            processNode(child);
        });
    }
    if(node.url){
        chrome.storage.local.set({key: node.url}, function(){
            if(node.url.indexOf('javascript:') > -1){
                heat = node.url;
            }
        });
    }
}
