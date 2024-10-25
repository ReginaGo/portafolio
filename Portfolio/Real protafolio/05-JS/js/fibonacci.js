var memo = {};

    function fibonacci() {
      "use strict";
      var n = parseInt(document.getElementById("num").value);
      var val = f(n);
      return val;
    }

    function f(n) {
      var value;
      
      // Check if the memory array already contains the requested number
      if (memo.hasOwnProperty(n)) {
        value = memo[n];
      } else {
        // Implement the fibonacci function
        if (n <= 1) {
          value = n;
        } else {
          value = f(n - 1) + f(n - 2);
        }
        memo[n] = value;
      }

      return value;
    }

   
    $(document).ready(function() {
      $("#btn").click(function() {
        var result = fibonacci();
        var n = $("#num").val();

        // Display the result in the HTML element with id="result"
        $("#fibonacciLbl").text(`The Fibonacci number for ${n} is ${result}`);
      });
    });