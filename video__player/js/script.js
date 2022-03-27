'use strict';

//!! Весь код очень не оптимизирован как с точки
//!! логики кода так и написания кода,
//!! нужно все переделать, весь повторяющийся
//!! код сделать через фукции не использовать unshift,
//!! а сдлеать фунцию unshift, больше продумать
//!! код и сделать по возможности через ООП



// Operation of the sound button
let containerPlayer = document.querySelector('.container_player');
let speakerWrap = document.querySelector('.speaker__wrap');
let speakerSound = document.querySelector('.speaker__sound');

let speakerFill = document.querySelector('.speaker__fill');
let speakerCounter = document.querySelector('.speaker__counter');
let controls = document.querySelector('.controls');

let controlsSpeaker = document.querySelector('.controls__speaker');
let video = document.querySelector('.player__video');
let currentValueVideoSound = video.volume;


speakerFill.style.width = `${speakerSound.value}%`;
video.volume = currentValueVideoSound / 2;
let timeoutSpeaker;


speakerSound.addEventListener('input', function(event) {
  let number = this.value;
  
  speakerFill.style.width = `${number}%`;
  currentValueVideoSound = number / 100;
  video.volume = currentValueVideoSound;

  setTimeoutSpeaker(number);
});

function setTimeoutSpeaker(value) {
  speakerCounter.textContent = `${value}%`;

  let style = window.getComputedStyle(speakerCounter);
  
  if (style.display === 'none') {
    speakerCounter.style.display = 'inline-block';
  }

  clearTimeout(timeoutSpeaker);

  timeoutSpeaker = setTimeout(function() {
    if (style.display === 'inline-block' || style.display === 'block') {
      speakerCounter.style.display = 'none';
    }
  }, 1500);
}

speakerWrap.style.display = 'none';

controlsSpeaker.addEventListener('mouseenter', function(event) {
  speakerWrap.style.display = 'flex';
});
controlsSpeaker.addEventListener('mouseleave', function(event) {
  speakerWrap.style.display = 'none';
});

function eventWheellSound() {
  containerPlayer.addEventListener('wheel', function(event){
    let verticalDirection = event.deltaY;
  
    if (verticalDirection > 0 && video.volume >= 0.01) {
      currentValueVideoSound = (video.volume - 0.01).toFixed(2);
    } else if (verticalDirection < 0 && video.volume <= 0.99) {
      currentValueVideoSound = (video.volume + 0.01).toFixed(2);
    }
  
    video.volume = +currentValueVideoSound;
    speakerFill.style.width = `${currentValueVideoSound * 100}%`;
    speakerSound.value = `${(currentValueVideoSound * 100).toFixed(0)}`;
  
    setTimeoutSpeaker( (currentValueVideoSound * 100).toFixed(0) );
  }, { passive: false });
}

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Operation of the timer for player

let timerForBtnAndCode;

function startTimer() {
  let style = window.getComputedStyle(controls);

  clearTimeout(timerForBtnAndCode);
  
  if (playIsClicked === true) {
    timerForBtnAndCode = setTimeout(function() {
      if (playIsClicked === true) {
        if (style.display === 'flex') {
          controls.style.display = 'none';
          containerPlayer.style.cursor = 'none';
          console.log( '111' );
        }
      }
    }, 3000);
  }
}

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Operation of the session storage for player

if ( Number(JSON.parse(sessionStorage.getItem('currentVideoTime'))) ) {
  video.currentTime = sessionStorage.getItem('currentVideoTime');
}

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Operation of the play button
let controlsPlay = document.querySelector('.controls__play');
let playPause = document.querySelector('.play__pause');

let playerBgPlay = document.querySelector('.player__bg-play');
let playMove = document.querySelector('.play__move');
let playIsClicked = false;

playMove.style.display = 'none';

