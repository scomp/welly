
function setup(){
    window.interceptor = function (url) {
        if (url === '/') {
            console.log('Intercept in progress')
            window.history.pushState("home", "home", "/");
        } else if (url === '/login') {
            window.history.pushState("login", "login", "/login");
            
        } else if ( url == '/subsite') {
            window.history.pushState("subsite", "subsite", "/subsite");
        }
    }

    
    window.onpopstate = function(event) {
        const pathname = document.location.pathname;
        replacePage(pathname)
        console.log("pathname", pathname)
    };
      
}
        
function watcher(){
    var target = document.documentElement || document.body;
    console.log('conneted to body')
    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        console.log('Mutations!!')
        mutation.addedNodes.forEach(function (aNode) {
          console.log("added node ",aNode)
          // localStorage.setItem('megeroute', aNode)
          // data.push()
        })
        console.log("target",mutation.target);
          console.log("type", mutation.type)
          console.log("attributeName", mutation.attributeName)
          console.log("next sibling", mutation.nextSibling)
          console.log("previous sibling", mutation.previousSibling)
      })
    })
    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }
  
    // pass in the target node, as well as the observer options
    observer.observe(target, config)
}

         
function replacePage(url) {
    var xhr = new XMLHttpRequest();
    window.interceptor(url)
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var p = new DOMParser()
            const page = p.parseFromString(xhr.responseText,'text/html')
            const headNew = page.querySelector("head")
    
            if( headNew.hasChildNodes()){
                document.head.append(headNew.children)
            }
            const bodyNew = page.querySelector("body")
    
            if(headNew){
                document.body.replaceWith(bodyNew)
            }
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
}

