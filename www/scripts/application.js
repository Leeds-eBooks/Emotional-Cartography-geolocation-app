window.E={
  recording: false,
  init() {
    document.querySelector('#record').addEventListener('tap', E.record);
    document.querySelector('#stop').addEventListener('tap', E.stop);
    setInterval(function() {
      if (E.recording && E.results.length) {
        let i=document.createElement('i');
        i.className="super-jet";
        supersonic.logger.log(E.results);
        document.body.appendChild(i);
        E.post(E.results).then(supersonic.logger.log).catch(supersonic.logger.log);
        E.results=[];
      }
    }, 10000);
  },
  post(data) {
    return new Promise(function(resolve, reject) {
      var xhr=new XMLHttpRequest();
      xhr.addEventListener('load', resolve);
      xhr.addEventListener('error', function(event) {
        alert('error - internet connection?');
        reject('Unknown error.');
      });
      xhr.open('POST', 'http://emotional-cartography.herokuapp.com/api');
      xhr.timeout=6000;
      xhr.ontimeout=function() {
        reject("The request timed out. Please try again later!");
      };
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
    });
  },
  results: [],
  record(event) {
    var el=event.target,
        watch=supersonic.device.geolocation.watchPosition();

    function process(pos) {
      var obj={
            timestamp: new Date(pos.timestamp),
            location: {
              lat: pos.coords.latitude,
              long: pos.coords.longitude
            },
            uuid: ""//device.uuid
          };
      // supersonic.ui.dialog.alert(device);
      supersonic.logger.log(obj);
      let i=document.createElement('i');
      i.className="super-log-in";
      document.body.appendChild(i);
      E.results.push(obj);
    }

    E.recording=true;
    el.classList.remove('button-assertive');
    el.classList.add('button-balanced');
    el.innerHTML="Recording";
    E.unsub=watch.onValue(process);
  },
  stop() {
    var recEl=document.querySelector('#record');
    E.recording=false;
    recEl.innerHTML='Record';
    recEl.classList.remove('button-balanced');
    recEl.classList.add('button-assertive');
    supersonic.logger.log(E.recording);
    if (E.unsub) E.unsub();
  }
};