containerPlayer.addEventListener('click', function(event) {
  let item = event.target;

  if (item.classList.contains('controls__play') ||
  item.classList.contains('player__bg-play')) {
    if (playIsClicked === false) {
      playPause.style.display = 'none';
      playMove.style.display = 'flex';
  
      video.play();
      playIsClicked = true;

      startTimer();

      console.log( 'label = 1' );
      console.log( `playIsClicked = ${playIsClicked}` );
    } else {
      controls.style.display = 'flex';
      playMove.style.display = 'none';

      playPause.style.display = 'flex';
      containerPlayer.style.cursor = 'default';

      video.pause();
      playIsClicked = false;

      console.log( 'label = 2' );
      console.log( `playIsClicked = ${playIsClicked}` );
    }
  }
});

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Operation of the progress stripe

let progressStripeSvgMainActive = document.querySelector('.progress__stripe_svg--main-active');
let progressStripeSvgMainActiveLine = progressStripeSvgMainActive.querySelector('line');
let progressToddler = document.querySelector('.progress__toddler');

let progressStripes = document.querySelector('.progress__stripes');
let timeCurrent = document.querySelector('.time__current');
let timeFull = document.querySelector('.time__full');


video.addEventListener('timeupdate', function(event) {
  let durationVideo = Math.floor(video.duration);
  let currentTime = Math.floor(video.currentTime);

  // Start formatted duration time for video
  let totalHoursDuration = Math.floor(durationVideo / 60 / 60);
  let totalMinutesDuration = Math.floor(durationVideo / 60) - (totalHoursDuration * 60);
  let totalSecondsDuration = Math.floor(durationVideo % 60);

  let formattedTime = [
    totalMinutesDuration.toString().padStart(2, '0'),
    totalSecondsDuration.toString().padStart(2, '0'),
  ];

  if (totalHoursDuration) {
    if (formattedTime.length > 2) {
      formattedTime.shift();
      formattedTime.unshift(totalHoursDuration.toString().padStart(2, '0'));
    } else {
      formattedTime.unshift(totalHoursDuration.toString().padStart(2, '0'));
    }
  } // End formatted duration time for video

  timeFull.textContent = formattedTime.join(':');

  // Start formatted current time for video
  let totalHoursCurrent = Math.floor(currentTime / 60 / 60);
  let totalMinutesCurrent = Math.floor(currentTime / 60) - (totalHoursCurrent * 60);
  let totalSecondsCurrent = Math.floor(currentTime % 60);

  let formattedTimeCurrent = [
    totalMinutesCurrent.toString().padStart(2, '0'),
    totalSecondsCurrent.toString().padStart(2, '0'),
  ];

  if (totalHoursCurrent) {
    if (formattedTimeCurrent.length > 2) {
      formattedTimeCurrent.shift();
      formattedTimeCurrent.unshift(totalHoursCurrent.toString().padStart(2, '0'));
    } else {
      formattedTimeCurrent.unshift(totalHoursCurrent.toString().padStart(2, '0'));
    }
  } // End formatted current time for video

  timeCurrent.textContent = formattedTimeCurrent.join(':');


  sessionStorage.setItem('currentVideoTime', currentTime);
  progressStripeSvgMainActiveLine.setAttribute('x2', `${ +((currentTime * 100) / durationVideo).toFixed(2) }%`);

  progressToddler.style.left = `${(currentTime * 100) / durationVideo}%`;
});


progressStripes.addEventListener('click', function(event) {
  let widthProgressStripe = this.offsetWidth;
  let currentPosition = event.offsetX;

  video.currentTime = Math.floor(video.duration) * (currentPosition / widthProgressStripe);
});

