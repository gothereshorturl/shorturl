async function respondIndex(request) {
    const {host} = new URL(request.url)
    const html = `<!DOCTYPE HTML>
  <html>
  <title>免費網址縮短，不記名，不用註冊 ${host}</title>
  <meta charset="utf-8">
   <link rel="icon" type="image/x-ico" href="https://www.nson.ga/gt.nson.gahead.png">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="URL Shorten,${host},Free Online URL Shortener,網址縮短,网址缩短,${host},免注册短网址一键生成,免费网址缩短工具">
  <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdn.staticfile.org/popper.js/1.15.0/umd/popper.min.js"></script>
  <script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
  
 <style>
body {
  font-family: Arial;
}

.blog {
  border: 5px dotted #bbb;
  width: 80%;
  border-radius: 15px;
  margin: 0 auto;
  max-width: 600px;
}

.container {
  padding: 2px 16px;
  background-color: #f1f1f1;
}

.promo {
  background: #ccc;
  padding: 3px;
}

.expire {
  color: red;
}
</style>
  </head>
  <body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
      <ul class="navbar-nav ml-auto text-center">
        <li class="nav-item active">
          <a id="zh_CN_btn" class="nav-link" href="#">中文</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#">|</a>
        </li>
        <li class="nav-item active">
          <a id="EN_btn" class="nav-link" href="#">English</a>
        </li>
                <li class="nav-item active">
          <a class="nav-link" href="#">|</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="https://dash.cloudflare.com/">Administrator Login</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <div class="col-12">
      <h3 class="text-center zh_CN" style="margin-top:12%;">Go There (短網址)，比短更短！🌂</h3>
      <p class="text-center zh_CN">你記住這個域名就可以獲得更好的短網址👉 <a href="/">${host}</a></p>
      <h3 class="text-center EN" style="margin-top:12%;">Go There (Short URL), Shorter than Short！🌂</h3>
      <p class="text-center EN">You remember this domain, you can get a new url👉 <a href="/">${host}</a></p>
      <form class="input-group" id="compress_form" onsubmit="return false" >
      <input class="form-control" id="url_input" name="url_input" rows="12" cols="60" placeholder="URL" required="true"/>&nbsp;
      <button class="btn btn-primary zh_CN" id="compress_btn">縮短你的連結</button>
      <button class="btn btn-primary EN" id="compress_btn_en">SHORTEN</button>
      </form>
      <p class="text-center zh_CN">舉報電郵 EMAIL：report-shorturl@nson.ga!</p>
      <p class="text-center EN">REPORT EMAIL：report-shorturl@nson.ga!</p>
      <p class="text-center zh_CN">Hinson_Media團隊, 版權所有.</p>
      <p class="text-center EN">Copyright 2022 Hinson_Media Team.</p>
      <br/>
      <div id="result"></div>
    </div>
  </div>

  <div class="position-fixed p-3" style="z-index: 5; right: 0; bottom: 0;">
    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-animation="true" data-delay="2000">
      <div class="toast-header">
        <img src="" class="rounded mr-2" alt="😊">
        <strong class="mr-auto">Message</strong>
        <small></small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body" id="message"></div>
    </div>
  </div>
<center>
<p>
<h1>News</h1>
</center>
<div class="blog">
  <div class="container">
    <h3>TEXT</h3>
  </div>
  <img src="img.png" alt="Photo_Logo" style="width:55%;">
  <div class="container" style="background-color:white">
    <h2><b>TEXT</b></h2> 
    <p>TEXT</p>
  </div>
  <div class="container">
    <p>Use Promo Code: <span class="promo">promo_code_not_applicable</span></p>
    <p class="expire">Post in: get_date_not_found (post_date_log.json)</p>
  </div>
</div>
</p>

  <script>
  $(document).ready(function(){
    var language = localStorage.getItem("language") || "EN";
    $("."+language).css("display","none");
  
    $("#EN_btn").on("click",function(){
      localStorage.setItem("language","zh_CN");
      $(".zh_CN").hide();
      $(".EN").fadeIn(1000);
    });
  
    $("#zh_CN_btn").on("click",function(){
      localStorage.setItem("language","EN");
      $(".EN").hide();
      $(".zh_CN").fadeIn(1000);
    });
  
    var clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function(e) {
      $("#message").html('<p class="EN">Copied Success!</p><p class="zh_CN">複製成功!</p>');
      $("#liveToast").toast('show');
      e.clearSelection();
    });
  
    $("#compress_btn,#compress_btn_en").on("click",function(){
      var url = $("#url_input").val();
      if( !/^http|https:\\/\\//i.test(url) ){
        $("#message").html('<p class="zh_CN">URL必須以http:// 或 https://開頭</p><p class="EN">URL must starts with http:// or https://</p>');
        $("#liveToast").toast('show');
      }else{
        var obj = { "url": url };
        $.ajax({
            type:"POST",
            url:"/compress",
            contentType: "application/json", 
            dataType:"json",
            data:JSON.stringify(obj), 
            success:function (data) {
              if( data.success ){
                $("#url_input").val( data.origin_url );
                $("#result").html('<h4 class="text-center">Success! 👉 <a id="short_url" target="blank" href="'+ data.short_url +'">' + data.short_url + '</a>&nbsp;<button class="btn btn-sm btn-secondary" data-clipboard-target="#short_url">Copy</button></h4>');
              }else{
                $( "#result" ).html('<h4 class="text-center text-danger">❌Error! Please check the URL!</h4>');
              }
            }
        });
      } // end else 
    });// end $("#compress_btn,#compress_btn_en").on("click")
  });
  </script>
  </body>
  </html>
    `
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      }
    })
  }
  
  
  async function respondCompress(request) {
      const {host,searchParams} = new URL(request.url)
      const {headers,body} = request 
  
      let post_obj = await request.json()
      let origin_url = post_obj.url 
      let time_hash = Number(new Date().getTime() - 1629302400000 ).toString(36)//.toUpperCase()
      let key = time_hash
      let short_url = `https://${host}/${time_hash}` 
  
      let success = false 
      if(/^https|http:\/\//i.test(origin_url)){
          await KV.put( key,origin_url )
          success = true 
      }
  
      let result
      if(success)
          result = {success,origin_url,key,short_url}
      else 
          result = {success,origin_url}
  
      return new Response(JSON.stringify(result, null, 2), {
          headers: {
              "content-type": "application/json;charset=UTF-8"
          },
      })
  }
  
  async function respondRedirct(request){
    const {host,pathname,searchParams} = new URL(request.url)
    url_hash = pathname.slice(1)
    target_url = await KV.get(url_hash)
    return Response.redirect(target_url ? target_url : `https://${host}`,301)
  }
  
  
  async function handleRequest(request) {
    const { method, url } = request
    const { host, pathname } = new URL(url)
  
    // if (host.endsWith('.workers.dev')
    //     || host.endsWith('.cloudflareworkers.com')) {
    //   return new Response('Not Found', { status: 404 })
    // }
  
    switch (pathname) {
      case '/':
        return respondIndex(request)
      case '/compress':
        return respondCompress(request)
      default:
        return respondRedirct(request)
    }
  
    return fetch(request)
  }
  
  
  function handleError(error) {
    console.error('Uncaught error:', error)
  
    const { stack } = error
  
    return new Response(stack, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    })
  }
  
  addEventListener('fetch', function(event) {
    const { request } = event
    const response = handleRequest(request).catch(handleError)
    event.respondWith(response)
  })
