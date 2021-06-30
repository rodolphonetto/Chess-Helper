// set app environment
const manifest = chrome.runtime.getManifest();
const envScript = document.createElement('script');
envScript.innerHTML = `
  window.chessHelper__environment = {
    version: "${manifest.version}",
    defaultLocale: "${manifest.default_locale}",
  };
`;

(document.head||document.documentElement).prepend(envScript);

/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} filePath Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 */
function injectScript(filePath, scriptPath) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  (document.head||document.documentElement).prepend(script);
}


injectScript(chrome.extension.getURL('build.js'));



setTimeout(() => {
  // Carregar audios de lances errado
    const invalidAudios = [] 
    invalidAudios.push(chrome.runtime.getURL("audios/ambiguo.mp3"))
    invalidAudios.push(chrome.runtime.getURL("audios/ilegal.mp3"))
    invalidAudios.push(chrome.runtime.getURL("audios/invalido.mp3"))

    const evt=document.createEvent("CustomEvent");
    evt.initCustomEvent("errorAudios", true, true, invalidAudios);
    document.dispatchEvent(evt);
    console.log('Evento lançado')
  // 
}, 3000);



// Function Calls
window.onload = function() {

  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
      if (mutation.addedNodes[0] && mutation.addedNodes[0].firstChild && mutation.addedNodes[0].firstChild.nodeValue) {
        for(let addedNode of mutation.addedNodes) {
          if (addedNode.classList.contains('selected')) {
            const move = addedNode.firstChild.data

            const movesAudios = []
            if (move === 'O-O') {
              movesAudios.push(chrome.extension.getURL(`audios/O-OAudio.mp3`))
            } else if (move === 'O-O-O') {
              movesAudios.push(chrome.extension.getURL(`audios/O-O-OAudio.mp3`))
            } else {
              for (const c of move) {
                let moveLetter
                if (c === 'C') {
                  moveLetter = 'cavalo'
                } else if (c === 'B') {
                  moveLetter = 'bispo'
                } else if (c === 'D') {
                  moveLetter = 'dama'
                } else {
                  moveLetter = c
                }
                movesAudios.push(chrome.extension.getURL(`audios/${moveLetter}Audio.mp3`))
              }
            }

            const playSequence = (sounds) => {

              const playNextSound = (audio) => {
                audio.src = sounds[currentSoundIndex++];
                audio.currentTime = 0;
                audio.play();
              };
            
              let currentSoundIndex = 0;
              if (sounds.length) {  
                const audio = new Audio();
                playNextSound(audio);
            
                audio.addEventListener('ended', () => {
                  if (currentSoundIndex < sounds.length) {
                    playNextSound(audio);
                  }
                });
              }
            }
            
            playSequence(movesAudios);
            
          }
        }
      }
     }
  })
  observer.observe(document, { childList: true, subtree: true })
}