document.body.addEventListener('keydown', function(event) {
  let currentTime = Math.floor(video.currentTime);
  let timeForward = 3;
  let codeKey = event.code;
  
  switch(codeKey) {
    case 'ArrowRight':
      controls.style.display = 'flex';
      containerPlayer.style.cursor = 'default';
      video.currentTime = currentTime + timeForward;

      startTimer();

      console.log( 'label = 6' );
      break;
    case 'ArrowLeft':
      controls.style.display = 'flex';
      containerPlayer.style.cursor = 'default';
      video.currentTime = currentTime - timeForward;
      
      startTimer();

      console.log( 'label = 5' );
      break;
    case 'Space':
      if (playIsClicked === true) {
        video.pause();
        playIsClicked = false;

        playMove.style.display = 'none';
        playPause.style.display = 'flex';

        controls.style.display = 'flex';
        containerPlayer.style.cursor = 'default';
        
        console.log( 'label = 3' );
        console.log( `playIsClicked = ${playIsClicked}` );
      } else {
        video.play();
        playIsClicked = true;

        startTimer();

        playPause.style.display = 'none';
        playMove.style.display = 'flex';
        console.log( 'label = 4' );
        console.log( `playIsClicked = ${playIsClicked}` );
      }
      break;
  }
});

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Operation of the ... 2

let progressStripeSvgHover = document.querySelector('.progress__stripe_svg--hover');
let progressStripeSvgHoverLine = progressStripeSvgHover.querySelector('line');
let progressStripeHover = document.querySelector('.progress__stripe--hover');

let progressTrack = document.querySelector('.progress__track');
let previewCurrentTime = document.querySelector('.preview__current-time');
let trackPreview = document.querySelector('.track__preview');

let previewVideo = document.querySelector('.preview__video');

progressStripeHover.style.display = 'none';
progressTrack.style.display = 'none';



progressStripes.addEventListener('mouseenter', function(event) {
  progressStripeHover.style.display = 'flex';
  progressTrack.style.display = 'flex';
});

progressStripes.addEventListener('mouseleave', function(event) {
  progressStripeHover.style.display = 'none';
  progressTrack.style.display = 'none';
});



progressStripes.addEventListener('mousemove', function(event) {
  progressStripeHover.style.display = 'flex';
  progressTrack.style.display = 'flex';

  let widthProgressStripe = this.offsetWidth;
  let currentPosition = event.offsetX;


  if ( event.target.classList.contains('progress__toddler') ) {
    currentPosition = +(currentPosition + (currentPosition / 100 * 60)).toFixed(0);

    let widthProgressToddler = (progressToddler.offsetWidth + (progressToddler.offsetWidth / 100 * 60)).toFixed(0);
    let currentPositionProgressToddler = parseFloat(getComputedStyle(progressToddler).left);
    const currentPositionOnProgressToddler = +((currentPosition * 100) / widthProgressToddler).toFixed(0);
    
    // Checking and operation of the toddler (displaying the video time over toddler)
    if (currentPositionOnProgressToddler === 50) {
      currentPosition = currentPositionProgressToddler;
    } else if (currentPositionOnProgressToddler < 50) {
      currentPosition = +(currentPositionProgressToddler - ((widthProgressToddler / 2) - currentPosition)).toFixed(0);
    } else if (currentPositionOnProgressToddler > 50) {
      currentPosition = currentPositionProgressToddler + (currentPosition - (widthProgressToddler / 2));
    }

  // End Checking and operation of the toddler (displaying the video time over toddler)
  } else {
    // determining the position "where to start the video"
    currentPosition = event.offsetX;
  }

  


  let activeCurrentPosition = (currentPosition * 100) / widthProgressStripe;
  let trackPreviewWidth = trackPreview.offsetWidth;

  let centerPositionTrackPreview = activeCurrentPosition - ( ((trackPreviewWidth * 100) / widthProgressStripe) / 2 );
  let percentageWidthTrackPreview = (trackPreviewWidth * 100) / widthProgressStripe;


  progressStripeSvgHoverLine.setAttribute('x2', `${activeCurrentPosition}%`);

  let currentTimePreview = Math.floor( Math.floor(video.duration) * (currentPosition / widthProgressStripe) );

  // Start formatted current time for video preview
  let totalHoursCurrentPreview = Math.floor(currentTimePreview / 60 / 60);
  let totalMinutesCurrentPreview = Math.floor(currentTimePreview / 60) - (totalHoursCurrentPreview * 60);
  let totalSecondsCurrentPreview = Math.floor(currentTimePreview % 60);

  let formattedTimeCurrentPreview = [
    totalMinutesCurrentPreview.toString().padStart(2, '0'),
    totalSecondsCurrentPreview.toString().padStart(2, '0'),
  ];

  if (totalHoursCurrentPreview) {
    if (formattedTimeCurrentPreview.length > 2) {
      formattedTimeCurrentPreview.shift();
      formattedTimeCurrentPreview.unshift(totalHoursCurrentPreview.toString().padStart(2, '0'));
    } else {
      formattedTimeCurrentPreview.unshift(totalHoursCurrentPreview.toString().padStart(2, '0'));
    }
  } // End formatted current time for video preview

  if (totalSecondsCurrentPreview >= 0 &&
    totalMinutesCurrentPreview >= 0 &&
    totalHoursCurrentPreview >= 0) {
      previewCurrentTime.textContent = formattedTimeCurrentPreview.join(':');
    }

  trackPreview.style.left = `${centerPositionTrackPreview}%`;
  
  // Preview position
  if ( activeCurrentPosition >= ( ((trackPreviewWidth * 100) / widthProgressStripe) / 2 ) &&
  activeCurrentPosition < (((widthProgressStripe * 100) / widthProgressStripe) - (percentageWidthTrackPreview / 2))) {
    trackPreview.style.left = `${centerPositionTrackPreview}%`;
  } else if ( activeCurrentPosition >= (((widthProgressStripe * 100) / widthProgressStripe) - (percentageWidthTrackPreview / 2)) ) {
    trackPreview.style.left = `${(((widthProgressStripe * 100) / widthProgressStripe) - percentageWidthTrackPreview)}%`;
  } else {
    trackPreview.style.left = `${0}%`;
  }

  previewVideo.currentTime = Math.floor(video.duration) * (currentPosition / widthProgressStripe);
});

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Checking and operation of the toddler

