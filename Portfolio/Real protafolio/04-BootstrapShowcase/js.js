

    window.onscroll = function() {
    updateProgressBar();
  };

  function updateProgressBar() {
    var scrollTop = document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercentage = (scrollTop / scrollHeight) * 100;
    var progressBar = document.getElementById('scrollProgressBar');
    progressBar.style.width = scrollPercentage + '%';
    progressBar.innerHTML = Math.round(scrollPercentage) + '%';
  }