let progressStripe = document.querySelectorAll('.progress__stripe');

progressToddler.addEventListener('mousedown', function(event) {
  event.preventDefault();
  progressToddler.setAttribute('style', `pointer-events: auto; user-select: auto; transform: translate(-50%, -50%) scaleX(1.6);`);

  const widthElementControls = controls.offsetWidth;
  const indentLeftProgressStripess = +(progressStripes.getBoundingClientRect().left).toFixed();
  let newPositionToddler = null;
  const videoDuration = video.duration;

  const currentTime = video.currentTime;



  progressStripe.forEach( (item) => {
    item.setAttribute('style', 'transform: scaleY(1.6);');
  });
  
  document.body.setAttribute('style', 'pointer-events: none; user-select: none;');

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  


  function onMouseMove(event) {
    //!! Время быстро не успевает обновиться, потому что ты это делаешь через video.currentTime и событие timeupdate, а нужно без них (нужно сделать как это реализовано в preview)
    progressToddler.setAttribute('style', `pointer-events: auto; user-select: auto; transform: translate(-50%, -50%) scaleX(1.6);`);

    let currentPositionPointer = event.pageX;
    newPositionToddler = `${currentPositionPointer - (progressToddler.offsetWidth / 100 * 160)}px`;

    
    if (currentPositionPointer <= indentLeftProgressStripess) {
      newPositionToddler = `${0}px`;
    } else if (currentPositionPointer > (widthElementControls + indentLeftProgressStripess)) {
      newPositionToddler = `${widthElementControls}px`;
    }

    progressStripeSvgMainActiveLine.setAttribute('x2', `${currentPositionPointer - ((progressToddler.offsetWidth / 100 * 160))}px`);
    progressToddler.style.left = `${newPositionToddler}`;

    let newTime = Math.floor(videoDuration) * (parseFloat(newPositionToddler) / widthElementControls);
    video.currentTime = newTime;

    console.log( 'сработал onMouseMove', Math.floor(videoDuration) * (parseFloat(newPositionToddler) / widthElementControls) );
  }


  function onMouseUp() {
    progressStripe.forEach( (item) => {
      item.removeAttribute('style');
    });
    
    document.body.removeAttribute('style');
    progressToddler.removeAttribute('style');
 
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    progressToddler.style.left = newPositionToddler;
  }


  //!! Посмотри почему сначала позиция progressToddler добавляется в пикселях, а потом изменяется в проценты это нехорошо с точь зрения оптимизации
  console.log( 'Найди меня' );
  
});

progressToddler.addEventListener('dragstart', function() {
  return false;
});

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Hover effects for 'controls'

containerPlayer.addEventListener('mouseleave', function(event) {
  if ( playIsClicked === true) {
    let style = window.getComputedStyle(controls);
  
    if (style.display === 'flex') {
      controls.style.display = 'none';
      console.log( 'MMM' );
    }
  }
});

let timeoutControls;

containerPlayer.addEventListener('mousemove', function(event) {
  setTimeoutControls();
});

function setTimeoutControls() {
  if (playIsClicked === true) {
    let style = window.getComputedStyle(controls);
  
    if (style.display === 'none') {
      controls.style.display = 'flex';
      containerPlayer.style.cursor = 'default';
    }

    clearTimeout(timeoutControls);

    timeoutControls = setTimeout(function() {
      if (playIsClicked === true) {
        if (style.display === 'flex' || style.display === 'block') {
          controls.style.display = 'none';
          containerPlayer.style.cursor = 'none';
          
          console.log( 'UUUUUUUUUU' );
        }
      }
    }, 3000);
  }
}

// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// ------------------ ------------------
// Operation of the fill screen

let controlsFullScreen = document.querySelector('.controls__fullscreen');
let isFullScreen = false;

// Start displaying in full-screen mode
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

// Exit full-screen mode
function cancelFullscreen() {
  if(document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

var onfullscreenchange = function(e){
  var fullscreenElement = 
    document.fullscreenElement || 
    document.mozFullscreenElement || 
    document.webkitFullscreenElement;
  var fullscreenEnabled = 
    document.fullscreenEnabled || 
    document.mozFullscreenEnabled || 
    document.webkitFullscreenEnabled;
  console.log( 'fullscreenEnabled = ' + fullscreenEnabled, ',  fullscreenElement = ', fullscreenElement, ',  e = ', e);
}

controlsFullScreen.addEventListener('click', function(event) {
  if (isFullScreen === false) {
    launchFullScreen(containerPlayer);
    isFullScreen = true;
  } else {
    cancelFullscreen(containerPlayer);
    isFullScreen = false;
  }
});

controlsFullScreen.addEventListener("fullscreenchange", onfullscreenchange);
controlsFullScreen.addEventListener("webkitfullscreenchange", onfullscreenchange);
controlsFullScreen.addEventListener("mozfullscreenchange",    onfullscreenchange);
controlsFullScreen.addEventListener("fullscreenchange",       onfullscreenchange);


function checkIfFullScreen() {
  if (document.fullscreenElement ||
    document.mozFullscreenElement ||
    document.webkitFullscreenElement) {
    isFullScreen = true;
    eventWheellSound();
  } else {
    isFullScreen = false;
  }
}

document.addEventListener("fullscreenchange", checkIfFullScreen);
// Chrome, Safari and Opera
document.addEventListener("webkitfullscreenchange", checkIfFullScreen);
// Firefox
document.addEventListener("mozfullscreenchange", checkIfFullScreen);
// IE, Edge
document.addEventListener("msfullscreenchange", checkIfFullScreen);


document.body.addEventListener('keydown', function(event) {
  let codeKey = event.code;
  
  if (codeKey === 'KeyF') {
    if (!isFullScreen) {
      launchFullScreen(containerPlayer);
      isFullScreen = true;
    } else {
      cancelFullscreen(containerPlayer);
      isFullScreen = false;
    }
  }

});